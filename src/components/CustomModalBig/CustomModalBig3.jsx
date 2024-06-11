import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
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

export default function CustomModalBig2({
  leftButton,
  rightButton,
  mode,
  onClose,
  open,
  title,
  contents,
  rightAction,
  image,
  onformdata
}) {

  const [textField, setTextField] = useState('');
  const [generatedImgUrl, setGeneratedImgUrl] = useState('');
  const [uploadedImgUrl, setUploadedImgUrl] = useState('');
  const [imgUrl, setImgUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const aiCreateCount = useCounter((state) => state.aiCreateCount);
  const decrement = useCounter((state) => state.decrement);
  const reset = useCounter((state) => state.reset);


  // Left button click handler
  const handleLeftButtonClick = () => {
    onClose(); // Close the modal
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

  // Right button click handler
  const handleRightButtonClick = () => {
    rightAction(); // Open 'ai_select' modal
    onClose(); // Close the modal
    console.log('textField:', textField);

    if (textField.trim()) {
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
            console.log('MODE: ', mode);
            setUploadedImgUrl(uploadedUrl);
            setImageUrl(uploadedUrl);
          }
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
        });
    }
  }, [generatedImgUrl,mode]);

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
              AI 생성 이미지
            </Typography>
            <Stack direction="row" alignItems="center">
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
            {onformdata ? (
              <img
                src={onformdata}
                style={{
                  width: '58%',
                  height: '73%',
                  objectFit: 'contain',
                  backgroundColor: colors.divider2,
                }}
              />
            ) : (
              <div
                style={{
                  width: '58%',
                  height: '73%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <CircularProgress />
              </div>
            )}
            </Box>
            {/* <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <Typography
                id="ai-image-description"
                variant="body1"
                sx={{fontSize: '25px' }}
              >
                해당 ai 이미지로 결정하시겠습니까?
              </Typography>
          </Box> */}
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
                  예
                </Button>
              </Stack>
            </Box>
        </Box>
      </Modal>
    )
  );
}

CustomModalBig2.propTypes = {
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
  onformdata: PropTypes.func,
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

