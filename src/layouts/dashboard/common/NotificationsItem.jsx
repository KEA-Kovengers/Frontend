import React from 'react';
import PropTypes from 'prop-types';
import { fToNow } from 'src/utils/format-time';
import { Typography, ListItemText, ListItemButton, ListItemAvatar, Avatar } from '@mui/material';
import Iconify from 'src/components/iconify';

// 아바타, 알림 내용, 알림 생성 시간 형식 지정
export default function NotificationsItem({ notification }) {

    const { avatar, title } = renderContent(notification);

    return (
      <ListItemButton
        sx={{
          py: 1.5,
          px: 2.5,
          mt: '1px',
          ...(notification.isUnRead && {
            bgcolor: 'action.selected',
          }),
        }}
      >
        <ListItemAvatar>
          <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={title}
          secondary={
            <Typography
              variant="caption"
              sx={{
                mt: 0.5,
                display: 'flex',
                alignItems: 'center',
                color: 'text.disabled',
              }}
            >
              <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
              {fToNow(notification.createdAt)}
            </Typography>
          }
        />
      </ListItemButton>
    );
}

// ----------------------------------------------------------------------

// 알림의 타입을 정의
NotificationsItem.propTypes = {
    notification: PropTypes.shape({
      createdAt: PropTypes.instanceOf(Date),
      id: PropTypes.string,
      isUnRead: PropTypes.bool,
      title: PropTypes.string,
      description: PropTypes.string,
      type: PropTypes.string,
      avatar: PropTypes.any,
    }),
  };
  
// ----------------------------------------------------------------------

function renderContent(notification) {
// description 문자열의 최대 길이
const maxLength = 35;

// description 문자열이 최대 길이보다 길면 생략 부호를 추가하여 자름
const truncatedDescription = notification.description.length > maxLength
    ? notification.description.slice(0, maxLength) + '...' 
    : notification.description;

const title = (
    <Typography variant="subtitle2">
    {notification.title}
    <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {truncatedDescription}
    </Typography>
    </Typography>
);


return {
    avatar: notification.avatar ? <img alt={notification.title} src={notification.avatar} /> : null,
    title,
};
}
  