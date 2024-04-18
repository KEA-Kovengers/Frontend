// import React from 'react';
// import PropTypes from 'prop-types';
// import IconButton from '@mui/material/IconButton';
// import Iconify from 'src/components/iconify';

// export default function ProfileFolder({
//     foldername,
//     articlecnt,
// }) {
//     return (
//         <div style={{ flexDirection: 'column', display: 'flex', marginRight: '20px', width: '70%', backgroundColor: 'grey', alignItems: 'center' }}>
//             <IconButton >
//                 <Iconify icon='material-symbols:folder' />
//             </IconButton>

//             <span style={{ fontSize: '25px', marginBottom: '10px' }}>{foldername}</span>
//         </div>
//     );
// }

// ProfileFolder.propTypes = {
//     foldername: PropTypes.string,
//     articlecnt: PropTypes.number,
// };

import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { colors } from '../../theme/variableColors';

import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';
// Import the chat icon from another library if needed

export default function ProfileFolder({
    foldername,
    articlecnt,
}) {
    return (
        <IconButton style={{ flexDirection: 'column' }}>
            <Iconify icon='material-symbols:folder' style={{ fontSize: '250px', width: '70%', height: '100%', color: colors.divider1 }} />
            <span style={{ fontSize: '23px' }}>{foldername}</span>
        </IconButton>
    );
}

ProfileFolder.propTypes = {
    foldername: PropTypes.string,
    articlecnt: PropTypes.number,
};
