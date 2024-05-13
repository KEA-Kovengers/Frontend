import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import NotificationsItem from './NotificationsItem';

export default function NotificationsList({ notifications }) {
  // 현재 시간
  const currentTime = new Date();

  // 'days'가 1 이상인 경우와 1 미만인 경우를 기준으로 알림을 분류
  const newNotifications = notifications.filter(
    (notification) => Math.abs(currentTime - notification.createdAt) < 24 * 60 * 60 * 1000
  );
  const beforeThatNotifications = notifications.filter(
    (notification) => Math.abs(currentTime - notification.createdAt) >= 24 * 60 * 60 * 1000
  );

  return (
    <>
      {/* 'New' 알림 리스트 */}
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
            <NotificationsItem key={notification.id} notification={notification} />
          ))}
        </List>
      )}

      {/* 'Before that' 알림 리스트 */}
      <List
        disablePadding
        subheader={
          <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
            Before that
          </ListSubheader>
        }
      >
        {beforeThatNotifications.map((notification) => (
          <NotificationsItem key={notification.id} notification={notification} />
        ))}
      </List>
    </>
  );
}

NotificationsList.propTypes = {
  notifications: PropTypes.array.isRequired,
};
