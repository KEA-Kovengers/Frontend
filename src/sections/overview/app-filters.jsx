import React, { useState } from 'react';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { styled, emphasize } from '@mui/material/styles';

import Iconify from 'src/components/iconify';

import AppPost from './app-post';
import AppAddFilters from './app-filter-add';

// ----------------------------------------------------------------------

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
  const [selectedBreadcrumb, setSelectedBreadcrumb] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filtersList, setFiltersList] = useState([
    '최신순',
    '인기 급상승',
    '해시태그1',
    '해시태그2',
  ]);

  const handleBreadcrumbClick = (index) => {
    setSelectedBreadcrumb(index);
    console.log(`${filtersList[index]} filter clicked.`);
  };

  const handleAddButtonClick = () => {
    setIsAddModalOpen(true);
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };

  const handleAddFilter = (newFilterText) => {
    setFiltersList([...filtersList, newFilterText]);
  };

  return (
    <Container maxWidth="lg">
      <Stack direction="row" spacing="36.27px">
        <Button disableRipple color="inherit" endIcon={<Iconify icon="ic:round-filter-list" />}>
          Filters&nbsp;
        </Button>

        <div role="presentation">
          <Breadcrumbs separator=" " aria-label="breadcrumb">
            {filtersList.map((filter, index) => (
              <StyledBreadcrumb
                key={index}
                href="#"
                label={filter}
                selected={selectedBreadcrumb === index}
                onClick={() => handleBreadcrumbClick(index)}
              />
            ))}
            <StyledBreadcrumb key="add" label="+" onClick={handleAddButtonClick} />
          </Breadcrumbs>
        </div>
      </Stack>

      <AppAddFilters open={isAddModalOpen} onClose={handleAddModalClose} onAdd={handleAddFilter} />

      <Stack direction="column" sx={{ pt: '30px' }}>
        <AppPost filter={selectedBreadcrumb} />
      </Stack>
    </Container>
  );
}
