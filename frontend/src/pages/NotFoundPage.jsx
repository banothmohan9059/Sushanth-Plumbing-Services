import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="container" style={{ padding: '8rem 1rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>404</h1>
      <h2 style={{ marginBottom: '2rem' }}>Page Not Found</h2>
      <p style={{ marginBottom: '3rem' }}>The page you are looking for does not exist or has been moved.</p>
      <Link to="/" className="btn btn-primary">Return to Home</Link>
    </div>
  );
}
