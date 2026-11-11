import { Link } from 'react-router-dom';
import { Wrench, Droplet, Hammer, ArrowRight } from 'lucide-react';
import { siteImages } from '../data/siteImages';

const services = [
  { slug: 'renovation-grouting', name: 'Renovation & Grouting', desc: 'Our signature — premium bathroom renovations, tile regrouting, and waterproofing.', icon: Hammer, image: siteImages.renovationGrouting, featured: true },
  { slug: 'pipe-leak-repair', name: 'Pipe Leak Repair', desc: 'Fast, reliable repair for leaking pipes in bathrooms, kitchens, and commercial properties.', icon: Wrench, image: siteImages.pipeRepair },
  { slug: 'bathroom-plumbing', name: 'Bathroom Plumbing', desc: 'Complete bathroom plumbing — tap installation, blockages, and fixture replacement.', icon: Wrench, image: siteImages.bathroomPlumbing },
  { slug: 'drain-cleaning', name: 'Drain Cleaning', desc: 'Professional unblocking and cleaning of drains to prevent flooding and odors.', icon: Droplet, image: siteImages.drainCleaning },
  { slug: 'kitchen-plumbing', name: 'Kitchen Plumbing', desc: 'Sink repairs, dishwasher plumbing, and kitchen pipe maintenance.', icon: Wrench, image: siteImages.kitchenPlumbing },
  { slug: 'geyser-installation', name: 'Geyser Installation', desc: 'Safe installation and repair of geysers and water heaters of all brands.', icon: Droplet, image: siteImages.geyserInstallation },
  { slug: 'water-tank-installation', name: 'Water Tank Installation', desc: 'Overhead and underground water tank installation and pump connections.', icon: Droplet, image: siteImages.waterTank },
  { slug: 'commercial-plumbing', name: 'Commercial Plumbing', desc: 'Heavy-duty plumbing for offices, restaurants, and commercial buildings.', icon: Wrench, image: siteImages.commercialPlumbing },
  { slug: 'toilet-repair', name: 'Toilet Repair', desc: 'Expert toilet installation, unblocking, and flush repair services.', icon: Wrench, image: siteImages.toiletRepair },
  { slug: 'water-pump-repair', name: 'Water Pump Repair', desc: 'Residential and commercial water pump maintenance and repair.', icon: Droplet, image: siteImages.waterPump },
];

export default function ServicesPage() {
  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, var(--color-primary) 0%, #1a3654 100%)',
        color: 'white', padding: 'clamp(3rem, 6vw, 6rem) 0', textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', opacity: 0.08, backgroundImage: `url(${siteImages.pipeInstallation})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <h1 style={{ color: 'white', fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1rem' }}>Our Premium Services</h1>
          <p style={{ fontSize: 'clamp(0.95rem, 2vw, 1.2rem)', color: 'rgba(255,255,255,0.8)', maxWidth: '700px', margin: '0 auto' }}>
            Comprehensive, professional plumbing and renovation solutions — from our signature grouting work to emergency repairs.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <div className="container section-padding">
        <div className="grid-3">
          {services.map((service) => (
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
                }}>★ Signature Service</div>
              )}
              <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
                <img src={service.image} alt={service.name} loading="lazy"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform var(--transition-bounce)' }}
                  className="svc-img"
                />
              </div>
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.6rem' }}>
                  <service.icon size={20} color="var(--color-secondary)" />
                  <h3 style={{ fontSize: '1.1rem', margin: 0 }}>{service.name}</h3>
                </div>
                <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>{service.desc}</p>
                <span style={{ color: 'var(--color-primary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.9rem' }}>
                  View Details <ArrowRight size={14} color="var(--color-secondary)" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Renovation feature */}
      <section style={{
        backgroundColor: 'var(--color-primary)', overflow: 'hidden',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))',
      }}>
        <div style={{ minHeight: '300px', overflow: 'hidden' }}>
          <img src={siteImages.renovationGrouting} alt="Premium renovation" style={{ width: '100%', height: '100%', objectFit: 'cover' }} loading="lazy" />
        </div>
        <div style={{ padding: 'clamp(2.5rem, 5vw, 5rem)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.75rem)', color: 'white', marginBottom: '1.25rem' }}>Renovation & Grouting Mastery</h2>
          <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', marginBottom: '2rem', lineHeight: 1.8 }}>
            We transform ordinary bathrooms into luxury retreats. Experience pristine tile alignment, flawless waterproofing, and premium finishing.
          </p>
          <Link to="/services/renovation-grouting" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
            Explore Renovation
          </Link>
        </div>
      </section>

      <style>{`
        .premium-card:hover .svc-img { transform: scale(1.06); }
      `}</style>
    </div>
  );
}
