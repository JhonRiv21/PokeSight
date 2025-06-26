'use client';

import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useStickyHeader } from '@/app/lib/hooks/useStickyHeader';
import { useThemeToggle } from '@/app/lib/hooks/useThemeToggle';
import { HeaderControls } from './HeaderControls';

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isSticky, sentinelRef } = useStickyHeader();
  const { isDark, toggleTheme } = useThemeToggle();
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
          <h2 className={`font-bold transition-all duration-300 ${isSticky ? 'text-xl' : 'text-3xl'}`}
              style={{ color: 'var(--foreground)' }}
          >
            PokeSight
          </h2>

          <div className="hidden md:flex items-center gap-3">
            <HeaderControls isDark={isDark} toggleTheme={toggleTheme} />
          </div>

          <div className="md:hidden">
            <button aria-label="Display or close menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    style={{ color: 'var(--foreground)' }}
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-4 border-t border-gray-300 pt-4"
               style={{ backgroundColor: 'var(--background)' }} // Asegura que el fondo del menú móvil cambie con el tema
          >
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
