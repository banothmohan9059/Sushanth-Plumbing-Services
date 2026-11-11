import { MapPin, PhoneCall, CheckCircle2, Navigation, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function AreasWeServePage() {
  const serviceZones = [
    {
      zone: 'West Hyderabad',
      description: 'Major IT hubs and premium residential corridors.',
      areas: ['Kondapur', 'Kothaguda', 'Manikonda', 'Narsingi', 'Manchirevula']
    },
    {
      zone: 'Financial District & Surrounds',
      description: 'Fast-growing luxury communities and tech parks.',
      areas: ['Kokapet', 'Gandipet', 'Puppalaguda', 'Aziz Nagar', 'Tellapur']
    },
    {
      zone: 'North-West Corridor',
      description: 'Established residential neighborhoods and townships.',
      areas: ['Miyapur', 'Mathrusri Nagar', 'Bachupally', 'Nizampet', 'Pragathi Nagar', 'Mallampet']
    },
    {
      zone: 'BHEL & Outer Regions',
      description: 'Industrial and suburban residential belts.',
      areas: ['Ramachandrapuram', 'Ameenpur', 'Bharati Nagar']
    }
  ];

  return (
    <div className="animate-fade-in" style={{ backgroundColor: '#F8FAFC' }}>
      {/* Premium Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)',
        color: 'white', padding: 'clamp(4rem, 8vw, 7rem) 0', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', right: '-5%', top: '-20%',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(244,119,40,0.15) 0%, transparent 60%)',
          borderRadius: '50%', pointerEvents: 'none',
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.5rem 1rem', borderRadius: '2rem',
            background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
            marginBottom: '1.5rem', backdropFilter: 'blur(4px)',
          }}>
            <Navigation size={14} color="var(--color-secondary)" />
            <span style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>Hyderabad Service Network</span>
          </div>
          <h1 style={{ color: 'white', fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1rem', lineHeight: 1.1 }}>
            Where We <span style={{ color: 'var(--color-secondary)' }}>Operate</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'rgba(255,255,255,0.7)', maxWidth: '650px', margin: '0 auto' }}>
            We bring premium plumbing and luxury renovation services directly to your doorstep across major locations in Hyderabad.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: 'clamp(4rem, 6vw, 6rem) 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: '2.5rem', alignItems: 'flex-start' }}>
          
          {/* Main Content - Service Zones Grid */}
          <div style={{ flex: '1 1 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {serviceZones.map((zone, idx) => (
              <div key={idx} className="glass-card animate-fade-in-up" style={{ 
                backgroundColor: 'white', 
                borderRadius: 'var(--radius-lg)', 
                padding: '2rem',
                border: '1px solid rgba(0,0,0,0.05)',
                boxShadow: '0 4px 20px -4px rgba(15,23,42,0.05)',
                animationDelay: `${idx * 0.1}s`,
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseOver={e => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 24px -8px rgba(15,23,42,0.1)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px -4px rgba(15,23,42,0.05)';
              }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem', backgroundColor: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                    <MapPin size={18} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--color-primary-dark)' }}>{zone.zone}</h3>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                  {zone.description}
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {zone.areas.map((area, aIdx) => (
                    <span key={aIdx} style={{
                      fontSize: '0.85rem', fontWeight: 500, color: 'var(--color-text-dark)',
                      backgroundColor: '#F1F5F9', padding: '0.4rem 0.8rem', borderRadius: '2rem',
                      display: 'inline-flex', alignItems: 'center', gap: '0.3rem'
                    }}>
                      <CheckCircle2 size={12} color="var(--color-secondary)" /> {area}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Sticky Sidebar CTA */}
          <div style={{ position: 'sticky', top: '2rem', flexShrink: 0, width: '100%', maxWidth: '380px' }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: 'var(--radius-lg)',
              padding: '2.5rem',
              border: '1px solid rgba(0,0,0,0.05)',
              boxShadow: '0 10px 40px -10px rgba(15,23,42,0.08)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'linear-gradient(90deg, var(--color-primary), var(--color-secondary))' }} />
              
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--color-primary-dark)', lineHeight: 1.2 }}>Don't see your specific locality?</h3>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', fontSize: '1rem', lineHeight: 1.6 }}>
                We frequently expand our service radius for major renovation and plumbing projects. Reach out to our team to confirm availability in your neighborhood.
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <a href="tel:+917995486994" className="btn btn-primary" style={{ justifyContent: 'center', padding: '1.1rem', fontSize: '1rem' }}>
                  <PhoneCall size={18} /> Call +91 79954 86994
                </a>
                <Link to="/contact" className="btn" style={{ 
                  justifyContent: 'center', padding: '1.1rem', fontSize: '1rem',
                  backgroundColor: 'white', color: 'var(--color-primary)',
                  border: '1px solid var(--color-primary)',
                }}>
                  Submit Enquiry <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
