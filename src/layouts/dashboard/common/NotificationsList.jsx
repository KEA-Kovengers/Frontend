import PropTypes from 'prop-types';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import NotificationsItem from './NotificationsItem';

export default function NotificationsList({ notifications}) {
    return (
        <>
        <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                New
              </ListSubheader>
            }
          >
            {notifications.slice(0, 1).map((notification) => (
              <NotificationsItem key={notification.id} notification={notification} />
            ))}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Before that
              </ListSubheader>
            }
          >
            {notifications.slice(1, 5).map((notification) => (
              <NotificationsItem key={notification.id} notification={notification} />
            ))}
        </List>
        </>
    )
}

NotificationsList.propTypes = {
    notifications: PropTypes.array.isRequired,
  };