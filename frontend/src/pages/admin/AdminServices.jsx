import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, X, Check, EyeOff } from 'lucide-react';

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  
  // Form State
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [description, setDescription] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [isFeatured, setIsFeatured] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  async function fetchServices() {
    setLoading(true);
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('order_index', { ascending: true });
    
    if (error) console.error("Error fetching services:", error);
    else setServices(data || []);
    setLoading(false);
  }

  const openModal = (service = null) => {
    setEditingService(service);
    if (service) {
      setTitle(service.title);
      setSlug(service.slug);
      setDescription(service.description);
      setIsPublished(service.is_published);
      setIsFeatured(service.is_featured);
    } else {
      setTitle('');
      setSlug('');
      setDescription('');
      setIsPublished(true);
      setIsFeatured(false);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingService(null);
  };

  // Auto-generate slug from title
  const handleTitleChange = (e) => {
    const val = e.target.value;
    setTitle(val);
    if (!editingService) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const serviceData = {
        title,
        slug,
        description,
        is_published: isPublished,
        is_featured: isFeatured,
      };

      if (editingService) {
        const { error } = await supabase.from('services').update(serviceData).eq('id', editingService.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('services').insert([serviceData]);
        if (error) throw error;
      }
      closeModal();
      fetchServices();
    } catch (error) {
      alert("Error saving service: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteService = async (id) => {
    if (window.confirm("Are you sure you want to delete this service? This cannot be undone.")) {
      const { error } = await supabase.from('services').delete().eq('id', id);
      if (error) {
        alert("Error deleting service.");
      } else {
        setServices(services.filter(s => s.id !== id));
      }
    }
  };

  if (loading) return <div>Loading services...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 className="admin-title">Manage Services</h2>
          <p className="admin-subtitle">Add, edit, or unpublish your plumbing services.</p>
        </div>
        <button onClick={() => openModal()} className="admin-btn admin-btn-primary">
          <Plus size={18} /> Add New Service
        </button>
      </div>

      <div className="admin-card">
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Service Details</th>
                <th>URL Slug</th>
                <th>Status</th>
                <th>Featured</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.length === 0 ? (
                <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No services found.</td></tr>
              ) : services.map(service => (
                <tr key={service.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{service.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-secondary)', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {service.description}
                    </div>
                  </td>
                  <td>
                    <code style={{ fontSize: '0.75rem', backgroundColor: 'var(--admin-bg)', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>
                      /services/{service.slug}
                    </code>
                  </td>
                  <td>
                    {service.is_published ? (
                      <span className="admin-badge" style={{ backgroundColor: '#D1FAE5', color: '#059669' }}>
                        <Check size={12} style={{ marginRight: '4px' }} /> Published
                      </span>
                    ) : (
                      <span className="admin-badge" style={{ backgroundColor: '#F3F4F6', color: '#6B7280' }}>
                        <EyeOff size={12} style={{ marginRight: '4px' }} /> Draft
                      </span>
                    )}
                  </td>
                  <td>
                    {service.is_featured ? 'Yes' : 'No'}
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button onClick={() => openModal(service)} className="admin-btn admin-btn-outline" style={{ padding: '0.4rem' }}>
                        <Edit2 size={14} />
                      </button>
                      <button onClick={() => deleteService(service.id)} className="admin-btn admin-btn-outline" style={{ padding: '0.4rem', color: 'var(--admin-danger)', borderColor: 'var(--admin-danger)' }}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Form Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.6)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="admin-card" style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="admin-card-header">
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{editingService ? 'Edit Service' : 'Add New Service'}</h3>
              <button onClick={closeModal} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--admin-text-secondary)' }}>
                <X size={20} />
              </button>
            </div>
            <div className="admin-card-body">
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Service Title</label>
                  <input type="text" className="admin-input" value={title} onChange={handleTitleChange} required placeholder="e.g. Toilet Repair & Installation" />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>URL Slug</label>
                  <input type="text" className="admin-input" value={slug} onChange={e => setSlug(e.target.value)} required placeholder="e.g. toilet-repair" />
                  <p style={{ fontSize: '0.75rem', color: 'var(--admin-text-secondary)', marginTop: '0.25rem' }}>This is the URL path: website.com/services/<strong>{slug || '...'}</strong></p>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Description / SEO Meta Description</label>
                  <textarea className="admin-input" value={description} onChange={e => setDescription(e.target.value)} required rows={4} placeholder="Describe the service clearly..." />
                </div>

                <div style={{ display: 'flex', gap: '2rem', marginTop: '0.5rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer' }}>
                    <input type="checkbox" checked={isPublished} onChange={e => setIsPublished(e.target.checked)} style={{ width: '1rem', height: '1rem' }} />
                    Published (Visible to public)
                  </label>
                  
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer' }}>
                    <input type="checkbox" checked={isFeatured} onChange={e => setIsFeatured(e.target.checked)} style={{ width: '1rem', height: '1rem' }} />
                    Featured on Homepage
                  </label>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                  <button type="button" onClick={closeModal} className="admin-btn admin-btn-outline" disabled={saving}>Cancel</button>
                  <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                    {saving ? 'Saving...' : (editingService ? 'Save Changes' : 'Create Service')}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
