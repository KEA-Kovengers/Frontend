import React, { useState } from 'react';

import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { useToggle } from 'src/hooks/useToggle';
import { GetEditorDraft } from 'src/api/editor.api';
import ModifyModal from './ModifyModal';
import { useEffect } from 'react';
// ----------------------------------------------------------------------

export default function ModifyPopover({}) {
  const [open, setOpen] = useState(null);
  const [isModifyModalOpen, setIsModifyModalOpen] = useState(false);
  const [reportCases, setReportCases] = useState([]);
  const handleOpen = () => {
    setIsModifyModalOpen(true);
  };

  const handleClose = () => {
    setIsModifyModalOpen(false);
  };
  const getDraft = () => {
    GetEditorDraft()
      .then((res) => {
        setReportCases(res.data.result);
        console.log('임시저장', res.data.result);
        setNumber(res.data.result.drafts.length);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getDraft();
  }, []);

  const [number, setNumber] = useState(1);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 110,
          height: 40,
          border: '2px solid #E3E6FF',
          borderRadius: 3,
          color: 'black',
          marginRight: '49px',
          fontSize: '18px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Typography variant="body1" sx={{ fontSize: '16px', marginRight: '20px' }}>
          편집 중
        </Typography>
        <Box
          sx={{
            position: 'absolute',
            width: '1px',
            height: '80%',
            top: '10%',
            left: '68%',
            transform: 'translateX(-50%)',
            backgroundColor: '#637381',
          }}
        />
        <Typography variant="body1" sx={{ fontSize: '16px', zIndex: 1, marginLeft: '3px' }}>
          {number}
        </Typography>
      </IconButton>

      <ModifyModal open={isModifyModalOpen} onClose={handleClose} reportCases={reportCases} />
    </>
  );
}
