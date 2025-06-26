/**
 * @file fetchPokemonList.test.ts
 * @description Unit test for the fetchPokemonList function. This test ensures that:
 *    - The initial list of Pokémon is fetched correctly.
 *    - Each individual Pokémon's detail is fetched and transformed into the correct shape (PokemonUI).
 *    - The transformation includes type normalization, stat conversion, and image extraction.
 *    - The result matches the expected structure defined in the app.
 * 
 * Why this test matters:
 *    - Ensures consistent transformation logic for external API data.
 *    - Prevents regressions in data formatting, especially critical for UI rendering.
 *    - Allows safe mocking of external APIs to avoid network dependencies.
*/

import { fetchPokemonList } from "../lib/services/pokemonList";
import type { PokemonUI } from '@/app/lib/types/typesPokemonDetails';

global.fetch = jest.fn();

describe('fetchPokemonList', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch and return a list of parsed Pokémon', async () => {
    const mockPokemons = [
      {
        name: 'bulbasaur',
        url: 'https://pokeapi.co/api/v2/pokemon/1/',
      },
    ];

    const mockDetails = {
      id: 1,
      name: 'bulbasaur',
      height: 7,
      weight: 69,
      base_experience: 64,
      sprites: { front_default: 'https://img.com/bulba.png' },
      types: [{ type: { name: 'grass' } }, { type: { name: 'poison' } }],
      stats: [
        { stat: { name: 'hp' }, base_stat: 45 },
        { stat: { name: 'attack' }, base_stat: 49 },
      ],
    };

    (fetch as jest.Mock)
      .mockResolvedValueOnce({ json: () => Promise.resolve({ results: mockPokemons }) })
      .mockResolvedValueOnce({ json: () => Promise.resolve(mockDetails) });

    const result = await fetchPokemonList();

    const expected: PokemonUI[] = [
      {
        id: 1,
        name: 'bulbasaur',
        image: 'https://img.com/bulba.png',
        height: 0.7,
        weight: 6.9,
        base: 64,
        types: ['grass', 'poison'],
        stats: {
          hp: 45,
          attack: 49,
        },
      },
    ];

    expect(result).toEqual(expected);
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith('https://pokeapi.co/api/v2/pokemon?limit=151');
  });
});
