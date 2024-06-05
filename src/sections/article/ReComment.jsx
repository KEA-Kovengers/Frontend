import { useEffect, useState } from 'react';

import { account } from 'src/_mock/account';
import Avatar from '@mui/material/Avatar';
import CustomModal from 'src/components/CustomModal/CustomModal';
import { useNavigate } from 'react-router-dom';
import ReportModal from 'src/sections/article/ReportModal';
import { useToggle } from 'src/hooks/useToggle';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { IconButton, Button } from '@mui/material';
import Iconify from 'src/components/iconify';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { set } from 'lodash';
import { useAccountStore } from 'src/store/useAccountStore';

export default function ReComment({ content, time, exist, state }) {
  const { accountInfo } = useAccountStore();
  useEffect(() => {
  }, []);
  console.log('account', accountInfo.id);
  const navigate = useNavigate();
  const reportToggle = useToggle();
  const alertToggle = useToggle();

  const [isTyping, setIsTyping] = useState(state);
  const [contents, setContents] = useState('');
  const [createdTime, setCreatedTime] = useState();

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

  const addRecomment = () => {
    setIsTyping(false);
    setCreatedTime(formatTime(new Date()));
    //대댓글 post API
  };
  function formatTime(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}. ${month}. ${day} ${hours}:${minutes}`;
  }

  return (
    <div
      style={{
        marginTop: '5px',
        marginBottom: '5px',
        display: 'flex',
        flexDirection: 'row',
        height: 'auto',
      }}
    >
      <Iconify icon="clarity:child-arrow-line" sx={{ width: '18px', height: '18px' }} />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          backgroundColor: '#e3e6ea7a',
          borderRadius: '8px',
          padding: '10px 3px 10px 10px',
          width: '100%',
        }}
      >
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
            <Avatar src={account.photoURL} alt="photoURL" sx={{ width: 40, height: 40 }} />
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
          {!isTyping && (
            <>
              <div>
                <span
                  style={{ fontSize: '11px', cursor: 'pointer', marginRight: 5 }}
                  onClick={handleOpenModalClick}
                >
                  삭제
                </span>
              </div>
              <CustomModal
                rightButton={'삭제'}
                mode={'content'}
                onClose={handleCloseModal}
                contents={'댓글을 삭제하시겠습니까?'}
                open={isDelModalOpen}
              />
            </>
          )}
        </div>
        {isTyping ? (
          // <OutlinedInput
          //   style={{ marginTop: '20px', width: '98%', height: '45px' }}
          //   // value={filterName}
          //   onChange={(e) => setContents(e.target.value)}
          //   multiline
          //   placeholder="댓글을 입력해주세요."
          //   endAdornment={
          //     <InputAdornment position="end" onClick={addRecomment}>
          //       <Button disabled={contents === '' ? true : false} sx={right_button}>
          //         등록
          //       </Button>
          //     </InputAdornment>
          //   }

          // />
          <OutlinedInput
            style={{ marginTop: '20px', width: '98%', height: '45px' }}
            // value={filterName}
            onChange={(e) => setContents(e.target.value)}
            multiline
            placeholder={accountInfo.id === null ? "로그인 후 이용해주세요." : "댓글을 입력해주세요."}
            endAdornment={
              <InputAdornment position="end" onClick={addRecomment}>
                <Button disabled={contents === '' || accountInfo.id === null} sx={right_button}>
                  등록
                </Button>
              </InputAdornment>
            }
          />
        ) : (
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
              style={{
                fontSize: '14px',
                color: '#000000',
                marginBottom: '5px',
                textAlign: 'start',
              }}
            >
              {exist ? content : contents}
            </div>

            <div
              style={{
                flexDirection: 'row',
                display: 'flex',
              }}
            >
              <div style={{ fontSize: '12px', color: '#637381', marginRight: 13 }}>
                {exist ? time : createdTime}
              </div>
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
        )}
      </div>
    </div>
  );
}

const right_button = {
  width: 40,
  height: 28,
  bgcolor: '#1A2CDD',
  borderRadius: 1,
  color: 'white',
  fontSize: '15px',
};
