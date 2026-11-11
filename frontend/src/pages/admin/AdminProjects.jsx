import { useEffect, useState, useRef } from 'react';
import { supabase } from '../../lib/supabase';
import { Image as ImageIcon, Trash2, Plus, Edit2, X, Upload } from 'lucide-react';

export default function AdminProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  
  // Form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('renovation');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) console.error("Error fetching projects:", error);
    else setProjects(data || []);
    setLoading(false);
  }

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const openModal = (project = null) => {
    setEditingProject(project);
    if (project) {
      setTitle(project.title);
      setCategory(project.category);
      setDescription(project.description);
      setImagePreview(project.image_url);
      setImageFile(null);
    } else {
      setTitle('');
      setCategory('renovation');
      setDescription('');
      setImagePreview('');
      setImageFile(null);
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProject(null);
  };

  const uploadImage = async () => {
    if (!imageFile) return editingProject ? editingProject.image_url : null;
    
    const fileExt = imageFile.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `projects/${fileName}`;

    const { error: uploadError, data } = await supabase.storage
      .from('public-images')
      .upload(filePath, imageFile);

    if (uploadError) {
      console.error('Error uploading image:', uploadError);
      throw uploadError;
    }

    const { data: publicUrlData } = supabase.storage
      .from('public-images')
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let finalImageUrl = imagePreview;
      if (imageFile) {
        finalImageUrl = await uploadImage();
      }

      if (!finalImageUrl) {
        alert("Please provide an image.");
        setUploading(false);
        return;
      }

      const projectData = {
        title,
        category,
        description,
        image_url: finalImageUrl,
      };

      if (editingProject) {
        const { error } = await supabase.from('projects').update(projectData).eq('id', editingProject.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('projects').insert([projectData]);
        if (error) throw error;
      }

      closeModal();
      fetchProjects();
    } catch (error) {
      alert("Error saving project: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const deleteProject = async (id) => {
    if (window.confirm("Are you sure you want to delete this project? This cannot be undone.")) {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) {
        alert("Error deleting project.");
      } else {
        setProjects(projects.filter(p => p.id !== id));
      }
    }
  };

  if (loading) return <div>Loading projects...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 className="admin-title">Gallery Projects</h2>
          <p className="admin-subtitle">Manage your portfolio images and descriptions.</p>
        </div>
        <button onClick={() => openModal()} className="admin-btn admin-btn-primary">
          <Plus size={18} /> Add New Project
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {projects.map((project) => (
          <div key={project.id} className="admin-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ height: '200px', width: '100%', overflow: 'hidden', backgroundColor: '#e2e8f0', position: 'relative' }}>
              <img 
                src={project.image_url} 
                alt={project.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={() => openModal(project)}
                  style={{ background: 'white', border: 'none', borderRadius: '4px', padding: '0.4rem', cursor: 'pointer', boxShadow: 'var(--admin-shadow-sm)' }}
                >
                  <Edit2 size={14} color="var(--admin-text-primary)" />
                </button>
                <button 
                  onClick={() => deleteProject(project.id)}
                  style={{ background: 'white', border: 'none', borderRadius: '4px', padding: '0.4rem', cursor: 'pointer', boxShadow: 'var(--admin-shadow-sm)' }}
                >
                  <Trash2 size={14} color="var(--admin-danger)" />
                </button>
              </div>
            </div>
            <div className="admin-card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              <span className="admin-badge admin-badge-new" style={{ alignSelf: 'flex-start', marginBottom: '0.75rem' }}>
                {project.category}
              </span>
              <h3 style={{ fontSize: '1.1rem', margin: '0 0 0.5rem 0' }}>{project.title}</h3>
              <p style={{ color: 'var(--admin-text-secondary)', fontSize: '0.875rem', margin: 0 }}>
                {project.description.length > 80 ? project.description.substring(0, 80) + '...' : project.description}
              </p>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', backgroundColor: 'var(--admin-card-bg)', borderRadius: 'var(--admin-radius-md)', border: '1px dashed var(--admin-border)' }}>
            <ImageIcon size={48} color="var(--admin-border)" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ margin: '0 0 0.5rem 0' }}>No projects found</h3>
            <p style={{ color: 'var(--admin-text-secondary)', margin: '0 0 1.5rem 0' }}>Upload your first gallery project.</p>
            <button onClick={() => openModal()} className="admin-btn admin-btn-outline">
              Add Project
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(15,23,42,0.6)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <div className="admin-card" style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div className="admin-card-header">
              <h3 style={{ margin: 0, fontSize: '1.25rem' }}>{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
              <button onClick={closeModal} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--admin-text-secondary)' }}>
                <X size={20} />
              </button>
            </div>
            <div className="admin-card-body">
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                
                {/* Image Upload */}
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Project Image</label>
                  <div 
                    style={{ 
                      border: '2px dashed var(--admin-border)', 
                      borderRadius: 'var(--admin-radius-md)', 
                      padding: imagePreview ? '0' : '2rem', 
                      textAlign: 'center',
                      cursor: 'pointer',
                      overflow: 'hidden',
                      position: 'relative',
                      height: '200px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'var(--admin-bg)'
                    }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {imagePreview ? (
                      <>
                        <img src={imagePreview} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0, transition: 'opacity 0.2s' }} onMouseOver={e => e.currentTarget.style.opacity = 1} onMouseOut={e => e.currentTarget.style.opacity = 0}>
                          <span style={{ color: 'white', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Upload size={18} /> Change Image
                          </span>
                        </div>
                      </>
                    ) : (
                      <div style={{ color: 'var(--admin-text-secondary)' }}>
                        <Upload size={24} style={{ margin: '0 auto 0.5rem' }} />
                        <div>Click to upload an image</div>
                        <div style={{ fontSize: '0.75rem', marginTop: '0.25rem' }}>JPG, PNG up to 5MB</div>
                      </div>
                    )}
                  </div>
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageChange} 
                    accept="image/*" 
                    style={{ display: 'none' }} 
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Title</label>
                  <input type="text" className="admin-input" value={title} onChange={e => setTitle(e.target.value)} required placeholder="e.g. Luxury Bathroom Renovation" />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Category</label>
                  <select className="admin-input" value={category} onChange={e => setCategory(e.target.value)} required>
                    <option value="renovation">Renovation</option>
                    <option value="plumbing">Plumbing</option>
                    <option value="commercial">Commercial</option>
                    <option value="grouting">Grouting</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem' }}>Description</label>
                  <textarea className="admin-input" value={description} onChange={e => setDescription(e.target.value)} required rows={4} placeholder="Describe the project..." />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                  <button type="button" onClick={closeModal} className="admin-btn admin-btn-outline" disabled={uploading}>Cancel</button>
                  <button type="submit" className="admin-btn admin-btn-primary" disabled={uploading}>
                    {uploading ? 'Saving...' : (editingProject ? 'Save Changes' : 'Create Project')}
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
