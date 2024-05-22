import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import AppCardImage from 'src/sections/overview/app-card-image';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

import { useNavigate } from 'react-router-dom';
import UploadCardInfo from './UploadCardInfo';

const item = {
  image: { src: '/assets/images/covers/exercise.jpg' },
  info: {
    userImage: '/assets/images/avatars/avatar_25.jpg',
    title: '운동을 하자!',
    userName: '소정이의 블로그',
    date: '2024-03-15',
  },
};
export default function SelectOptionView() {
  const renderHeader = (
    <Box
      component="header"
      sx={{
        top: 0,
        left: 0,
        width: 1,
        lineHeight: 0,
        position: 'fixed',
        p: (theme) => ({ xs: theme.spacing(3, 3, 0), sm: theme.spacing(5, 5, 0) }),
      }}
    >
      <Logo />
    </Box>
  );
  const navigate = useNavigate();

  return (
    <>
      {renderHeader}
      <Container>
        <Box
          sx={{
            py: 12,
            maxWidth: 1150,
            mx: 'auto',
            display: 'flex',
            minHeight: '100vh',
            textAlign: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{ width: '55%', marginBottom: 20 }}>
            <AppCardImage images={[item.image]} />
            <UploadCardInfo info={[item.info]} />
          </div>
          <Typography sx={{ color: 'text.secondary' }}>위 게시물로 업로드 하겠습니까?</Typography>
          <Stack direction="row" justifyContent="space-between" sx={{ width: '33%', marginTop: 5 }}>
            <Button sx={modal_style.left_button} onClick={() => navigate(-1)}>
              아니오
            </Button>
            <Button sx={modal_style.right_button} onClick={() => navigate('/')}>
              예
            </Button>
          </Stack>
        </Box>
      </Container>
    </>
  );
}

const modal_style = {
  left_button: {
    width: 120,
    height: 40,
    border: '3px solid #E3E6FF',
    borderRadius: 3,
    color: 'black',
    fontSize: '18px',
  },
  right_button: {
    width: 120,
    height: 40,
    bgcolor: '#1A2CDD',
    borderRadius: 3,
    color: 'white',
    fontSize: '18px',
  },
};
