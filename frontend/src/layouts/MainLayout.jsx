import { Outlet, Link, useLocation } from 'react-router-dom';
import { Phone, MessageCircle, MapPin, Mail, Clock, ShieldCheck, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Logo from '../components/Logo';
import '../styles/index.css';

export default function MainLayout() {
  const { pathname } = useLocation();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  // Scroll to top on route change & close mobile nav
  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileNavOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile nav is open
  useEffect(() => {
    document.body.style.overflow = mobileNavOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileNavOpen]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/services', label: 'Services' },
    { to: '/areas-we-serve', label: 'Areas' },
    { to: '/about', label: 'About' },
    { to: '/projects', label: 'Projects' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

      {/* ═══ Top Bar ═══ */}
      <div className="hide-mobile" style={{ backgroundColor: 'var(--color-primary-dark)', color: 'white', padding: '0.5rem 0', fontSize: '0.8rem' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', opacity: 0.8 }}>
              <MapPin size={12} /> Hyderabad, Telangana
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', opacity: 0.8 }}>
              <Clock size={12} /> Available (Subject to Confirmation)
            </span>
          </div>
          <a href="mailto:banothashok79954@gmail.com" style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '0.4rem', opacity: 0.8 }}>
            <Mail size={12} /> banothashok79954@gmail.com
          </a>
        </div>
      </div>

      {/* ═══ Main Header ═══ */}
      <header style={{
        backgroundColor: 'var(--color-white)',
        padding: '0.75rem 0',
        position: 'sticky', top: 0, zIndex: 100,
        boxShadow: 'var(--shadow-lg)',
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <nav className="desktop-nav">
            {navLinks.map(link => (
              <Link key={link.to} to={link.to} className="header-nav-link">{link.label}</Link>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="desktop-header-actions">
            <a href="tel:+917995486994" className="btn btn-primary" style={{ padding: '0.6rem 1.25rem', fontSize: '0.9rem' }}>
              <Phone size={16} /> Call Us
            </a>
          </div>

          {/* Hamburger */}
          <button
            className={`hamburger ${mobileNavOpen ? 'open' : ''}`}
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            aria-label="Toggle navigation menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      {/* ═══ Mobile Nav Overlay ═══ */}
      <div className={`mobile-nav-overlay ${mobileNavOpen ? 'open' : ''}`}>
        {navLinks.map(link => (
          <Link key={link.to} to={link.to} onClick={() => setMobileNavOpen(false)}>
            {link.label}
          </Link>
        ))}
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <a href="tel:+917995486994" className="btn btn-primary" style={{ padding: '1rem 2rem' }}>
            <Phone size={18} /> Call Now
          </a>
          <a href="https://wa.me/917995486994" target="_blank" rel="noreferrer" className="btn" style={{
            background: '#25D366', color: 'white', padding: '1rem 2rem', border: 'none',
          }}>
            <MessageCircle size={18} /> WhatsApp
          </a>
        </div>
      </div>

      {/* ═══ Page Content ═══ */}
      <main style={{ flex: 1, backgroundColor: 'var(--color-white)' }}>
        <Outlet />
      </main>

      {/* ═══ Footer ═══ */}
      <footer style={{ backgroundColor: 'var(--color-primary-dark)', paddingTop: '5rem', color: 'rgba(255,255,255,0.7)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '3rem', paddingBottom: '3rem' }}>
          
          <div>
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: '1.5rem' }}>
              <Logo variant="dark" />
            </Link>
            <p style={{ color: 'rgba(255,255,255,0.5)', marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: 1.7 }}>
              Hyderabad's trusted specialists in renovation, grouting, and premium plumbing services. Quality workmanship and transparent pricing.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <a href="tel:+917995486994" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500, color: 'rgba(255,255,255,0.7)' }}>
                <Phone size={16} color="var(--color-secondary)" /> +91 79954 86994
              </a>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>
                <MapPin size={16} color="var(--color-secondary)" /> Hyderabad, Telangana
              </span>
            </div>
          </div>

          <div>
            <h3 style={{ marginBottom: '1.5rem', color: 'white', fontSize: '1.1rem' }}>Quick Links</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {navLinks.map(link => (
                <Link key={link.to} to={link.to} style={{ color: 'rgba(255,255,255,0.5)', transition: 'color var(--transition-fast)' }}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 style={{ marginBottom: '1.5rem', color: 'white', fontSize: '1.1rem' }}>Top Services</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link to="/services/renovation-grouting" style={{ color: 'var(--color-secondary)', fontWeight: 500 }}>Renovation & Grouting</Link>
              <Link to="/services/pipe-leak-repair" style={{ color: 'rgba(255,255,255,0.5)' }}>Pipe Leak Repair</Link>
              <Link to="/services/bathroom-plumbing" style={{ color: 'rgba(255,255,255,0.5)' }}>Bathroom Plumbing</Link>
              <Link to="/services/drain-cleaning" style={{ color: 'rgba(255,255,255,0.5)' }}>Drain Cleaning</Link>
              <Link to="/services/geyser-installation" style={{ color: 'rgba(255,255,255,0.5)' }}>Geyser Installation</Link>
            </div>
          </div>

        </div>
        
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', padding: '1.5rem 0', textAlign: 'center', fontSize: '0.85rem', color: 'rgba(255,255,255,0.35)' }}>
          <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
            <p>&copy; {new Date().getFullYear()} Sushanth Plumbing Services & Renovation & Grouting. All rights reserved.</p>
            <p style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'rgba(255,255,255,0.25)' }}>
              Developed by <a href="mailto:banothmohan9059@gmail.com" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>banothmohan9059@gmail.com</a>
            </p>
          </div>
        </div>
      </footer>

      {/* ═══ WhatsApp FAB ═══ */}
      <a
        href="https://wa.me/917995486994"
        target="_blank"
        rel="noreferrer"
        className="fab"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={26} />
      </a>
    </div>
  );
}
