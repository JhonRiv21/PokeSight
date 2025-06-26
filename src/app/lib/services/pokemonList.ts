import type { PokemonUI, PokemonListResponse, PokemonDetailsApiResponse } from "../types/typesPokemonDetails";

export async function fetchPokemonList(): Promise<PokemonUI[]> {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const { results } = await res.json() as PokemonListResponse;

  const pokemons = await Promise.all(
    results.map(async ({ url }) => {
      const pokemonRes = await fetch(url);
      return pokemonRes.json() as Promise<PokemonDetailsApiResponse>;
    })
  );

  return pokemons.map((p: PokemonDetailsApiResponse): PokemonUI => ({
    id: p.id,
    name: p.name,
    image: p.sprites.front_default || '',
    height: p.height / 10,
    weight: p.weight / 10,
    base: p.base_experience,
    types: p.types.map((t) => t.type.name),
    stats: Object.fromEntries(
      p.stats.map((s) => [s.stat.name, s.base_stat])
    ),
  }));
}
