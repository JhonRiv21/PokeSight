'use client';

import { useEffect, useRef, useState } from 'react';
import { GridIcon, TableIcon } from 'lucide-react';
import { useViewStore } from '@/app/stores/viewMode';

export const Header = () => {
  const view = useViewStore((state) => state.view);
  const setView = useViewStore((state) => state.setView);
  const [isSticky, setIsSticky] = useState(false);  
  const sentinelRef = useRef<HTMLDivElement>(null);

  const activeButton = (mode: 'grid' | 'table') =>
    view === mode ? 'bg-gray-800 text-white' : 'hover:bg-gray-100';

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
              onClick={() => setView('grid')}
              className={`btn-order ${activeButton('grid')} ${isSticky ? '!py-2 !px-2.5 !text-sm' : ''}`}
            >
              <GridIcon size={16} /> Cuadrícula
            </button>
            <button
              onClick={() => setView('table')}
              className={`btn-order ${activeButton('table')} ${isSticky ? '!py-2 !px-2.5 !text-sm' : ''}`}
            >
              <TableIcon size={16} /> Tabla
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
