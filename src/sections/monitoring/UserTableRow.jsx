import React from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';

export function UserTableRow({
  selected,
  name,
  avatarUrl,
  content,
  title,
  date,
  handleClick,
  onRowClick,
}) {
  return (
    <TableRow hover tabIndex={-1} role="checkbox" selected={selected} onClick={onRowClick}>
      <TableCell padding="checkbox">
        <Checkbox disableRipple checked={selected} onChange={handleClick} />
      </TableCell>

      <TableCell sx={{ width: '25%' }}>{content}</TableCell>

      <TableCell>{date}</TableCell>

      <TableCell sx={{ width: '32%' }}>{title}</TableCell>

      <TableCell component="th" scope="row" padding="none">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={name} src={avatarUrl} />
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Stack>
      </TableCell>
    </TableRow>
  );
}

UserTableRow.propTypes = {
  avatarUrl: PropTypes.string,
  content: PropTypes.string,
  date: PropTypes.string,
  handleClick: PropTypes.func,
  name: PropTypes.string,
  selected: PropTypes.bool,
  title: PropTypes.string,
  onRowClick: PropTypes.func, 
};

export default UserTableRow;
