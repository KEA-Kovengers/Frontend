import React from 'react';
import PropTypes from 'prop-types';

// import IconButton from '@mui/material/IconButton';

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
import LinearProgress from '@mui/material/LinearProgress';

import Iconify from 'src/components/iconify';
import { colors } from '../../theme/variableColors';

import { useState } from 'react';
import { secondary } from 'src/theme/palette';

import { useCounter } from 'src/commons/store/aiCreateCount';
import { set } from 'lodash';

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

  const [progress, setProgress] = React.useState(0);

  // React.useEffect(() => {
  //   if (mode === 'ai_creating') {
  //     const timer = setInterval(() => {
  //       setProgress((oldProgress) => {
  //         if (oldProgress === 100) {
  //           console.log('rightAction');
  //           rightAction();
  //           onClose();
  //           return null;
  //         }
  //         const diff = Math.random() * 10;
  //         return Math.min(oldProgress + diff, 100);
  //       });
  //     }, 500);
  //   }
  // }, [mode]);

  const aiCreateCount = useCounter((state) => state.aiCreateCount);
  const decrement = useCounter((state) => state.decrement);
  const reset = useCounter((state) => state.reset);

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

  // left button
  const handleLeftButtonClick = () => {
    onClose(); // Close the modal //현재 모달 닫기
    if (mode === 'ai_select') {
      decrement(); // count -1
      console.log('aiCreateCount decrement', aiCreateCount);
      //이미지 재생성 추가
    }
    if (mode === 'image' || mode === 'video') {
      //파일 다시 선택
    }
  };
  //right button
  const handleRightButtonClick = () => {
    rightAction(); // Open 'ai_select' modal
    onClose(); // Close the modal
    if (mode === 'ai') {
      console.log('aiCreateCount', aiCreateCount);
      // AI 이미지 생성 추가
    }
  };
  //자동 완성 버튼
  const handleAutoComplete = () => {
    setTextField('나는 오늘 팀원들과 회의를 마치고 피자를 먹었다.');
  };

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
              // backgroundColor: colors.divider2,
              // paddingBottom: '20px',
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
          {mode === 'ai_creating' && (
            <Box sx={{ width: '100%', mt: 2 }}>
              <LinearProgress
                variant="determinate"
                value={progress}
                style={{ height: '5px', borderRadius: 2 }}
              />
            </Box>
          )}
          <Box
            sx={{
              // mt: '20px',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
              // backgroundColor: 'lightgrey',
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
                  // '& textarea': {
                  //   height: '280px', // Adjust the height as needed
                  // },
                }}
              />
            )}

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                // justifyContent: 'center',
                alignItems: 'center',
                // backgroundColor: 'pink',
              }}
            >
              {mode !== 'ai_creating' && (
                <Box
                  component={mode === 'video' ? 'video' : 'img'}
                  // alt={title}

                  src={image.imgUrl}
                  sx={{
                    width: '50%',
                    height: '30%',
                    objectFit: 'cover',
                    backgroundColor: colors.divider2,
                  }}
                />
              )}
              <Typography
                id="ai-image-description"
                component="body1"
                sx={{ mt: '10px', fontSize: '25px' }}
              >
                {contents}
              </Typography>
            </Box>
          </Box>

          {rightButton && (
            <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
              <Stack direction="row" justifyContent="space-between" sx={{ width: '42%' }}>
                <Button
                  onClick={handleLeftButtonClick}
                  sx={modal_style.left_button}
                  disabled={aiCreateCount === 0}
                >
                  {mode === 'ai_select'
                    ? `재생성 ${aiCreateCount}/5`
                    : mode === 'ai'
                      ? '취소'
                      : '아니오'}
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
  //   modalConfig: PropTypes.object.isRequired,
  mode: PropTypes.string,
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
