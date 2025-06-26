export type PokemonUI = {
  id: number;
  name: string;
  image: string;
  height: number;
  weight: number;
  base: number;
  types: string[];
  stats: Record<string, number>;
};

export interface PokemonListResponse {
  results: {
    name: string;
    url: string;
  }[];
}

export interface PokemonDetailsApiResponse {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
  };
  types: {
    type: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}