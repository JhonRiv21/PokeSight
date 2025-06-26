import type { PokemonUI } from "../types/typesPokemonDetails";

export function filterPokemons(
  pokemonList: PokemonUI[],
  searchTerm: string,
  favorites: number[],
  showOnlyFavorites: boolean
) {
  return pokemonList
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) =>
      showOnlyFavorites ? favorites.includes(item.id) : true
    );
}
