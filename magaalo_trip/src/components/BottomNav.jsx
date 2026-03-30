import React from 'react';

export function BottomNav({ children, className = '' }) {
  return (
    <div className={`${className}`}>
      {children}
    </div>
  );
}