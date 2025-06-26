'use client';

import { GridIcon, TableIcon, Sun, Moon } from 'lucide-react';
import { useViewStore } from '@/app/stores/viewMode';

type Props = {
  isDark: boolean;
  toggleTheme: () => void;
  mobile?: boolean;
  closeMobileMenu?: () => void;
};

export const HeaderControls = ({ isDark, toggleTheme, mobile = false, closeMobileMenu }: Props) => {
  const view = useViewStore((state) => state.view);
  const setView = useViewStore((state) => state.setView);

  const activeButton = (mode: 'grid' | 'table') => {
    const isActive = view === mode;
    return `
      px-5 py-1.5 rounded-md flex items-center gap-2 transition duration-300 cursor-pointer
      ${isActive ? 'bg-[#061292] text-white' : 'bg-gray-200 text-gray-800 dark:bg-neutral-500 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'}
    `;
  };

  const handleChangeView = (mode: 'grid' | 'table') => {
    setView(mode);
    if (mobile && closeMobileMenu) closeMobileMenu();
  };

  return (
    <div className={mobile ? 'flex flex-col items-center gap-2 pb-4' : 'flex items-center gap-3'}>
      {mobile && (
        <div className="flex justify-center mb-3">
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={isDark} onChange={toggleTheme} className="sr-only" />
            <Sun className="text-background" />
            <span className={`mx-3 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 ${isDark ? 'bg-neutral-500' : 'bg-[#CCCCCE]'}`}>
              <span className={`h-6 w-6 rounded-full bg-white duration-200 ${isDark ? 'translate-x-[28px]' : ''}`} />
            </span>
            <Moon className="text-background" />
          </label>
        </div>
      )}

      {!mobile && (
        <label className="relative inline-flex items-center cursor-pointer mx-5">
          <input type="checkbox" checked={isDark} onChange={toggleTheme} className="sr-only" />
          <Sun className="text-background" />
          <span className={`mx-3 flex h-8 w-[60px] items-center rounded-full p-1 duration-200 ${isDark ? 'bg-neutral-500' : 'bg-[#CCCCCE]'}`}>
            <span className={`h-6 w-6 rounded-full bg-white duration-200 ${isDark ? 'translate-x-[28px]' : ''}`} />
          </span>
          <Moon className="text-background" />
        </label>
      )}

      <button onClick={() => handleChangeView('grid')} className={activeButton('grid')}>
        <GridIcon size={20} />
        Grid
      </button>
      <button onClick={() => handleChangeView('table')} className={activeButton('table')}>
        <TableIcon size={20} />
        Table
      </button>
    </div>
  );
};
