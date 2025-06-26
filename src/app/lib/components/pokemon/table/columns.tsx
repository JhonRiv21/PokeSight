'use client';

import { GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import type { PokemonUI } from '@/app/lib/types/typesPokemonDetails';
import { typeColors } from '@/app/lib/utils/styles';
import Image from 'next/image'

const getStatChipColor = (value: number): 'success' | 'error' | 'default' => {
  if (value >= 100) return 'success';
  if (value <= 50) return 'error';
  return 'default';
};

export const getPokeTableColumns = (
  onShowDetails: (pokemon: PokemonUI) => void
): GridColDef<PokemonUI>[] => [
  {
    field: 'image',
    headerName: 'Image',
    width: 100,
    renderCell: (params) => (
      <Image
        loading="lazy"
        width={60}
        height={60}
        src={params.row.image}
        alt={params.row.name}
        style={{ margin: 'auto' }}
      />
    ),
    sortable: false,
    filterable: false,
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 150,
    valueGetter: (value: string) => value.charAt(0).toUpperCase() + value.slice(1),
    cellClassName: 'text-base',
  },
  {
    field: 'types',
    headerName: 'Type',
    width: 180,
    renderCell: (params) => (
      <div className="flex flex-wrap items-center gap-1 h-full">
        {params.row.types.map((type) => (
          <span
            key={type}
            className={`rounded-full px-2 py-0.5 text-sm font-semibold capitalize ${
              typeColors[type] || 'bg-gray-100 text-gray-800'
            }`}
          >
            {type}
          </span>
        ))}
      </div>
    ),
    sortComparator: (v1: string[], v2: string[]) => v1[0].localeCompare(v2[0]),
  },
  { field: 'weight', headerName: 'Weight (kg)', type: 'number', width: 100 },
  { field: 'height', headerName: 'Height (m)', type: 'number', width: 100 },
  {
    field: 'hp',
    headerName: 'HP',
    type: 'number',
    width: 90,
    valueGetter: (_, row) => row.stats.hp,
    renderCell: (params) => (
      <Chip label={params.value} size="medium" color={getStatChipColor(params.value)} />
    ),
  },
  {
    field: 'base',
    headerName: 'Base Exp.',
    type: 'number',
    width: 90,
    valueGetter: (_, row) => row.base,
    renderCell: (params) => (
      <Chip label={params.value} size="medium" color={getStatChipColor(params.value)} />
    ),
  },
  {
    field: 'attack',
    headerName: 'Attack',
    type: 'number',
    width: 90,
    valueGetter: (_, row) => row.stats.attack,
    renderCell: (params) => (
      <Chip label={params.value} size="medium" color={getStatChipColor(params.value)} />
    ),
  },
  {
    field: 'defense',
    headerName: 'Defense',
    type: 'number',
    width: 90,
    valueGetter: (_, row) => row.stats.defense,
    renderCell: (params) => (
      <Chip label={params.value} size="medium" color={getStatChipColor(params.value)} />
    ),
  },
  {
    field: 'special-attack',
    headerName: 'Special Attack',
    type: 'number',
    width: 120,
    valueGetter: (_, row) => row.stats['special-attack'],
    renderCell: (params) => (
      <Chip label={params.value} size="medium" color={getStatChipColor(params.value)} />
    ),
  },
  {
    field: 'special-defense',
    headerName: 'Special Defense',
    type: 'number',
    width: 120,
    valueGetter: (_, row) => row.stats['special-defense'],
    renderCell: (params) => (
      <Chip label={params.value} size="medium" color={getStatChipColor(params.value)} />
    ),
  },
  {
    field: 'speed',
    headerName: 'Speed',
    type: 'number',
    width: 110,
    valueGetter: (_, row) => row.stats.speed,
    renderCell: (params) => (
      <Chip label={params.value} size="medium" color={getStatChipColor(params.value)} />
    ),
  },
  {
    field: 'actions',
    headerName: 'Details',
    type: 'actions',
    width: 120,
    renderCell: (params) => (
      <Button
        variant="contained"
        size="small"
        onClick={() => onShowDetails(params.row)}
      >
        View Details
      </Button>
    ),
  },
];
