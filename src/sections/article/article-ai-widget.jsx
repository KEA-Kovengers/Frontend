import { useState } from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

import Iconify from 'src/components/iconify';
import AiModal from './article-ai-modal';

// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
    zIndex: 0,
    right: '0%',
    display: 'flex',
    cursor: 'pointer',
    position: 'fixed',
    alignItems: 'center',
    top: theme.spacing(16),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1.25),
    color: theme.palette.text.primary,
    flexDirection: "column",
    height: "45px",
    transition: theme.transitions.create('opacity'),

    '&:hover': { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

export default function AiWidget() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleRootClick = () => {
        setIsAddModalOpen(true);
    }

    const handleAddModalClose = () => {
        setIsAddModalOpen(false);
    }

    return (
        <>
            <StyledRoot onClick={handleRootClick}>
                <Iconify icon="basil:lightbulb-alt-outline" width={26} height={28} color='#E8C300' />
                <div style={{ fontSize: "10px", color: "#808080" }}>AI 요약</div>
            </StyledRoot>
            <AiModal open={isAddModalOpen} onClose={handleAddModalClose} />
        </>
    );
}
