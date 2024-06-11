import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { DeleteLike, PostLike } from 'src/api/like.api';
import {
  Card,
  CardContent,
  CardMedia,
  Stack,
  Grid,
  Box,
  Typography,
  IconButton,
} from '@mui/material';

import { colors } from 'src/theme/variableColors';
import { useAccountStore } from 'src/store/useAccountStore';
import Iconify from 'src/components/iconify';
import { useLikedPostStore } from 'src/store/useLikedPostStore';
import { Avatar, AvatarGroup, Icon, Tooltip } from '@mui/material';

// ----------------------------------------------------------------------

export default function AppCardInfo({ info }) {
  const { accountInfo } = useAccountStore();
  const navigate = useNavigate();
  const card_style = {
    borderRadius: 0,
    bgcolor: 'background.default',
  };

  const Userimage = (
    // <img
    //   src={info[0].userImage}
    //   alt="user"
    //   style={{
    //     borderRadius: '50%',
    //     width: '100%',
    //     height: '100%',
    //     maxWidth: '50px',
    //     maxHeight: '50px',
    //   }}
    // />
    <AvatarGroup max={info[0].userName.length} spacing={10}>
      {info[0].userName.map((acc) => (
        <Tooltip title={acc.nickName} key={acc.id}>
          <Avatar
            src={acc.profileImg}
            style={{
              width: 30,
              height: 30,

              '&:hover': { opacity: 0.72 },
              cursor: 'pointer',
            }}
          />
        </Tooltip>
      ))}
    </AvatarGroup>
  );

  const Title = (
    <Typography
      sx={{
        color: colors.blueBlack,
        fontSize: '20px',
        maxWidth: 200,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        textDecoration: 'none',
        '&:hover': {
          textDecoration: 'underline',
        },
      }}
      onClick={() => navigate(`/article/${info[0].id}`)}
    >
      {info[0].title}
    </Typography>
  );

  const UserName = (
    <Typography
      sx={{
        color: colors.blueBlack,
        fontSize: '13px',
        maxWidth: '150px',
        textOverflow: 'ellipsis',
        paddingRight: '10px',
      }}
      noWrap
    >
      {info[0].userName}
    </Typography>
  );

  const Date = (
    <Typography
      variant="caption"
      sx={{
        color: colors.textGrey,
        fontSize: '13px',
      }}
      noWrap
    >
      {info[0].date}
    </Typography>
  );

  const { likedPosts } = useLikedPostStore();

  const [like, setLike] = useState(likedPosts.some((post) => post.likes.post_id === info[0].id));
  const [likeCount, setLikeCount] = useState(info[0].likeCnt);
  const [commentCount, setCommentCount] = useState(info[0].commentCnt);
  const addLike = () => {
    setLikeCount(likeCount + 1);
    PostLike(info[0].id)
      .then((res) => {
        console.log('좋아요 추가', res);
      })
      .catch((err) => {
        console.log('좋아요 추가 에러', err);
      });
  };

  const removeLike = () => {
    setLikeCount(likeCount - 1);
    DeleteLike(accountInfo.id, info[0].id)
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

  const CommunityInformation = (
    <Stack flexDirection="row">
      <Stack direction="row">
        <IconButton
          onClick={handleLike}
          color={like ? '#FF5631' : '#637381'}
          disabled={accountInfo.id === null}
        >
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
        >
          {likeCount}
        </Typography>
      </Stack>

      <Stack direction="row">
        <IconButton>
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
        >
          {commentCount}
        </Typography>
      </Stack>
    </Stack>
  );

  return (
    <Card sx={{ ...card_style, marginBottom: '70px', paddingLeft: '10px' }}>
      <Grid container alignItems="center">
        <Grid item xs={4}>
          <Box sx={{ display: 'flex', flexDirection: 'row' }}>{Title}</Box>
          <Box sx={{ display: 'flex' }}>
            {/* {UserName} */}
            {Date}
          </Box>
          {/* <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {Userimage}
          </Box> */}
        </Grid>

        <Grid item xs={8}>
          <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
            {/* <Box sx={{ display: 'flex', flexDirection: 'row' }}>{Title}</Box> */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {/* <Box sx={{ display: 'flex' }}>
                {UserName}
                {Date}
              </Box> */}
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {Userimage}
              </Box>
              <Box
                sx={{ display: 'flex', justifyContent: 'flex-end', flexDirection: 'row-reverse' }}
              >
                {CommunityInformation}
              </Box>
            </Box>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  );
}

AppCardInfo.propTypes = {
  info: PropTypes.arrayOf(PropTypes.object).isRequired,
};
