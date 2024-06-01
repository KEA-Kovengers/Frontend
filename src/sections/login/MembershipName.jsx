import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PostupdateName } from 'src/api/user.api';
import {
  TextField,
  Box,
  Card,
  Stack,
  Typography,
  Button,
} from '@mui/material';

import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import { useAccountStore } from 'src/store/useAccountStore';
// import MembershipProfile from './MembershipProfile';

// ----------------------------------------------------------------------

export default function MembershipName() {
  const theme = useTheme();
  // const [textField, setTextField] = useState('');
  // const [textField2, setTextField2] = useState('');

  const { accountInfo, updateAccountInfo } = useAccountStore();

  const navigate = useNavigate();

  const handleNextClick = () => {
    //update name api 호출
    // updateName();
    navigate('/membership-profile',);
    // { state: { nickname: textField, blogName: textField2 } });
  };

  const updateName = () => {
    PostupdateName(accountInfo.nickName, accountInfo.blogName)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
              textAlign: 'center',
              paddingTop: '43px'
            }}>
            <Logo />
          </Box>

          <Box
            sx={{
              textAlign: "left",
              paddingTop: "45.11px",
              paddingLeft: "52px"
            }}>
            <Typography variant="h4">Join the membership</Typography>
            <Typography variant="body2" sx={{ paddingTop: '31px' }}>정보를 입력하세요</Typography>
            <TextField
              id="filter-text"
              label="Nickname"
              // value={textField}
              defaultValue={accountInfo.nickName}
              onChange={(e) => updateAccountInfo('nickName', e.target.value)}
              margin="normal"
              sx={{
                width: '90%',
                height: 53,
              }}
            />
            <TextField
              id="filter-text2"
              label="Blog Name"
              defaultValue={accountInfo.blogName}
              // value={textField2}
              onChange={(e) => updateAccountInfo('blogName', e.target.value)}
              margin="normal"
              sx={{
                width: '90%',
                height: 53,
              }}
            />
            <Button
              onClick={handleNextClick}
              sx={{ ...button, marginTop: '30px' }}>
              Next
            </Button>
          </Box>
        </Card>
      </Stack>
    </Box>
  );
}

const button = {
  width: '90%',
  height: 60,
  bgcolor: '#1A2CDD',
  color: 'white',
  fontSize: '18px',

}