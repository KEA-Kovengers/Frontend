import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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

import Iconify from 'src/components/iconify';
import { PostLike } from 'src/api/like.api'; // Assuming you have this import

// ----------------------------------------------------------------------

export default function AppCardInfo2({ info }) {
    const navigate = useNavigate();
    const card_style = {
        borderRadius: 0,
        bgcolor: 'background.default',
    };

    // Like & Comment counts from API data
    const [likeCount, setLikeCount] = useState(info[0].likeCnt);
    const commentCount = info[0].commentCnt;
    const [isLiked, setIsLiked] = useState(false); // Track if the post is liked

    // Handle Like Click
    const handleLike = async () => {
        try {
            const postId = info[0].id;
            if (isLiked) {
                // If liked, unlike the post
                // Implement logic to unlike the post (remove like from the server)
                // ... You might need to call an API to remove the like
                setIsLiked(false);
                setLikeCount(likeCount - 1);
            } else {
                // If not liked, like the post
                await PostLike(postId); // Call your API to like the post
                setIsLiked(true);
                setLikeCount(likeCount + 1);
            }
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    const Userimage = (
        <img
            src={info[0].userImage}
            alt="user"
            style={{
                borderRadius: '50%',
                width: '100%',
                height: '100%',
                maxWidth: '50px',
                maxHeight: '50px',
            }}
        />
    );

    const Title = (
        <Typography
            sx={{
                color: colors.blueBlack,
                fontSize: '20px',
                maxWidth: '75%',
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

    const CommunityInformation = (
        <Stack flexDirection="row">
            <Stack direction="row">
                <IconButton onClick={handleLike} color={isLiked ? '#FF5631' : '#637381'}>
                    <Iconify
                        icon={isLiked ? 'flat-color-icons:like' : 'icon-park-outline:like'}
                        sx={{ display: 'flex', mr: 0.5 }}
                        color={colors.blueBlack}
                    />
                </IconButton>
                <Typography
                    style={{ fontSize: '13px', color: colors.blueBlack, cursor: 'pointer' }}
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
                <Grid item xs={1}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        {Userimage}
                    </Box>
                </Grid>

                <Grid item xs={11}>
                    <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'row' }}>{Title}</Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex' }}>
                                {UserName}
                                {Date}
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

AppCardInfo2.propTypes = {
    info: PropTypes.arrayOf(PropTypes.object).isRequired,
};