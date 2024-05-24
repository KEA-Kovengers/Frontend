import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import { alpha } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import AccountModal from './account-modal';
import { useAccountStore } from 'src/store/useAccountStore';

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const { accountInfo } = useAccountStore();

  const [open, setOpen] = useState(null);
  const [IsModalOpen, setIsModalOpen] = useState(false);
  const [modalRightButton, setModalRightButton] = useState('');
  const [modalContents, setModalContents] = useState('');
  const [modalSubContents, setModalSubContents] = useState('');

  const navigate = useNavigate();
  const [openMore, setOpenMore] = useState(null);
  const handleOpenMore = (event) => {
    setOpenMore(event.currentTarget);
  };

  const handleCloseMore = () => {
    setOpenMore(null);
  };

  // 메뉴 옵션 핸들러
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  // 모달 열기 핸들러
  const handleModalOpen = (rightButton, contents, subcontents) => {
    setIsModalOpen(true);
    setModalRightButton(rightButton);
    setModalContents(contents);
    setModalSubContents(subcontents);
    handleClose(); // 팝오버 닫기
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const clickManager = () => {
    handleCloseMore();
    handleClose();
    navigate(`/user/3426612937`); // 공식 계정
  };
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
          src={accountInfo.profileImg === '' ? 'favicon/nc_logo.png' : accountInfo.profileImg}
          alt={accountInfo.nickName}
          sx={{
            width: 36,
            height: 36,
            border: (colors) => `solid 2px ${colors.first}`,
          }}
        >
          {accountInfo.nickName.charAt(0).toUpperCase()}
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
        <MenuItem
          component={Link}
          to={`/user/${accountInfo.id}`}
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
          onClick={() =>
            handleModalOpen(
              '탈퇴',
              '정말로 탈퇴하시겠습니까?',
              '탈퇴시 계정은 삭제되며\n복구되지 없습니다.'
            )
          }
          sx={{ typography: 'body2', color: 'text.secondary', py: 1.5 }}
        >
          Withdraw
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={() => handleModalOpen('로그아웃', '로그아웃 하시겠습니까?')}
          sx={{ typography: 'body2', color: 'error.main', py: 1.5 }}
        >
          Logout
        </MenuItem>
        <Divider sx={{ borderStyle: 'dashed', m: 0 }} />

        <MenuItem
          disableRipple
          disableTouchRipple
          onClick={handleOpenMore}
          sx={{ typography: 'body2', color: 'text.secondary', py: 1.5 }}
        >
          more
        </MenuItem>
        <Popover
          open={!!openMore}
          anchorEl={openMore}
          onClose={handleCloseMore}
          anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: { width: 'auto', p: '6px 0' },
          }}
        >
          <MenuItem onClick={clickManager}>공지사항</MenuItem>
          <Divider sx={{ borderStyle: 'dashed', margin: 0 }} />
          <div style={{ lineHeight: 2, padding: '6px 16px', fontSize: 14 }}>
            문의
            <br />
            Kovengers@gmail.com
          </div>
        </Popover>
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
