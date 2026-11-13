import React from 'react';
import { siteImages } from '../data/siteImages';

export default function Logo({ className = '', style = {}, variant = 'light' }) {
  const isDark = variant === 'dark';
  
  return (
    <div className={`premium-logo ${className}`} style={{ 
      display: 'inline-flex', 
      alignItems: 'center', 
      backgroundColor: isDark ? '#ffffff' : 'transparent',
      padding: isDark ? '0.45rem 0.85rem' : '0',
      borderRadius: isDark ? '0.6rem' : '0',
      boxShadow: isDark ? '0 2px 10px rgba(0,0,0,0.12)' : 'none',
      transition: 'transform 0.2s ease',
      ...style 
    }}>
      <img 
        src={siteImages.logo} 
        alt="Sushanth Plumbing Services - Reliable Service & Lasting Solutions" 
        style={{ 
          height: isDark ? '42px' : '52px',
          width: 'auto',
          maxHeight: '100%',
          objectFit: 'contain',
          display: 'block'
        }} 
      />
    </div>
  );
}
