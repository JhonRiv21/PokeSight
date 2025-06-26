'use client';

import * as React from 'react';
import type { PokemonUI } from '@/app/lib/types/typesPokemonDetails';
import { typeColors } from '@/app/lib/utils/styles';
import { Heart, HeartOff, X } from 'lucide-react';
import { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useFavoritesStore } from '@/app/stores/favorites';
import Image from 'next/image'

type PokemonDetailModalProps = {
  pokemon: PokemonUI | null;
  onClose: () => void;
};

export const PokeDetailModal = ({ pokemon, onClose }: PokemonDetailModalProps) => {
  const MAX_BASE_STAT = 255;
  const isFavorite = useFavoritesStore((state) => pokemon && state.isFavorite(pokemon.id));
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <AnimatePresence>
      {pokemon && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 bg-opacity-60"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative flex w-full mx-3 sm:mx-0 border-[0.1px] border-gray-400 max-w-md flex-col items-center rounded-lg p-6 shadow-xl bg-gray-800 max-h-[90dvh] overflow-y-auto scrollable"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <button
              onClick={() => pokemon && toggleFavorite(pokemon.id)}
              className="absolute top-2.5 left-3 text-gray-400 hover:text-red-500 cursor-pointer"
              aria-label="Toggle favorite"
            >
              {isFavorite ? <Heart className="fill-red-500 text-red-500 w-7.5 h-7.5" /> : <HeartOff className="w-7.5 h-7.5" />}
            </button>
            <button
              onClick={onClose}
              className="cursor-pointer absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              aria-label="Cerrar modal"
            >
              <X className='h-8 w-8' />
            </button>

            <h2 className="text-4xl font-bold capitalize text-gray-900 dark:text-white">
              {pokemon.name}
            </h2>
            <p className="mt-1 text-lg text-gray-300">ID: #{pokemon.id}</p>

            <Image
              width={160}
              height={160}
              src={pokemon.image}
              alt={pokemon.name}
              className="my-4" 
            />

            <div className="flex gap-2 flex-wrap justify-center">
              {pokemon.types.map((type) => (
                <span
                  key={type}
                  className={`rounded-full px-3 py-1 text-base font-semibold capitalize ${
                    typeColors[type] || 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {type}
                </span>
              ))}
            </div>

            <div className="mt-4 grid w-full grid-cols-3 py-2 gap-4 text-center">
              <div>
                <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{pokemon.height} m</p>
                <p className="text-base text-gray-300">Height</p>
              </div>
              <div>
                <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{pokemon.weight} kg</p>
                <p className="text-base text-gray-300">Weight</p>
              </div>
              <div>
                <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{pokemon.base}</p>
                <p className="text-base text-gray-300">Base Exp.</p>
              </div>
            </div>

            <div className="mt-4 w-full">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Estadísticas</h3>
              <div className="mt-2 space-y-2">
                {Object.entries(pokemon.stats).map(([statName, statValue]) => (
                  <div key={statName}>
                    <div className="flex justify-between text-sm font-medium text-gray-600 dark:text-gray-300">
                      <span className="capitalize">{statName.replace('-', ' ')}</span>
                      <span>{statValue}</span>
                    </div>
                    <div className="mt-1 h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
                      <div
                        className="h-2 rounded-full bg-blue-500"
                        style={{ width: `${(statValue / MAX_BASE_STAT) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={onClose}
              className="cursor-pointer mt-6 w-full rounded-lg bg-blue-600 px-4 py-2 text-center font-semibold text-white shadow-sm hover:bg-blue-900 transition duration-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Cerrar
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
