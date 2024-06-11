import React, { useEffect, useState } from 'react';

import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

import PropTypes from 'prop-types';
import { GetEditorList } from 'src/api/editor.api';
import { Avatar, AvatarGroup, Icon, Tooltip } from '@mui/material';

export default function CollabProfile({ userInfo }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedAccount, setSelectedAccount] = useState(null);

  const handleOpen = (event, acc) => {
    setAnchorEl(event.currentTarget);
    setSelectedAccount(acc);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedAccount(null);
  };

  // useEffect(() => {
  //   console.log('======================');
  //   console.log('accounts', userInfo);
  //   console.log('userInfo is an array:', Array.isArray(userInfo));
  // }, [userInfo]);

  return (
    <div style={{ padding: '15px' }}>
      {userInfo.length === 0 ? (
        <Typography>No user information available</Typography>
      ) : (
        <AvatarGroup max={userInfo.length} spacing={10}>
          {userInfo.map((acc, index) => (
            <div
              key={acc.nickName}
              style={{
                position: 'relative',
                display: 'inline-block',
                marginRight: `${(userInfo.length - 1) * -8}px`,
                zIndex: userInfo.length - index,
              }}
            >
              {/* <IconButton
                onClick={(event) => handleOpen(event, acc)}
                sx={{
                  width: 40,
                  height: 40,
                }}
              >
                <Avatar
                  src={acc.profileImg}
                  alt={acc.nickName}
                  sx={{
                    width: 36,
                    height: 36,
                    border: (theme) => `solid 2px ${theme.palette.background.default}`,
                  }}
                />
              </IconButton> */}
              <Tooltip title={acc.nickName} key={acc.id}>
                <Avatar
                  src={acc.profileImg}
                  style={{
                    width: 30,
                    height: 30,

                    '&:hover': { opacity: 0.72 },
                    cursor: 'pointer',
                  }}
                />
              </Tooltip>
            </div>
          ))}
        </AvatarGroup>
      )}

      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {selectedAccount && (
          <Typography sx={{ p: 2 }}>
            <div>{selectedAccount.nickName}</div>
          </Typography>
        )}
      </Popover>
    </div>
  );
}

CollabProfile.propTypes = {
  userInfo: PropTypes.array.isRequired,
};
