import React, { useState } from 'react';
import Iconify from 'src/components/iconify';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import { Button, Divider } from '@mui/material';
import ArticleComment from './article-coment';
import LikeTable from './article-like-table';
import ReComment from './ReComment';
// import { Comment } from './Comment';

export default function ArticleCommunity() {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(6);
  const [commentCount, setCommentCount] = useState(1);
  const [viewCount, setViewCount] = useState(5);
  const [showLikeTable, setShowLikeTable] = useState(false);

  // const [commentList, setCommentList] = useState < Comment > [Data_Comment];
  const [commentList, setCommentList] = useState([
    { content: 'hello', time: '2021. 10. 10 14:40' },
    { content: 'hi', time: '2031. 10. 10 14:40' },
  ]);

  const [reCommentList, setReCommentList] = useState([
    { content: 'hello', time: '2021. 10. 10 14:40', exist: true },
    { content: 'hi', time: '2031. 10. 10 14:40', exist: true },
  ]);
  const [content, setContent] = useState('');

  const handleAddComment = () => {
    setCommentList([...commentList, { content: content, time: formatTime(new Date()) }]);
    setContent('');
  };

  const handleAddReComment = () => {
    setReCommentList([...reCommentList, { state: true }]);
  };

  function formatTime(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${year}. ${month}. ${day} ${hours}:${minutes}`;
  }

  const addLike = () => {
    setLikeCount(likeCount + 1);
  };

  const removeLike = () => {
    setLikeCount(likeCount - 1);
  };

  const handleLike = () => {
    setLike(!like);
    like ? removeLike() : addLike();
  };

  const handleLikeCountClick = () => {
    setShowLikeTable(!showLikeTable); // 토글
  };

  // const handleLikeCount = () => {
  //   setLikeCount(likeCount + 1);
  // };

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
        marginTop: '5px',
        marginLeft: '100px',
      }}
    >
      <div
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          display: 'flex',
          width: 'auto',
        }}
      >
        <IconButton onClick={handleLike}>
          <Iconify
            icon={like ? 'gridicons:heart' : 'ph:heart'}
            sx={{ width: '20px', height: '20px' }}
            color={like ? '#FF5631' : '#637381'}
          />
        </IconButton>
        <span
          style={{ fontSize: '13px', color: '#637381', cursor: 'pointer', marginRight: 3 }}
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

        <IconButton color="#637381" size="small" style={{ marginRight: 3 }}>
          <Iconify icon="iconoir:chat-bubble" sx={{ width: '20px', height: '20px' }} />
        </IconButton>
        <div style={{ fontSize: '13px', color: '#637381' }}>{commentCount}</div>

        <IconButton color="#637381" style={{ marginRight: 1 }}>
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
          marginBottom: '20px',
          flexDirection: 'column',
          display: 'flex',
          alignItems: 'flex-start',
        }}
      >
        <a style={{ fontWeight: 'bold', fontSize: '17px' }}>Comments</a>
        <OutlinedInput
          style={{ marginTop: '20px', width: '100%' }}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          multiline
          placeholder="댓글을 입력해주세요."
          endAdornment={
            <InputAdornment position="end">
              <Button
                disabled={content === '' ? true : false}
                sx={modal_style.right_button}
                onClick={handleAddComment}
              >
                등록
              </Button>
            </InputAdornment>
          }
        />
      </div>

      {commentList.map((comment, index) => (
        <>
          <ArticleComment
            key={index}
            content={comment.content}
            time={comment.time}
            func={handleAddReComment}
          />
          <Divider style={{ margin: 1 }} />
          {reCommentList.map((reComment, index) => (
            <>
              {reComment.state ? (
                <ReComment state={reComment.state} />
              ) : (
                <ReComment
                  key={index}
                  content={reComment.content}
                  time={reComment.time}
                  exist={reComment.exist}
                />
              )}

              <Divider style={{ margin: 1 }} />
            </>
          ))}
        </>
      ))}
      {/* <ArticleComment />
      <Divider style={{ margin: 1 }} />
      <ReComment />
      <Divider style={{ margin: 1 }} />
      <ArticleComment />
      <Divider style={{ margin: 1 }} /> */}
    </div>
  );
}
