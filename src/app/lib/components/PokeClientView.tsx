'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useViewStore } from '@/app/stores/viewMode';
import { PokeGrid } from './PokeGrid';
import { PokeTable } from './PokeTable';
import { PokeDetailModal } from './PokeDetailModal';
import type { PokemonUI } from '../types/typesPokemonDetails';

export function PokeClientView({ pokemonList }: { pokemonList: PokemonUI[] }) {
  const view = useViewStore((state) => state.view);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonUI | null>(null);

  const handleShowDetails = (pokemon: PokemonUI) => {
    setSelectedPokemon(pokemon);
  };

  const handleCloseModal = () => {
    setSelectedPokemon(null);
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {view === 'grid' ? (
          <motion.div
            key="grid"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <PokeGrid
              pokemonList={pokemonList}
              onShowDetails={handleShowDetails}
            />
          </motion.div>
        ) : (
          <motion.div
            key="table"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <PokeTable
              pokemonList={pokemonList}
              onShowDetails={handleShowDetails}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <PokeDetailModal
        pokemon={selectedPokemon}
        onClose={handleCloseModal}
      />
    </>
  );
}
