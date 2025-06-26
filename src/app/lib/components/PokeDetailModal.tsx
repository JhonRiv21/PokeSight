import * as React from 'react';
import type { PokemonUI } from '../types/typesPokemonDetails';
import { typeColors } from '../utils/styles';
import { X } from 'lucide-react';

type PokemonDetailModalProps = {
  pokemon: PokemonUI | null;
  onClose: () => void;
};

export const PokeDetailModal = ({ pokemon, onClose }: PokemonDetailModalProps) => {
  React.useEffect(() => {
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

  if (!pokemon) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 bg-opacity-60"
      onClick={onClose}
    >
      <div
        className="relative flex w-full max-w-md flex-col items-center rounded-lg p-6 shadow-xl bg-gray-800 max-h-[90dvh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-2 right-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
          aria-label="Cerrar modal"
        >
          <X className='h-6 w-6' />
        </button>

        <h2 className="text-4xl font-bold capitalize text-gray-900 dark:text-white">
          {pokemon.name}
        </h2>
        <p className="mt-1 text-lg text-gray-500 dark:text-gray-400">
          ID: #{pokemon.id}
        </p>

        <img
          src={pokemon.image}
          alt={pokemon.name}
          className="my-4 h-40 w-40"
        />

        <div className="flex gap-2 flex-wrap justify-center">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={`rounded-full px-3 py-1 text-sm font-semibold capitalize ${
                typeColors[type] || 'bg-gray-100 text-gray-800'
              }`}
            >
              {type}
            </span>
          ))}
        </div>

        <div className="mt-4 grid w-full grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{pokemon.height} m</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Altura</p>
          </div>
          <div>
            <p className="text-xl font-bold text-gray-800 dark:text-gray-100">{pokemon.weight} kg</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Peso</p>
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
                    style={{ width: `${Math.min(statValue, 150)}px` }}
                  ></div>
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
      </div>
    </div>
  );
};