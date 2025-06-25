export type PokemonUI = {
  id: number;
  name: string;
  image: string;
  height: number;
  weight: number;
  types: string[];
  stats: Record<string, number>;
};