import { useState } from 'react';

import Stack from '@mui/material/Stack'; 
import Container from '@mui/material/Container';

import AppFilters from '../app-filters';

// ----------------------------------------------------------------------

export default function AppView() {
  const [openFilter] = useState(false);

  return (
    <Container>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
          <AppFilters openFilter={openFilter}/>
      </Stack>

    </Container>

  );
}

//test