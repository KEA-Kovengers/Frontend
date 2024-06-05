/* eslint-disable perfectionist/sort-imports */
import { useEffect } from 'react';
import 'src/global.css';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';

import Cookies from 'js-cookie';

import { GetUserInfo } from 'src/api/user.api';
import { GetFriendList } from 'src/api/friend.api';
import { useAccountStore } from 'src/store/useAccountStore';
import { useFriendStore } from './store/useFriendStore';
import { GetLikeArticle } from './api/like.api';
import { useLikedPostStore } from './store/useLikedPostStore';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();
  const { accountInfo, updateAccountInfo } = useAccountStore();
  const { setFriendsList } = useFriendStore();
  const { setLikedPosts } = useLikedPostStore();
  const tokenString = Cookies.get('token');
  let accessToken = null;

  if (tokenString) {
    try {
      const tokenData = JSON.parse(tokenString);
      accessToken = tokenData.token;
    } catch (e) {
      console.error('Error parsing token from cookie:', e);
    }
  }

  useEffect(() => {
    const tokenString = Cookies.get('token');
    let userId = null;

    if (tokenString) {
      try {
        const tokenData = JSON.parse(tokenString);
        userId = tokenData.userId;
      } catch (e) {
        console.error('Error parsing token from cookie:', e);
      }
    }
    if (userId) {
      console.log('쿠키에 저장된 유저 아이디:', userId);
      updateAccountInfo('id', userId);
      GetFriendList(userId)
        .then((res) => {
          console.log('나의 친구', res.data.result);
          updateAccountInfo('friendCount', res.data.result.length);
          setFriendsList(res.data.result);
        })
        .catch((err) => {
          console.log('친구 리스트 에러', err);
        });
      GetLikeArticle(userId).then((res) => {
        console.log('좋아요 한 게시글', res.data.result);
        setLikedPosts(res.data.result);
      });
      GetUserInfo(userId)
        .then((response) => {
          updateAccountInfo('status', response.data.result.status);
          updateAccountInfo('nickName', response.data.result.nickName);
          updateAccountInfo('blogName', response.data.result.blogName);
          updateAccountInfo('profileImg', response.data.result.profileImg);
          updateAccountInfo('bio', response.data.result.bio);
          updateAccountInfo('role', response.data.result.role);
          if (response.data.result.status === 'new') {
            navigate('/membership');
          } else {
            navigate('/');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [updateAccountInfo, setFriendsList, setLikedPosts]);

  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}
