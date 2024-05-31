import React, { useEffect, useState } from 'react';
import Iconify from 'src/components/iconify';
import IconButton from '@mui/material/IconButton';

import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';

import { useToggle } from 'src/hooks/useToggle';
import { useParams } from 'react-router-dom';

import CustomModal from 'src/components/CustomModal/CustomModal';

import { Avatar, AvatarGroup, Icon, Tooltip } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import ReportModal from 'src/sections/article/ReportModal';
import DashboardModal from 'src/sections/article/DashboardModal';
import { GetPostDetail } from 'src/api/posts.api';

export default function ArticleTitle({ editorList, title, user, setUser }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd hh:mm', { locale: ko });
  };

  const params = useParams();
  const postId = Number(params.id);
  const navigate = useNavigate();
  const { toggle, isOpen } = useToggle();

  // let deleteArticleToggle, reportArticleToggle, reportToggle, alertToggle;
  const deleteArticleToggle = useToggle();
  const reportArticleToggle = useToggle();
  const reportToggle = useToggle();
  const alertToggle = useToggle();
  const dashboardToggle = useToggle();

  const [open, setOpen] = useState(null);
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  // const [selectedUser, setSelectedUser] = useState(null);
  const handleSelectedUser = (id) => {
    if (user === id) {
      setUser(null);
    } else {
      setUser(id);
      // console.log('선택된 유저 아이디', id);
      // console.log('선택된 유저', user);
    }
  };

  return (
    <div
      style={{
        borderBottom: '1px solid #E4E8EB',
        borderRadius: '1px 1px 0px 0px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F9F9F9',
        marginLeft: '100px',
        marginRight: '100px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <span style={{ fontSize: '24px', marginTop: '15px' }}>{title}</span>
        <div
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            display: 'flex',
            width: '100%',
            marginTop: '25px',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: '13px', color: '#637381' }}>2024. 03. 15 17:16 </div>
          <div style={{ flexDirection: 'row', display: 'flex' }}>
            <AvatarGroup max={editorList.length} spacing={10}>
              {editorList.map((acc) => (
                <Tooltip title={acc.nickName} key={acc.id}>
                  <Avatar
                    src={acc.profileImg}
                    onClick={() => {
                      handleSelectedUser(acc.id);
                    }}
                    style={{
                      width: 30,
                      height: 30,
                      borderColor: user === acc.id && '#1A2CDD',
                      '&:hover': { opacity: 0.72 },
                      cursor: 'pointer',
                    }}
                  />
                </Tooltip>
              ))}
            </AvatarGroup>
            <Tooltip title="통계 데이터">
              <IconButton sx={{ marginLeft: 1 }} onClick={() => dashboardToggle.toggle()}>
                <Iconify icon="material-symbols:monitoring-rounded" />
              </IconButton>
            </Tooltip>
            <DashboardModal open={dashboardToggle.isOpen} onClose={dashboardToggle.toggle} />

            <IconButton onClick={handleOpenMenu}>
              <Iconify icon="eva:more-vertical-fill" />
            </IconButton>
            <Popover
              open={!!open}
              anchorEl={open}
              onClose={handleCloseMenu}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              PaperProps={{
                sx: { width: 140 },
              }}
            >
              <MenuItem onClick={() => navigate('/blog')}>
                <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
                Edit
              </MenuItem>
              <MenuItem onClick={() => deleteArticleToggle.toggle()} sx={{ color: 'error.main' }}>
                <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
                Delete
              </MenuItem>
              <CustomModal
                rightButton={'삭제'}
                mode={'content'}
                onClose={deleteArticleToggle.toggle}
                contents={'게시글을 삭제하시겠습니까?'}
                open={deleteArticleToggle.isOpen}
                buttonAction={{ rightAction: null }}
              />

              <MenuItem onClick={() => reportArticleToggle.toggle()} sx={{ color: 'error.main' }}>
                <Iconify icon="ph:siren-fill" sx={{ mr: 2 }} />
                신고하기
              </MenuItem>
              <CustomModal
                rightButton={'신고'}
                mode={'content'}
                onClose={reportArticleToggle.toggle}
                contents={'신고하시겠습니까?'}
                open={reportArticleToggle.isOpen}
                buttonAction={{ rightAction: reportToggle.toggle }}
              />
              <ReportModal
                open={reportToggle.isOpen}
                onClose={reportToggle.toggle}
                buttonAction={() => alertToggle.toggle()}
              />
              <CustomModal
                mode={'alert'}
                open={alertToggle.isOpen}
                onClose={alertToggle.toggle}
                title={'게시글 신고'}
                contents={'신고 되었습니다.'}
              />
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
}
