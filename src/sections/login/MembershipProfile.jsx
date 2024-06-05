import { useState } from 'react';

import {
  TextField,
  Box,
  Card,
  Stack,
  Typography,
  Button,
} from '@mui/material';
import { PostImage, PostUserInfo } from 'src/api/user.api';
import { Avatar } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import { useAccountStore } from 'src/store/useAccountStore';

import Iconify from 'src/components/iconify';
// ----------------------------------------------------------------------

export default function MembershipProfile() {
  const navigate = useNavigate();
  const [modify, setModify] = useState(false);
  const { accountInfo, updateAccountInfo } = useAccountStore();
  const theme = useTheme();
  const imageSelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function (event) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      console.log(formData);
      if (file) {
        PostImage(formData)
          .then((res) => {
            console.log(res);
            updateAccountInfo('profileImg', res.data);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    };
    input.click();
  };

  const completeModify = () => {
    setModify(!modify);
    PostUserInfo({
      nickName: accountInfo.nickName,
      blogName: accountInfo.blogName,
      profileImg: accountInfo.profileImg,
      bio: accountInfo.bio,
    })
      .then((res) => {
        console.log(res);
        navigate('/')
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
              paddingLeft: "52px",

            }}>
            <Typography variant="h4">Join the membership</Typography>
            <Typography variant="body2" sx={{ paddingTop: '31px' }}>프로필 사진을 선택하세요</Typography>


            <Box
              sx={{
                display: 'flex',
                position: 'relative',
                justifyContent: 'center',
                paddingTop: '30px',
                paddingRight: '52px',
              }}
              onClick={imageSelect}
            >
              <Avatar
                src={accountInfo.profileImg}
                alt="photoURL"
                sx={{
                  width: 140,
                  height: 140,
                  marginLeft: '10px',
                  marginBottom: '10px',
                  zIndex: 0,
                  border: '1px solid #c1c1c1',
                  '&:hover': { opacity: 0.72 },
                }}
              />
            </Box>

            <Button sx={{ ...button, marginTop: '30px' }} onClick={completeModify}>

              Start NewCord
            </Button>
          </Box>
        </Card>
      </Stack>
    </Box>
  )
};

const button = {
  width: '90%',
  height: 60,
  bgcolor: '#1A2CDD',
  color: 'white',
  fontSize: '18px',
}