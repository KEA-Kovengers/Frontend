import React from 'react';
import { Box, Container, Stack, Button, Typography, AppBar, Toolbar } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useTheme } from '@mui/material/styles';
import { useResponsive } from 'src/hooks/use-responsive'; 
import { HEADER } from '../../../layouts/dashboard/config-layout';
import Logo from 'src/components/logo';
import { useNavigate } from 'react-router-dom';

import CollabProfile from '../header/collab-profile';
import ModifyPopover from '../header/modify-popover';
import InvitePopover from '../header/invite-popover';


import MdEditor from '../editor/md-editor';

export default function BlogView() {
  const navigate = useNavigate();

  const headerHeight = HEADER.H_MOBILE; 
  const globalTheme = useTheme(); 
  const lgUp = useResponsive('up', 'lg'); 

  const renderContent = (
    <Stack direction="row" alignItems="center" spacing={1}>
      <CollabProfile />
      <InvitePopover />
      <ModifyPopover />
    </Stack>
  );

  const renderHeader = (
    <AppBar
      sx={{
        boxShadow: 'none',
        height: headerHeight,
        width: '100%',
        zIndex: globalTheme.zIndex.appBar + 1,
        backgroundColor: globalTheme.palette.background.default,
        transition: globalTheme.transitions.create(['height'], {
          duration: globalTheme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: '100%',
          height: HEADER.H_DESKTOP,
          borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
        }),
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', pr: { lg: 1 } }}>
        <Logo sx={{ mt: 3, ml: 2 }} />
        <Toolbar sx={{ height: 1 }}>
          {renderContent}
          <Button 
          onClick={()=>navigate('/select-thumbnail')}
          sx={{ width: 54, height: 40, bgcolor: '#1A2CDD', borderRadius: 3, color: 'white', fontSize: '18px', margin: '13px' }}>
            <Typography variant="body1" sx={{ fontSize: '16px' }}>완료</Typography>
          </Button>
        </Toolbar>
      </Box>
    </AppBar>
  );

  return (
    <>
      {renderHeader}
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box mt={9.5}>
              <MdEditor />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}