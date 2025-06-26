'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import type { PokemonUI } from '@/app/lib/types/typesPokemonDetails';
import { getPokeTableColumns } from './columns';

type PokeTableProps = {
  pokemonList: PokemonUI[];
  onShowDetails: (pokemon: PokemonUI) => void;
};

export const PokeTable = ({ pokemonList, onShowDetails }: PokeTableProps) => {
  const columns = React.useMemo(() => getPokeTableColumns(onShowDetails), [onShowDetails]);

  return (
    <Box sx={{ height: 650, width: '100%' }}>
      <DataGrid
        rows={pokemonList}
        getRowClassName={(params) =>
          params.indexRelativeToCurrentPage % 2 === 0 ? 'bg-blue-50' : 'bg-gray-50'
        }
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

export default PokeTable;