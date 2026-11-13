import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle, PhoneCall, MessageCircle } from 'lucide-react';
import { siteImages } from '../data/siteImages';
import { trackPhoneConversion } from '../utils/googleAds';

const serviceDetails = {
  'pipe-leak-repair': { name: 'Pipe Leak Repair', desc: 'Expert repair for all types of pipe leaks. We quickly identify the source and provide a permanent fix to prevent water damage.', features: ['Leak detection', 'PVC and copper pipe repair', 'Underground pipe repair', 'Emergency response'], image: siteImages.pipeRepair },
  'bathroom-plumbing': { name: 'Bathroom Plumbing', desc: 'Comprehensive bathroom plumbing services from fixing taps to installing shower systems and toilets.', features: ['Tap and faucet repair', 'Shower installation', 'Toilet repair', 'Wash basin plumbing'], image: siteImages.bathroomPlumbing },
  'drain-cleaning': { name: 'Drain Cleaning', desc: 'Professional drain unblocking and cleaning to ensure smooth flow and prevent odors.', features: ['High-pressure jetting', 'Kitchen sink unblocking', 'Floor drain cleaning', 'Sewer line clearing'], image: siteImages.drainCleaning },
  'kitchen-plumbing': { name: 'Kitchen Plumbing', desc: 'Specialized kitchen plumbing including sink repairs and water filtration installations.', features: ['Sink and tap repair', 'Dishwasher plumbing', 'Garbage disposal', 'Water filter installation'], image: siteImages.kitchenPlumbing },
  'geyser-installation': { name: 'Geyser Installation', desc: 'Safe installation, maintenance, and repair of all brands of water heaters and geysers.', features: ['New installation', 'Thermostat replacement', 'Heating element repair', 'Leak fixing'], image: siteImages.geyserInstallation },
  'water-tank-installation': { name: 'Water Tank Installation', desc: 'Complete water tank solutions including overhead and underground tank setup and pump connections.', features: ['Overhead tank', 'Underground tank', 'Pump repair', 'Level controllers'], image: siteImages.waterTank },
  'renovation-grouting': { name: 'Renovation & Grouting', desc: 'Transform your bathroom with complete renovation and expert tile regrouting services. We also offer professional waterproofing.', features: ['Complete renovation', 'Tile regrouting', 'Waterproofing', 'Modern fixture installation'], image: siteImages.renovationGrouting },
  'commercial-plumbing': { name: 'Commercial Plumbing', desc: 'Heavy-duty plumbing for offices, restaurants, and commercial buildings.', features: ['Restroom maintenance', 'Commercial pipe repair', 'Maintenance contracts', 'Emergency service'], image: siteImages.commercialPlumbing },
  'toilet-repair': { name: 'Toilet Repair', desc: 'Expert toilet installation, unblocking, and flush repair.', features: ['New installation', 'Flush valve repair', 'Leak fixing', 'Unblocking'], image: siteImages.toiletRepair },
  'water-pump-repair': { name: 'Water Pump Repair', desc: 'Residential and commercial water pump maintenance and repair.', features: ['Pump installation', 'Motor repair', 'Pressure tank', 'Emergency replacement'], image: siteImages.waterPump },
};

export default function ServiceDetailPage() {
  const { slug } = useParams();
  const service = serviceDetails[slug];

  if (!service) {
    return (
      <div className="container section-padding" style={{ textAlign: 'center' }}>
        <h2>Service Not Found</h2>
        <p style={{ marginTop: '1rem', marginBottom: '2rem' }}>We could not find the service you're looking for.</p>
        <Link to="/services" className="btn btn-primary">View All Services</Link>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div style={{ position: 'relative', height: 'clamp(250px, 40vw, 400px)', backgroundColor: 'var(--color-primary)' }}>
        <img src={service.image} alt={service.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, var(--color-primary) 0%, transparent 100%)' }} />
        <div className="container" style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50)', width: '100%', maxWidth: '1280px', padding: '0 2rem' }}>
          <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.7)', marginBottom: '1rem', fontWeight: 500, fontSize: '0.9rem' }}>
            <ArrowLeft size={14} /> All Services
          </Link>
          <h1 style={{ color: 'white', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>{service.name}</h1>
        </div>
      </div>

      <div className="container section-padding">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 340px), 1fr))', gap: '3rem', alignItems: 'flex-start' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', marginBottom: '1.25rem' }}>Service Overview</h2>
            <p style={{ fontSize: '1.1rem', color: 'var(--color-text-muted)', marginBottom: '3rem', lineHeight: 1.8 }}>{service.desc}</p>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>What's Included</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 220px), 1fr))', gap: '1rem' }}>
              {service.features.map((f, i) => (
                <div key={i} className="premium-card" style={{ padding: '1.25rem', flexDirection: 'row', alignItems: 'center', gap: '0.75rem' }}>
                  <CheckCircle size={20} color="var(--color-secondary)" style={{ flexShrink: 0 }} />
                  <span style={{ fontWeight: 500 }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: 'sticky', top: '5rem' }}>
            <div className="glass-panel" style={{ padding: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Book this Service</h3>
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '2rem', fontSize: '0.95rem' }}>
                Contact us for a quick inspection and transparent quotation.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <a
                  href="tel:+917995486994"
                  onClick={trackPhoneConversion}
                  className="btn btn-primary"
                  style={{ justifyContent: 'center' }}
                >
                  <PhoneCall size={18} /> Call Now
                </a>
                <a href="https://wa.me/917995486994" target="_blank" rel="noreferrer" className="btn" style={{ justifyContent: 'center', background: '#25D366', color: 'white', border: 'none' }}><MessageCircle size={18} /> WhatsApp</a>
                <Link to="/contact" className="btn btn-outline" style={{ justifyContent: 'center' }}>Send Enquiry</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
