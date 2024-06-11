import React, { useState, useEffect } from 'react';
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
import { GetSearchArticleList, GetSearchUserList } from 'src/api/search.api';

// ----------------------------------------------------------------------

export default function SearchView() {
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');
  const [value, setValue] = useState(0);
  const [searchedPosts, setSearchedPosts] = useState([]);
  const [searchedUsers, setSearchedUsers] = useState([]);

  const getSearchedPosts = () => {
    GetSearchArticleList(query)
      .then((res) => {
        console.log(res);
        setSearchedPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSearchedUsers = () => {
    GetSearchUserList(query)
      .then((res) => {
        console.log(res.data);
        setSearchedUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (query) {
      if (value === 0) {
        getSearchedPosts();
      } else if (value === 1) {
        getSearchedUsers();
      }
    }
  }, [query, value]);

  return (
    <Container
      style={{
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        width: '70%',
      }}
    >
      <OutlinedInput
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            setQuery(search);
            getSearchedPosts();
            getSearchedUsers();
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
      <SearchFilter query={query} value={value} setValue={setValue} searchedPosts={searchedPosts}
        searchedUsers={searchedUsers} />

    </Container>
  );
}
