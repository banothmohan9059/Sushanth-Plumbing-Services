import { useState } from 'react';
import { Phone, MessageCircle, MapPin, Send } from 'lucide-react';
import { trackPhoneConversion } from '../utils/googleAds';

const ADMIN_WHATSAPP_NUMBER = '917995486994';

const SERVICE_OPTIONS = [
  { value: 'renovation-grouting', label: 'Renovation & Grouting' },
  { value: 'pipe-leak-repair', label: 'Pipe Leak Repair' },
  { value: 'bathroom-plumbing', label: 'Bathroom Plumbing' },
  { value: 'drain-cleaning', label: 'Drain Cleaning' },
  { value: 'kitchen-plumbing', label: 'Kitchen Plumbing' },
  { value: 'geyser-installation', label: 'Geyser Installation' },
  { value: 'water-tank-installation', label: 'Water Tank Installation' },
  { value: 'other', label: 'Other' },
];

function buildWhatsAppEnquiryUrl(enquiry) {
  const serviceLabel =
    SERVICE_OPTIONS.find((opt) => opt.value === enquiry.serviceSelection)?.label ||
    enquiry.serviceSelection;

  const lines = [
    'New Enquiry - Sushanth Plumbing Services',
    `Name: ${enquiry.fullName}`,
    `Phone: ${enquiry.phone}`,
    ...(enquiry.email ? [`Email: ${enquiry.email}`] : []),
    `PIN Code: ${enquiry.pinCode}`,
    `Service: ${serviceLabel}`,
    `Preferred Contact: ${enquiry.preferredContact === 'whatsapp' ? 'WhatsApp' : 'Phone'}`,
    `Description: ${enquiry.description}`,
  ];

  return `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '', phone: '', email: '', pinCode: '', locality: '',
    serviceSelection: 'renovation-grouting', description: '', preferredContact: 'phone'
  });
  const [status, setStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('Submitting...');
    setWhatsappUrl('');

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const apiBase = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api')
        .trim()
        .replace(/\/+$/, '');
      const response = await fetch(`${apiBase}/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });

      const rawText = await response.text();
      let data = {};
      try {
        data = rawText ? JSON.parse(rawText) : {};
      } catch {
        data = {};
      }

      if (response.ok) {
        const waUrl = buildWhatsAppEnquiryUrl(formData);
        setWhatsappUrl(waUrl);
        setStatus('Enquiry saved! Opening WhatsApp so you can send the details to our team.');
        setFormData({ fullName: '', phone: '', email: '', pinCode: '', locality: '', serviceSelection: 'renovation-grouting', description: '', preferredContact: 'phone' });
        window.open(waUrl, '_blank', 'noopener,noreferrer');
      } else if (data.details && data.details.length > 0) {
        setStatus(`Error: ${data.details[0].message}`);
      } else {
        setStatus(`Error: ${data.error || `Request failed (${response.status})`}`);
      }
    } catch (err) {
      if (err.name === 'AbortError') {
        setStatus('Error: Request timed out. Please try again or call us directly.');
      } else {
        setStatus('Error connecting to the server. Please try calling us instead.');
      }
    } finally {
      clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--color-primary) 0%, #1a3654 100%)',
        color: 'white', padding: 'clamp(3rem, 6vw, 6rem) 0', textAlign: 'center',
      }}>
        <div className="container">
          <h1 style={{ color: 'white', fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '0.75rem' }}>Contact Us</h1>
          <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', color: 'rgba(255,255,255,0.7)', maxWidth: '550px', margin: '0 auto' }}>
            Get in touch for professional plumbing and renovation services.
          </p>
        </div>
      </div>

      <div className="container section-padding">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '3rem' }}>
          
          {/* Contact Info */}
          <div>
            <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem' }}>Get In Touch</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {[
                { icon: Phone, title: 'Phone', value: '+91 79954 86994', href: 'tel:+917995486994', sub: 'Priority booking', color: 'var(--color-secondary)' },
                { icon: MessageCircle, title: 'WhatsApp', value: '+91 79954 86994', href: 'https://wa.me/917995486994', sub: 'Send images of the issue', color: '#25D366' },
                { icon: MapPin, title: 'Service Area', value: 'Hyderabad, Telangana', sub: 'We come to you', color: 'var(--color-primary)' },
              ].map((item, i) => (
                <div key={i} className="premium-card" style={{ padding: '1.25rem', flexDirection: 'row', gap: '1.25rem', alignItems: 'center' }}>
                  <div style={{ backgroundColor: `${item.color}15`, padding: '0.75rem', borderRadius: '50%', color: item.color, flexShrink: 0 }}>
                    <item.icon size={24} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: '0.15rem' }}>{item.title}</h3>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel="noreferrer"
                        onClick={item.href.startsWith('tel:') ? trackPhoneConversion : undefined}
                        style={{ fontSize: '1rem', fontWeight: 500 }}
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span style={{ fontSize: '1rem', fontWeight: 500 }}>{item.value}</span>
                    )}
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.8rem', marginTop: '0.1rem' }}>{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="premium-card" style={{ padding: 'clamp(1.5rem, 3vw, 3rem)' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Send an Enquiry</h2>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Full Name *</label>
                  <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required className="form-control" placeholder="Your name" />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Phone (10 digits) *</label>
                  <input type="text" name="phone" value={formData.phone} onChange={handleChange} required className="form-control" placeholder="e.g. 9876543210" />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '1rem' }}>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">Email (Optional)</label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" placeholder="john@example.com" />
                </div>
                <div className="form-group" style={{ marginBottom: 0 }}>
                  <label className="form-label">PIN Code *</label>
                  <input type="text" name="pinCode" value={formData.pinCode} onChange={handleChange} required className="form-control" placeholder="e.g. 500084" />
                </div>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Service Required *</label>
                <select name="serviceSelection" value={formData.serviceSelection} onChange={handleChange} className="form-control">
                  {SERVICE_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Description *</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required className="form-control" rows="4" placeholder="Describe the issue..."></textarea>
              </div>
              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Preferred Contact *</label>
                <div style={{ display: 'flex', gap: '1.5rem', marginTop: '0.25rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                    <input type="radio" name="preferredContact" value="phone" checked={formData.preferredContact === 'phone'} onChange={handleChange} /> Phone
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer' }}>
                    <input type="radio" name="preferredContact" value="whatsapp" checked={formData.preferredContact === 'whatsapp'} onChange={handleChange} /> WhatsApp
                  </label>
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem', marginTop: '0.5rem' }} disabled={isSubmitting}>
                {isSubmitting ? 'Sending...' : <><Send size={18} /> Submit Enquiry</>}
              </button>
              {status && (
                <div style={{
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: isSubmitting ? '#fef3c7' : status.includes('Error') ? '#fee2e2' : '#dcfce7',
                  color: isSubmitting ? '#92400e' : status.includes('Error') ? '#991b1b' : '#166534',
                  fontWeight: 500,
                  textAlign: 'center',
                  fontSize: '0.9rem',
                }}>
                  {status}
                </div>
              )}
              {whatsappUrl && (
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn"
                  style={{
                    width: '100%',
                    padding: '0.9rem 1rem',
                    backgroundColor: '#25D366',
                    color: 'white',
                    border: 'none',
                    justifyContent: 'center',
                    fontWeight: 600,
                  }}
                >
                  <MessageCircle size={18} /> Send Enquiry on WhatsApp
                </a>
              )}
              <p style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', textAlign: 'center' }}>
                By submitting, you consent to being contacted about your enquiry.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
