import { useState } from 'react';

import Stack from '@mui/material/Stack'; 

import AppFilters from '../app-filters';
// ----------------------------------------------------------------------

export default function AppView() {
  const [openFilter] = useState(false);

  return (
    <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
      <AppFilters
        openFilter={openFilter}
      />
    </Stack>
  );
}