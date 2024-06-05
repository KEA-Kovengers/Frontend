import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { ReadNotice } from 'src/api/notice.api';

function getMessage(notification) {
  const { nickName, type } = notification;
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
}

export default function NotificationsItem({ notification, navigate }) {
  const message = getMessage(notification);

  const handleClick = async () => {
    try {
      if (notification.status === "NOT_READ") {
        await ReadNotice(notification.id);
      }
      switch (notification.type) {
        case 'INVITE':
        case 'COMMENT':
        case 'RECOMMENT':
        case 'LIKE':
          navigate(`/article/${notification.post_id}`);
          break;
        case 'FRIEND_REQUEST':
        case 'FREIEND_RESPONSE':
          navigate(`/user/${notification.from_id}`);
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Failed to handle notification click", error);
    }
  };

  return (
    <ListItem button onClick={handleClick} sx={{ opacity: notification.status === "READ" ? 0.5 : 1 }}>
      <ListItemAvatar>
        <Avatar src={notification.profileImg} />
      </ListItemAvatar>
      <ListItemText primary={message} secondary={new Date(notification.created_at).toLocaleString()} />
    </ListItem>
  );
}

NotificationsItem.propTypes = {
  notification: PropTypes.shape({
    nickName: PropTypes.string.isRequired,
    profileImg: PropTypes.string,
    type: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    post_id: PropTypes.string,
    from_id: PropTypes.string,
    status: PropTypes.string.isRequired,
  }).isRequired,
  navigate: PropTypes.func.isRequired,
};
