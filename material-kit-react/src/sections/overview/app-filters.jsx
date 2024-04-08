import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { styled,emphasize } from '@mui/material/styles';

import Iconify from 'src/components/iconify';

const StyledBreadcrumb = styled(Chip)(({ theme }) => {
    const backgroundColor = theme.palette.grey[300];
    const primaryColor = theme.palette.primary.lighter; 
  
    return {
      backgroundColor,
      height: theme.spacing(3),
      color: theme.palette.text.primary,
      fontWeight: theme.typography.fontWeightRegular,
      '&:hover, &:focus': {
        backgroundColor: primaryColor,
        color: theme.palette.primary.main,
        fontWeight: 'bold', 
      },
      '&:active': {
        backgroundColor: emphasize(backgroundColor),
      },
    };
  });
  
  function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
  }

export default function AppFilters(){

    return (
        <Container maxWidth="xl">
        <Stack     
        direction="row"
        alignItems="center"
        flexWrap="wrap-reverse"
        justifyContent="center">
            <Button
              disableRipple
              color="inherit"
              endIcon={<Iconify icon="ic:round-filter-list" />}
            >
              Filters&nbsp;
            </Button>
        
          <Box>
            <div 
              role="presentation" 
              onClick={handleClick}>
              <Breadcrumbs separator=" " aria-label="breadcrumb">
                <StyledBreadcrumb component="a" href="#" label="최신순" />
                <StyledBreadcrumb component="a" href="#" label="인기 급상승" />
                <StyledBreadcrumb component="a" href="#" label="해시태그1" />
                <StyledBreadcrumb component="a" href="#" label="해시태그2" />
                <StyledBreadcrumb component="a" href="#" label="+" />
              </Breadcrumbs>
            </div>
          </Box>
        </Stack>
      </Container>
    );
}