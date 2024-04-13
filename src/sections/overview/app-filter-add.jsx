import {useState} from 'react';
import PropTypes from 'prop-types';

import {Box,Stack,Modal,Button,TextField,Typography} from '@mui/material';

// ----------------------------------------------------------------------

export default function AppAddFilters({ open, onClose, onAdd }){
    const [newFilterText,setNewFilterText] = useState('');

    const handleAddFilter = () => {
        if (newFilterText.trim() !== '') {
          onAdd([newFilterText.trim()]);
          onClose();
          setNewFilterText('');
        }
      };

      const modal_style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 537,
        height: 350,
        bgcolor: 'background.paper',
        borderRadius: 3,
      
        left_button: {
          width:155,
          height:51,
          border: '3px solid #E3E6FF', 
          borderRadius: 3,
          color: 'black',
          marginRight: '49px', 
          fontSize:'18px',
        },
        right_button: {
          width:155,
          height:51,
          bgcolor:'#1A2CDD',
          borderRadius: 3,
          color: 'white',
          fontSize:'18px',
        }
      };

      return (
          open && (
            <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aira-describeby="modal-modal-description"
          >
            <Box sx={modal_style}>
              <Stack sx={{
                pt:'53px',
                pl:'68px',
              }}>
                <Typography id="modal-modal-title" 
                  variant='h3' component='h3'
                  color='text.primary'
                  sx={{fontSize: '32px'}}>
                  Hashtag
                </Typography>
                <Typography id="modal-modal-description" 
                  variant='body2' component='body2' 
                  color='text.secondary' 
                  sx={{paddingTop: '16px',fontSize:'16px'}}>
                  해시태그를 추가해 보세요!
                </Typography>
              </Stack>
              
              <Stack direction='column' alignItems="center" sx={{ paddingTop: '20px' }}>
              <TextField
                id="filter-text"
                label="#"
                value={newFilterText}
                onChange={(e) => setNewFilterText(e.target.value)}
                margin="normal"
                sx={{
                  width:360,
                  height:53
                }}
              />
              </Stack>

              <Stack direction='row' justifyContent="center" sx={{marginTop: '30px'}}>
                <Button onClick={onClose} sx={modal_style.left_button}>취소</Button>
                <Button onClick={handleAddFilter} sx={modal_style.right_button}>생성</Button>
              </Stack>
            </Box>
          </Modal>
          )
      );
}

AppAddFilters.propTypes = {
    open: PropTypes.bool.isRequired, 
    onClose: PropTypes.func.isRequired, 
    onAdd: PropTypes.func.isRequired 
};