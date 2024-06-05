import React from 'react';
import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import NotificationsItem from './NotificationsItem';

export default function NotificationsList({ notifications, navigate }) {
  const currentTime = new Date();

  // UTC 형식의 시간을 KST로 변환하는 함수
  const convertToKST = (dateString) => {
    const utcDate = new Date(dateString);
    const kstOffset = 9 * 60 * 60 * 1000; // KST는 UTC+9
    const kstTimestamp = utcDate.getTime() + kstOffset;
    return new Date(kstTimestamp);
  };

  const currentTimeKST = convertToKST(currentTime);

  const newNotifications = notifications.filter(
    (notification) => {
      const createdAt = convertToKST(notification.created_at);
      // 현재 시간(KST)으로부터 24시간 이내인 알림 필터링
      return Math.abs(currentTimeKST - createdAt) < 24 * 60 * 60 * 1000;
    }
  );

  const beforeThatNotifications = notifications.filter(
    (notification) => {
      const createdAt = convertToKST(notification.created_at);
      // 현재 시간(KST)으로부터 24시간 이전인 알림 필터링
      return Math.abs(currentTimeKST - createdAt) >= 24 * 60 * 60 * 1000;
    }
  );

  console.log('Rendering NotificationsList');
  console.log('New Notifications:', newNotifications);
  console.log('Before That Notifications:', beforeThatNotifications);

  return (
    <>
      {newNotifications.length > 0 && (
        <List
          disablePadding
          subheader={
            <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
              New
            </ListSubheader>
          }
        >
          {newNotifications.map((notification) => (
            <NotificationsItem
              key={notification.id}
              notification={{
                ...notification,
                created_at: convertToKST(notification.created_at),
              }}
              navigate={navigate}
            />
          ))}
        </List>
      )}

      {beforeThatNotifications.length > 0 && (
        <List
          disablePadding
          subheader={
            <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
              Before that
            </ListSubheader>
          }
        >
          {beforeThatNotifications.map((notification) => (
            <NotificationsItem
              key={notification.id}
              notification={{
                ...notification,
                created_at: convertToKST(notification.created_at),
              }}
              navigate={navigate}
            />
          ))}
        </List>
      )}
    </>
  );
}

NotificationsList.propTypes = {
  notifications: PropTypes.array.isRequired,
  navigate: PropTypes.func.isRequired,
};
