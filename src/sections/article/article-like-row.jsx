import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

import TableRow from '@mui/material/TableRow';

import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Iconify from 'src/components/iconify';
import CustomModal from 'src/components/CustomModal/CustomModal';
import { useToggle } from 'src/hooks/useToggle';
import { PostFriendRequest } from 'src/api/friend.api';

import { colors } from 'src/theme/variableColors';
// ----------------------------------------------------------------------

export default function LikeRow({ id, name, avatarUrl, company, isFriend }) {
  const [open, setOpen] = useState(null);
  const { toggle, isOpen } = useToggle();

  const RequestFriend = (id) => {
    console.log('친구 신청');
    PostFriendRequest(id)
      .then((res) => {
        console.log('친구 신청 성공', res);
        requestAlertToggle.toggle();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <TableRow>
        <TableCell component="th" scope="row" padding="none">
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar alt={name} src={avatarUrl} />
            <Typography
              variant="subtitle2"
              component={Link}
              to="/user"
              sx={{
                color: '#000000',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
            >
              {name}
            </Typography>
          </Stack>
        </TableCell>

        <TableCell>
          <Typography
            variant="body"
            component={Link}
            to="/user"
            sx={{
              color: '#000000',
              textDecoration: 'none',
              '&:hover': {
                textDecoration: 'underline',
              },
            }}
          >
            {company}
          </Typography>
        </TableCell>

        <TableCell align="right">
          <IconButton onClick={() => toggle()} disabled={isFriend}>
            <Iconify
              icon={isFriend ? 'bxs:user-check' : 'bxs:user-plus'}
              sx={{ color: isFriend && colors.first }}
            />
          </IconButton>
          <CustomModal
            rightButton={'신청'}
            title={'친구 신청'}
            mode={'title'}
            onClose={toggle}
            colorText={name}
            contents={'님에게 친구 신청을 보내겠습니까?'}
            open={isOpen}
            buttonAction={{ rightAction: () => RequestFriend(id) }}
          />
        </TableCell>
      </TableRow>
    </>
  );
}

LikeRow.propTypes = {
  avatarUrl: PropTypes.any,
  name: PropTypes.any,
  company: PropTypes.any,
  isFriend: PropTypes.bool,
};
