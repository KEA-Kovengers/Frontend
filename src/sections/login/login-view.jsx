
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';

import LoginKakao from './login-kakao';

// ----------------------------------------------------------------------

export default function LoginView() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/login_background.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            width: 477,
            height: 416,
          }}
        >
          <Box
            sx={{
              textAlign:'center',
              paddingTop: '43px'
            }}>
            <Logo/>
          </Box>

          <Box
            sx={{
              textAlign: "left",
              paddingTop: "45.11px",
              paddingLeft: "52px"
            }}>
            <Typography variant="h4">Sign in to NewCord</Typography>
            <Typography variant="body2" sx={{ paddingTop:'31px' }}>로그인 후 이용 가능해요!</Typography>
          </Box>

          <Box
            sx={{
              textAlign: "center",
              paddingTop: "72px",
            }}>
              <LoginKakao />
          </Box>
        </Card>
      </Stack>
    </Box>
  );
}
