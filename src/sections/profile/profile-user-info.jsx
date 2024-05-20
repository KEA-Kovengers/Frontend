import { account } from 'src/_mock/account';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';
import { colors } from '../../theme/variableColors';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import { useToggle } from 'src/hooks/useToggle';
import { useState } from 'react';
import { Tooltip, TextField, Button, Box } from '@mui/material';
import { styled } from 'styled-components';
import CustomModal from 'src/components/CustomModal/CustomModal';
import FriendModal from './FriendModal';
import { remove } from 'lodash';

export default function UserInfo() {
  const [isMine, setIsMine] = useState(false); //내 프로필인지 아닌지
  const [isFriend, setIsFriend] = useState(true); //친구인지 아닌지

  let friendToggle, requestFriendToggle, removeFriendToggle, requestAlertTotgle, removeAlertToggle;
  if (isMine) {
    friendToggle = useToggle();
  } else {
    requestFriendToggle = useToggle();
    removeFriendToggle = useToggle();
    requestAlertTotgle = useToggle();
    removeAlertToggle = useToggle();
  }
  //   const friendToggle = useToggle();
  //   const requestFriendToggle = useToggle();
  //   const removeFriendToggle = useToggle();
  //   const requestAlertTotgle = useToggle();
  //   const removeAlertToggle = useToggle();

  const [modify, setModify] = useState(false);

  const [imageUrl, setImageUrl] = useState(null);

  const imageSelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function (event) {
      const file = event.target.files[0];
      const imgUrl = URL.createObjectURL(file);
      setImageUrl(imgUrl);
    };
    input.click();
  };

  const completeModify = () => {
    setModify(!modify);
  };

  return (
    <Wrapper>
      {!modify ? (
        <>
          <div style={{ marginBottom: '50px', fontWeight: 'bold', fontSize: '28px' }}>
            {isMine ? account.blogName : account.displayName}
          </div>
          <RowStyled>
            <div style={{ flexDirection: 'row', display: 'flex' }}>
              <Avatar
                src={isMine ? account.photoURL : account.photoURL}
                alt="photoURL"
                sx={{ width: 80, height: 80, marginLeft: '10px', marginBottom: '10px' }}
              />
              <div style={{ marginLeft: '20px', flexDirection: 'column', display: 'flex' }}>
                <span style={{ fontSize: '24px' }}>
                  {isMine ? account.displayName : account.displayName}
                </span>
                <span style={{ fontSize: '13px' }}>
                  친구 {isMine ? account.friendcnt : account.friendcnt}명
                </span>
                <span style={{ fontSize: '13px', marginTop: '15px' }}>
                  {isMine ? account.bio : account.bio}
                </span>
              </div>
            </div>
            {isMine ? (
              <div style={{ flexDirection: 'row', display: 'flex' }}>
                <Tooltip title="블로그 수정">
                  <IconButton
                    onClick={() => setModify(!modify)}
                    sx={{
                      mt: '5px',
                      mr: '10px',
                      backgroundColor: colors.third,
                      borderRadius: '15px',
                    }}
                  >
                    <Iconify
                      icon="clarity:pencil-solid"
                      sx={{ width: '23px', height: '23px', color: colors.textGrey }}
                    />
                  </IconButton>
                </Tooltip>
                <Tooltip title="친구">
                  <IconButton
                    sx={{
                      mt: '5px',
                      mr: '5px',
                      backgroundColor: colors.third,
                      borderRadius: '15px',
                    }}
                    onClick={() => friendToggle.toggle()}
                  >
                    <Iconify
                      icon="fa-solid:user-friends"
                      sx={{ width: '25px', height: '25px', color: colors.textGrey }}
                    />
                  </IconButton>
                </Tooltip>
                <FriendModal open={friendToggle.isOpen} onClose={friendToggle.toggle} />
              </div>
            ) : (
              <Tooltip title={isFriend ? '친구 삭제' : '친구 신청'}>
                <IconButton
                  onClick={
                    isFriend
                      ? () => removeFriendToggle.toggle()
                      : () => requestFriendToggle.toggle()
                  }
                  sx={{
                    width: '43px',
                    height: '43px',
                    backgroundColor: colors.third,
                    borderRadius: '15px',
                  }}
                >
                  <Iconify
                    icon={isFriend ? 'fa6-solid:user-check' : 'fa6-solid:user-plus'}
                    sx={{ width: '25px', height: '25px', color: colors.textGrey }}
                  />
                </IconButton>
                <CustomModal
                  open={requestFriendToggle.isOpen}
                  onClose={requestFriendToggle.toggle}
                  title="친구 신청"
                  colorText={account.displayName}
                  contents="님에게 친구 신청을 보내시겠습니까?"
                  rightButton="신청"
                  mode="title"
                  buttonAction={{
                    rightAction: () => {
                      requestAlertTotgle.toggle();
                    },
                  }}
                />
                <CustomModal
                  open={removeFriendToggle.isOpen}
                  onClose={removeFriendToggle.toggle}
                  title="친구 삭제"
                  colorText={account.displayName}
                  contents="님을 친구에서 삭제하시겠습니까?"
                  rightButton="삭제"
                  mode="title"
                  buttonAction={{
                    rightAction: () => {
                      removeAlertToggle.toggle();
                    },
                  }}
                />
                <CustomModal
                  open={requestAlertTotgle.isOpen}
                  onClose={requestAlertTotgle.toggle}
                  title="친구 신청"
                  colorText={account.displayName}
                  contents="님에게 친구 신청을 보냈습니다."
                  mode="alert"
                />
                <CustomModal
                  open={removeAlertToggle.isOpen}
                  onClose={removeAlertToggle.toggle}
                  title="친구 삭제"
                  colorText={account.displayName}
                  contents="님을 친구에서 삭제했습니다."
                  mode="alert"
                />
              </Tooltip>
            )}
          </RowStyled>
        </>
      ) : (
        <>
          <TextField
            variant="outlined"
            label="블로그 이름"
            defaultValue={account.blogName}
            inputProps={{
              style: { textAlign: 'center', fontWeight: 'bold', fontSize: '28px' },
            }}
            size="small"
            sx={{ width: '80%', marginBottom: '20px' }}
          />
          <RowStyled>
            <div
              style={{
                flexDirection: 'row',
                display: 'flex',
                flex: 1,
                marginRight: '15px',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  position: 'relative',
                }}
                onClick={imageSelect}
              >
                <Avatar
                  src={account.photoURL}
                  alt="photoURL"
                  sx={{
                    width: 80,
                    height: 80,
                    marginLeft: '10px',
                    marginBottom: '10px',
                    zIndex: 0,
                    border: '1px solid #c1c1c1',
                    '&:hover': { opacity: 0.72 },
                  }}
                />
                <Iconify
                  icon="ph:plus-circle"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1,
                  }}
                />
              </Box>
              <div
                style={{
                  marginLeft: '20px',
                  flexDirection: 'column',
                  display: 'flex',
                  width: '100%',
                }}
              >
                <TextField
                  variant="outlined"
                  label="닉네임"
                  size="small"
                  defaultValue={account.displayName}
                  sx={{ width: '80%' }}
                  inputProps={{
                    style: { fontSize: 18 },
                  }}
                />
                <span style={{ fontSize: '13px' }}>친구 {account.friendcnt}명</span>
                <TextField
                  variant="outlined"
                  defaultValue={account.bio}
                  size="small"
                  sx={{ width: '100%', mt: 1 }}
                  inputProps={{
                    style: { fontSize: 13 },
                  }}
                />
              </div>
            </div>
            <div style={{ flexDirection: 'row', display: 'flex' }}>
              <Button
                sx={{ bgcolor: colors.third, borderRadius: 1, mt: 5, mr: '10px' }}
                onClick={() => setModify(!modify)}
              >
                취소
              </Button>
              <Button
                sx={{ bgcolor: colors.third, borderRadius: 1, mt: 5 }}
                onClick={completeModify}
              >
                완료
              </Button>
            </div>
          </RowStyled>
        </>
      )}
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  border-bottom: 1px solid #c1c1c1;
  border-radius: 0px 0px 1px 1px;
  padding: 10px;
  display: flex;
  align-items: center;
  margin-left: 100px;
  margin-right: 100px;
  background-color: '#F9F9F9';
  flex-direction: column;
`;

export const RowStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
