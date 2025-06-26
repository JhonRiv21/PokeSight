/**
 * @file favoritesStore.test.ts
 * @description Unit tests for the Zustand store `useFavoritesStore`.
 *
 * These tests validate the behavior of the favorites system under the following scenarios:
 *
 * Feature: Manage favorite Pokémon
 *
 * Scenario 1: User toggles a Pokémon as favorite
 *   Given an empty favorites list
 *   When the user toggles Pokémon #25 as favorite
 *   Then the store should include #25 in the favorites list
 *
 * Scenario 2: User untoggles a Pokémon that is already a favorite
 *   Given Pokémon #4 is already in the favorites list
 *   When the user toggles it again
 *   Then it should be removed from the list
 *
 * Scenario 3: Store returns correct list of favorite IDs
 *   Given the user favorites Pokémon #1 and #2
 *   Then the favorites list should contain both IDs
 *
 * Scenario 4: Favorites persist in localStorage
 *   Given a user favorites Pokémon #99
 *   Then it should be saved in localStorage under the `favorites-storage` key
 */

import { useFavoritesStore } from "../stores/favorites";

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

beforeEach(() => {
  useFavoritesStore.persist.clearStorage();
  useFavoritesStore.setState({ favorites: [] });
  localStorage.clear();
});

describe('Favorites Store', () => {
  it('should add a Pokémon to favorites (Scenario 1)', () => {
    const { toggleFavorite, isFavorite } = useFavoritesStore.getState();

    toggleFavorite(25); // Pikachu
    expect(isFavorite(25)).toBe(true);
  });

  it('should remove a Pokémon from favorites if already added (Scenario 2)', () => {
    const { toggleFavorite, isFavorite } = useFavoritesStore.getState();

    toggleFavorite(4); // Charmander :)
    expect(isFavorite(4)).toBe(true);

    toggleFavorite(4);
    expect(isFavorite(4)).toBe(false);
  });

  it('should return correct list of favorite IDs (Scenario 3)', () => {
    const { toggleFavorite } = useFavoritesStore.getState();

    toggleFavorite(1); // Bulbasaur
    toggleFavorite(2); // Ivysaur

    expect(useFavoritesStore.getState().favorites).toEqual([1, 2]);
  });

  it('should persist favorites in localStorage (Scenario 4)', async () => {
    const { toggleFavorite } = useFavoritesStore.getState();

    toggleFavorite(99);
    await wait(20);

    const stored = JSON.parse(localStorage.getItem('favorites-storage') ?? '{}');
    expect(stored.state.favorites).toContain(99);
  });
});
