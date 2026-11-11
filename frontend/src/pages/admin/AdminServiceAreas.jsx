import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, X, Check, EyeOff } from 'lucide-react';

export default function AdminServiceAreas() {
  const [areas, setAreas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingArea, setEditingArea] = useState(null);
  
  // Form State
  const [pinCode, setPinCode] = useState('');
  const [localityName, setLocalityName] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchAreas();
  }, []);

  async function fetchAreas() {
    setLoading(true);
    const { data, error } = await supabase.from('service_areas').select('*').order('pin_code', { ascending: true });
    if (error) console.error("Error fetching areas:", error);
    else setAreas(data || []);
    setLoading(false);
  }

  const openModal = (area = null) => {
    setEditingArea(area);
    if (area) {
      setPinCode(area.pin_code);
      setLocalityName(area.locality_name);
      setIsActive(area.is_active);
    } else {
      setPinCode('');
      setLocalityName('');
      setIsActive(true);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingArea(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const areaData = { pin_code: pinCode, locality_name: localityName, is_active: isActive };
      if (editingArea) {
        const { error } = await supabase.from('service_areas').update(areaData).eq('id', editingArea.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('service_areas').insert([areaData]);
        if (error) throw error;
      }
      closeModal();
      fetchAreas();
    } catch (error) {
      alert("Error saving area (make sure PIN code is unique): " + error.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteArea = async (id) => {
    if (window.confirm("Are you sure you want to remove this service area?")) {
      const { error } = await supabase.from('service_areas').delete().eq('id', id);
      if (!error) setAreas(areas.filter(a => a.id !== id));
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 className="admin-title">Service Areas</h2>
          <p className="admin-subtitle">Manage localities and PIN codes where you provide service.</p>
        </div>
        <button onClick={() => openModal()} className="admin-btn admin-btn-primary"><Plus size={18} /> Add Area</button>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>PIN Code</th>
              <th>Locality Name</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {areas.length === 0 ? (
              <tr><td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>No service areas found.</td></tr>
            ) : areas.map(area => (
              <tr key={area.id}>
                <td style={{ fontWeight: 700, letterSpacing: '1px' }}>{area.pin_code}</td>
                <td>{area.locality_name}</td>
                <td>
                  {area.is_active ? 
                    <span className="admin-badge" style={{ backgroundColor: '#D1FAE5', color: '#059669' }}><Check size={12} /> Active</span> : 
                    <span className="admin-badge" style={{ backgroundColor: '#F3F4F6', color: '#6B7280' }}><EyeOff size={12} /> Inactive</span>
                  }
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => openModal(area)} className="admin-btn admin-btn-outline" style={{ padding: '0.4rem' }}><Edit2 size={14} /></button>
                    <button onClick={() => deleteArea(area.id)} className="admin-btn admin-btn-outline" style={{ padding: '0.4rem', color: 'var(--admin-danger)', borderColor: 'var(--admin-danger)' }}><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.6)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="admin-card" style={{ width: '100%', maxWidth: '500px' }}>
            <div className="admin-card-header">
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{editingArea ? 'Edit Area' : 'Add Area'}</h3>
              <button onClick={closeModal} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div className="admin-card-body">
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>PIN Code</label>
                  <input type="text" className="admin-input" value={pinCode} onChange={e => setPinCode(e.target.value)} required placeholder="e.g. 500034" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Locality Name</label>
                  <input type="text" className="admin-input" value={localityName} onChange={e => setLocalityName(e.target.value)} required placeholder="e.g. Banjara Hills" />
                </div>
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer' }}>
                    <input type="checkbox" checked={isActive} onChange={e => setIsActive(e.target.checked)} style={{ width: '1rem', height: '1rem' }} />
                    Active Area
                  </label>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                  <button type="button" onClick={closeModal} className="admin-btn admin-btn-outline" disabled={saving}>Cancel</button>
                  <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Area'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
