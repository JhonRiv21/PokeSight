import { useMemo } from 'react';
import { filterPokemons } from '../utils/filterPokemons';
import type { PokemonUI } from '../types/typesPokemonDetails';

export function useFilteredPokemons(
  pokemonList: PokemonUI[],
  searchTerm: string,
  favorites: number[],
  showOnlyFavorites: boolean
) {
  return useMemo(
    () => filterPokemons(pokemonList, searchTerm, favorites, showOnlyFavorites),
    [pokemonList, searchTerm, favorites, showOnlyFavorites]
  );
}
