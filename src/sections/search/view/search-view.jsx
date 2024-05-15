import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import PostSearch from 'src/sections/blog/post-search';
import { posts } from 'src/_mock/blog';
import { colors } from 'src/theme/variableColors';
import SearchFilter from '../search-filter';

// ----------------------------------------------------------------------

export default function SearchView() {
  return (
    <Container
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <PostSearch posts={posts} />
      <SearchFilter />
    </Container>
  );
}
