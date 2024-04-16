import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

import { colors } from 'src/theme/variableColors';
import { useState } from 'react';
import CustomModalBig from 'src/components/CustomModalBig/CustomModalBig';
import CustomModal from 'src/components/CustomModal/CustomModal';

export default function SelectOptionView() {
  const [isSelected, setIsSelected] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClick = (option) => {
    setIsSelected(option);
  };

  const handleOpenModalClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
      <Button onClick={handleOpenModalClick}>모달 테스트</Button>
      <CustomModal
        rightButton={'생성'}
        // mode={'textfield'}
        mode={'textfield'}
        onClose={handleCloseModal}
        title={'모달 테스트'}
        contents={'모달 테스트입니다.'}
        open={isModalOpen}
      />
    </Box>
  );

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
          <Typography variant="h3" sx={{ mb: 3 }}>
            Select Thumbnail
          </Typography>

          <Typography sx={{ color: 'text.secondary' }}>
            게시글을 대표할 썸네일의 형식을 선택해주세요!
          </Typography>

          <Box
            sx={{
              mx: 'auto',
              height: 200,
              width: '80%',
              my: { xs: 5, sm: 10 },
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Grid
              container
              justifyContent="space-around"
              //   spacing={1}
              sx={{ width: '100%' }}
            >
              <IconButton
                sx={{ flexDirection: 'column', borderRadius: 2 }}
                onClick={() => handleClick('image')} // Use arrow function to pass a function reference
              >
                <Iconify
                  icon="eva:image-2-fill"
                  sx={{
                    width: 150,
                    height: 150,
                    color: isSelected === 'image' ? colors.second : colors.textGrey1,
                  }}
                />
                <div>사진 첨부</div>
              </IconButton>
              <IconButton
                sx={{ flexDirection: 'column', borderRadius: 2 }}
                onClick={() => handleClick('video')} // Use arrow function to pass a function reference
              >
                <Iconify
                  icon="eva:video-fill"
                  sx={{
                    width: 150,
                    height: 150,
                    color: isSelected === 'video' ? colors.second : colors.textGrey1,
                  }}
                />
                <div>영상</div>
              </IconButton>
              <IconButton
                sx={{ flexDirection: 'column', borderRadius: 2 }}
                onClick={() => handleClick('ai')} // Use arrow function to pass a function reference
              >
                <Iconify
                  icon="ri:robot-3-fill"
                  sx={{
                    width: 150,
                    height: 150,
                    color: isSelected === 'ai' ? colors.second : colors.textGrey1,
                  }}
                />
                <div>AI 생성 이미지</div>
              </IconButton>
              <IconButton
                sx={{ flexDirection: 'column', borderRadius: 2 }}
                onClick={() => handleClick('none')} // Use arrow function to pass a function reference
              >
                <Box
                  component="img"
                  src={
                    isSelected === 'none'
                      ? '/assets/icons/selected_logo.svg'
                      : '/assets/icons/none_logo.svg'
                  }
                  sx={{
                    mx: 'auto',
                    height: 150,
                    padding: 1,
                  }}
                />
                <div>선택 안 함</div>
              </IconButton>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
}
