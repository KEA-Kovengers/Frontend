import { useState } from 'react';
import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';

import TableRow from '@mui/material/TableRow';

import TableCell from '@mui/material/TableCell';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

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
                    <IconButton >
                        <Iconify icon={isFriend ? "bxs:user-check" : "bxs:user-plus"} sx={{ color: isFriend && colors.first }} />
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
