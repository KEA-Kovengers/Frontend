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

import { useToggle } from 'src/hooks/useToggle';

import { useCounter } from 'src/hooks/aiCreateCount';

export default function SelectOptionView() {
  const [isSelected, setIsSelected] = useState(null);
  const [imageUrl, setImageUrl] = useState(null); // State to store the image URL
  const [imgFile, setImgFile] = useState(null); // State to store the image file

  const count = useCounter((state) => state.count);
  const decrement = useCounter((state) => state.decrement);
  const reset = useCounter((state) => state.reset);

  // Define toggle hooks for modals
  const aiModalToggle = useToggle();
  const aiSelectModalToggle = useToggle();
  const aiCreatingModalToggle = useToggle();
  const imageConfirmModalToggle = useToggle();
  const videoSelectModalToggle = useToggle();
  const videoConfirmModalToggle = useToggle();

  const uploadVideo = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'video/*';
    input.onchange = function (event) {
      const file = event.target.files[0];
      const video = URL.createObjectURL(file);
      console.log('video', video);
      setImageUrl(video);
      if (file) {
        videoConfirmModalToggle.toggle();
      }
    };
    input.click();
  };

  const handleOpenModalClick = (option) => {
    if (option === 'image') {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = function (event) {
        const file = event.target.files[0];
        console.log('file', file);
        const imgUrl = URL.createObjectURL(file);
        setImageUrl(imgUrl);
        console.log('imgUrl', imgUrl);
        if (file) {
          imageConfirmModalToggle.toggle();
        }
      };
      input.click();
    }
    // if (option === 'video') {
    //   const input = document.createElement('input');
    //   input.type = 'file';
    //   input.accept = 'video/*';
    //   input.onchange = function (event) {
    //     const file = event.target.files[0];
    //     const video = URL.createObjectURL(file);
    //     console.log('video', video);
    //     setImageUrl(video);
    //     if (file) {
    //       videoConfirmModalToggle.toggle();
    //     }
    //   };
    //   input.click();
    // }
    setIsSelected(option);
    // {
    //   option === 'image' && fileConfirmModalToggle.toggle();
    // }
    {
      option === 'video' && videoSelectModalToggle.toggle();
    }
    if (option === 'ai') {
      aiModalToggle.toggle();
    } else if (option === 'ai_select') {
      aiSelectModalToggle.toggle();
    }
  };
  //rightAction 함수
  const CreateAiImage = () => {
    console.log('CreateAiImage');
    // aiCreatingModalToggle.toggle();

    aiSelectModalToggle.toggle();
  };
  const ConfirmAiImage = () => {
    console.log('ConfirmAiImage');
    reset();
  };
  const ConfirmFile = () => {
    console.log('ConfirmFile');
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

      <CustomModalBig
        rightButton={'예'}
        mode={'img'}
        onClose={imageConfirmModalToggle.toggle}
        title={'사진'}
        contents={'해당 사진으로 결정하시겠습니까?'}
        open={imageConfirmModalToggle.isOpen}
        rightAction={ConfirmFile}
        image={{ imgFile: imgFile, imgUrl: imageUrl }}
      />
      <CustomModal
        mode={'video'}
        onClose={videoSelectModalToggle.toggle}
        title={'영상'}
        open={videoSelectModalToggle.isOpen}
        buttonAction={{ leftAction: uploadVideo, rightAction: null }}
      />
      <CustomModalBig
        rightButton={'예'}
        mode={'video'}
        onClose={videoConfirmModalToggle.toggle}
        title={'영상'}
        contents={'해당 영상으로 결정하시겠습니까?'}
        open={videoConfirmModalToggle.isOpen}
        rightAction={ConfirmFile}
        // image={imgFile, imageUrl}
      />
      <CustomModalBig
        rightButton={'생성'}
        mode={'ai'}
        onClose={aiModalToggle.toggle}
        title={'AI 생성 이미지'}
        open={aiModalToggle.isOpen}
        leftButton={'취소'}
        rightAction={CreateAiImage}
      />
      <CustomModalBig
        mode={'ai_creating'}
        onClose={aiCreatingModalToggle.toggle}
        title={'AI 생성 이미지'}
        contents={'이미지를 생성 중입니다...'}
        open={aiCreatingModalToggle.isOpen}
        rightAction={aiSelectModalToggle.toggle}
      />
      <CustomModalBig
        rightButton={'예'}
        mode={'ai_select'}
        onClose={aiSelectModalToggle.toggle}
        title={'AI 생성 이미지'}
        contents={'해당 사진으로 결정하시겠습니까?'}
        open={aiSelectModalToggle.isOpen}
        rightAction={ConfirmAiImage}
        // leftButton={`재설정 ${count}/5`}
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
                onClick={() => handleOpenModalClick('image')} // Use arrow function to pass a function reference
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
                onClick={() => handleOpenModalClick('video')} // Use arrow function to pass a function reference
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
                onClick={() => handleOpenModalClick('ai')} // Use arrow function to pass a function reference
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
