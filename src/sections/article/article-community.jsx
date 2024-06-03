import React, { useEffect, useState } from 'react';
import Iconify from 'src/components/iconify';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

import { Button, Divider } from '@mui/material';
import ArticleComment from './article-coment';
import LikeTable from './article-like-table';
import ReComment from './ReComment';
import { GetLikedUser, PostLike } from 'src/api/like.api';
import { useParams } from 'react-router-dom';
import { GetArticleComment, PostComment } from 'src/api/comment.api';
import { useAccountStore } from 'src/store/useAccountStore';
import { useLikedPostStore } from 'src/store/useLikedPostStore';
// import { Comment } from './Comment';

export default function ArticleCommunity({ views }) {
  const params = useParams();
  const postId = Number(params.id);
  const { accountInfo } = useAccountStore();
  const { likedPosts } = useLikedPostStore();

  const [like, setLike] = useState(likedPosts.some((post) => post.likes.post_id === postId));
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [showLikeTable, setShowLikeTable] = useState(false);

  const [likeUser, setLikeUser] = useState([]);
  const [comment, setComment] = useState([]);

  useEffect(() => {
    GetLikedUser(postId)
      .then((res) => {
        console.log('좋아요 누른 유저', res);
        setLikeUser(res.data.result);
        setLikeCount(res.data.result.length);
      })
      .catch((err) => {
        console.log('좋아요 누른 유저 에러', err);
      });

    GetArticleComment(postId)
      .then((res) => {
        console.log('댓글 리스트', res);
        setComment(res.data.result);
        setCommentCount(res.data.result.length);
      })
      .catch((err) => {
        console.log('댓글 에러', err);
      });
  }, []);

  const [commentList, setCommentList] = useState([
    { content: 'hello', time: '2021. 10. 10 14:40' },
    { content: 'hi', time: '2031. 10. 10 14:40' },
  ]);

  const [reCommentList, setReCommentList] = useState([
    { content: 'hello', time: '2021. 10. 10 14:40', exist: true },
    { content: 'hi', time: '2031. 10. 10 14:40', exist: true },
  ]);
  const [content, setContent] = useState('');

  //댓글 추가
  const handleAddComment = () => {
    console.log('댓글 추가');
    setCommentList([...commentList, { content: content, time: formatTime(new Date()) }]);
    setContent('');
    PostComment(postId, null, content)
      .then((res) => {
        console.log('댓글 추가', res);
      })
      .catch((err) => {
        console.log('댓글 추가 에러', err);
      });
  };
  //대댓글 추가
  const handleAddReComment = () => {
    setReCommentList([...reCommentList, { state: true }]);
  };

  //좋아요 추가
  const addLike = () => {
    setLikeCount(likeCount + 1);
    PostLike(postId)
      .then((res) => {
        console.log('좋아요 추가', res);
      })
      .catch((err) => {
        console.log('좋아요 추가 에러', err);
      });
  };
  //좋아요 취소
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

  const handleCommentCount = () => {
    setCommentCount(commentCount + 1);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd hh:mm', { locale: ko });
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
        <div style={{ fontSize: '13px', color: '#637381' }}>{views}</div>
      </div>
      {showLikeTable && (
        <div>
          <LikeTable users={likeUser} />
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
          disabled={accountInfo.id === null ? true : false}
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
