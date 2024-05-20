import React, { useState } from 'react';

import {
    Box,
    Button ,
    IconButton,
    Stack,
    Modal,
    Typography,
    TextField,
    InputAdornment,
  } from '@mui/material';

import Iconify from 'src/components/iconify';
import { styled } from 'styled-components';

// ----------------------------------------------------------------------

export default function MusicModal(){

    const [isOpen, setIsOpen] = useState(true);

    const closeModal = () => {
        setIsOpen(false);
    };

    const buttonClick = () => {
        setIsOpen(false);
    };

    return (
        isOpen && (
        <Modal
            open={isOpen}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ display: 'flex' }}
        >
            <Box sx={modal_style}>

                <Stack direction="row" sx={{}}>
                    <Typography
                        id="modal-modal-title"
                        variant="h5"
                        component="h5"
                        sx={{ zIndex: 2, position: 'fixed', mt: '18px', ml: '18px', fontWeight: 'bold' }}
                        >
                        음악
                    </Typography>

                    <Button 
                        variant="contained"
                        sx={{
                            ...modal_style.complete_button,
                            position: 'fixed',
                            mt: '18px', ml: '400px',
                        }}
                        onClick={buttonClick}
                    >
                        완료
                    </Button>
                </Stack>

                <div style={{ display: 'flex', justifyContent: 'end', zIndex: 2 }}>
                    <IconButton onClick={closeModal} sx={{ mt: '8px', mr: '5px' }}>
                        <Iconify icon="eva:close-fill" sx={{ width: '25px', height: '25px' }} />
                    </IconButton>
                </div>
                

                <Box
                    sx={{
                        justifyContent: 'center',
                        display: 'flex',
                        paddingTop: '15px',
                    }}
                >
                <Stack
                    sx={{
                    width: '80%',
                    justifyContent: 'space-between', // 내부 요소를 가로 정렬하고 동시에 간격을 분배
                    }}
                >
                    <TextField
                        placeholder="노래, 가수, 앨범 검색"
                        InputProps={{
                            endAdornment: (
                            <InputAdornment position="end">
                                <IconButton>
                                    <Iconify icon="eva:search-fill" sx={{ width: 20, height: 20, color: 'text.disabled' }} />
                                </IconButton>
                            </InputAdornment>
                            ),
                        }}
                    />

                    
                </Stack>
                </Box>
            </Box>
        </Modal>
        )
    );
};

const modal_style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 530,
    height: 450,
    bgcolor: 'background.paper',
    borderRadius: 2,
    border:'none',

    complete_button: {
        width: 70,
        height: 30,
        bgcolor: '#1A2CDD',
        borderRadius: 7,
        color: 'white',
        fontSize: '18px',
    },
};