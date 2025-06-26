'use client';

import { GridIcon, TableIcon, Sun, Moon, Menu, X } from 'lucide-react';
import { useViewStore } from '@/app/stores/viewMode';
import { useState } from 'react';
import { useStickyHeader } from '@/app/lib/hooks/useStickyHeader';
import { useThemeToggle } from '@/app/lib/hooks/useThemeToggle';
import { HeaderControls } from './HeaderControls';

export const Header = () => {
  const view = useViewStore((state) => state.view);
  const setView = useViewStore((state) => state.setView);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isSticky, sentinelRef } = useStickyHeader();
  const { isDark, toggleTheme } = useThemeToggle();

  const activeButton = (mode: 'grid' | 'table') => {
    const isActive = view === mode;
    return `
      px-5 py-1.5 rounded-md flex items-center gap-2 transition duration-300 cursor-pointer
      ${isActive ? 'bg-[#061292] text-white' : 'bg-gray-100 text-gray-800 dark:bg-gray-500 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'}
    `;
  };

  return (
    <>
      <div ref={sentinelRef} />

      <header
        className={`sticky top-0 z-50 border-b border-gray-300 shadow-lg transition-all duration-300 px-5 ${
          isSticky ? 'py-3' : 'py-4'
        }`}
        style={{ backgroundColor: 'var(--background)' }}
      >
        <div className="flex justify-between items-center max-w-screen-2xl mx-auto">
          <h2 className={`font-bold transition-all duration-300 ${isSticky ? 'text-xl' : 'text-3xl'}`}>
            PokeSight
          </h2>

          <div className="hidden md:flex items-center gap-3">
            <HeaderControls isDark={isDark} toggleTheme={toggleTheme} />
          </div>

          <div className="md:hidden">
            <button aria-label="Display or close menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-4 border-t border-gray-300 pt-4">
            <HeaderControls
              isDark={isDark}
              toggleTheme={toggleTheme}
              mobile
              closeMobileMenu={() => setIsMobileMenuOpen(false)}
            />
          </div>
        )}
      </header>
    </>
  );
};
