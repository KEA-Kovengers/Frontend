import React from 'react';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { colors } from '../../theme/variableColors';
import Button from '@mui/material/Button';

import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';
import { useFolder } from './hooks/useFolder';
import { GetFolderArticleList } from 'src/api/folder.api';

export default function ProfileFolder({ id, setId, foldername }) {
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
        toggleFolder();
        setId({ folderId: id, folderName: foldername });
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
