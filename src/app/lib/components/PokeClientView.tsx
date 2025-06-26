'use client';

import { useViewStore } from '@/app/stores/viewMode';
import { PokeGrid } from './PokeGrid';
import type { PokemonUI } from '../types/typesPokemonDetails';

export function PokeClientView({ pokemonList }: { pokemonList: PokemonUI[] }) {
  const view = useViewStore((state) => state.view);

  return (
    <>
      {view === 'grid' ? (
        <PokeGrid pokemonList={pokemonList} />
      ) : (
        <p>por implementar tabla</p>
      )}
    </>
  );
}
