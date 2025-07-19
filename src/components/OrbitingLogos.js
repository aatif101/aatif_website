import React from 'react';

const OrbitingLogos = () => {
  const logos = [
    { name: 'AWS', color: 'text-orange-400', delay: '0s' },
    { name: 'Docker', color: 'text-blue-400', delay: '3s' },
    { name: 'GitHub', color: 'text-gray-300', delay: '6s' },
    { name: 'Claude', color: 'text-purple-400', delay: '9s' },
    { name: 'Cursor', color: 'text-green-400', delay: '12s' },
    { name: 'JS', color: 'text-yellow-400', delay: '15s' },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {logos.map((logo, index) => (
        <div
          key={logo.name}
          className="absolute animate-orbit"
          style={{
            animationDelay: logo.delay,
            transform: `rotate(${index * 60}deg) translateX(150px) rotate(-${index * 60}deg)`
          }}
        >
          <div className={`w-12 h-12 rounded-full ${logo.color} flex items-center justify-center font-mono font-bold text-sm border border-current opacity-80 hover:opacity-100 transition-opacity`}>
            {logo.name}
          </div>
        </div>
      ))}
      
      {/* Additional reverse orbit for visual interest */}
      {logos.slice(0, 3).map((logo, index) => (
        <div
          key={`reverse-${logo.name}`}
          className="absolute animate-orbit-reverse"
          style={{
            animationDelay: `${index * 8}s`,
            transform: `rotate(${index * 120}deg) translateX(120px) rotate(-${index * 120}deg)`
          }}
        >
          <div className={`w-8 h-8 rounded-full ${logo.color} flex items-center justify-center font-mono font-bold text-xs border border-current opacity-40`}>
            •
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrbitingLogos; 