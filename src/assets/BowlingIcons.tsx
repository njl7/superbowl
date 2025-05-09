import React from 'react';

export const BowlingPinIcon: React.FC<{ width?: number, height?: number, className?: string }> = ({ 
  width = 40, 
  height = 40,
  className
}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M50,10 C40,10 35,15 35,25 C35,35 37,50 35,65 C33,80 25,90 50,90 C75,90 67,80 65,65 C63,50 65,35 65,25 C65,15 60,10 50,10 Z" 
        fill="#FEFEFE" 
        stroke="#FF0000" 
        strokeWidth="2" />
      <path d="M45,12 C48,20 52,20 55,12" fill="none" stroke="#FF0000" strokeWidth="2" />
      <path d="M42,65 C46,70 54,70 58,65" fill="none" stroke="#FF0000" strokeWidth="2" />
    </svg>
  );
};

export const BowlingBallIcon: React.FC<{ width?: number, height?: number, className?: string }> = ({ 
  width = 40, 
  height = 40,
  className
}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="40" fill="#8B4513" stroke="#5D2906" strokeWidth="2" />
      <circle cx="35" cy="35" r="5" fill="#333" />
      <circle cx="50" cy="30" r="5" fill="#333" />
      <circle cx="40" cy="45" r="5" fill="#333" />
    </svg>
  );
};

export const StrikeBadge: React.FC<{ width?: number, height?: number }> = ({ 
  width = 60, 
  height = 60 
}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <polygon 
        points="50,10 61,35 90,35 65,50 75,75 50,60 25,75 35,50 10,35 39,35" 
        fill="#FFD700" 
        stroke="#FF0000" 
        strokeWidth="2" 
      />
      <text x="50" y="55" fontSize="30" fontWeight="bold" fill="#FF0000" textAnchor="middle">X</text>
    </svg>
  );
};

export const SpareBadge: React.FC<{ width?: number, height?: number }> = ({ 
  width = 60, 
  height = 60 
}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="40" fill="#FFD700" stroke="#FF0000" strokeWidth="2" />
      <text x="50" y="60" fontSize="30" fontWeight="bold" fill="#FF0000" textAnchor="middle">/</text>
    </svg>
  );
};