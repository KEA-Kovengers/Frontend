import React, { useState } from "react";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import { colors } from 'src/theme/variableColors';
import CustomModalBig from 'src/components/CustomModalBig/CustomModalBig';
import CustomModalBig2 from "src/components/CustomModalBig/CustomModalBig2";
import CustomModalBig3 from "src/components/CustomModalBig/CustomModalBig3";
import { useNavigate, useLocation } from 'react-router-dom';
import { useToggle } from 'src/hooks/useToggle';
import { useCounter } from 'src/hooks/useCount';
import { PostObjectUpload } from "src/api/posts.api";

export default function SelectOptionView() {
  const location = useLocation();
  const [title, setTitle] = useState(location.state.title);
  const [tags, setTags] = useState(location.state.tags);
  const [postID, setPostID] = useState(location.state.postId);
  const [thumbnail, setThumbnail] = useState();
  const [thumbnailUrl, setThumbnailUrl] = useState([]);
  // const [uploadedImgUrl, setUploadedImgUrl] = useState('');
  const [isSelected, setIsSelected] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imgFile, setImgFile] = useState(null);
  const count = useCounter((state) => state.count);
  const reset = useCounter((state) => state.reset);

  const navigate = useNavigate();
  const aiModalToggle = useToggle();
  const aiSelectModalToggle = useToggle();
  const aiCreatingModalToggle = useToggle();
  const imageConfirmModalToggle = useToggle();
  const videoConfirmModalToggle = useToggle();
  const aiModalToggle2 = useToggle();
  const aiModalToggle3 = useToggle();
  const [type, setType] = useState('');

  const handleOpenModalClick = (option) => {
    if (option === 'image') {
      setType('IMAGE');
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = async function (event) {
        const file = event.target.files[0];
        const imgUrl = URL.createObjectURL(file);
        const formData = new FormData();
        formData.append('files', file);
        try {
          const response = await PostObjectUpload(formData);
          const thumbnailUrl = response.data;
          setImgFile(file);
          setImageUrl(imgUrl);
          setThumbnail(file);
          setThumbnailUrl(thumbnailUrl);
        } catch (error) {
          console.error('Failed to upload image', error);
        }
        if (file) {
          imageConfirmModalToggle.toggle();
        }
      };
      input.click();
    } else if (option === 'video') {
      setType('VIDEO');
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'video/*';
      input.onchange = function (event) {
        const file = event.target.files[0];
        const video = URL.createObjectURL(file);
        setImageUrl(video);
        if (file) {
          videoConfirmModalToggle.toggle();
        }
      };
      input.click();
    } else if (option === 'ai') {
      setType('AI');
      aiModalToggle2.toggle();
    } else if (option === 'ai_select') {
      setType('AI_SELECT');
      aiModalToggle3.toggle();
    }
    setIsSelected(option);
  };

  const CreateAiImage = () => {
    console.log('CreateAiImage function called');
    handleOpenModalClick('ai_select');
  };

  const [data, setData] = useState('');

  // 자식 컴포넌트로부터 데이터를 받는 콜백 함수
  const handleDataFromChild = (childData) => {
    setData(childData);
    setThumbnail(childData);
    setThumbnailUrl(childData);
    console.log('커스텀 모달 2로부터 받은 childData:', childData);
  };
  
  console.log('SelectOptionView data:', data);

  const ConfirmAiImage = () => {
    reset();
    navigate('/confirm-upload', {
      state: {
        title,
        tags,
        thumbnail,
        thumbnailUrl,
        postID,
        type
      }
    });
  };

  const ConfirmFile = () => {
    navigate('/confirm-upload', {
      state: {
        title,
        tags,
        thumbnail,
        thumbnailUrl,
        postID,
        type
      }
    });
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
      <CustomModalBig
        rightButton={'예'}
        mode={'video'}
        onClose={videoConfirmModalToggle.toggle}
        title={'영상'}
        contents={'해당 영상으로 결정하시겠습니까?'}
        open={videoConfirmModalToggle.isOpen}
        rightAction={ConfirmFile}
        image={{ imgFile: imgFile, imgUrl: imageUrl }}
      />
      <CustomModalBig3
        onClose={aiModalToggle3.toggle}
        title={'AI 생성 이미지'}
        contents={'해당 ai 이미지로 결정하시겠습니까?'}
        open={aiModalToggle3.isOpen}
        rightAction={ConfirmAiImage}
        leftButton={`재설정 ${count}/5`}
        rightButton={'예'}
        onformdata={data}
      />
      <CustomModalBig2
        open={aiModalToggle2.isOpen}
        onClose={aiModalToggle2.toggle}
        rightButton={'생성'}
        title={'AI 생성 이미지'}
        rightAction={() => {
          console.log('Right action button clicked');
          aiModalToggle3.toggle(); // 'CustomModalBig3' 토글
        }}
        onformdata={handleDataFromChild}
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
              sx={{ width: '100%' }}
            >
              <IconButton
                sx={{ flexDirection: 'column', borderRadius: 2 }}
                onClick={() => handleOpenModalClick('image')}
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
                onClick={() => handleOpenModalClick('video')}
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
                onClick={() => handleOpenModalClick('ai')}
              >
                <Iconify
                  icon="ri:robot-3-fill"
                  sx={{
                    width: 150,
                    height: 150,
                    color: colors.textGrey1
                  }}
                />
                <div>AI 생성 이미지</div>
              </IconButton>
              <IconButton
                sx={{ flexDirection: 'column', borderRadius: 2 }}
                onClick={() => handleOpenModalClick('none')}
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
