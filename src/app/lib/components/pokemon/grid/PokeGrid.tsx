'use client';

import { PokeCard } from '../cards/PokeCard';
import { PokemonUI } from '@/app/lib/types/typesPokemonDetails';
import { useEffect, useRef, useState } from 'react';
import { X, Search } from 'lucide-react';
import { useFilteredPokemons } from '@/app/lib/hooks/useFilteredPokemons';
import { useInfiniteScroll } from '@/app/lib/hooks/useInfiniteScroll';
import { useFavoritesStore } from '@/app/stores/favorites';

type Props = {
  pokemonList: PokemonUI[];
  onShowDetails: (pokemon: PokemonUI) => void;
};

export const PokeGrid = ({ pokemonList, onShowDetails }: Props) => {
  const [visibleCount, setVisibleCount] = useState(20);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);
  const favorites = useFavoritesStore((state) => state.favorites);

  const filteredList = useFilteredPokemons(
    pokemonList,
    searchTerm,
    favorites,
    showOnlyFavorites
  );

  const visiblePokemons = filteredList.slice(0, visibleCount);

  useInfiniteScroll({
    targetRef: observerRef,
    canLoadMore: visibleCount < filteredList.length,
    loading: loadingMore,
    onLoadMore: () => {
      setLoadingMore(true);
      setTimeout(() => {
        setVisibleCount((prev) => prev + 20);
        setLoadingMore(false);
      }, 400);
    },
  });

  useEffect(() => {
    setVisibleCount(20);
  }, [searchTerm]);

  useEffect(() => {
    if (showOnlyFavorites && favorites.length === 0) {
      setShowOnlyFavorites(false);
    }
  }, [showOnlyFavorites, favorites.length])

  return (
    <>
      <div className='flex flex-wrap flex-row gap-y-5 sm:gap-x-5 items-center justify-between'>
        {favorites.length > 0 && 
          <button
            onClick={() => setShowOnlyFavorites((prev) => !prev)}
            className="md:ml-4 cursor-pointer text-sm px-4 py-2.5 rounded-md font-medium bg-blue-600 text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 active:bg-blue-800 transition-colors duration-500"
          >
            {showOnlyFavorites ? 'Show All' : `View Favorites (${favorites.length})`}
          </button>
        }
      
        <label className="block relative w-full max-w-sm ml-auto">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />

          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name"
            className="bg-white text-gray-700 font-medium py-2 pl-10 pr-10 border border-gray-400 rounded-md w-full"
          />

          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}
        </label>
      </div>

      {visiblePokemons.length === 0 ? (
        <p className="text-center text-2xl text-gray-400 mt-10">
          No Pokémon found for <strong>{searchTerm}</strong>
        </p>
      ) : (
        <>
          <div className="-ml-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 lg:gap-x-8 gap-y-8 md:gap-y-10 mt-12">
            {visiblePokemons.map((pokemon) => (
              <PokeCard
                key={pokemon.id}
                id={pokemon.id}
                name={pokemon.name}
                image={pokemon.image}
                onClick={() => onShowDetails(pokemon)}
              />
            ))}
          </div>

          <div
            ref={observerRef}
            className={`flex items-center justify-center ${
              visibleCount < filteredList.length ? 'mt-6 h-10' : ''
            }`}
          >
            {loadingMore && (
              <p className="text-xl text-gray-800 dark:text-gray-500 animate-pulse">Loading...</p>
            )}
          </div>
        </>
      )}
    </>
  );
};
