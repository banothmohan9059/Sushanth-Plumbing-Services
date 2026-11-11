import { Link } from 'react-router-dom';
import { ShieldCheck, Clock, Users, Wrench, Hammer } from 'lucide-react';
import { siteImages } from '../data/siteImages';

export default function AboutPage() {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--color-primary) 0%, #1a3654 100%)',
        color: 'white', padding: 'clamp(3rem, 6vw, 6rem) 0', textAlign: 'center',
      }}>
        <div className="container">
          <h1 style={{ color: 'white', fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '0.75rem' }}>About Us</h1>
          <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', color: 'rgba(255,255,255,0.7)', maxWidth: '600px', margin: '0 auto' }}>
            Learn more about Sushanth Plumbing Services and our commitment to quality.
          </p>
        </div>
      </div>

      <div className="container section-padding">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: '4rem', alignItems: 'center', marginBottom: '4rem' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', marginBottom: '1.25rem' }}>
              Your Trusted Local Plumber in Hyderabad
            </h2>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', marginBottom: '1.25rem', lineHeight: 1.8 }}>
              With over <strong>10 years of experience</strong>, Sushanth Plumbing Services has been providing top-notch plumbing, renovation, and tile grouting services to properties across Hyderabad.
            </p>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-text-muted)', marginBottom: '2rem', lineHeight: 1.8 }}>
              Our speciality is <strong>renovation and grouting</strong> — we transform ordinary bathrooms into stunning, long-lasting spaces. We travel directly to our customers, inspect the issue on-site, and provide an accurate, transparent quotation before work begins.
            </p>
            <Link to="/contact" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>Contact Us Today</Link>
          </div>

          <div style={{
            background: 'var(--color-light-bg)', padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            borderRadius: 'var(--radius-xl)',
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem',
          }}>
            {[
              { icon: ShieldCheck, title: 'Reliable', desc: 'Quality work you can trust.' },
              { icon: Clock, title: 'Punctual', desc: 'We arrive on time, every time.' },
              { icon: Wrench, title: 'Expertise', desc: 'Skilled in all plumbing repairs.' },
              { icon: Users, title: 'Customer First', desc: 'Your satisfaction is our priority.' },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'center', padding: '1rem' }}>
                <div style={{
                  backgroundColor: 'var(--color-white)', width: '3.5rem', height: '3.5rem',
                  borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 0.75rem', boxShadow: 'var(--shadow-sm)', color: 'var(--color-secondary)',
                }}>
                  <item.icon size={24} />
                </div>
                <h3 style={{ fontSize: '1rem', marginBottom: '0.25rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Renovation highlight */}
        <div style={{
          background: 'linear-gradient(135deg, var(--color-primary) 0%, #1a3654 100%)',
          borderRadius: 'var(--radius-xl)', overflow: 'hidden',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
        }}>
          <div style={{ minHeight: '300px', overflow: 'hidden' }}>
            <img src={siteImages.bathroomPlumbing} alt="Premium renovation" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
          </div>
          <div style={{ padding: 'clamp(2rem, 4vw, 4rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Hammer size={28} color="var(--color-secondary)" style={{ marginBottom: '1rem' }} />
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', color: 'white', marginBottom: '1rem' }}>
              Renovation & Grouting is Our Speciality
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', marginBottom: '2rem', lineHeight: 1.8 }}>
              We bring magazine-quality finishes to every project. From complete bathroom overhauls to precision tile grouting and waterproofing, our renovation work is what sets us apart.
            </p>
            <Link to="/services/renovation-grouting" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
              Explore Renovation Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
