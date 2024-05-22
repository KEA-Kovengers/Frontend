import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography, Tooltip, IconButton } from '@mui/material';
import Iconify from 'src/components/iconify';

export default function NotificationsMarkAllRead ({totalUnRead, handleMarkAllAsRead}) {
    return (
        <>         
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
        </>
    )
}

NotificationsMarkAllRead.propTypes = {
    totalUnRead: PropTypes.number.isRequired,
    handleMarkAllAsRead: PropTypes.func.isRequired,
};