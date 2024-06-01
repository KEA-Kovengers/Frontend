import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import {
  Card,
  CardContent,
  CardMedia,
  Stack,
  Grid,
  Box,
  Typography,
  IconButton,
} from '@mui/material';

import { colors } from 'src/theme/variableColors';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function UploadCardInfo({ info }) {
  const card_style = {
    borderRadius: 0,
    bgcolor: 'background.default',
  };

  const Userimage = (
    <img
      src={info[0].userImage}
      alt="user"
      style={{
        borderRadius: '50%',
        width: '100%',
        height: '100%',
        maxWidth: '50px',
        maxHeight: '50px',
      }}
    />
  );

  const Title = (
    <Typography
      sx={{
        color: colors.blueBlack,
        fontSize: '20px',
        maxWidth: '75%',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textDecoration: 'none',
      }}
    >
      {info[0].title}
    </Typography>
  );

  const UserName = (
    <Typography
      sx={{
        color: colors.blueBlack,
        fontSize: '13px',
        maxWidth: '150px',
        textOverflow: 'ellipsis',
        paddingRight: '10px',
      }}
      noWrap
    >
      {info[0].userName}
    </Typography>
  );

  // const Date = (
  //   <Typography
  //     variant="caption"
  //     sx={{
  //       color: colors.textGrey,
  //       fontSize: '13px',
  //     }}
  //     noWrap
  //   >
  //     {info[0].date}
  //   </Typography>
  // );

  const CommunityInformation = (
    <Stack direction="row" spacing={1}>
      <Stack direction="row" spacing={1}>
        <Iconify
          icon={'icon-park-outline:like'}
          sx={{ display: 'flex', mr: 0.5 }}
          color={colors.blueBlack}
        />
        <Typography
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            verticalAlign: 'center',
          }}
        >
          0
        </Typography>
      </Stack>

      <Stack direction="row" spacing={1}>
        <Iconify
          icon="iconoir:chat-bubble"
          sx={{ display: 'flex', ml: 1, mr: 0.5 }}
          color={colors.blueBlack}
        />
        <Typography
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            verticalAlign: 'center',
          }}
        >
          0
        </Typography>
      </Stack>
    </Stack>
  );

  return (
    <Card sx={{ ...card_style, paddingLeft: '10px' }}>
      <Grid container alignItems="center">
        <Grid item xs={1}>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {Userimage}
          </Box>
        </Grid>

        <Grid item xs={11}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>{Title}</Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex' }}>
                {UserName}
                {/* {Date} */}
              </Box>
              <Box
                sx={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'row-reverse' }}
              >
                {CommunityInformation}
              </Box>
            </Box>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}

UploadCardInfo.propTypes = {
  info: PropTypes.arrayOf(PropTypes.object).isRequired,
};
