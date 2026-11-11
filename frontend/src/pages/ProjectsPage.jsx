import { useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { defaultProjects } from '../data/defaultProjects';
import { MapPin, Tag } from 'lucide-react';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchProjects() {
      if (!isSupabaseConfigured) {
        if (isMounted) {
          setProjects(defaultProjects);
          setLoading(false);
        }
        return;
      }

      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        if (isMounted) {
          setProjects(data && data.length > 0 ? data : defaultProjects);
        }
      } catch (err) {
        console.warn('Unable to reach Supabase projects table, falling back to local portfolio:', err);
        if (isMounted) {
          setProjects(defaultProjects);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchProjects();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="animate-fade-in">
      <div style={{ background: 'linear-gradient(135deg, var(--color-primary) 0%, #1a3654 100%)', color: 'white', padding: 'clamp(3.5rem, 6vw, 6rem) 0', textAlign: 'center', position: 'relative' }}>
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <h1 style={{ color: 'white', fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', marginBottom: '1.5rem' }}>Our Work</h1>
          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)', color: 'rgba(255,255,255,0.9)', maxWidth: '800px', margin: '0 auto' }}>
            Browse our gallery of completed plumbing, renovation, and grouting projects across Hyderabad.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: 'clamp(3rem, 6vw, 6rem) 2rem' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', fontSize: '1.25rem', color: 'var(--color-text-muted)' }}>
            Loading projects...
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 350px), 1fr))', gap: '3rem' }}>
            {projects.map((project, index) => (
              <div key={project.id} className="premium-card animate-fade-in-up" style={{ padding: 0, animationDelay: `${(index % 3) * 0.1}s` }}>
                <div style={{ width: '100%', height: '260px', overflow: 'hidden' }}>
                  <img
                    src={project.image_url}
                    alt={project.alt_text || project.title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform var(--transition-bounce)' }}
                    className="service-img"
                  />
                </div>
                <div style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1rem', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--color-secondary)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Tag size={12} /> {project.category || project.service_slug || 'Project'}
                    </span>
                    {project.locality && (
                      <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                        <MapPin size={12} /> {project.locality}
                      </span>
                    )}
                  </div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', lineHeight: '1.3' }}>{project.title}</h3>
                  <p style={{ color: 'var(--color-text-muted)', lineHeight: '1.6' }}>
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .premium-card:hover .service-img {
          transform: scale(1.05);
        }
      `}</style>
    </div>
  );
}
