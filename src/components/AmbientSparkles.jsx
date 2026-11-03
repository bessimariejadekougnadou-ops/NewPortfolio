import React, { useEffect, useState } from 'react';
import RetroStar from './RetroStar';

export default function AmbientSparkles({ enabled = true }) {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    // Only generate subtle background stars for sections below the hero to keep hero clean
    const initialStars = [
      { id: 7, top: '56%', left: '15%', size: 12, delay: '0.4s', duration: '3.7s', floatType: 'floatSlow' },
      { id: 8, top: '64%', right: '22%', size: 13, delay: '1.6s', duration: '4.4s', floatType: 'floatReverse' },
      { id: 9, top: '72%', left: '6%', size: 11, delay: '2.8s', duration: '3.9s', floatType: 'floatSlow' },
      { id: 10, top: '80%', right: '12%', size: 12, delay: '0.9s', duration: '4.3s', floatType: 'floatReverse' },
      { id: 11, top: '88%', left: '18%', size: 10, delay: '1.7s', duration: '3.5s', floatType: 'floatSlow' },
      { id: 12, top: '93%', right: '28%', size: 11, delay: '2.3s', duration: '4.0s', floatType: 'floatReverse' },
      { id: 15, top: '76%', left: '46%', size: 11, delay: '0.7s', duration: '3.8s', floatType: 'floatSlow' },
    ];
    setStars(initialStars);
  }, []);

  if (!enabled) return null;

  return (
    <div 
      className="ambient-sparkles-container"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 3,
        overflow: 'hidden'
      }}
    >
      {stars.map((star) => (
        <div
          key={star.id}
          style={{
            position: 'absolute',
            top: star.top,
            left: star.left,
            right: star.right,
            animation: `twinkle ${star.duration} ease-in-out infinite alternate, ${star.floatType} 7s ease-in-out infinite alternate`,
            animationDelay: `${star.delay}, ${star.delay}`,
            opacity: 0.5
          }}
        >
          <RetroStar size={star.size} glow={true} />
        </div>
      ))}
    </div>
  );
}
