import React, { useState } from "react";
import {Link} from 'react-router-dom';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import { account } from 'src/_mock/account';
import AccountModal from './account-modal';

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const [IsModalOpen,setIsModalOpen] = useState(false);
  const [modalRightButton,setModalRightButton] = useState('');
  const [modalContents, setModalContents] = useState('');
  const [modalSubContents,setModalSubContents] = useState('');

  // 메뉴 옵션 핸들러
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  // 모달 열기 핸들러
  const handleModalOpen = (rightButton,contents,subcontents) => {
    setIsModalOpen(true);
    setModalRightButton(rightButton);
    setModalContents(contents);
    setModalSubContents(subcontents);
    handleClose(); // 팝오버 닫기
  }

  const handleModalClose = () => {
    setIsModalOpen(false);
}

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
          ...(open && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          }),
        }}
      >
        <Avatar
          src={account.photoURL}
          alt={account.displayName}
          sx={{
            width: 36,
            height: 36,
            border: (colors) => `solid 2px ${colors.first}`,
          }}
        >
          {account.displayName.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2 }}>
          <Typography variant="subtitle2" noWrap>
            {account.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {account.email}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          component={Link}
          to='/user'
          disableRipple
          disableTouchRipple
          onClick={handleClose}
          sx={{ typography: 'body2', color: 'text.secondary', py: 1.5 }}
        >
          Profile
        </MenuItem>

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={()=>handleModalOpen('탈퇴','정말로 탈퇴하시겠습니까?','탈퇴시 계정은 삭제되며\n복구되지 없습니다.')}
          sx={{ typography: 'body2', color: 'text.secondary', py: 1.5 }}
        >
          Withdraw  
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={()=>handleModalOpen('로그아웃','로그아웃 하시겠습니까?')}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Logout
        </MenuItem>
      </Popover>

      <AccountModal
        open={IsModalOpen}
        onClose={handleModalClose}
        rightButton={modalRightButton}
        contents={modalContents}
        subcontents={modalSubContents}
      />
    </>
  );
}
