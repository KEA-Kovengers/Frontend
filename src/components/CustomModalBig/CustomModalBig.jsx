import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import {
  Container,
  Box,
  Button,
  IconButton,
  Stack,
  Modal,
  Typography,
  TextField,
} from '@mui/material';

import Iconify from 'src/components/iconify';
import { colors } from '../../theme/variableColors';

import { secondary } from 'src/theme/palette';

import { useCounter } from 'src/hooks/useCount';
import { PostSummary, PostGenerateImage } from 'src/api/ai.api';

import { styled } from 'styled-components';

import { useEditStore } from 'src/store/useEditStore';

import { PostObjectUpload } from 'src/api/posts.api';

import { CircularProgress } from '@mui/material';

export default function CustomModalBig({
  leftButton,
  rightButton,
  mode,
  onClose,
  open,
  title,
  contents,
  rightAction,
  image,
}) {

  const [textField, setTextField] = useState('');
  const [generatedImgUrl, setGeneratedImgUrl] = useState('');
  const [uploadedImgUrl, setUploadedImgUrl] = useState('');
  // const [imgUrl, setImgUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imgFile, setImgFile] = useState(null); // State to store the image file
  const [thumbnail, setThumbnail] = useState(null); // State to store the thumbnail
  const [thumbnailUrl, setThumbnailUrl] = useState(''); // State to store the thumbnail URL

  const aiCreateCount = useCounter((state) => state.aiCreateCount);
  const decrement = useCounter((state) => state.decrement);
  const reset = useCounter((state) => state.reset);


  // Left button click handler
  const handleLeftButtonClick = () => {
    onClose(); // Close the modal
    if (mode === 'ai_select') {
      decrement(); // count -1
      console.log('aiCreateCount decrement', aiCreateCount);
      console.log('textField:', textField);

    if (textField.trim()) {
      // Regenerate image
      PostGenerateImage(textField)
        .then((res) => {
          // setImgUrl(res.data);
          setGeneratedImgUrl(res.data);
          setImageUrl(res.data);
          console.log('Generated image', res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    }
  }

  // Right button click handler
  const handleRightButtonClick = () => {
    rightAction(); // Open 'ai_select' modal
    onClose(); // Close the modal
    console.log('textField:', textField);

    if (mode === 'ai'&& textField.trim()) {
      PostGenerateImage(textField)
        .then((res) => {
          // setImgUrl(res.data);
          setGeneratedImgUrl(res.data);
          setImageUrl(res.data);
          console.log('Generated image', res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      }
  };

  // Auto complete button click handler
  const handleAutoComplete = () => {
    PostSummary(
      '집사님들이라면 공감하실거예요. 고양이 감기 증상 때문에 스트레스 받았던 1인입니다...'
    )
      .then((res) => {
        setTextField(res.data.summary);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Function to convert image URL to file
  const convertImgUrlToFile = async(url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const filename = url.substring(url.lastIndexOf('/') + 1).split('?')[0];
      const file = new File([blob], filename, { type: blob.type });
      console.log('Converted File:', file);
      return file;
    } catch (error) {
      console.error('Error converting imgUrl to File:', error);
    }
  };

  // Component did update for imgUrl
  useEffect(() => {
    if (generatedImgUrl) {
      convertImgUrlToFile(generatedImgUrl)
        .then((file) => {
          if (file) {
            const formData = new FormData();
            formData.append('files', file);
            return PostObjectUpload(formData);
          }
        })
        .then((response) => {
          if (response?.data) {
            const uploadedUrl = response.data;
            console.log('Upload response:', uploadedUrl);
            setUploadedImgUrl(uploadedUrl);
            setImageUrl(uploadedUrl);
          }
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
        });
    }
  }, [generatedImgUrl]);


  // useEffect(() => {
  //   if (generatedImgUrl) {
  //     convertImgUrlToFile(generatedImgUrl)
  //       .then((file) => {
  //         if (file) {
  //           const formData = new FormData();
  //           formData.append('files', file);

  //           PostObjectUpload(formData)
  //             .then((response) => {
  //               const uploadedUrl = response.data;
  //               console.log('Upload response:', uploadedUrl);
                
  //               // setImageUrl(uploadedUrl);
  //               setUploadedImgUrl(uploadedUrl);

  //               console.log('이미지 URL:', imageUrl);
  //             })
  //             .catch((error) => {
  //               console.error('Error uploading file:', error.response?.data || error.message);
  //             })
  //         }
  //       })
  //       .catch((error) => {
  //         console.error('Error converting imgUrl to File:', error);
  //       });
  //   }
  // }, [generatedImgUrl]);

  // // console.log('받아온 이미지 URL:', imageUrl);
  // const sendImageUrl = (imgUrl) => {
  //    navigate("/select-thumbnail", { state: { imageUrl: imgUrl } })
  // };


  return (
    open && (
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ display: 'flex' }}
      >
        <Box sx={modal_style}>
          <div
            style={{
              display: 'flex',
              zIndex: 2,
              justifyContent: 'space-between',
              alignItems: 'start',
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h3"
              component="h3"
              sx={{ marginLeft: '20px', marginTop: '20px', fontSize: 30 }}
            >
              {title}
            </Typography>
            <Stack direction="row" alignItems="center">
              {mode === 'ai' && (
                <Button
                  variant="contained"
                  sx={{ borderRadius: 30, height: '27px' }}
                  onClick={handleAutoComplete}
                >
                  자동 완성
                </Button>
              )}
              <IconButton onClick={onClose}>
                <Iconify icon="eva:close-fill" sx={{ width: '35px', height: '35px' }} />
              </IconButton>
            </Stack>
          </div>
          <Box
            sx={{
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              height: '75%',
            }}
          >
            {mode === 'ai' && (
              <TextField
                id="outlined-basic"
                value={textField}
                onChange={(e) => setTextField(e.target.value)}
                variant="outlined"
                placeholder="원하는 내용을 입력해주세요."
                multiline
                rows={10}
                maxRows={10}
                color="secondary"
                sx={{
                  width: '80%',
                  borderRadius: 2,
                  borderColor: colors.divider2,
                }}
              />
            )}

            {mode === 'ai_select' && !uploadedImgUrl ? (
              <CircularProgress />  
            ) : (
              mode !== 'ai' && 
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '90%',
                  height: '100%',
                }}
              >
                {(mode === 'video' || mode === 'img' || mode === 'ai_select') && (
                  <Box
                    component={mode === 'video' ? 'video' : 'img'}
                    src={mode === 'ai_select' ? uploadedImgUrl   : image.imgUrl}
                    // src={mode === 'ai_select' ? imageUrl  : image.imgUrl}
                    // src={mode === 'ai_select' ? file : image.thumbnailUrl}
                    sx={{
                      width: '58%',
                      height: '73%',
                      objectFit: 'contain',
                      backgroundColor: colors.divider2,
                    }}
                  />
                )}
                <Typography
                  id="ai-image-description"
                  variant="body1"
                  sx={{ mt: '10px', fontSize: '25px' }}
                >
                  {contents}
                </Typography>
              </Box>
            )}
          </Box>
          {rightButton && (
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <Stack direction="row" justifyContent="space-between" sx={{ width: '42%' }}>
                <Button
                  onClick={handleLeftButtonClick}
                  sx={modal_style.left_button}
                  disabled={aiCreateCount === 0}
                >
                  {leftButton ? `재생성 ${aiCreateCount}/5` : mode === 'ai' ? '취소' : '아니오'}
                </Button>
                <Button onClick={handleRightButtonClick} sx={modal_style.right_button}>
                  {rightButton}
                </Button>
              </Stack>
            </Box>
          )}
        </Box>
      </Modal>
    )
  );
}

CustomModalBig.propTypes = {
  mode: PropTypes.string,
  leftButton: PropTypes.string,
  rightButton: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
  contents: PropTypes.string,
  rightAction: PropTypes.func,
  image: PropTypes.shape({
    imgUrl: PropTypes.string,
    imgFile: PropTypes.object,
  }),
};

const modal_style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '63%',
  height: '63%',
  bgcolor: 'background.paper',
  borderRadius: 2,
  // justifyContent: 'center',
  flexDirection: 'column',
  display: 'flex',

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

