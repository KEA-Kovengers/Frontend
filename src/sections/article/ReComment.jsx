import { useState, useEffect } from 'react';

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
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { GetUserInfo } from 'src/api/user.api';
import { DeleteComment, PostComment } from 'src/api/comment.api';
import { useAccountStore } from 'src/store/useAccountStore';
import { useUserInfo } from '../profile/UserInfo';
import { useParams } from 'react-router-dom';

export default function ReComment({ userId, commentId, id, body, updated_at, isDeleted, exist }) {
  const navigate = useNavigate();
  const clickReportToggle = useToggle();
  const reportToggle = useToggle();
  const alertToggle = useToggle();

  const [isTyping, setIsTyping] = useState(!exist);
  const [contents, setContents] = useState('');
  const [createdTime, setCreatedTime] = useState();

  const [open, setOpen] = useState(null);
  const { accountInfo } = useAccountStore();

  const params = useParams();
  const postId = Number(params.id);

  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    console.log('userId', userId);
    GetUserInfo(userId)
      .then((res) => {
        console.log('유저 정보', res.data.result);
        setUserInfo(res.data.result);
      })
      .catch((err) => {
        console.log('유저 정보 에러', err);
      });
  }, []);

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

  const addRecomment = () => {
    setIsTyping(false);
    setCreatedTime(formatDate(new Date()));

    console.log('postId', postId);
    console.log('commentId', commentId);
    //대댓글 post API
    PostComment(postId, commentId, contents)
      .then((res) => {
        console.log('대댓글 추가', res);
      })
      .catch((err) => {
        console.log('대댓글 추가 에러', err);
      });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd hh:mm', { locale: ko });
  };

  const handleDeleteComment = () => {
    DeleteComment(commentId)
      .then((res) => {
        console.log('댓글 삭제', res);
        // window.location.reload();
      })
      .catch((err) => {
        console.log('댓글 삭제 에러', err);
      });
  };

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
            onClick={() => navigate(`/user/${userId}`)}
          >
            <Avatar src={userInfo.profileImg} alt="photoURL" sx={{ width: 40, height: 40 }} />
            <div
              style={{
                marginLeft: '20px',
                flexDirection: 'column',
                display: 'flex',
                textAlign: 'start',
              }}
            >
              <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{userInfo.nickName}</span>
              <span style={{ fontSize: '10px' }}>{userInfo.blogName}</span>
            </div>
          </div>
          {!isTyping && userId === accountInfo.id && !isDeleted && (
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
          <OutlinedInput
            style={{ marginTop: '20px', width: '98%', height: '45px' }}
            // value={filterName}
            onChange={(e) => setContents(e.target.value)}
            multiline
            placeholder="댓글을 입력해주세요."
            endAdornment={
              <InputAdornment position="end" onClick={() => addRecomment()}>
                <Button disabled={contents === '' ? true : false} sx={right_button}>
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
              {exist ? (isDeleted ? '삭제된 댓글입니다.' : body) : contents}
            </div>

            <div
              style={{
                flexDirection: 'row',
                display: 'flex',
              }}
            >
              <div style={{ fontSize: '12px', color: '#637381', marginRight: 13 }}>
                {exist ? formatDate(updated_at) : formatDate(new Date())}
              </div>
              {userId !== accountInfo.id && (
                <>
                  <span
                    style={{
                      fontSize: '11px',
                      color: '#637381',
                      cursor: 'pointer',
                    }}
                    onClick={clickReportToggle.toggle}
                  >
                    신고
                  </span>
                  <CustomModal
                    rightButton={'신고'}
                    mode={'content'}
                    onClose={clickReportToggle.toggle}
                    contents={'신고하시겠습니까?'}
                    open={clickReportToggle.isOpen}
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
                </>
              )}
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
