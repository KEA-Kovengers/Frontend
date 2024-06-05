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
import { useNavigate } from 'react-router-dom';
import connectWebSocket from 'src/api/connectWebSocket';

export default function NotificationsPopover() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // 쿠키에서 userId를 추출
    const tokenString = Cookies.get('token');
    let userId = null;
    if (tokenString) {
      try {
        const tokenData = JSON.parse(tokenString);
        userId = tokenData.userId;
        console.log('Extracted userId from cookie:', userId);
      } catch (e) {
        console.error('Error parsing token from cookie:', e);
      }
    }

    connectWebSocket(userId);
  
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
        console.error("Failed to fetch notifications", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchNotifications();
  }, [userId]);

  const totalUnRead = notifications.filter((item) => item.status === "NOT_READ").length;

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
          if (notification.status === "NOT_READ") {
            await ReadNotice(notification.id);
          }
          return {
            ...notification,
            status: "READ",
          };
        })
      );
      setNotifications(
        notifications.map((notification) => ({
          ...notification,
          status: "READ",
        }))
      );
    } catch (error) {
      console.error("Failed to mark all notifications as read", error);
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
          onClick: clickManager
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
    </>
  );
}
