// PokeClientView.tsx
'use client';

import { useState } from 'react';
import { useViewStore } from '@/app/stores/viewMode';
import { PokeGrid } from './PokeGrid';
import { PokeTable } from './PokeTable';
import { PokemonDetailModal } from './PokemonDetailModal';
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
      {view === 'grid' ? (
        <PokeGrid 
          pokemonList={pokemonList} 
          onShowDetails={handleShowDetails} 
        /> 
      ) : (
        <PokeTable
          pokemonList={pokemonList}
          onShowDetails={handleShowDetails}
        />
      )}
      
      <PokemonDetailModal
        pokemon={selectedPokemon}
        onClose={handleCloseModal}
      />
    </>
  );
}