'use client';

import { PokeCard } from './PokeCard'
import { PokemonUI } from '../types/typesPokemonDetails';
import { useEffect, useRef, useState } from 'react';

type Props = {
  pokemonList: PokemonUI[];
};

export const PokeGrid = ({ pokemonList }: Props) => {
  const [selected, setSelected] = useState<PokemonUI | null>(null);
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
            onClick={() => setSelected(pokemon)}
          />
        ))}
      </div>

      <div ref={observerRef} className="mt-6 h-10 flex items-center justify-center">
        {loadingMore && <p className="text-sm text-gray-500 animate-pulse">Cargando...</p>}
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full">
            <h2 className="text-lg font-bold capitalize mb-2">{selected.name}</h2>
            <img src={selected.image} alt={selected.name} className="w-32 h-32 mx-auto" />
            <p className="text-sm text-gray-700 mt-2">ID: {selected.id}</p>
            <p className="text-sm text-gray-700">Tipo: {selected.types.join(', ')}</p>
            <p className="text-sm text-gray-700">Altura: {selected.height} m</p>
            <p className="text-sm text-gray-700">Peso: {selected.weight} kg</p>
            <button
              onClick={() => setSelected(null)}
              className="mt-4 w-full text-sm text-blue-600 hover:underline"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
