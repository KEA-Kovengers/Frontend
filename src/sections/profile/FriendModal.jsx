import { Box, Button, Modal, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import { account } from 'src/_mock/account';
import Avatar from '@mui/material/Avatar';
import { colors } from 'src/theme/variableColors';
import { styled } from 'styled-components';
import CustomModal from 'src/components/CustomModal/CustomModal';
import { useToggle } from 'src/hooks/useToggle';

export default function FriendModal({ open, onClose }) {
  const [index, setIndex] = useState(0);
  const deleteFriendToggle = useToggle();
  const deleteAlertToggle = useToggle();
  const rejectFriendToggle = useToggle();
  const acceptFriendToggle = useToggle();

  const handleChange = (event, newValue) => {
    setIndex(newValue);
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
              <FriendRow>
                <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    src={account.photoURL}
                    sx={{ width: 60, height: 60, marginRight: '10px' }}
                  />
                  <Typography variant="body1">{account.displayName}</Typography>
                </div>
                <Button
                  sx={{ backgroundColor: colors.first, color: 'white' }}
                  onClick={() => deleteFriendToggle.toggle()}
                >
                  삭제
                </Button>
              </FriendRow>
              <FriendRow>
                <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    src={account.photoURL}
                    sx={{ width: 60, height: 60, marginRight: '10px' }}
                  />
                  <Typography variant="body1">{account.displayName}</Typography>
                </div>
                <Button sx={{ backgroundColor: colors.first, color: 'white' }}>삭제</Button>
              </FriendRow>
            </div>
            <CustomModal
              open={deleteFriendToggle.isOpen}
              onClose={deleteFriendToggle.toggle}
              title={'친구 삭제'}
              mode={'title'}
              colorText={account.displayName}
              contents={'님을 삭제하겠습니까?'}
              rightButton="삭제"
              buttonAction={{ rightAction: deleteAlertToggle.toggle }}
            />
            <CustomModal
              open={deleteAlertToggle.isOpen}
              onClose={deleteAlertToggle.toggle}
              title={'친구 삭제'}
              mode={'alert'}
              colorText={account.displayName}
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
              <FriendRow>
                <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                  <Avatar
                    src={account.photoURL}
                    sx={{ width: 60, height: 60, marginRight: '10px' }}
                  />
                  <Typography variant="body1">{account.displayName}</Typography>
                </div>
                <div style={{ flexDirection: 'row', display: 'flex', alignItems: 'center' }}>
                  <Button
                    sx={{ border: 2, borderColor: colors.third, marginRight: 2 }}
                    onClick={() => rejectFriendToggle.toggle()}
                  >
                    거절
                  </Button>
                  <Button
                    sx={{ backgroundColor: colors.first, color: 'white' }}
                    onClick={() => acceptFriendToggle.toggle()}
                  >
                    수락
                  </Button>
                </div>
              </FriendRow>
              <CustomModal
                open={rejectFriendToggle.isOpen}
                onClose={rejectFriendToggle.toggle}
                title={'친구 거절'}
                mode={'alert'}
                colorText={account.displayName}
                contents="님의 요청을 거절했습니다."
              />
              <CustomModal
                open={acceptFriendToggle.isOpen}
                onClose={acceptFriendToggle.toggle}
                title={'친구 수락'}
                mode={'alert'}
                colorText={account.displayName}
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
