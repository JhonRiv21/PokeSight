import { useMemo } from 'react';
import type { PokemonUI } from '../types/typesPokemonDetails';

export function useFilteredPokemons(
  pokemonList: PokemonUI[],
  searchTerm: string,
  favorites: number[],
  showOnlyFavorites: boolean
) {
  return useMemo(() => {
    return pokemonList
      .filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((item) => (showOnlyFavorites ? favorites.includes(item.id) : true));
  }, [pokemonList, searchTerm, favorites, showOnlyFavorites]);
}
