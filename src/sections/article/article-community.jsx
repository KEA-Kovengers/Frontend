import React, { useState } from 'react';
import Iconify from 'src/components/iconify';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import { Button } from '@mui/material';
import ArticleComment from './article-coment';
import LikeTable from './article-like-table';

export default function ArticleCommunity() {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(6);
  const [commentCount, setCommentCount] = useState(1);
  const [viewCount, setViewCount] = useState(5);
  const [showLikeTable, setShowLikeTable] = useState(false);

  const handleLike = () => {
    setLike(!like);
  };

  const handleLikeCountClick = () => {
    setShowLikeTable(!showLikeTable); // 토글
  };

  const handleLikeCount = () => {
    setLikeCount(likeCount + 1);
  };

  const handleCommentCount = () => {
    setCommentCount(commentCount + 1);
  };

  const handleViewCount = () => {
    setViewCount(viewCount + 1);
  };

  const modal_style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 537,
    height: 350,
    bgcolor: 'background.paper',
    borderRadius: 3,

    right_button: {
      width: 50,
      height: 30,
      bgcolor: '#1A2CDD',
      borderRadius: 1,
      color: 'white',
      fontSize: '15px',
    },
  };

  return (
    <div
      style={{
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginRight: '100px',
        marginTop: '10px',
        marginLeft: '100px',
      }}
    >
      <div
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          display: 'flex',
          width: '23%',
          justifyContent: 'space-evenly',
        }}
      >
        <IconButton onClick={handleLike} color={like ? '#FF5631' : '#637381'}>
          <Iconify
            icon={like ? 'flat-color-icons:like' : 'icon-park-outline:like'}
            sx={{ width: '20px', height: '20px' }}
          />
        </IconButton>
        <span
          style={{ fontSize: '13px', color: '#637381', cursor: 'pointer' }}
          onClick={handleLikeCountClick}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleLikeCountClick();
            }
          }}
          role="button"
          tabIndex={0}
        >
          {likeCount}
        </span>

        <IconButton color="#637381" size="small">
          <Iconify icon="iconoir:chat-bubble" sx={{ width: '20px', height: '20px' }} />
        </IconButton>
        <div style={{ fontSize: '13px', color: '#637381' }}>{commentCount}</div>

        <IconButton color="#637381">
          <Iconify icon="mdi:eye" sx={{ width: '20px', height: '20px' }} />
        </IconButton>
        <div style={{ fontSize: '13px', color: '#637381' }}>{viewCount}</div>
      </div>
      {showLikeTable && (
        <div>
          <LikeTable />
        </div>
      )}
      <div
        style={{
          marginTop: '30px',
          flexDirection: 'column',
          display: 'flex',
          alignItems: 'flex-start',
        }}
      >
        <a style={{ fontWeight: 'bold', fontSize: '17px' }}>Comments</a>
        <OutlinedInput
          style={{ marginTop: '20px', width: '100%' }}
          // value={filterName}
          // onChange={onFilterName}
          // placeholder="Search user..."

          endAdornment={
            <InputAdornment position="end">
              <Button sx={modal_style.right_button}>등록</Button>
            </InputAdornment>
          }
        />
      </div>

      <ArticleComment />
    </div>
  );
}
