'use client';

import { useEffect, useRef, useState } from 'react';
import { GridIcon, TableIcon, Sun, Moon } from 'lucide-react';
import { useViewStore } from '@/app/stores/viewMode';

export const Header = () => {
  const view = useViewStore((state) => state.view);
  const setView = useViewStore((state) => state.setView);
  const [isSticky, setIsSticky] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const activeButton = (mode: 'grid' | 'table') => {
    const isActive = view === mode;
    return `
      px-5 py-1.5 rounded-md flex items-center gap-2 transition duration-300 cursor-pointer
      ${isActive ? 'bg-[#061292] text-white' : 'bg-gray-100 text-gray-800 dark:bg-gray-500 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'}
    `;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0 }
    );
    if (sentinelRef.current) observer.observe(sentinelRef.current);

    const stored = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const shouldUseDark = stored === 'dark' || (!stored && prefersDark);
    document.documentElement.setAttribute('data-theme', shouldUseDark ? 'dark' : 'light');
    setIsDark(shouldUseDark);

    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    const theme = next ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  };

  return (
    <>
      <div ref={sentinelRef} />

      <header
        className={`sticky top-0 z-50 border-b shadow-sm transition-all duration-300 px-5 ${
          isSticky ? 'py-3' : 'py-4'
        }`}
        style={{ backgroundColor: 'var(--background)' }}
      >
        <div className="flex justify-between items-center max-w-screen-2xl mx-auto">
          <h2 className={`font-bold transition-all duration-300 ${isSticky ? 'text-xl' : 'text-3xl'}`}>
            PokeSight
          </h2>

          <div className="flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer mx-5">
              <input type="checkbox" checked={isDark} onChange={toggleTheme} className="sr-only" />
              <Sun className="text-background" />
              <span
                className={`mx-3 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 ${
                  isDark ? 'bg-gray-400' : 'bg-[#CCCCCE]'
                }`}
              >
                <span
                  className={`dot h-6 w-6 rounded-full bg-white duration-200 ${
                    isDark ? 'translate-x-[28px]' : ''
                  }`}
                />
              </span>
              <Moon className="text-background" />
            </label>

            <button onClick={() => setView('grid')} className={activeButton('grid')}>
              <GridIcon size={16} />
              Grid
            </button>
            <button onClick={() => setView('table')} className={activeButton('table')}>
              <TableIcon size={16} />
              Table
            </button>
          </div>
        </div>
      </header>
    </>
  );
};
