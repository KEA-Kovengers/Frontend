import { useEffect,useState } from 'react';
import PropTypes from "prop-types";

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

import { useNavigate, useLocation } from 'react-router-dom';

import { useAccountStore } from 'src/store/useAccountStore';

import UploadCardInfo from './UploadCardInfo';
import { PostEdit } from "src/api/posts.api";

// confirm/upload 페이지
export default function ConfirmUploadPage() {

  const navigate = useNavigate();

  const location = useLocation();
  const [title, setTitle] = useState(location.state.title);
  const [tags, setTags] = useState(location.state.tags);
  const [thumbnail, setThumbnail] = useState(location.state.thumbnail);
  const [thumbnailUrl, setThumbnailUrl] = useState(location.state.thumbnailUrl);
  const [ postID, setPostID ] = useState(location.state.postID);
  // const postID = '1180';
  // const articleID = '1';

  console.log('confirm-upload title: ',title);
  console.log('confirm-upload tags: ',tags);
  console.log('confirm-upload thumbnail Url: ',thumbnailUrl);
  console.log('confirm-upload postID: ',postID);

  const { accountInfo } = useAccountStore();

  const item = {
    info: {
      userImage: accountInfo.profileImg,
      title: title,
      userName: accountInfo.blogName,
      hashtags: tags,
      // date: '2024-03-15',
    }
  }

  // POST
  // MdEditorWithHeader에서 받은 제목,내용,해시태그로 완료 버튼을 누르면 /posts/editPost API 요청
  const editPost = async () => {
    try{
      const requestBody ={
        id: postID,
        thumbnail: `${thumbnailUrl}`,
        title: title,
        // body: "",
        // hashtags: tags,
        status: 'POST',
      };
      const response = await PostEdit(requestBody);

      console.log('POST response: ',response);
      console.log('confirm upload id: ',postID);

      if(response.data && response.data.isSuccess) {
        console.log('Post created successfully');
      }else {
        console.error('API response was not successful');
      } 
    }
    catch (error) {
      console.error("There has been a problem with your editPost fetch operation: ", error);
    }
  };
  

  const handleComplete = () => {
    navigate('/');
    editPost();
  }

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
            {/* <img src={URL.createObjectURL(thumbnail)} alt="Thumbnail" /> */}
            <img src={thumbnailUrl} alt="Thumbnail" />
            <UploadCardInfo info={[item.info]} />
          </div>
          <Typography sx={{ color: 'text.secondary' }}>위 게시물로 업로드 하겠습니까?</Typography>
          <Stack direction="row" justifyContent="space-between" sx={{ width: '33%', marginTop: 5 }}>
            <Button sx={modal_style.left_button} onClick={() => navigate(-1)}>
              아니오
            </Button>
            <Button sx={modal_style.right_button} onClick={handleComplete}>
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
