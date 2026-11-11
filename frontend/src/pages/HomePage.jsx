import { Link } from 'react-router-dom';
import { Wrench, Droplet, Hammer, CheckCircle2, PhoneCall, ArrowRight } from 'lucide-react';
import { siteImages } from '../data/siteImages';

export default function HomePage() {
  return (
    <div style={{ overflow: 'hidden' }}>

      {/* ═══ HERO — Cinematic Immersive ═══ */}
      <section className="hero-v2">
        {/* Full-bleed background image */}
        <div className="hero-v2__bg">
          <img
            src="/images/hero_premium.jpg"
            alt="Professional plumber working in a luxury bathroom"
            className="hero-v2__bg-img"
            width="1920" height="1080"
            loading="eager"
            fetchpriority="high"
          />
        </div>

        {/* Cinematic gradient overlays */}
        <div className="hero-v2__overlay" />
        <div className="hero-v2__overlay-bottom" />

        {/* Content */}
        <div className="hero-v2__container container">

          {/* Main content block */}
          <div className="hero-v2__content">

            {/* Eyebrow badge */}
            <div className="hero-v2__badge">
              <span className="hero-v2__badge-dot" />
              <span>Renovation · Plumbing · Grouting</span>
            </div>

            {/* Business Name — Prominent */}
            <h1 className="hero-v2__title">
              <span className="hero-v2__title-line1">Sushanth</span>
              <span className="hero-v2__title-line2">Plumbing Services</span>
            </h1>

            {/* Tagline */}
            <p className="hero-v2__tagline">
              Exceptional Plumbing. <em>Thoughtfully Delivered.</em>
            </p>

            {/* Description */}
            <p className="hero-v2__desc">
              Premium bathroom renovations, precision tile grouting, and expert plumbing solutions — crafted with over a decade of trusted expertise across Hyderabad.
            </p>

            {/* CTAs */}
            <div className="hero-v2__actions">
              <a href="tel:+917995486994" className="hero-v2__cta-primary">
                <PhoneCall size={18} />
                Call for Service
              </a>
              <a href="https://wa.me/917995486994" target="_blank" rel="noreferrer" className="hero-v2__cta-ghost">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Stats bar — glass panel at bottom */}
          <div className="hero-v2__stats-bar">
            <div className="hero-v2__stat">
              <span className="hero-v2__stat-num">500+</span>
              <span className="hero-v2__stat-label">Homes Served</span>
            </div>
            <div className="hero-v2__stat-divider" />
            <div className="hero-v2__stat">
              <span className="hero-v2__stat-num">10+</span>
              <span className="hero-v2__stat-label">Years Experience</span>
            </div>
            <div className="hero-v2__stat-divider" />
            <div className="hero-v2__stat">
              <span className="hero-v2__stat-num">4.9★</span>
              <span className="hero-v2__stat-label">Client Rating</span>
            </div>
            <div className="hero-v2__stat-divider" />
            <div className="hero-v2__stat">
              <span className="hero-v2__stat-num">24/7</span>
              <span className="hero-v2__stat-label">Emergency Ready</span>
            </div>
          </div>

        </div>
      </section>


      {/* ═══ RENOVATION SHOWCASE ═══ */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-white)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{
              display: 'inline-block', fontSize: '0.75rem', fontWeight: 700,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'var(--color-secondary)', marginBottom: '0.75rem',
            }}>Our Signature Service</span>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1rem' }}>
              Renovation & Grouting <br className="hide-mobile" />
              <span style={{ color: 'var(--color-secondary)' }}>Excellence</span>
            </h2>
            <p style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'var(--color-text-muted)', maxWidth: '650px', margin: '0 auto' }}>
              We transform ordinary spaces into stunning, long-lasting interiors with precision tile work and expert grouting.
            </p>
          </div>

          {/* Image + Content */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <div className="hide-mobile" style={{
                position: 'absolute', top: '-1rem', left: '-1rem',
                width: '100%', height: '100%',
                border: '2px solid var(--color-secondary)',
                borderRadius: 'var(--radius-xl)', opacity: 0.2,
              }} />
              <img
                src={siteImages.bathroomPlumbing}
                alt="Luxury bathroom renovation"
                loading="lazy"
                style={{
                  width: '100%', height: 'auto', maxHeight: '500px',
                  objectFit: 'cover', borderRadius: 'var(--radius-xl)',
                  boxShadow: 'var(--shadow-xl)', position: 'relative', zIndex: 1,
                }}
              />
            </div>

            <div>
              {[
                { title: 'Complete Bathroom Renovation', desc: 'Floor-to-ceiling transformations with modern fixtures and premium tiles.' },
                { title: 'Precision Tile Grouting', desc: 'Waterproof, mold-resistant grout lines — the hallmark of expert craftsmanship.' },
                { title: 'Waterproofing Solutions', desc: 'Professional-grade waterproofing for bathrooms, balconies, and wet areas.' },
                { title: 'Modern Fixture Installation', desc: 'Rainfall showers, vessel sinks, and concealed cisterns installed with precision.' },
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex', gap: '1rem', padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  transition: 'background var(--transition-fast)',
                  marginBottom: '0.5rem',
                }}
                  onMouseOver={e => e.currentTarget.style.background = 'var(--color-light-bg)'}
                  onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                >
                  <CheckCircle2 size={22} color="var(--color-secondary)" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                  <div>
                    <h4 style={{ fontSize: '1.05rem', marginBottom: '0.2rem' }}>{item.title}</h4>
                    <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
              <div style={{ paddingLeft: '1.25rem', marginTop: '1.5rem' }}>
                <Link to="/services/renovation-grouting" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>
                  Explore Renovation <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══ SERVICES GRID ═══ */}
      <section className="section-padding" style={{ background: 'var(--color-light-bg)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{
              display: 'inline-block', fontSize: '0.75rem', fontWeight: 700,
              letterSpacing: '0.15em', textTransform: 'uppercase',
              color: 'var(--color-secondary)', marginBottom: '0.75rem',
            }}>What We Offer</span>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '1rem' }}>Complete Plumbing Solutions</h2>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
              Beyond renovation, we handle every plumbing need — from emergency repairs to full installations.
            </p>
          </div>

          <div className="grid-3">
            {[
              { icon: Hammer, title: 'Renovation & Grouting', desc: 'Our signature — premium bathroom transformations and precision tile grouting.', slug: 'renovation-grouting', image: siteImages.renovationGrouting, featured: true },
              { icon: Wrench, title: 'Pipe Leak Repair', desc: 'Fast emergency response for leaking pipes with permanent fixes.', slug: 'pipe-leak-repair', image: siteImages.pipeRepair },
              { icon: Droplet, title: 'Bathroom Plumbing', desc: 'Taps, showers, toilets, and complete fixture upgrades.', slug: 'bathroom-plumbing', image: siteImages.bathroomPlumbing },
              { icon: Wrench, title: 'Kitchen Plumbing', desc: 'Sink repairs, faucet installations, and under-sink plumbing.', slug: 'kitchen-plumbing', image: siteImages.kitchenPlumbing },
              { icon: Droplet, title: 'Geyser Installation', desc: 'Professional installation and repair of water heaters.', slug: 'geyser-installation', image: siteImages.geyserInstallation },
              { icon: Droplet, title: 'Water Tank & Pump', desc: 'Tank installation, pump repair, and level controllers.', slug: 'water-tank-installation', image: siteImages.waterTank },
            ].map((service) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="premium-card"
                style={{
                  padding: 0, textDecoration: 'none', color: 'inherit',
                  border: service.featured ? '2px solid var(--color-secondary)' : undefined,
                }}
              >
                {service.featured && (
                  <div style={{
                    background: 'linear-gradient(135deg, var(--color-secondary), #e06517)',
                    color: 'white', textAlign: 'center',
                    padding: '0.4rem', fontSize: '0.7rem', fontWeight: 700,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                  }}>
                    ★ Signature Service
                  </div>
                )}
                <div style={{ width: '100%', height: '180px', overflow: 'hidden' }}>
                  <img src={service.image} alt={service.title} loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform var(--transition-bounce)' }}
                    className="card-img"
                  />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
                    <service.icon size={20} color="var(--color-secondary)" />
                    <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{service.title}</h3>
                  </div>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>{service.desc}</p>
                  <span style={{ color: 'var(--color-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}>
                    Learn More <ArrowRight size={14} color="var(--color-secondary)" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/services" className="btn btn-outline" style={{ padding: '1rem 2.5rem' }}>
              View All Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>


      {/* ═══ TRUST / WHY US ═══ */}
      <section className="section-padding" style={{
        background: 'linear-gradient(135deg, var(--color-primary-dark) 0%, var(--color-primary) 100%)',
        color: 'white',
      }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <span style={{
                display: 'inline-block', fontSize: '0.75rem', fontWeight: 700,
                letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'var(--color-secondary)', marginBottom: '0.75rem',
              }}>Why Choose Us</span>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'white', marginBottom: '2rem' }}>
                Craftsmanship You Can Rely On.
              </h2>
              {[
                { title: 'Inspect First, Quote Transparently', desc: 'We visit, assess, and quote honestly. No hidden charges.' },
                { title: 'Renovation & Grouting Experts', desc: 'Bathroom transformations with magazine-quality finishes.' },
                { title: '10+ Years of Trusted Service', desc: 'Hundreds of satisfied homeowners across Hyderabad.' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                  <CheckCircle2 size={22} color="var(--color-secondary)" style={{ flexShrink: 0, marginTop: '0.15rem' }} />
                  <div>
                    <h4 style={{ fontSize: '1.05rem', marginBottom: '0.2rem', color: 'white' }}>{item.title}</h4>
                    <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="glass-panel-dark" style={{ padding: 'clamp(2rem, 4vw, 3.5rem)' }}>
              <h3 style={{ fontSize: '1.5rem', color: 'white', marginBottom: '2rem' }}>How It Works</h3>
              {[
                { step: '01', title: 'Contact Us', desc: 'Call, WhatsApp, or fill our enquiry form.' },
                { step: '02', title: 'Site Inspection', desc: 'We visit your location to assess the work.' },
                { step: '03', title: 'Transparent Quote', desc: 'Clear pricing before any work begins.' },
                { step: '04', title: 'Expert Execution', desc: 'Professional work done to your satisfaction.' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: '1.25rem', marginBottom: '1.5rem' }}>
                  <span style={{
                    fontSize: '1.75rem', fontWeight: 800, color: 'var(--color-secondary)',
                    fontFamily: 'var(--font-heading)', lineHeight: 1, minWidth: '2.5rem', opacity: 0.6,
                  }}>{item.step}</span>
                  <div>
                    <h4 style={{ color: 'white', fontSize: '1rem', marginBottom: '0.15rem' }}>{item.title}</h4>
                    <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem' }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* ═══ CTA ═══ */}
      <section className="section-padding" style={{ background: 'var(--color-white)' }}>
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, var(--color-primary) 0%, #1a3654 100%)',
            borderRadius: 'var(--radius-xl)', padding: 'clamp(2.5rem, 5vw, 5rem)',
            textAlign: 'center', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: '-30%', right: '-10%',
              width: '40%', height: '100%',
              background: 'radial-gradient(circle, rgba(244,119,40,0.15) 0%, transparent 70%)',
              borderRadius: '50%', pointerEvents: 'none',
            }} />
            <div style={{ position: 'relative', zIndex: 2, maxWidth: '600px', margin: '0 auto' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'white', marginBottom: '1.25rem' }}>
                Ready to Transform Your Space?
              </h2>
              <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', color: 'rgba(255,255,255,0.6)', marginBottom: '2.5rem' }}>
                Whether it's a bathroom renovation or an urgent repair — Sushanth Plumbing Services delivers excellence.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn btn-primary" style={{ padding: '1.15rem 2.5rem' }}>
                  Request Free Inspection
                </Link>
                <a href="https://wa.me/917995486994" target="_blank" rel="noreferrer" className="btn" style={{
                  padding: '1.15rem 2rem', background: '#25D366', color: 'white', border: 'none',
                }}>
                  WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .premium-card:hover .card-img { transform: scale(1.06); }
      `}</style>
    </div>
  );
}
