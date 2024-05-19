import PropTypes from 'prop-types';

import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { styled, emphasize } from '@mui/material';

import Iconify from 'src/components/iconify';
import { Stack } from '@mui/material';
import { useState } from 'react';

// ----------------------------------------------------------------------
const StyledBreadcrumb = styled(Chip)(({ theme, selected }) => {
  const backgroundColor = theme.palette.grey[300];
  const primaryColor = theme.palette.primary.lighter;

  return {
    backgroundColor: selected ? backgroundColor : backgroundColor,
    height: theme.spacing(3),
    color: selected ? theme.palette.primary.main : theme.palette.text.primary,
    fontWeight: selected ? 'bold' : theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: primaryColor,
      color: theme.palette.primary.main,
      fontWeight: 'bold',
    },
    '&:active': {
      backgroundColor: emphasize(backgroundColor),
    },
    alignItems: 'center',
    justifyContent: 'center',
  };
});

export default function UserTableToolbar({
  numSelected,
  filterName,
  onFilterName,
  selectedBreadcrumb,
  setSelectedBreadcrumb,
}) {
  const handleBreadcrumbClick = (index) => {
    setSelectedBreadcrumb(index);
  };

  return (
    <Toolbar
      sx={{
        height: 96,
        display: 'flex',
        justifyContent: 'space-between',
        p: (theme) => theme.spacing(0, 1, 0, 3),
        ...(numSelected > 0 && {
          color: 'primary.main',
          bgcolor: 'primary.lighter',
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography component="div" variant="subtitle1">
          {numSelected} selected
        </Typography>
      ) : (
        <OutlinedInput
          value={filterName}
          onChange={onFilterName}
          placeholder="Search user..."
          startAdornment={
            <InputAdornment position="start">
              <Iconify
                icon="eva:search-fill"
                sx={{ color: 'text.disabled', width: 20, height: 20 }}
              />
            </InputAdornment>
          }
        />
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Iconify icon="eva:trash-2-fill" />
          </IconButton>
        </Tooltip>
      ) : (
        <Stack direction="row" spacing={1}>
          <StyledBreadcrumb
            label={'게시글'}
            selected={selectedBreadcrumb === 0}
            onClick={() => {
              if (selectedBreadcrumb === 1) {
                handleBreadcrumbClick(0);
              }
            }}
          />
          <StyledBreadcrumb
            label={'댓글'}
            selected={selectedBreadcrumb === 1}
            onClick={() => {
              if (selectedBreadcrumb === 0) {
                handleBreadcrumbClick(1);
              }
            }}
          />
        </Stack>
      )}
    </Toolbar>
  );
}

UserTableToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};
