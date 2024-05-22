import React, { useState } from "react";

import { account } from 'src/_mock/account';
import Avatar from '@mui/material/Avatar';
import CustomModal from 'src/components/CustomModal/CustomModal';
import { useNavigate } from 'react-router-dom';
import ReportModal from 'src/sections/article/ReportModal';
import { useToggle } from 'src/hooks/useToggle';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import Iconify from 'src/components/iconify';

export default function ArticleComment({ content, time, func }) {
  const navigate = useNavigate();
  const reportToggle = useToggle();
  const alertToggle = useToggle();

  const [open, setOpen] = useState(null);
  const displayName = account.displayName || '';
  const bio = account.bio || '';
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const [isDelModalOpen, setIsModalOpen] = useState(false);

  const [isReModalOpen, setIsReModalOpen] = useState(false);

  const handleOpenModalClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenReModalClick = () => {
    setIsReModalOpen(true);
  };

  const handleCloseReModal = () => {
    setIsReModalOpen(false);
  };

  const handleAddReComment = () => {
    func();
  };

  return (
    <div
      style={{
        marginTop: '15px',
        marginBottom: '5px',
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <div
          style={{
            flexDirection: 'row',
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div
            style={{ flexDirection: 'row', display: 'flex', cursor: 'pointer' }}
            onClick={() => navigate('/user')}
          >
            <Avatar
              src={account.photoURL}
              alt="photoURL"
              sx={{ width: 40, height: 40, marginLeft: '10px', marginBottom: '10px' }}
            />
            <div
              style={{
                marginLeft: '20px',
                flexDirection: 'column',
                display: 'flex',
                textAlign: 'start',
              }}
            >
              <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{displayName}</span>
              <span style={{ fontSize: '10px' }}>{bio}</span>
            </div>
          </div>
          <div>
            <span
              style={{ fontSize: '11px', cursor: 'pointer', marginRight: 8 }}
              onClick={handleOpenModalClick}
            >
              삭제
            </span>
            <span style={{ fontSize: '11px', cursor: 'pointer' }} onClick={handleAddReComment}>
              답글
            </span>
          </div>
          <CustomModal
            rightButton={'삭제'}
            mode={'content'}
            onClose={handleCloseModal}
            contents={'댓글을 삭제하시겠습니까?'}
            open={isDelModalOpen}
          />
        </div>
        <div
          style={{
            flexDirection: 'column',
            display: 'flex',
            width: '100%',
            marginTop: '10px',
            alignItems: 'start',
          }}
        >
          <div
            style={{ fontSize: '14px', color: '#000000', marginBottom: '5px', textAlign: 'start' }}
          >
            {content}
          </div>

          <div
            style={{
              flexDirection: 'row',
              display: 'flex',
            }}
          >
            <div style={{ fontSize: '12px', color: '#637381', marginRight: 13 }}>{time}</div>
            <span
              style={{
                fontSize: '11px',
                color: '#637381',
                cursor: 'pointer',
              }}
              onClick={handleOpenReModalClick}
            >
              신고
            </span>
            <CustomModal
              rightButton={'신고'}
              mode={'content'}
              onClose={handleCloseReModal}
              contents={'신고하시겠습니까?'}
              open={isReModalOpen}
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
              title={'댓글 신고'}
              contents={'신고 되었습니다.'}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
