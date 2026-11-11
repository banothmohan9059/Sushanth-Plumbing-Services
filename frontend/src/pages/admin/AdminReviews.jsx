import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, X, Star, EyeOff, Check } from 'lucide-react';

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  
  // Form State
  const [customerName, setCustomerName] = useState('');
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [isPublished, setIsPublished] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, []);

  async function fetchReviews() {
    setLoading(true);
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error("Error fetching reviews:", error);
    else setReviews(data || []);
    setLoading(false);
  }

  const openModal = (review = null) => {
    setEditingReview(review);
    if (review) {
      setCustomerName(review.customer_name);
      setRating(review.rating);
      setReviewText(review.review_text);
      setIsPublished(review.is_published);
    } else {
      setCustomerName('');
      setRating(5);
      setReviewText('');
      setIsPublished(true);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingReview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const reviewData = {
        customer_name: customerName,
        rating: parseInt(rating),
        review_text: reviewText,
        is_published: isPublished,
      };

      if (editingReview) {
        const { error } = await supabase.from('reviews').update(reviewData).eq('id', editingReview.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('reviews').insert([reviewData]);
        if (error) throw error;
      }
      closeModal();
      fetchReviews();
    } catch (error) {
      alert("Error saving review: " + error.message);
    } finally {
      setSaving(false);
    }
  };

  const deleteReview = async (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      const { error } = await supabase.from('reviews').delete().eq('id', id);
      if (error) alert("Error deleting review.");
      else setReviews(reviews.filter(r => r.id !== id));
    }
  };

  if (loading) return <div>Loading reviews...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 className="admin-title">Customer Reviews</h2>
          <p className="admin-subtitle">Manage customer testimonials displayed on your website.</p>
        </div>
        <button onClick={() => openModal()} className="admin-btn admin-btn-primary">
          <Plus size={18} /> Add Review
        </button>
      </div>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Rating</th>
              <th>Review</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No reviews found.</td></tr>
            ) : reviews.map(review => (
              <tr key={review.id}>
                <td style={{ fontWeight: 600 }}>{review.customer_name}</td>
                <td>
                  <div style={{ display: 'flex', color: '#F59E0B' }}>
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill={i < review.rating ? "currentColor" : "none"} stroke={i < review.rating ? "currentColor" : "#CBD5E1"} />
                    ))}
                  </div>
                </td>
                <td style={{ maxWidth: '300px' }}>
                  <p style={{ margin: 0, fontSize: '0.875rem', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    "{review.review_text}"
                  </p>
                </td>
                <td>
                  {review.is_published ? (
                    <span className="admin-badge" style={{ backgroundColor: '#D1FAE5', color: '#059669' }}>
                      <Check size={12} style={{ marginRight: '4px' }} /> Published
                    </span>
                  ) : (
                    <span className="admin-badge" style={{ backgroundColor: '#F3F4F6', color: '#6B7280' }}>
                      <EyeOff size={12} style={{ marginRight: '4px' }} /> Hidden
                    </span>
                  )}
                </td>
                <td>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button onClick={() => openModal(review)} className="admin-btn admin-btn-outline" style={{ padding: '0.4rem' }}><Edit2 size={14} /></button>
                    <button onClick={() => deleteReview(review.id)} className="admin-btn admin-btn-outline" style={{ padding: '0.4rem', color: 'var(--admin-danger)', borderColor: 'var(--admin-danger)' }}><Trash2 size={14} /></button>
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
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{editingReview ? 'Edit Review' : 'Add Review'}</h3>
              <button onClick={closeModal} style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>
            <div className="admin-card-body">
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Customer Name</label>
                  <input type="text" className="admin-input" value={customerName} onChange={e => setCustomerName(e.target.value)} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Rating (1-5)</label>
                  <select className="admin-input" value={rating} onChange={e => setRating(e.target.value)} required>
                    {[5,4,3,2,1].map(num => <option key={num} value={num}>{num} Stars</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Review Text</label>
                  <textarea className="admin-input" value={reviewText} onChange={e => setReviewText(e.target.value)} required rows={4} />
                </div>
                <div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer' }}>
                    <input type="checkbox" checked={isPublished} onChange={e => setIsPublished(e.target.checked)} style={{ width: '1rem', height: '1rem' }} />
                    Publish on website
                  </label>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                  <button type="button" onClick={closeModal} className="admin-btn admin-btn-outline" disabled={saving}>Cancel</button>
                  <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>{saving ? 'Saving...' : 'Save Review'}</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
