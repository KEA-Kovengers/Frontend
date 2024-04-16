import { useState } from 'react';
import PropTypes from 'prop-types';
import Iconify from 'src/components/iconify';
import { Box, Stack, Modal, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// ----------------------------------------------------------------------

export default function AiModal({ open, onClose }) {


    const modal_style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 437,
        height: 300,
        bgcolor: 'background.paper',
        borderRadius: 3,
    };

    const StyledRoot = styled('div')(({ theme }) => ({
        display: 'flex',
        flexDirection: "row",
        height: "45px",
        transition: theme.transitions.create('opacity'),

        '&:hover': { opacity: 0.72 },
    }));

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
                        pt: '20px',
                        pl: '30px',
                    }}>

                        <Typography
                            id="modal-modal-title"
                            variant='h3'
                            component='h3'
                            color='text.primary'
                            sx={{ fontSize: '20px', flexDirection: 'row', display: 'flex', justifyContent: 'space-between', marginRight: '30px' }}>
                            자동요약
                            <StyledRoot onClick={onClose}>
                                <Iconify icon="material-symbols-light:close" width={28} height={30} color='#343330' />
                            </StyledRoot>
                        </Typography>
                        <Typography id="modal-modal-description"
                            variant='body2' component='body2'
                            color='text.secondary'
                            sx={{ fontSize: '16px', flexDirection: 'row', display: 'flex' }}>
                            <Iconify icon="basil:lightbulb-alt-outline" width={20} height={28} color='#E8C300' />
                            <div style={{ fontSize: "13px", color: "#808080" }}>AI가 게시글을 요약해드려요</div>
                        </Typography>

                    </Stack>
                    <div style={{ border: '0.7px solid black', borderRadius: "10px", padding: '20px', height: 170, marginTop: '10px', marginRight: '30px', marginLeft: '30px' }}>
                        {/* You can render the AI summary text here */}
                        {/* For example: <Typography>{aiSummaryText}</Typography> */}
                    </div>
                </Box>
            </Modal>
        )
    );
}

AiModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};