const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

// Parse .env manually for a quick test
const envContent = fs.readFileSync('.env', 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const [key, ...rest] = line.split('=');
  if (key && rest.length > 0) {
    envVars[key.trim()] = rest.join('=').trim();
  }
});

const url = envVars.SUPABASE_URL;
const key = envVars.SUPABASE_SECRET_KEY;

if (!url || !key) {
  console.error("❌ Missing SUPABASE_URL or SUPABASE_SECRET_KEY in backend/.env");
  process.exit(1);
}

const supabase = createClient(url, key);

async function checkConnection() {
  try {
    console.log(`Connecting to Supabase at: ${url}...`);
    // A simple query to check connection (e.g. fetching an empty array from an imaginary table to see if it responds with a valid error or data)
    // Or just calling health check or auth API. But querying a random table works to check connectivity.
    const { data, error } = await supabase.from('projects').select('*').limit(1);
    
    // If we get an error that the relation "projects" does not exist, it means the connection is SUCCESSFUL but the table doesn't exist yet!
    if (error) {
      if (error.code === '42P01') {
        console.log("✅ Successfully connected to Supabase! (Note: 'projects' table not created yet)");
      } else {
        console.error("❌ Connected but received an error:", error);
      }
    } else {
      console.log("✅ Successfully connected to Supabase! Found 'projects' table.");
    }
  } catch (err) {
    console.error("❌ Failed to connect to Supabase:", err.message);
  }
}

checkConnection();
