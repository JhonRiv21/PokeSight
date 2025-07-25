import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FavoritesStore = {
  favorites: number[];
  toggleFavorite: (id: number) => void;
  isFavorite: (id: number) => boolean;
};

export const useFavoritesStore = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      toggleFavorite: (id) => {
        const { favorites } = get();
        const updated = favorites.includes(id)
          ? favorites.filter((favId) => favId !== id)
          : [...favorites, id];
        set({ favorites: updated });
      },
      isFavorite: (id) => get().favorites.includes(id),
    }),
    {
      name: 'favorites-storage',
    }
  )
);