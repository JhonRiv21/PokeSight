/**
 * @file useFilteredPokemons.test.ts
 * @description Unit tests for the useFilteredPokemons custom hook without external libraries.
 * The hook is tested directly by invoking it as a pure function using mock data.
 */

import { filterPokemons } from '../lib/utils/filterPokemons';
import type { PokemonUI } from '../lib/types/typesPokemonDetails';

const mockList: PokemonUI[] = [
  { id: 1, name: 'bulbasaur', image: '', height: 0.7, weight: 6.9, base: 64, types: ['grass'], stats: {} },
  { id: 4, name: 'charmander', image: '', height: 0.6, weight: 8.5, base: 62, types: ['fire'], stats: {} },
  { id: 7, name: 'squirtle', image: '', height: 0.5, weight: 9.0, base: 63, types: ['water'], stats: {} },
];

describe('filterPokemons', () => {
  it('filters by name', () => {
    const filtered = filterPokemons(mockList, 'char', [], false);
    expect(filtered).toEqual([expect.objectContaining({ name: 'charmander' })]);
  });

  it('filters only favorites', () => {
    const filtered = filterPokemons(mockList, '', [1, 4], true);
    expect(filtered.map(p => p.id)).toEqual(expect.arrayContaining([1, 4]));
  });

  it('filters by name and favorites', () => {
    const filtered = filterPokemons(mockList, 'char', [4], true);
    expect(filtered).toEqual([expect.objectContaining({ name: 'charmander' })]);
  });

  it('returns all if no filters are applied', () => {
    const filtered = filterPokemons(mockList, '', [], false);
    expect(filtered).toHaveLength(3);
  });

  it('returns empty if search term has no match', () => {
    const filtered = filterPokemons(mockList, 'xyz', [], false);
    expect(filtered).toEqual([]);
  });

  it('returns empty if showOnlyFavorites is true but no favorites', () => {
    const filtered = filterPokemons(mockList, '', [], true);
    expect(filtered).toEqual([]);
  });
});
