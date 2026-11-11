require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SECRET_KEY
);

const services = [
  { slug: 'renovation-grouting', title: 'Renovation & Grouting', description: 'Our signature — premium bathroom renovations, tile regrouting, and waterproofing.', is_featured: true, is_published: true, order_index: 1, image_url: '/images/modern_bathroom_renovation.jpg' },
  { slug: 'pipe-leak-repair', title: 'Pipe Leak Repair', description: 'Fast, reliable repair for leaking pipes in bathrooms, kitchens, and commercial properties.', is_featured: true, is_published: true, order_index: 2, image_url: '/images/pipe_repair.jpg' },
  { slug: 'bathroom-plumbing', title: 'Bathroom Plumbing', description: 'Complete bathroom plumbing — tap installation, blockages, and fixture replacement.', is_featured: true, is_published: true, order_index: 3, image_url: '/images/bathroom_plumbing.jpg' },
  { slug: 'drain-cleaning', title: 'Drain Cleaning', description: 'Professional unblocking and cleaning of drains to prevent flooding and odors.', is_featured: false, is_published: true, order_index: 4, image_url: '/images/drain_cleaning.jpg' },
  { slug: 'kitchen-plumbing', title: 'Kitchen Plumbing', description: 'Sink repairs, dishwasher plumbing, and kitchen pipe maintenance.', is_featured: true, is_published: true, order_index: 5, image_url: '/images/kitchen_plumbing.jpg' },
  { slug: 'geyser-installation', title: 'Geyser Installation', description: 'Safe installation and repair of geysers and water heaters of all brands.', is_featured: true, is_published: true, order_index: 6, image_url: '/images/geyser_installation.jpg' },
  { slug: 'water-tank-installation', title: 'Water Tank Installation', description: 'Overhead and underground water tank installation and pump connections.', is_featured: true, is_published: true, order_index: 7, image_url: '/images/water_tank_installation.jpg' },
  { slug: 'commercial-plumbing', title: 'Commercial Plumbing', description: 'Heavy-duty plumbing for offices, restaurants, and commercial buildings.', is_featured: false, is_published: true, order_index: 8, image_url: '/images/commercial_plumbing.jpg' },
  { slug: 'toilet-repair', title: 'Toilet Repair', description: 'Expert toilet installation, unblocking, and flush repair services.', is_featured: false, is_published: true, order_index: 9, image_url: '/images/toilet_repair.jpg' },
  { slug: 'water-pump-repair', title: 'Water Pump Repair', description: 'Residential and commercial water pump maintenance and repair.', is_featured: false, is_published: true, order_index: 10, image_url: '/images/water_pump_repair.jpg' }
];

const projects = [
  { title: 'Luxury Bathroom Overhaul', category: 'renovation', description: 'Complete floor-to-ceiling bathroom renovation with custom tile grouting.', image_url: '/images/modern_bathroom_renovation.jpg' },
  { title: 'Commercial Pipe Replacement', category: 'plumbing', description: 'Full pipe replacement for a multi-story commercial building in Jubilee Hills.', image_url: '/images/pipe_installation.jpg' },
  { title: 'Emergency Leak Repair', category: 'plumbing', description: 'Fixed a massive underground leak that was causing water loss and structural damage.', image_url: '/images/pipe_repair.jpg' }
];

async function seed() {
  console.log("Seeding services...");
  for (const s of services) {
    const { error } = await supabase.from('services').upsert([s], { onConflict: 'slug' });
    if (error) console.error("Error seeding service", s.slug, error);
  }
  
  console.log("Seeding projects...");
  for (const p of projects) {
    // Check if project exists by title to prevent duplicates on rerun
    const { data } = await supabase.from('projects').select('id').eq('title', p.title);
    if (!data || data.length === 0) {
      const { error } = await supabase.from('projects').insert([p]);
      if (error) console.error("Error seeding project", p.title, error);
    }
  }

  console.log("Seeding done.");
}

seed();
