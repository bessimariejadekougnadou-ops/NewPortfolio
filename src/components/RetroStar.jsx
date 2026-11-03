import React from 'react';

/**
 * 4-Point Retro Sparkle Star component matching the reference image.
 */
export default function RetroStar({ 
  size = 28, 
  color = "#ffffff", 
  style = {}, 
  className = "",
  glow = true,
  onClick
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`retro-star ${className}`}
      onClick={onClick}
      style={{
        display: 'inline-block',
        filter: glow ? 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.65))' : 'none',
        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        cursor: onClick ? 'pointer' : 'default',
        ...style
      }}
    >
      {/* 4-point star curve */}
      <path
        d="M50 0 C50 35 65 50 100 50 C65 50 50 65 50 100 C50 65 35 50 0 50 C35 50 50 35 50 0 Z"
        fill={color}
      />
      {/* Tiny center core for brightness */}
      <circle cx="50" cy="50" r="10" fill="#ffffff" opacity="0.9" />
    </svg>
  );
}
