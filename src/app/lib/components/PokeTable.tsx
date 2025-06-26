'use client';

import { useState } from "react";
import { GridIcon, TableIcon } from 'lucide-react';

export const Header = () => {
  const [view, setView] = useState('grid');

  return (
    <header
      className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b p-3 md:p-4 flex justify-between items-center transition-all duration-300 shadow-sm"
    >
      <h2 className="text-2xl md:text-3xl font-bold">PokeSight</h2>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setView('table')}
          className="flex items-center gap-1 text-sm px-3 py-1 rounded hover:bg-gray-100 transition"
        >
          <TableIcon size={16} /> Tabla
        </button>
        <button
          onClick={() => setView('grid')}
          className="flex items-center gap-1 text-sm px-3 py-1 rounded hover:bg-gray-100 transition"
        >
          <GridIcon size={16} /> Cuadrícula
        </button>
      </div>
    </header>
  );
};
