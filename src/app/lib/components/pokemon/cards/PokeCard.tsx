'use client';

import { Heart, HeartOff } from 'lucide-react';
import { useFavoritesStore } from '@/app/stores/favorites';
import { useHasHydrated } from '@/app/lib/hooks/useHasHydrated';
import Image from 'next/image'

type Props = {
  name: string;
  image: string;
  id: number;
  onClick: () => void;
};

export const PokeCard = ({ name, image, id, onClick }: Props) => {
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
  const isFavorite = useFavoritesStore((state) => state.isFavorite(id));
  const hasHydrated = useHasHydrated();

  return (
    <div className="relative w-full max-w-xs mx-auto hover:scale-[1.03] transition-transform duration-300">
      <div className="absolute top-[-10px] left-[10px] w-full h-full rounded-2xl z-0 card-bg" />

      <button
        onClick={onClick}
        className="relative cursor-pointer z-10 w-full p-6 rounded-2xl border-2 shadow-md flex flex-col items-center card-container"
      >
        <span className="absolute top-3 right-3 text-xl font-mono card-id">#{id}</span>

        {hasHydrated && (
          <span
            className="absolute bottom-3 right-3 text-gray-400 hover:text-red-500"
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(id);
            }}
          >
            {isFavorite ? (
              <Heart className="fill-red-500 text-red-500" size={24} />
            ) : (
              <HeartOff size={24} />
            )}
          </span>
        )}

        <Image
          src={image}
          alt={name}
          width={144}
          height={144}
          className="rounded-full object-contain"
          {...(id === 1 ? { priority: true } : { loading: 'lazy' })}
        />
        <p className="mt-4 text-lg font-semibold capitalize text-center card-id">{name}</p>
      </button>
    </div>
  );
};
