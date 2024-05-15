import React, { useState } from 'react';
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
import Iconify from 'src/components/iconify';
import { colors } from '../../theme/variableColors';

const modal_style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 270 * 1.534,
  height: 270,
  bgcolor: 'background.paper',
  borderRadius: 3,

  left_button: {
    width: 120,
    height: 40,
    border: '3px solid #E3E6FF',
    borderRadius: 3,
    color: 'black',
    marginRight: '49px',
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

export default function CustomModal({
  rightButton,
  mode,
  onClose,
  open,
  title,
  label,
  contents,
  colorText,
  buttonAction,
}) {
  const [textField, setTextField] = useState('');

  // left button
  const handleLeftButtonClick = () => {
    onClose(); // Close the modal //현재 모달 닫기
    buttonAction.leftAction();
  };
  //right button
  const handleRightButtonClick = () => {
    buttonAction.rightAction(); // Open 'ai_select' modal
    console.log('handleRightButtonClick');
    onClose(); // Close the modal
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
          {mode !== 'content' && (
            <Typography
              id="modal-modal-title"
              variant="h4"
              component="h4"
              sx={{ zIndex: 2, position: 'fixed', mt: '13px', ml: '15px' }}
            >
              {title}
            </Typography>
          )}
          <div style={{ display: 'flex', justifyContent: 'end', zIndex: 2 }}>
            <IconButton onClick={onClose} sx={{ mt: '5px', mr: '5px' }}>
              <Iconify icon="eva:close-fill" sx={{ width: '25px', height: '25px' }} />
            </IconButton>
          </div>

          <Box
            sx={{
              // mt: '20px',
              justifyContent: 'center',
              display: 'flex',
              // backgroundColor: 'grey',
              height: '63%',
            }}
          >
            <Stack
              sx={{
                // mt: '20px',
                // pl: '68px',
                width: '80%',
                // backgroundColor: 'pink',
                justifyContent: mode === 'textfield' && 'center',
              }}
            >
              {mode === 'textfield' && (
                <>
                  <Typography
                    id="modal-modal-description"
                    variant="body2"
                    component="body2"
                    color="text.secondary"
                    sx={{ fontSize: '16px' }}
                  >
                    {contents}
                  </Typography>
                  <TextField
                    id="filter-text"
                    label={label}
                    value={textField}
                    onChange={(e) => setTextField(e.target.value)}
                    margin="normal"
                    sx={{
                      width: 330,
                      height: 53,
                    }}
                  />
                </>
              )}
              {mode !== 'textfield' && (
                <div
                  style={{
                    height: '100%',
                    display: 'flex',
                    // backgroundColor: 'grey',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                  }}
                >
                  {mode !== 'video' ? (
                    <>
                      {colorText && (
                        <Typography
                          id="modal-modal-description"
                          variant="h5"
                          color="primary"
                          sx={{ fontSize: '16px' }}
                        >
                          {colorText}
                        </Typography>
                      )}
                      <Typography
                        id="modal-modal-description"
                        color={colors.blueBlack}
                        sx={{
                          // paddingTop: '16px',
                          ml: 1,
                          fontSize: 20,
                          // textAlign: 'center',
                          // backgroundColor: 'pink',
                        }}
                      >
                        {contents}
                      </Typography>
                    </>
                  ) : (
                    <Stack direction="row" justifyContent="space-around" spacing={6}>
                      <Button
                        variant="contained"
                        style={{
                          flexDirection: 'column',
                          width: 115,
                          height: 80,
                          borderRadius: 17,
                        }}
                        onClick={handleLeftButtonClick}
                      >
                        <Iconify icon="majesticons:video-plus" sx={{ width: 45, height: 45 }} />
                        영상 첨부
                      </Button>
                      <Button
                        variant="contained"
                        style={{
                          flexDirection: 'column',
                          width: 115,
                          height: 80,
                          borderRadius: 17,
                        }}
                        onClick={handleRightButtonClick}
                      >
                        <Iconify
                          icon="material-symbols-light:movie-edit"
                          sx={{ width: 45, height: 45 }}
                        />
                        영상 편집
                      </Button>
                    </Stack>
                  )}
                </div>
              )}
            </Stack>
          </Box>

          {rightButton && (
            <Stack direction="row" justifyContent="center" sx={{}}>
              <Button onClick={onClose} sx={modal_style.left_button}>
                취소
              </Button>
              <Button sx={modal_style.right_button} onClick={handleRightButtonClick}>
                {rightButton}
              </Button>
            </Stack>
          )}
        </Box>
      </Modal>
    )
  );
}

CustomModal.propTypes = {
  //   modalConfig: PropTypes.object.isRequired,
  mode: PropTypes.string,
  rightButton: PropTypes.string,
  onClose: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
  label: PropTypes.string,
  contents: PropTypes.string,
  colorText: PropTypes.string,
  buttonAction: PropTypes.shape({
    leftAction: PropTypes.func,
    rightAction: PropTypes.func,
  }),
};
