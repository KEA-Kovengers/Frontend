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

import { useCounter } from 'src/hooks/aiCreateCount';
import { PostSummary, PostGenerateImage } from 'src/api/ai.api';

import { styled } from 'styled-components';

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
  const [imgUrl, setImgUrl] = React.useState('');

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
    PostGenerateImage(textField)
      .then((res) => {
        console.log(res);
        setImgUrl(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    onClose(); // Close the modal
    if (mode === 'ai') {
      console.log('aiCreateCount', aiCreateCount);
      // AI 이미지 생성 추가
    }
  };
  //자동 완성 버튼
  const handleAutoComplete = () => {
    //여기서 하면 돼요 res를 가공해서 띄우세여
    PostSummary(
      '집사님들이라면 공감하실거예요. 고양이 감기 증상 때문에 스트레스 받았던 1인입니다. 처음에는 훌쩍거리는 단순한 코감기만 있었던 것 같은데 이제는 눈곱까지 생기면서 문제가 생기기 시작했어요. 최근에 계속 이런 상태라서 카페에 찾아보니까 혹시 허피스가 아니냐고 했어요. 그래서 영양제를 먹이면 더 나을거라고 해서 좋은 제품을 소개받게 되었어요. 많은 분들이 직접 급여해보고 괜찮다고 말씀하시니까 저도 먹이고픈 마음이 들었거든요. 허피스바이러스는 보통 일주일 잠복기가 있고 콧물부터 눈곱, 눈이 충혈되며 기침까지 다양한 증상이 나타날 수 있다고 해요. 심각해지면 결막염과 폐렴, 구내염까지 생길 수 있어요. 꾸준히 관리를 해주지 않으면 언제든 또 발병을 할 수 있어서 계속 케어가 필요하다고 해요. 이게 없어지는건줄 알았는데 그렇지 않고 계속 잠복해있다가 나타나는 거라고 해요. 보통 열마리중 여덞마리는 이 바이러스를 보유하고 있고 무증상으로 계속 배출한다고해요. 저희 아이의 경우에는 눈곱도 많이 늘어났는데다 계속 기침도 하기 시작했어요. 열도 나는 증상이 있다는데 다행히 열은 없긴 했었거든요. 의심되는 상황이라면 계속 내버려두지 말고 일단 케어를 받는 것이 중요해요. 그리고 나서 다 낫고 난 후라도 영양제와 같은 방법으로 쭉 관리를 해주어야겠더라고요.'
    )
      .then((res) => {
        console.log(res);
        console.log(res.data);
        setTextField(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
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
              {(mode === 'video' || mode === 'img') && (
                <Box
                  component={mode === 'video' ? 'video' : 'img'}
                  // alt={title}

                  src={image.imgUrl}
                  // src={imgUrl}
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
