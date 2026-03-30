import React from 'react';

export function Header({ children, className = '' }) {
  return (
    <div className={`${className}`}>
      {children}
    </div>
  );
}