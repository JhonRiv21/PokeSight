'use client';

import { useEffect, useRef, useState } from 'react';
import { GridIcon, TableIcon } from 'lucide-react';

export const Header = () => {
  const [view, setView] = useState('grid');
  const [isSticky, setIsSticky] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    if (sentinelRef.current) observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={sentinelRef} />

      <header
        className={`sticky top-0 z-50 bg-black/80 backdrop-blur shadow-sm transition-all duration-300 ${
          isSticky ? 'py-3 top-2 mx-auto max-w-screen-xl rounded-4xl' : 'py-4'
        } px-5`}
      >
        <div className='flex justify-between items-center max-w-screen-2xl mx-auto'>
          <h2
            className={`font-bold transition-all duration-300 ${
              isSticky ? 'text-xl' : 'text-3xl'
            }`}
          >
            PokeSight
          </h2>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setView('table')}
              className={`btn-order ${isSticky ? 'py-2! text-sm! transition-all duration-300' : ''}`}
            >
              <TableIcon size={16} /> Tabla
            </button>
            <button
              onClick={() => setView('grid')}
              className={`btn-order ${isSticky ? 'py-2! text-sm! transition-all duration-300' : ''}`}
            >
              <GridIcon size={16} /> Cuadrícula
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
