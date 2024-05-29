import { account } from 'src/_mock/account';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';
import { colors } from '../../theme/variableColors';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import { useToggle } from 'src/hooks/useToggle';
import { useState, useEffect } from 'react';
import { Tooltip, TextField, Button, Box } from '@mui/material';
import { styled } from 'styled-components';
import CustomModal from 'src/components/CustomModal/CustomModal';
import FriendModal from './FriendModal';
import { GetFriendList, PostFriendRequest } from 'src/api/friend.api';
import { useAccountStore } from 'src/store/useAccountStore';
import { useUserInfo } from './UserInfo';
import { GetUserInfo, PostImage, PostProfileImage, PostUserInfo } from 'src/api/user.api';
import { useParams } from 'react-router-dom';
import { useFriendStore } from 'src/store/useFriendStore';

export default function UserInfo() {
  const { accountInfo, updateAccountInfo } = useAccountStore();
  const { friend, addFriend } = useFriendStore();
  const { userInfo, setUserInfo } = useUserInfo();
  const params = useParams();
  const userId = Number(params.id);
  const isMine = userId === accountInfo.id;
  // console.log('paprams.id', userId);
  // console.log('accountInfo.id', accountInfo.id);
  // console.log('isMine', isMine);

  const [isFriend, setIsFriend] = useState(true); //친구인지 아닌지

  let friendToggle;
  let requestFriendToggle;
  let removeFriendToggle;
  let requestAlertTotgle;
  let removeAlertToggle;
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

  const showFriend = () => {
    friendToggle.toggle();
    console.log('친구 목록');
    // const id = isMine ? accountInfo.id : userId;
    // GetFriendList(id)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  const RequestFriend = (id) => {
    console.log('친구 신청');
    PostFriendRequest(id)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    requestFriendToggle.toggle();
  };

  useEffect(() => {
    if (!isMine) {
      GetUserInfo(userId)
        .then((res) => {
          console.log(res);
          console.log(res.data.result);
          setUserInfo({
            id: userId,
            nickName: res.data.result.nickName,
            blogName: res.data.result.blogName,
            profileImg: res.data.result.profileImg,
            bio: res.data.result.bio,
            role: 'USER',
            friendCount: 0,
          });
          // console.log(userInfo);
        })
        .catch((err) => {
          console.log(err);
        });
      GetFriendList(userId)
        .then((res) => {
          console.log(res);
          console.log(res.data.result);
          setUserInfo({ friendCount: res.data.result.length });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userId]);

  const imageSelect = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function (event) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      console.log(formData);
      if (file) {
        PostImage(formData)
          .then((res) => {
            console.log(res);
            updateAccountInfo('profileImg', res.data);
          })
          .catch((err) => {
            console.error(err);
          });
      }
    };
    input.click();
  };

  const completeModify = () => {
    setModify(!modify);
    PostUserInfo({
      nickName: accountInfo.nickName,
      blogName: accountInfo.blogName,
      profileImg: accountInfo.profileImg,
      bio: accountInfo.bio,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Wrapper>
      {!modify ? (
        <>
          <div style={{ marginBottom: '50px', fontWeight: 'bold', fontSize: '28px' }}>
            {isMine ? accountInfo.blogName : userInfo.blogName}
          </div>
          <RowStyled>
            <div style={{ flexDirection: 'row', display: 'flex' }}>
              <Avatar
                src={isMine ? accountInfo.profileImg : userInfo.profileImg}
                alt="photoURL"
                sx={{ width: 80, height: 80, marginLeft: '10px', marginBottom: '10px' }}
              />
              <div style={{ marginLeft: '20px', flexDirection: 'column', display: 'flex' }}>
                <span style={{ fontSize: '24px' }}>
                  {isMine ? accountInfo.nickName : userInfo.nickName}
                </span>
                <span style={{ fontSize: '13px' }}>
                  친구 {isMine ? accountInfo.friendCount : userInfo.nickName}명
                </span>
                <span style={{ fontSize: '13px', marginTop: '15px' }}>
                  {isMine ? accountInfo.bio : userInfo.bio}
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
                    onClick={() => showFriend()}
                  >
                    <Iconify
                      icon="fa-solid:user-friends"
                      sx={{ width: '25px', height: '25px', color: colors.textGrey }}
                    />
                  </IconButton>
                </Tooltip>
                {friendToggle.isOpen && (
                  <FriendModal open={friendToggle.isOpen} onClose={friendToggle.toggle} />
                )}
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
                {requestFriendToggle.isOpen && (
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
                        RequestFriend(userId);
                      },
                    }}
                  />
                )}

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
            defaultValue={accountInfo.blogName}
            onChange={(e) => updateAccountInfo('blogName', e.target.value)}
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
                  src={accountInfo.profileImg}
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
                  defaultValue={accountInfo.nickName}
                  value={accountInfo.nickName}
                  onChange={(e) => {
                    updateAccountInfo('nickName', e.target.value);
                    console.log(accountInfo.nickName);
                  }}
                  sx={{ width: '80%' }}
                  inputProps={{
                    style: { fontSize: 18 },
                  }}
                />
                <span style={{ fontSize: '13px' }}>친구 {accountInfo.friendCount}명</span>
                <TextField
                  variant="outlined"
                  defaultValue={accountInfo.bio}
                  onChange={(e) => updateAccountInfo('bio', e.target.value)}
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
