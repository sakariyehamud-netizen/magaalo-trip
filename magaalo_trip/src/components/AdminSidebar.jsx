import React from 'react';

export function AdminSidebar({ children, className = '' }) {
  return (
    <div className={`${className}`}>
      {children}
    </div>
  );
}