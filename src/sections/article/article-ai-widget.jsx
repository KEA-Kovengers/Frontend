import React, { useState } from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';

import Iconify from 'src/components/iconify';
import AiModal from './article-ai-modal';
import { PostSummary } from 'src/api/ai.api';
// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  zIndex: 0,
  // right: '0%',
  display: 'flex',
  cursor: 'pointer',
  position: 'fixed',
  alignItems: 'center',
  top: theme.spacing(40),
  paddingLeft: theme.spacing(3),
  // paddingRight: theme.spacing(2),
  paddingTop: theme.spacing(1.25),
  color: theme.palette.text.primary,
  flexDirection: 'column',
  height: '45px',
  transition: theme.transitions.create('opacity'),

  '&:hover': { opacity: 0.72 },
}));

// ----------------------------------------------------------------------

export default function AiWidget({ post }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [aiSummaryText, setAiSummaryText] = useState('');

  const handleRootClick = () => {
    setIsAddModalOpen(true);

    let combinedContent = '';
    if (post.blockList) {
      post.blockList.forEach((block) => {
        combinedContent += block.content;
      });
    }

    PostSummary(combinedContent)
      .then((res) => {
        console.log('ai 요약 성공', res.data);
        setAiSummaryText(res.data.summary);
      })
      .catch((err) => {
        console.log('ai요약 실패', err);
        PostSummary(combinedContent)
          .then((res) => {
            console.log('ai 요약 재시도 성공', res.data);
            setAiSummaryText(res.data.summary);
          })
          .catch((err) => {
            console.log('ai요약 재시도 실패', err);
          });
      });
  };

  const handleAddModalClose = () => {
    setIsAddModalOpen(false);
  };

  return (
    <>
      <StyledRoot onClick={() => handleRootClick()}>
        <Iconify icon="basil:lightbulb-alt-outline" width={26} height={28} color="#E8C300" />
        <div style={{ fontSize: '10px', color: '#808080' }}>AI 요약</div>
      </StyledRoot>
      <AiModal open={isAddModalOpen} onClose={handleAddModalClose} aiSummaryText={aiSummaryText} />
    </>
  );
}
