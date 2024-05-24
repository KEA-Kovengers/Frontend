import React, { useState } from "react";
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { account as acc1, account2 as acc2, account3 as acc3 } from 'src/_mock/account';

const accounts = [acc1, acc2, acc3];

export default function CollabProfile() {
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

  return (
    <div style={{ padding: '15px' }}>
      {accounts.map((acc, index) => (
        <div key={acc.displayName} style={{ position: 'relative', display: 'inline-block', marginRight: `${(accounts.length - 1) * -8}px`, zIndex: accounts.length-index }}>
          <IconButton
            onClick={(event) => handleOpen(event, acc)}
            sx={{
              width: 40,
              height: 40,
            }}
          >
            <Avatar
              src={acc.photoURL}
              alt={acc.displayName}
              sx={{
                width: 36,
                height: 36,
                border: (theme) => `solid 2px ${theme.palette.background.default}`,
              }}
            />
          </IconButton>
        </div>
      ))}

      <Popover
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {selectedAccount && (
          <Typography sx={{ p: 2 }}>
            <div>{selectedAccount.displayName}</div>
          </Typography>
        )}
      </Popover>
    </div>
  );
}