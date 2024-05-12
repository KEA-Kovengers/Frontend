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
import Button from '@mui/material/Button';

import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';
import { useFolder } from './hooks/useFolder';

export default function ProfileFolder({ foldername, articlecnt }) {
  const { toggleFolder } = useFolder();

  return (
    <div
      style={{
        flexDirection: 'column',
        display: 'flex',
        alignItems: 'center',
        width: '180px',
        height: '180px',
        '&:hover': {
          backgroundColor: colors.blueBlack,
        },
        cursor: 'pointer',
      }}
      onClick={() => {
        // toggleFolder();
        setId(id);
        //get API 호출
      }}
    >
      <Iconify
        icon="material-symbols:folder"
        style={{ width: '90%', height: '100%', color: colors.divider1 }}
      />
      <span style={{ fontSize: '19px' }}>{foldername}</span>
    </div>
  );
}

ProfileFolder.propTypes = {
  foldername: PropTypes.string,
  articlecnt: PropTypes.number,
};
