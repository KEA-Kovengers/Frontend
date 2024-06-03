import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Cookies from 'js-cookie';
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
import { colors } from 'src/theme/variableColors';

export default function AppAddFilters({ open, onClose, onAdd }) {
  const [textField, setTextField] = useState('');

  const handleAddFilter = () => {
    if (textField.trim() !== '') {
      const newHashtag = textField.trim();

      // Retrieve existing hashtags from the cookie
      const existingHashtags = Cookies.get('hashtags');
      let hashtagsArray = [];

      if (existingHashtags) {
        try {
          hashtagsArray = JSON.parse(existingHashtags);
          if (!Array.isArray(hashtagsArray)) {
            hashtagsArray = [];
          }
        } catch (error) {
          hashtagsArray = [];
        }
      }

      // Add the new hashtag to the array
      hashtagsArray.push(newHashtag);

      // Store the updated list back in the cookie
      Cookies.set('hashtags', JSON.stringify(hashtagsArray), { path: '/' });

      // Optionally, pass the new hashtag to the parent component
      onAdd([newHashtag]);

      // Reset the input field and close the modal
      setTextField('');
      onClose();
    }
  };

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
              justifyContent: 'center',
              display: 'flex',
              height: '63%',
            }}
          >
            <Stack sx={{ width: '80%' }}>
              <Typography id="modal-modal-title" variant="h4" component="h4" color={colors.blueBlack}>
                Hashtag
              </Typography>
              <Typography
                id="modal-modal-description"
                variant="body2"
                component="body2"
                color={colors.textGrey}
                sx={{ fontSize: '16px' }}
              >
                해시태그를 추가해 보세요!
              </Typography>
              <TextField
                id="filter-text"
                label="#"
                value={textField}
                onChange={(e) => setTextField(e.target.value)}
                margin="normal"
                sx={{ width: 330, height: 53 }}
              />
            </Stack>
          </Box>
          <Stack direction="row" justifyContent="center">
            <Button onClick={onClose} sx={modal_style.left_button}>
              취소
            </Button>
            <Button onClick={handleAddFilter} sx={modal_style.right_button}>
              생성
            </Button>
          </Stack>
        </Box>
      </Modal>
    )
  );
}

AppAddFilters.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onAdd: PropTypes.func,
};