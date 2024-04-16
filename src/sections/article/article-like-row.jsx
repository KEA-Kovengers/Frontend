import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import { colors } from 'src/theme/variableColors'
// ----------------------------------------------------------------------

export default function LikeRow({
    name,
    avatarUrl,
    company,
    isFriend,

}) {
    const [open, setOpen] = useState(null);

    const handleOpenMenu = (event) => {
        setOpen(event.currentTarget);
    };



    return (
        <>
            <TableRow >

                <TableCell component="th" scope="row" padding="none">
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar alt={name} src={avatarUrl} />
                        <Typography variant="subtitle2" noWrap>
                            {name}
                        </Typography>
                    </Stack>
                </TableCell>

                <TableCell>{company}</TableCell>



                <TableCell align="right">
                    <IconButton onClick={handleOpenMenu} color={isFriend && colors.first}>
                        <Iconify icon={isFriend ? "bxs:user-check" : "bxs:user-plus"} />
                    </IconButton>
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
