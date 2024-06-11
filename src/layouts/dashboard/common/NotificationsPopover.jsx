// NotificationsPopover.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import Cookies from 'js-cookie';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import Scrollbar from 'src/components/scrollbar';
import Iconify from 'src/components/iconify';
import NotificationsList from './NotificationsList';
import { GetUserInfo } from 'src/api/user.api';
import { ViewNotice, ReadNotice } from 'src/api/notice.api';
import connectWebSocket from 'src/api/connectWebSocket';
import CustomModal from 'src/components/CustomModal/CustomModal';
import { useNavigate } from 'react-router-dom';

export default function NotificationsPopover() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(null);
  const [userId, setUserId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState({});
  const navigate = useNavigate();

  const showModal = async (message) => {
    const userResponse = await GetUserInfo(message.from_id);
    if (userResponse.data.isSuccess) {
      const nickName = userResponse.data.result.nickName;
      const notificationMessage = getNotificationMessage(message, nickName);
      setModalMessage({ ...message, notificationMessage });
      setModalOpen(true);
    } else {
      console.error('GetUserInfo call was not successful:', userResponse.data.message);
    }
  };

  const getNotificationMessage = (message, nickName) => {
    const { type } = message;
    switch (type) {
      case 'INVITE':
        return `${nickName}님이 공동작업자로 초대하였습니다.`;
      case 'COMMENT':
        return `${nickName}님이 댓글을 작성하였습니다.`;
      case 'RECOMMENT':
        return `${nickName}님이 대댓글을 작성하였습니다.`;
      case 'LIKE':
        return `${nickName}님이 좋아요를 눌렀습니다.`;
      case 'FRIEND_REQUEST':
        return `${nickName}님이 친구신청을 요청하였습니다.`;
      case 'FREIEND_RESPONSE':
        return `${nickName}님이 친구신청을 수락하였습니다.`;
      default:
        return '새로운 알림이 있습니다.';
    }
  };

  const handleModalConfirm = async () => {
    const { type, post_id, from_id, id } = modalMessage; // Added id here for ReadNotice
    try {
      await ReadNotice(id); // Mark the notification as read
      setNotifications(notifications.map(notification =>
        notification.id === id ? { ...notification, status: 'READ' } : notification
      ));
    } catch (error) {
      console.error('Failed to mark the notification as read', error);
    }
    
    switch (type) {
      case 'INVITE':
        navigate(`/createEditSession/${post_id}`);
        break;
      case 'COMMENT':
      case 'RECOMMENT':
      case 'LIKE':
        navigate(`/article/${post_id}`);
        break;
      case 'FRIEND_REQUEST':
      case 'FREIEND_RESPONSE':
        navigate(`/user/${from_id}`);
        break;
      default:
        break;
    }
    setModalOpen(false);
  };

  useEffect(() => {
    const tokenString = Cookies.get('token');
    let userId = null;
    if (tokenString) {
      try {
        const tokenData = JSON.parse(tokenString);
        userId = tokenData.userId;
        setUserId(userId);
      } catch (e) {
        console.error('Error parsing token from cookie:', e);
      }
    }

    if (userId) {
      connectWebSocket(userId, showModal);
    }

    const fetchNotifications = async () => {
      try {
        if (userId) {
          const noticeResponse = await ViewNotice(userId);
          if (noticeResponse.data.isSuccess) {
            const { result } = noticeResponse.data;
            const notifications = await Promise.all(
              result.map(async (notification) => {
                const userResponse = await GetUserInfo(notification.from_id);
                if (userResponse.data.isSuccess) {
                  return {
                    ...notification,
                    nickName: userResponse.data.result.nickName,
                    profileImg: userResponse.data.result.profileImg,
                  };
                }
                return notification;
              })
            );
            setNotifications(notifications);
          } else {
            console.error('ViewNotice call was not successful:', noticeResponse.data.message);
          }
        }
      } catch (error) {
        console.error('Failed to fetch notifications', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [userId]);

  const totalUnRead = notifications.filter((item) => item.status === 'NOT_READ').length;

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const clickManager = () => {
    handleClose();
  };

  const handleMarkAllAsRead = async () => {
    try {
      await Promise.all(
        notifications.map(async (notification) => {
          if (notification.status === 'NOT_READ') {
            await ReadNotice(notification.id);
          }
          return {
            ...notification,
            status: 'READ',
          };
        })
      );
      setNotifications(
        notifications.map((notification) => ({
          ...notification,
          status: 'READ',
        }))
      );
    } catch (error) {
      console.error('Failed to mark all notifications as read', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen}>
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify width={24} icon="solar:bell-bing-bold-duotone" />
        </Badge>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
          onClick: clickManager,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title="Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <NotificationsList notifications={notifications} navigate={navigate} />
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />
      </Popover>

      <CustomModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="New Notification"
        contents={modalMessage.notificationMessage}
        rightButton="확인"
        buttonAction={{
          leftAction: () => setModalOpen(false),
          rightAction: handleModalConfirm,
        }}
      />
    </>
  );
}
