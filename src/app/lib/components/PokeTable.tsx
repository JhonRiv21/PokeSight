import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import type { PokemonUI } from '../types/typesPokemonDetails';
import { typeColors } from '../utils/styles';

/**
 * @param {number} value
 * @returns {'success' | 'error' | 'default'}
*/
const getStatChipColor = (value: number): 'success' | 'error' | 'default' => {
  if (value >= 100) return 'success';
  if (value <= 50) return 'error';
  return 'default';
};

type PokeTableProps = {
  pokemonList: PokemonUI[];
  onShowDetails: (pokemon: PokemonUI) => void;
};

export const PokeTable = ({ pokemonList, onShowDetails }: PokeTableProps) => {
  const columns: GridColDef<PokemonUI>[] = [
    {
      field: 'image',
      headerName: 'Imagen',
      width: 100,
      renderCell: (params) => (
        <img
          src={params.row.image}
          alt={params.row.name}
          style={{ height: '55px', margin: 'auto' }}
        />
      ),
      sortable: false,
      filterable: false,
    },
    {
      field: 'name',
      headerName: 'Nombre',
      width: 150,
      valueGetter: (value: string) => value.charAt(0).toUpperCase() + value.slice(1),
    },
    {
      field: 'types',
      headerName: 'Tipo',
      width: 180,
      renderCell: (params) => (
        <div className="flex flex-wrap items-center gap-1 h-full">
          {params.row.types.map((type) => (
            <span
              key={type}
              className={`rounded-full px-2 py-0.5 text-xs font-semibold capitalize ${
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
    { field: 'weight', headerName: 'Peso (kg)', type: 'number', width: 100 },
    { field: 'height', headerName: 'Altura (m)', type: 'number', width: 100 },
    {
      field: 'hp',
      headerName: 'Salud',
      type: 'number',
      width: 90,
      valueGetter: (_, row) => row.stats.hp,
      renderCell: (params) => <Chip label={params.value} size="small" color={getStatChipColor(params.value)} />,
    },
    {
      field: 'attack',
      headerName: 'Ataque',
      type: 'number',
      width: 90,
      valueGetter: (_, row) => row.stats.attack,
      renderCell: (params) => <Chip label={params.value} size="small" color={getStatChipColor(params.value)} />,
    },
    {
      field: 'defense',
      headerName: 'Defensa',
      type: 'number',
      width: 90,
      valueGetter: (_, row) => row.stats.defense,
      renderCell: (params) => <Chip label={params.value} size="small" color={getStatChipColor(params.value)} />,
    },
    {
      field: 'special-attack',
      headerName: 'At. Especial',
      type: 'number',
      width: 120,
      valueGetter: (_, row) => row.stats['special-attack'],
      renderCell: (params) => <Chip label={params.value} size="small" color={getStatChipColor(params.value)} />,
    },
    {
      field: 'special-defense',
      headerName: 'Def. Especial',
      type: 'number',
      width: 120,
      valueGetter: (_, row) => row.stats['special-defense'],
      renderCell: (params) => <Chip label={params.value} size="small" color={getStatChipColor(params.value)} />,
    },
    {
      field: 'speed',
      headerName: 'Velocidad',
      type: 'number',
      width: 110,
      valueGetter: (_, row) => row.stats.speed,
      renderCell: (params) => <Chip label={params.value} size="small" color={getStatChipColor(params.value)} />,
    },
    
    {
      field: 'actions',
      headerName: 'Detalles',
      type: 'actions',
      width: 120,
      renderCell: (params) => (
        <Button
          variant="outlined"
          size="small"
          onClick={() => onShowDetails(params.row)}
        >
          Ver Detalles
        </Button>
      ),
    },
  ];

  return (
    <Box sx={{ height: 650, width: '100%' }}>
      <DataGrid
        rows={pokemonList}
        columns={columns}
        rowHeight={65}
        pageSizeOptions={[10, 25, 50]}
        initialState={{
          pagination: { paginationModel: { pageSize: 10 } },
        }}
        disableRowSelectionOnClick
      />
    </Box>
  );
};