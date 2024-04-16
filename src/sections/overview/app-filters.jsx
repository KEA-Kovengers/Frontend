import React, {useState} from 'react';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { styled,emphasize } from '@mui/material/styles';

import Iconify from 'src/components/iconify';

import AppPost from './app-post';
import AppAddFilters from './app-filter-add';
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
  // 선택된 Breadcrumb의 index와 모달 상태 및 필터 목록 상태 관리
  const [selectedBreadcrumb, setSelectedBreadcrumb] = useState(0);
  const [isAddModalOpen,setIsAddModalOpen] = useState(false);
  const [filtersList,setFiltersList] = useState(['최신순','인기 급상승','해시태그1','해시태그2']);

  const handleBreadcrumbClick = (index) => {
    setSelectedBreadcrumb(index);
    console.log(`${filtersList[index]} filter clicked.`);
  };

  // 필터 추가할 때, + 버튼 클릭 
  const handleAddButtonClick = () => {
    setIsAddModalOpen(true);
  }

  // 필터 추가 모달 닫기 핸들러
  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  }

  // 필터 추가 핸들러
  const handleAddFilter = (newFilterText) => {
    setFiltersList([...filtersList, newFilterText]);
  };


  return (
    <Container maxWidth="lg">
      <Stack direction="row" spacing="36.27px">
          <Button
            disableRipple
            color="inherit"
            endIcon={<Iconify icon="ic:round-filter-list" />}
          >
            Filters&nbsp;
          </Button>

          <div role="presentation" > 
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

      {/* 필터 추가 모달 */}
      <AppAddFilters open={isAddModalOpen} onClose={handleAddModalClose} onAdd={handleAddFilter} />

      {/* 필터에 해당하는 컴포넌트 표시 */}
      <Box direction='column' sx={{pt:"30px"}}>
        <AppPost filter={selectedBreadcrumb} />
      </Box>

    </Container>
  );
}