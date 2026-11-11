import React from 'react';
import { siteImages } from '../data/siteImages';

export default function Logo({ className = '', style = {}, variant = 'light' }) {
  const isDark = variant === 'dark';
  
  return (
    <div className={`premium-logo ${className}`} style={{ 
      display: 'flex', 
      alignItems: 'center', 
      backgroundColor: isDark ? 'white' : 'transparent',
      padding: isDark ? '0.5rem 1rem' : '0',
      borderRadius: isDark ? '0.5rem' : '0',
      ...style 
    }}>
      <img 
        src={siteImages.logo} 
        alt="Sushanth Plumbing Services Logo" 
        style={{ 
          height: isDark ? '40px' : '48px',
          width: 'auto',
          objectFit: 'contain'
        }} 
      />
    </div>
  );
}
