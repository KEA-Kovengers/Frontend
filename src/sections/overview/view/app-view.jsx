import React, { useState } from "react";

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

import AppFilters from '../app-filters';
// ----------------------------------------------------------------------

export default function AppView() {
  const [openFilter,setOpenFilter] = useState(false);

  return (
    <Container >
      <Stack 
      direction="row" 
      alignItems="center" 
      justifyContent="space-between" 
      style={{ width: '70%', margin: '0 auto' }}
      >
        <AppFilters openFilter={openFilter} setOpenFilter={setOpenFilter} />
      </Stack>
    </Container>
  );
}