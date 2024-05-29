import { Box, Button, Modal, Tab, Tabs, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { account } from 'src/_mock/account';
import Avatar from '@mui/material/Avatar';
import { colors } from 'src/theme/variableColors';
import { styled } from 'styled-components';
import CustomModal from 'src/components/CustomModal/CustomModal';
import { useToggle } from 'src/hooks/useToggle';
import {
  DeleteFriendReject,
  GetFriendList,
  GetFriendRequestList,
  PostFriendAccept,
  DeleteFriend,
} from 'src/api/friend.api';
import { Link } from 'react-router-dom';
import { useAccountStore } from 'src/store/useAccountStore';
import { useFriendStore } from 'src/store/useFriendStore';

export default function FriendModal({ open, onClose }) {
  const [index, setIndex] = useState(0);
  // const deleteFriendToggle = useToggle();
  const deleteAlertToggle = useToggle();
  const rejectFriendToggle = useToggle();
  const acceptFriendToggle = useToggle();

  // const [friendsList, setFriendsList] = useState([]);
  const [requestList, setRequestList] = useState([]);
  const { accountInfo, updateAccountInfo } = useAccountStore();
  const { friendsList, setFriendsList, addFriend, removeFriend } = useFriendStore();
  const [friendName, setFriendName] = useState('');

  useEffect(() => {
    GetFriendList(accountInfo.id)
      .then((res) => {
        console.log(res);
        console.log(res.data.result);
        setFriendsList(res.data.result);
        console.log(friendsList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleChange = (event, newValue) => {
    if (newValue === 1) {
      GetFriendRequestList(accountInfo.id)
        .then((res) => {
          console.log(res);
          console.log(res.data.result);
          setRequestList(res.data.result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setIndex(newValue);
  };

  const ClickDeleteFriend = (id, nickName) => {
    setFriendName(nickName);
    DeleteFriend(id)
      .then((res) => {
        console.log(res);
        removeFriend(id);
      })
      .catch((err) => {
        console.log(err);
      });
    deleteAlertToggle.toggle();
  };

  const AccecptFriend = (id, nickName) => {
    setFriendName(nickName);
    console.log('수락');
    PostFriendAccept(id)
      .then((res) => {
        console.log(res);
        addFriend(id);
      })
      .catch((err) => {
        console.log(err);
      });
    acceptFriendToggle.toggle();
  };

  const RejectFriend = (id, nickName) => {
    setFriendName(nickName);
    console.log('거절');
    console.log(id);
    DeleteFriendReject(id)
      .then((res) => {
        console.log(res);
        removeFriend(id);
      })
      .catch((err) => {
        console.log(err);
        console.log(id);
      });
    rejectFriendToggle.toggle();
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        {value === index && (
          <Box sx={{ p: 3, display: 'flex' }}>
            <Typography
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {children}
            </Typography>
          </Box>
        )}
      </div>
    );
  }

  return (
    open && (
      <Modal open={open} onClose={onClose}>
        <Box sx={modal_style}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '10px 0 5px 0',
            }}
          >
            <Box sx={{ display: 'flex' }}>
              <Tabs
                value={index}
                onChange={handleChange}
                aria-label="basic tabs example"
                sx={{ width: '100%' }}
              >
                <Tab label="친구" {...a11yProps(0)} />
                <Tab label="요청" {...a11yProps(1)} />
              </Tabs>
            </Box>
          </div>

          <CustomTabPanel value={index} index={0}>
            <div
              style={{
                width: '100%',
                alignItems: 'center',
                flexDirection: 'column',
                display: 'flex',
              }}
            >
              {friendsList.length === 0 && <Typography>친구가 없습니다.</Typography>}
              {friendsList.map((user) => (
                <FriendRow>
                  <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      src={user.profileImg}
                      sx={{ width: 60, height: 60, marginRight: '10px' }}
                    />
                    <Typography variant="body1">{user.nickName}</Typography>
                  </div>
                  <Button
                    sx={{ backgroundColor: colors.first, color: 'white' }}
                    onClick={() => ClickDeleteFriend(user.friendshipID, user.nickName)}
                  >
                    삭제
                  </Button>
                </FriendRow>
              ))}
            </div>
            {/* <CustomModal
              open={deleteFriendToggle.isOpen}
              onClose={deleteFriendToggle.toggle}
              title={'친구 삭제'}
              mode={'title'}
              colorText={friendName}
              contents={'님을 삭제하겠습니까?'}
              rightButton="삭제"
              buttonAction={{ rightAction: DeleteFriend }}
            /> */}
            <CustomModal
              open={deleteAlertToggle.isOpen}
              onClose={deleteAlertToggle.toggle}
              title={'친구 삭제'}
              mode={'alert'}
              colorText={friendName}
              contents={'삭제했습니다.'}
            />
          </CustomTabPanel>
          <CustomTabPanel value={index} index={1}>
            <div
              style={{
                width: '100%',
                alignItems: 'center',
                flexDirection: 'column',
                display: 'flex',
              }}
            >
              {requestList.length === 0 && <Typography>요청이 없습니다.</Typography>}
              {requestList.map((user) => (
                <FriendRow>
                  <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      src={user.profileImg}
                      sx={{ width: 60, height: 60, marginRight: '10px' }}
                    />
                    <Typography variant="body1">{user.nickName}</Typography>
                  </div>
                  <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                    <Button
                      sx={{ border: 2, borderColor: colors.third, marginRight: 2 }}
                      onClick={() => RejectFriend(user.friendshipID, user.nickName)}
                    >
                      거절
                    </Button>
                    <Button
                      sx={{ backgroundColor: colors.first, color: 'white' }}
                      onClick={() => AccecptFriend(user.friendshipID, user.nickName)}
                    >
                      수락
                    </Button>
                  </div>
                </FriendRow>
              ))}
              <CustomModal
                open={rejectFriendToggle.isOpen}
                onClose={rejectFriendToggle.toggle}
                title={'친구 거절'}
                mode={'alert'}
                colorText={friendName}
                contents="님의 요청을 거절했습니다."
              />
              <CustomModal
                open={acceptFriendToggle.isOpen}
                onClose={acceptFriendToggle.toggle}
                title={'친구 수락'}
                mode={'alert'}
                colorText={friendName}
                contents="님의 요청을 수락했습니다."
              />
            </div>
          </CustomTabPanel>
        </Box>
      </Modal>
    )
  );
}

const modal_style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 'auto',
  bgcolor: 'background.paper',
  borderRadius: 2,
  display: 'flex',
  flexDirection: 'column',
};

export const FriendRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 80%;
  padding: 5px 0;
`;
