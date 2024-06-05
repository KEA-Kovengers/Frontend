import React, { useEffect, useState } from 'react';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { styled, emphasize } from '@mui/material';

import Iconify from 'src/components/iconify';

import AppPost from './app-post';
import AppAddFilters from './app-filter-add';
import Cookies from 'js-cookie';
import { has, set } from 'lodash';
import { useCookies } from 'react-cookie';

// ----------------------------------------------------------------------

// 필터 형식 스타일 (hover,focus 및 active된 상태 포함)
const StyledBreadcrumb = styled(Chip)(({ theme, selected }) => {
  const backgroundColor = theme.palette.grey[300];
  const primaryColor = theme.palette.primary.lighter;

  return {
    backgroundColor: selected ? backgroundColor : backgroundColor,
    height: theme.spacing(3),
    color: selected ? theme.palette.primary.main : theme.palette.text.primary,
    fontWeight: selected ? 'bold' : theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: primaryColor,
      color: theme.palette.primary.main,
      fontWeight: 'bold',
    },
    '&:active': {
      backgroundColor: emphasize(backgroundColor),
    },
    alignItems: 'center',
    justifyContent: 'center',
  };
});


export default function AppFilters() {
  // Selected Breadcrumb tag, modal state, filter list, and selected filter state
  const [selectedBreadcrumb, setSelectedBreadcrumb] = useState('전체');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filtersList, setFiltersList] = useState([

  ]);
  // const [filtersList, setFiltersList] = useState([
  //   '최신순',
  //   '인기 급상승',
  //   '여행',
  //   '운동',
  // ]);
  // const setHashtags = () => {
  //   const existingHashtags = Cookies.get('hashtags');
  //   let hashtagsArray = ['전체'];

  //   if (existingHashtags) {
  //     //console.log('existingHashtags', existingHashtags);
  //     hashtagsArray = JSON.parse(existingHashtags);
  //     console.log('hashtagsArray', hashtagsArray);
  //     if (!Array.isArray(hashtagsArray)) {
  //       hashtagsArray = [];
  //     }

  //   }
  //   setFiltersList([...hashtagsArray])
  // };
  const [tags, settags] = useCookies(['hashtags']);
  const setHashtags = () => {
    const existingHashtags = Cookies.get('hashtags');
    if (existingHashtags === undefined) {
      settags('hashtags', ['전체'], { path: '/' });
    }
    if (existingHashtags.length === 0) {
      settags('hashtags', ['전체'], { path: '/' });
    }
    // if (typeof window === 'undefined') {
    //   settags('hashtags', ['전체'], { path: '/' });
    // }
    //  settags('hashtags', ['전체'], { path: '/' });
    console.log('existingHashtags', existingHashtags);
    setFiltersList([...JSON.parse(existingHashtags)]);
  }
  const handleBreadcrumbClick = (tag) => {
    setSelectedBreadcrumb(tag); // Update selected breadcrumb tag
  };

  // Click handler for adding a filter
  const handleAddButtonClick = () => {
    setIsAddModalOpen(true);
  };

  // Modal close handler
  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };

  // Add filter handler
  // const handleAddFilter = (newFilterText) => {
  //   if (!filtersList.includes(newFilterText)) {
  //     const updatedFilters = [...filtersList, newFilterText];
  //     setFiltersList(updatedFilters);
  //     Cookies.set('hashtags', JSON.stringify(updatedFilters), { path: '/' });
  //   }
  // };
  // const handleAddFilter = (newFilterText) => {
  //   // 새로운 필터를 기존 필터 목록에 추가
  //   setFiltersList([...filtersList, newFilterText]);
  // };

  const handleAddFilter = (newFilterText) => {
    // 새로운 필터를 기존 필터 목록에 추가
    const updatedFilters = [...filtersList, newFilterText];
    setFiltersList(updatedFilters);
    Cookies.set('hashtags', JSON.stringify(updatedFilters), { path: '/' });
  };
  useEffect(() => {
    setHashtags();
  }, []);

  return (
    <Container maxWidth="lg">
      <Stack direction="row" spacing="36.27px">
        <Button disableRipple color="inherit" endIcon={<Iconify icon="ic:round-filter-list" />}>
          Filters&nbsp;
        </Button>

        <div role="presentation">
          <Breadcrumbs separator=" " aria-label="breadcrumb">
            {filtersList.map((filter) => (
              <StyledBreadcrumb
                key={filter}
                href="#"
                label={filter}
                selected={selectedBreadcrumb === filter}
                onClick={() => handleBreadcrumbClick(filter)}
              />
            ))}
            <StyledBreadcrumb key="add" label="+" onClick={handleAddButtonClick} />
          </Breadcrumbs>
        </div>
      </Stack>

      {/* Filter adding modal */}
      <AppAddFilters open={isAddModalOpen} onClose={handleAddModalClose} onAdd={handleAddFilter} />

      {/* Display component corresponding to the filter */}
      <Box direction='column' sx={{ pt: "30px" }}>
        <AppPost filter={selectedBreadcrumb} />
      </Box>

    </Container>
  );
}