import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, MessageSquare, Briefcase, Settings, LogOut, Menu, ShieldCheck } from 'lucide-react';
import { supabase } from '../lib/supabase';
import '../styles/admin.css';

export default function AdminLayout() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (!session) navigate('/admin/login');
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) navigate('/admin/login');
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  if (loading) return <div className="admin-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading Admin...</div>;
  if (!session) return null;

  const navItems = [
    { to: '/admin', icon: LayoutDashboard, label: 'Dashboard', end: true },
    { to: '/admin/enquiries', icon: MessageSquare, label: 'Enquiries' },
    { to: '/admin/projects', icon: Briefcase, label: 'Projects' },
    { to: '/admin/services', icon: Briefcase, label: 'Services' },
    { to: '/admin/service-areas', icon: Briefcase, label: 'Service Areas' },
    { to: '/admin/reviews', icon: MessageSquare, label: 'Reviews' },
    { to: '/admin/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="admin-body admin-layout">
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 40 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '1rem' }}>
          <div style={{ background: 'var(--admin-accent)', padding: '0.4rem', borderRadius: '0.35rem', display: 'flex' }}>
            <ShieldCheck size={20} color="white" />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '1.1rem', lineHeight: 1.1 }}>Sushanth</div>
            <div style={{ fontSize: '0.65rem', color: 'var(--admin-accent)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Admin Panel</div>
          </div>
        </div>

        <nav style={{ flex: 1 }}>
          {navItems.map(item => (
            <NavLink 
              key={item.to} 
              to={item.to}
              end={item.end}
              className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <button onClick={handleLogout} className="admin-nav-item" style={{ margin: 0, width: '100%', border: 'none', background: 'transparent', cursor: 'pointer' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="admin-main">
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button className="admin-btn admin-btn-outline" style={{ padding: '0.5rem' }} onClick={() => setSidebarOpen(true)}>
              <Menu size={20} />
            </button>
            <h1 className="admin-title" style={{ fontSize: '1.25rem' }}>Dashboard</h1>
          </div>
          <div style={{ fontSize: '0.875rem', color: 'var(--admin-text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--admin-success)' }} />
            Connected
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
