import React,{ useState } from 'react';
import PropTypes from 'prop-types';

import {
  Box,
  IconButton,
  Stack,
  Modal,
  TextField,
  InputAdornment,
} from '@mui/material';

import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';

import Iconify from 'src/components/iconify';
import InviteList from './InviteList';

// ----------------------------------------------------------------------

export default function InviteModal({ friends, open, onClose}) {

  const [textField, setTextField] = useState('');

  const modal_style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: '50%',
    bgcolor: 'background.paper',
    borderRadius: 3,

    invite_button: {
      width: 50,
      height: 30,
      bgcolor: '#1A2CDD',
      borderRadius: 3,
      color: 'white',
      fontSize: '15px',
      fontWeight: 300
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
                height: '100%',
            }}
        >

        <Stack
            sx={{
            width: '80%',
            justifyContent: 'space-between', // 내부 요소를 가로 정렬하고 동시에 간격을 분배
            }}
        >
        
        {/* 검색창에 검색했을 때 친구 이름 리스트가 뜨고, 검색된 단어에 해당되는 이름만 뜨게끔 */}
        <Autocomplete
            autoHighlight
            popupIcon={null}
            slotProps={{
                paper: {
                sx: {
                    width: 320,
                    [`& .${autocompleteClasses.option}`]: {
                    typography: 'body2',
                    },
                },
                },
            }}
            options={friends}
            getOptionLabel={(option) => option.name || " " }
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (

            <TextField
            {...params}
            placeholder="공유 작업을 할 친구의 이름을 검색하세요."
            InputProps={{
                ...params.InputProps,
                startAdornment: (
                <InputAdornment position="start">
                    <IconButton>
                        <Iconify icon="eva:search-fill" sx={{ width: 20, height: 20, color: 'text.disabled' }} />
                    </IconButton>
                </InputAdornment>
                ),
            }}
            />
        )}
        />

        <InviteList friends={friends} />

        </Stack>
        </Box>
        </Box>

      </Modal>
    )
  );
}

InviteModal.propTypes = {
    friends: PropTypes.array.isRequired,
    open: PropTypes.bool,
    onClose: PropTypes.func,
};
