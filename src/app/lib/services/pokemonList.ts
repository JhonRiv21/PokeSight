import type { PokemonUI } from "../types/typesPokemonDetails";

export async function fetchPokemonList(): Promise<PokemonUI[]> {
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
  const { results } = await res.json();

  const pokemons = await Promise.all(
    results.map(({ url }: { url: string }) => fetch(url).then((res) => res.json()))
  );

  return pokemons.map((p): PokemonUI => ({
    id: p.id,
    name: p.name,
    image: p.sprites.front_default,
    height: p.height / 10,
    weight: p.weight / 10,
    base: p.base_experience,
    types: p.types.map((t: any) => t.type.name),
    stats: Object.fromEntries(
      p.stats.map((s: any) => [s.stat.name, s.base_stat])
    ),
  }));
}
