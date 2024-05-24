import { useState } from 'react';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import PostSearch from 'src/sections/blog/post-search';
import { posts } from 'src/_mock/blog';
import { colors } from 'src/theme/variableColors';
import SearchFilter from '../search-filter';
import { OutlinedInput } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import Iconify from 'src/components/iconify';
import { set } from 'lodash';

// ----------------------------------------------------------------------

export default function SearchView() {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  return (
    <Container
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        width: '70%',
      }}
    >
      {/* <PostSearch posts={posts} /> */}
      <OutlinedInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            setQuery(search);
          }
        }}
        placeholder="Search"
        style={{ marginBottom: '20px', width: '100%' }}
        startAdornment={
          <InputAdornment position="start">
            <Iconify
              icon="eva:search-fill"
              sx={{ ml: 1, width: 20, height: 20, color: 'text.disabled' }}
            />
          </InputAdornment>
        }
      />
      <SearchFilter query={query} />
    </Container>
  );
}
