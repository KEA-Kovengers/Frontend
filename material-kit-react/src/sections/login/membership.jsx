import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';

export default function Memembership(){
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
              width: 487,
              height: 573,
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
              <Typography variant="h4">Join the membership</Typography>
              <Typography variant="body2" sx={{ paddingTop:'31px' }}>정보를 입력하세요</Typography>
            </Box>
          </Card>
        </Stack>
      </Box>
    );
}