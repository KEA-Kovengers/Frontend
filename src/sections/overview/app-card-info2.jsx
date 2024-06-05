import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { DeleteLike, PostLike } from 'src/api/like.api';
import {
  Card,
  CardContent,
  Grid,
  Box,
  Typography,
  IconButton,
  Avatar,
  Tooltip
} from '@mui/material';
import { colors } from 'src/theme/variableColors';
import Iconify from 'src/components/iconify';
import { useAccountStore } from 'src/store/useAccountStore';
import { useLikedPostStore } from 'src/store/useLikedPostStore';

export default function AppCardInfo2({ id, title, body, likeCnt, commentCnt, userName, userImage, isLiked, date }) {
  const navigate = useNavigate();
  const card_style = {
    borderRadius: 0,
    bgcolor: 'background.default',
  };

  const { accountInfo } = useAccountStore();
  const { likedPosts } = useLikedPostStore();

  const [like, setLike] = useState(likedPosts.some((post) => post.likes.post_id === id));
  const [likeCount, setLikeCount] = useState(likeCnt);
  const [commentCount, setCommentCount] = useState(commentCnt);

  const addLike = () => {
    setLikeCount(likeCount + 1);
    PostLike(id)
      .then((res) => {
        console.log('좋아요 추가', res);
      })
      .catch((err) => {
        console.log('좋아요 추가 에러', err);
      });
  };

  const removeLike = () => {
    setLikeCount(likeCount - 1);
    DeleteLike(accountInfo.id, id)
      .then((res) => {
        console.log('좋아요 취소', res);
      })
      .catch((err) => {
        console.log('좋아요 취소 에러', err);
      });
  };

  const handleLike = () => {
    setLike(!like);
    like ? removeLike() : addLike();
  };

  const handleLikeCountClick = () => {
    setShowLikeTable(!showLikeTable); // 토글
  };

  const Userimage = (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <IconButton onClick={handleLike} color={like ? '#FF5631' : '#637381'}>
        <Iconify
          icon={like ? 'flat-color-icons:like' : 'icon-park-outline:like'}
          sx={{ display: 'flex', mr: 0.5 }}
          color={colors.blueBlack}
        />
      </IconButton>
      <Typography
        style={{ fontSize: '13px', color: colors.blueBlack, cursor: 'pointer' }}
        onClick={handleLikeCountClick}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            handleLikeCountClick();
          }
        }}
        tabIndex={0}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          verticalAlign: 'center',
        }}
        key={`likeCount-${id}`}
      >
        {likeCount}
      </Typography>
      <IconButton key={`commentIcon-${id}`}>
        <Iconify
          icon="iconoir:chat-bubble"
          sx={{ display: 'flex', ml: 1, mr: 0.5 }}
          color={colors.blueBlack}
        />
      </IconButton>
      <Typography
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          verticalAlign: 'center',
        }}
        key={`commentCount-${id}`}
      >
        {commentCount}
      </Typography>
    </Box>
  );

  return (
    <Card sx={{ ...card_style, marginBottom: '70px', paddingLeft: '10px' }}>
      <Grid container alignItems="center">
        <Grid item xs={2}>
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography
              sx={{
                color: colors.blueBlack,
                fontSize: '20px',
                maxWidth: '100px',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textDecoration: 'none',
                '&:hover': {
                  textDecoration: 'underline',
                },
              }}
              onClick={() => navigate(`/article/${id}`)}
            >
              {title}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: colors.textGrey,
                fontSize: '13px',
              }}
              noWrap
            >
              {date}
            </Typography>
          </Box>
        </Grid>
        <Grid item xs={10}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {userName.map((acc) => (
                  <Tooltip title={acc.nickName} key={acc.id}>
                    <Avatar
                      src={acc.profileImg}
                      style={{
                        width: 30,
                        height: 30,
                        '&:hover': { opacity: 0.72 },
                        cursor: 'pointer',
                      }}
                      key={acc.id} // Add key to Avatar
                    />
                  </Tooltip>
                ))}
              </Box>
              <Box
                sx={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'row-reverse' }}
              >
                {Userimage} 
              </Box>
            </Box>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}

AppCardInfo2.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string,
  likeCnt: PropTypes.number,
  commentCnt: PropTypes.number,
  userName: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      nickName: PropTypes.string,
      profileImg: PropTypes.string,
    })
  ).isRequired,
  userImage: PropTypes.string,
  isLiked: PropTypes.bool,
  date: PropTypes.string,
};
