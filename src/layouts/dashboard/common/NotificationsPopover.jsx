import { useState } from 'react';

import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import NOTIFICATIONS from 'src/_mock/Notifications';
import NotificationsMarkAllRead from './NotificationsMarkAllRead';
import NotificationsList from './NotificationsList';
// ----------------------------------------------------------------------

// 친구 신청, 댓글 알림, 좋아요 알림
// 알림을 클릭하면 해당 알림에 대한 상세 페이지로 이동하면 좋겠다

export default function NotificationsPopover() {
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    );
  };

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
        }}
      >

        <NotificationsMarkAllRead totalUnRead={totalUnRead} handleMarkAllAsRead={handleMarkAllAsRead} />

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <NotificationsList notifications={notifications} />
        </Scrollbar>
        
      </Popover>
    </>
  );
}