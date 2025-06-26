'use client';

import { PokeCard } from './PokeCard'
import { PokemonUI } from '../types/typesPokemonDetails';
import { useEffect, useRef, useState } from 'react';

type Props = {
  pokemonList: PokemonUI[];
  onShowDetails: (pokemon: PokemonUI) => void;
};

export const PokeGrid = ({ pokemonList, onShowDetails }: Props) => {
  const [visibleCount, setVisibleCount] = useState(20);
  const [loadingMore, setLoadingMore] = useState(false);
  const observerRef = useRef<HTMLDivElement | null>(null);

  const visiblePokemons = pokemonList.slice(0, visibleCount);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && visibleCount < pokemonList.length) {
          setLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prev) => prev + 20);
            setLoadingMore(false);
          }, 400)
        }
      },
      { threshold: 1 }
    )

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.disconnect();
      }
    }
  }, [visibleCount, pokemonList.length])

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
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

      <div ref={observerRef} className="mt-6 h-10 flex items-center justify-center">
        {loadingMore && <p className="text-sm text-gray-500 animate-pulse">Cargando...</p>}
      </div>
    </>
  );
}
