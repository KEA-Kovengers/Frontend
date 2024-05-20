import { useState } from 'react';
import Iconify from 'src/components/iconify';
import IconButton from '@mui/material/IconButton';

import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';

import { useToggle } from 'src/hooks/useToggle';

import CustomModal from 'src/components/CustomModal/CustomModal';

import { Avatar, AvatarGroup, Icon, Tooltip } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import ReportModal from 'src/sections/article/ReportModal';
import DashboardModal from 'src/sections/article/DashboardModal';

const userList = [
  {
    name: '이소정',
    avatarUrl: `/assets/images/avatars/avatar_1.jpg`,
    company: '소정이의 블로그',
    isFriend: true,
  },
  {
    name: '김미소',
    avatarUrl: `/assets/images/avatars/avatar_2.jpg`,
    company: '미소의 블로그',
    isFriend: false,
  },
  {
    name: '남소미',
    avatarUrl: `/assets/images/avatars/avatar_3.jpg`,
    company: '솜2의 블로그',
    isFriend: true,
  },
  {
    name: '윤혜원',
    avatarUrl: `/assets/images/avatars/avatar_4.jpg`,
    company: '혜원이의 블로그',
    isFriend: false,
  },
  {
    name: '정성훈',
    avatarUrl: `/assets/images/avatars/avatar_5.jpg`,
    company: '성훈이의 블로그',
    isFriend: true,
  },
  {
    name: '김미소',
    avatarUrl: `/assets/images/avatars/avatar_2.jpg`,
    company: '미소의 블로그',
    isFriend: true,
  },
];

export default function ArticleTitle() {
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

  const [selectedUser, setSelectedUser] = useState(null);
  const handleSelectedUser = (index) => {
    if (selectedUser === index) {
      setSelectedUser(null);
    } else {
      setSelectedUser(index);
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
        <span style={{ fontSize: '24px', marginTop: '15px' }}>고양이 감기 : 허피스 바이러스</span>
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
            <AvatarGroup max={userList.length} spacing={10}>
              {userList.map((acc, index) => (
                <Tooltip title={acc.name} key={index}>
                  <Avatar
                    src={acc.avatarUrl}
                    onClick={() => {
                      handleSelectedUser(index);
                    }}
                    style={{
                      width: 30,
                      height: 30,
                      borderColor: selectedUser === index && '#1A2CDD',
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
