import { MessageSquare, Briefcase, Eye, Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ enquiries: 0, newEnquiries: 0, projects: 0 });

  useEffect(() => {
    async function loadStats() {
      // Load exact counts from Supabase
      const { count: totalEnquiries } = await supabase.from('enquiries').select('*', { count: 'exact', head: true });
      const { count: newEnquiries } = await supabase.from('enquiries').select('*', { count: 'exact', head: true }).eq('status', 'new');
      const { count: projects } = await supabase.from('projects').select('*', { count: 'exact', head: true });

      setStats({
        enquiries: totalEnquiries || 0,
        newEnquiries: newEnquiries || 0,
        projects: projects || 0
      });
    }
    loadStats();
  }, []);

  const cards = [
    { title: 'New Enquiries', value: stats.newEnquiries, icon: MessageSquare, color: 'var(--admin-warning)' },
    { title: 'Total Enquiries', value: stats.enquiries, icon: Calendar, color: 'var(--admin-success)' },
    { title: 'Gallery Projects', value: stats.projects, icon: Briefcase, color: 'var(--admin-accent)' },
    { title: 'Active Services', value: 10, icon: Eye, color: '#3B82F6' },
  ];

  return (
    <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
      {cards.map((card, i) => (
        <div key={i} className="admin-card">
          <div className="admin-card-body" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ padding: '1rem', backgroundColor: `${card.color}15`, color: card.color, borderRadius: 'var(--admin-radius-md)' }}>
              <card.icon size={28} />
            </div>
            <div>
              <div className="admin-subtitle">{card.title}</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--admin-text-primary)' }}>{card.value}</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
