import React,{ useState } from 'react';
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

export default function CustomModal({ rightButton, mode, onClose, open, title, contents }) {
  const [textField, setTextField] = useState('');

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
              }}
            >
              {mode !== 'content' && (<Typography id="modal-modal-title" variant="h4" component="h4">
                {title}
              </Typography>)}
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
                    label="#"
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
              {(mode === 'title' || mode === 'content') && (
                <div
                  style={{
                    height: '100%',
                    display: 'flex',
                    // backgroundColor: 'grey',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Typography
                    id="modal-modal-description"
                    color={colors.blueBlack}
                    sx={{
                      // paddingTop: '16px',
                      // mt: '50px',
                      fontSize: 20,
                      textAlign: 'center',
                      // backgroundColor: 'pink',
                    }}
                  >
                    {contents}
                  </Typography>
                </div>
              )}
            </Stack>

          </Box>

          {rightButton && (
            <Stack direction="row" justifyContent="center" sx={{}}>
              <Button onClick={onClose} sx={modal_style.left_button}>
                취소
              </Button>
              <Button sx={modal_style.right_button}>{rightButton}</Button>
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
  contents: PropTypes.string,
};
