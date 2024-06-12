import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Logo from 'src/components/logo';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAccountStore } from 'src/store/useAccountStore';
import UploadCardInfo from './UploadCardInfo';
import { PostEdit } from 'src/api/posts.api';

// confirm/upload 페이지
export default function ConfirmUploadPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const [title, setTitle] = useState(location.state.title);
  const [tags, setTags] = useState(location.state.tags);
  const [thumbnailUrl, setThumbnailUrls] = useState(location.state.thumbnailUrl || []);
  const type = location.state.type;
  const [postID, setPostID] = useState(location.state.postID);

  useEffect(() => {
    console.log('confirm-upload 타입: ', location.state.type);
    console.log('url', location.state.thumbnailUrl);
  }, []);
  const { accountInfo } = useAccountStore();

  const item = {
    info: {
      userImage: accountInfo.profileImg,
      title: title,
      userName: accountInfo.blogName,
      hashtags: tags,
    },
  };

  const editPost = () => {
    try {
      const thumbnails = thumbnailUrl.map((url) => ({ url, type: type }));
      console.log('===============');
      console.log(postID);
      const requestBody = {
        id: postID,
        thumbnails: thumbnails,
        title: title,
        status: 'POST',
      };
      const response = PostEdit(requestBody);

      console.log('POST response: ', response);
      console.log('confirm upload id: ', postID);

      if (response.data) {
        console.log('Post created successfully');
      }
    } catch (error) {
      console.error('There has been a problem with your editPost fetch operation: ', error);
    }
  };

  const handleComplete = () => {
    editPost();
    navigate('/');
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
            {thumbnailUrl.length > 0 ? (
              thumbnailUrl.map((url, index) => (
                <img
                  key={index}
                  src={url}
                  alt={`Thumbnail ${index + 1}`}
                  style={{ width: '100%', marginBottom: 10, objectFit: 'cover' }}
                  onError={(e) => {
                    console.error(`Failed to load image at ${url}`);
                    e.target.src = 'path/to/default-image.jpg'; // Fallback image
                  }}
                />
              ))
            ) : (
              <Typography>No thumbnails available</Typography>
            )}
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
