import { useState } from 'react';
import Iconify from 'src/components/iconify';
import IconButton from '@mui/material/IconButton';

import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
export default function ArticleTitle() {
  const [open, setOpen] = useState(null);
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };
  return (
    <div
      style={{
        borderBottom: '1px solid #E4E8EB',
        borderRadius: '1px 1px 0px 0px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#F9F9F9',
        marginLeft: '100px',
        marginRight: '100px',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
        <span style={{ fontSize: '24px', marginTop: '15px' }}>고양이 감기 : 허피스 바이러스</span>
        <div
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            display: 'flex',
            width: '100%',
            marginTop: '25px',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: '13px', color: '#637381' }}>2024. 03. 15 17:16 </div>

          <IconButton onClick={handleOpenMenu}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
          <Popover
            open={!!open}
            anchorEl={open}
            onClose={handleCloseMenu}
            anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: { width: 140 },
            }}
          >
            <MenuItem onClick={handleCloseMenu}>
              <Iconify icon="eva:edit-fill" sx={{ mr: 2 }} />
              Edit
            </MenuItem>

            <MenuItem onClick={handleCloseMenu} sx={{ color: 'error.main' }}>
              <Iconify icon="eva:trash-2-outline" sx={{ mr: 2 }} />
              Delete
            </MenuItem>
          </Popover>
        </div>
      </div>
    </div>
  );
}
