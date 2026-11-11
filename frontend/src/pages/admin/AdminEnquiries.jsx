import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Phone, ExternalLink } from 'lucide-react';

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  async function fetchEnquiries() {
    setLoading(true);
    const { data, error } = await supabase
      .from('enquiries')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error("Error fetching enquiries:", error);
    else setEnquiries(data || []);
    setLoading(false);
  }

  const updateStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from('enquiries')
      .update({ status: newStatus })
      .eq('id', id);
    if (!error) {
      setEnquiries(enquiries.map(e => e.id === id ? { ...e, status: newStatus } : e));
    }
  };

  if (loading) return <div>Loading enquiries...</div>;

  return (
    <div className="admin-card">
      <div className="admin-card-header">
        <h2 className="admin-title" style={{ fontSize: '1.25rem' }}>Recent Enquiries</h2>
        <div className="admin-subtitle">Total: {enquiries.length}</div>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Customer</th>
              <th>Service</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {enquiries.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No enquiries found.</td></tr>
            ) : enquiries.map(enquiry => (
              <tr key={enquiry.id}>
                <td>{new Date(enquiry.created_at).toLocaleDateString()}</td>
                <td>
                  <div style={{ fontWeight: 600 }}>{enquiry.full_name}</div>
                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center', fontSize: '0.75rem', marginTop: '0.25rem' }}>
                    <Phone size={12} /> {enquiry.phone}
                    <span style={{ color: 'var(--admin-text-secondary)', textTransform: 'uppercase' }}>({enquiry.preferred_contact})</span>
                  </div>
                  {enquiry.email && <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-secondary)' }}>{enquiry.email}</div>}
                </td>
                <td>
                  <div style={{ fontWeight: 500, color: 'var(--admin-accent)' }}>{enquiry.service_selection.replace('-', ' ')}</div>
                  <div style={{ fontSize: '0.75rem' }}>PIN: {enquiry.pin_code}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-secondary)', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={enquiry.description}>
                    {enquiry.description}
                  </div>
                </td>
                <td>
                  <select 
                    value={enquiry.status}
                    onChange={(e) => updateStatus(enquiry.id, e.target.value)}
                    style={{
                      padding: '0.25rem 0.5rem',
                      borderRadius: 'var(--admin-radius-sm)',
                      border: '1px solid var(--admin-border)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      backgroundColor: 
                        enquiry.status === 'new' ? '#DBEAFE' : 
                        enquiry.status === 'contacted' ? '#FEF3C7' :
                        enquiry.status === 'completed' ? '#D1FAE5' : '#F8FAFC'
                    }}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <a href={`tel:${enquiry.phone}`} className="admin-btn admin-btn-outline" style={{ padding: '0.4rem', fontSize: '0.75rem' }} title="Call Customer">
                      <Phone size={14} />
                    </a>
                    {enquiry.preferred_contact === 'whatsapp' && (
                      <a href={`https://wa.me/${enquiry.phone.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="admin-btn admin-btn-outline" style={{ padding: '0.4rem', color: '#10B981', borderColor: '#10B981' }} title="WhatsApp">
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
