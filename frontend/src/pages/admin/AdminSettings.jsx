import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Save } from 'lucide-react';

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    business_name: 'Sushanth Plumbing Services',
    business_phone: '+91 79954 86994',
    business_whatsapp: '+91 79954 86994',
    business_email: 'contact@sushanthplumbingservices.in',
    seo_title: 'Sushanth Plumbing Services | Premium Plumbing & Renovation',
    seo_description: 'Expert plumbing, bathroom renovation, and custom grouting services in Hyderabad.',
    maintenance_mode: false,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  async function fetchSettings() {
    setLoading(true);
    const { data, error } = await supabase.from('settings').select('*');
    if (!error && data && data.length > 0) {
      const mergedSettings = { ...settings };
      data.forEach(setting => {
        mergedSettings[setting.setting_key] = setting.setting_value;
      });
      setSettings(mergedSettings);
    }
    setLoading(false);
  }

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const updates = Object.keys(settings).map(key => ({
        setting_key: key,
        setting_value: settings[key],
        updated_at: new Date().toISOString()
      }));

      const { error } = await supabase.from('settings').upsert(updates, { onConflict: 'setting_key' });
      
      if (error) throw error;
      alert("Settings saved successfully!");
    } catch (error) {
      alert("Error saving settings: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  if (loading) return <div>Loading settings...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 className="admin-title">Website Settings</h2>
          <p className="admin-subtitle">Manage global website configuration and SEO.</p>
        </div>
      </div>

      <form onSubmit={handleSave}>
        <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))' }}>
          
          <div className="admin-card">
            <div className="admin-card-header">
              <h3 style={{ margin: 0, fontSize: '1rem' }}>Business Contact Info</h3>
            </div>
            <div className="admin-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Business Name</label>
                <input type="text" className="admin-input" name="business_name" value={settings.business_name} onChange={handleChange} required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Phone Number</label>
                <input type="text" className="admin-input" name="business_phone" value={settings.business_phone} onChange={handleChange} required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>WhatsApp Number</label>
                <input type="text" className="admin-input" name="business_whatsapp" value={settings.business_whatsapp} onChange={handleChange} required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Email Address</label>
                <input type="email" className="admin-input" name="business_email" value={settings.business_email} onChange={handleChange} required />
              </div>
            </div>
          </div>

          <div className="admin-card">
            <div className="admin-card-header">
              <h3 style={{ margin: 0, fontSize: '1rem' }}>SEO & Configuration</h3>
            </div>
            <div className="admin-card-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Homepage Meta Title</label>
                <input type="text" className="admin-input" name="seo_title" value={settings.seo_title} onChange={handleChange} required />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Homepage Meta Description</label>
                <textarea className="admin-input" name="seo_description" value={settings.seo_description} onChange={handleChange} required rows={3} />
              </div>
              <div style={{ marginTop: '1rem', padding: '1rem', backgroundColor: '#FEE2E2', borderRadius: 'var(--admin-radius-sm)', border: '1px solid #FCA5A5' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 600, color: '#991B1B', cursor: 'pointer' }}>
                  <input type="checkbox" name="maintenance_mode" checked={settings.maintenance_mode} onChange={handleChange} style={{ width: '1rem', height: '1rem' }} />
                  Enable Maintenance Mode
                </label>
                <p style={{ fontSize: '0.75rem', color: '#B91C1C', margin: '0.5rem 0 0 0' }}>If enabled, the public website will display a "Coming Soon" screen.</p>
              </div>
            </div>
          </div>

        </div>

        <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
            <Save size={18} /> {saving ? 'Saving...' : 'Save All Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}
