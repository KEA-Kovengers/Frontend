import axios from 'axios';
import { useEffect } from 'react';
import { GetAuthValidate, GetLogin } from 'src/api/auth.api';
import { useCookies } from 'react-cookie';
import { useAccountStore } from 'src/store/useAccountStore';
import { PostUserInfo } from 'src/api/user.api';
import { update } from 'lodash';
import { GetUserInfo } from 'src/api/user.api';
import { useNavigate } from 'react-router-dom';
import { GetFriendList } from 'src/api/friend.api';
import { Box } from '@mui/material';
import { bgGradient } from 'src/theme/css';
import { alpha, useTheme } from '@mui/material/styles';
import { useFriendStore } from 'src/store/useFriendStore';
import { GetLikeArticle } from 'src/api/like.api';
import { useLikedPostStore } from 'src/store/useLikedPostStore';

export default function LoginKakaoAuth() {
  const { accountInfo, updateAccountInfo } = useAccountStore();
  const { setFriendsList } = useFriendStore();
  const { likedPosts, setLikedPosts } = useLikedPostStore();
  const [cookies, setCookie] = useCookies(['token']);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');

    GetLogin(code)
      .then((res) => {
        console.log(res);
        setCookie(
          'token',
          {
            token: res.data.result.accessToken,
            refreshToken: res.data.result.refreshToken,
            userId: Number(res.data.result.userId),
          },
          { path: '/' }
        ); // 쿠키에 토큰 저장
        updateAccountInfo('id', Number(res.data.result.userId));
        updateAccountInfo('status', res.data.result.status);
        GetFriendList(Number(res.data.result.userId)).then((res) => {
          console.log(res);
          console.log(res.data.result);
          updateAccountInfo('friendCount', res.data.result.length);
          setFriendsList(res.data.result);
        });
        GetLikeArticle(Number(res.data.result.userId)).then((res) => {
          console.log('좋아요 한 게시글', res);
          console.log(res.data.result);
          setLikedPosts(res.data.result);
        });
        GetUserInfo(Number(res.data.result.userId))
          .then((response) => {
            console.log(response);
            console.log(response.data.result);
            updateAccountInfo('nickName', response.data.result.nickName);
            updateAccountInfo('blogName', response.data.result.blogName);
            updateAccountInfo('profileImg', response.data.result.profileImg);
            updateAccountInfo('bio', response.data.result.bio);
            updateAccountInfo('role', response.data.result.role);
            if (res.data.result.status === 'new') {
              navigate('/membership');
            } else {
              navigate('/');
            }
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log('GetLogin 실패', err);
      });
  }, []);

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/login_background.jpg',
        }),
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1 style={{ color: 'blue' }}>로그인에 성공하셨습니다!</h1>
    </Box>
  );
}
