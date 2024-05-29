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

export default function LoginKakaoAuth() {
  const { accountInfo, updateAccountInfo } = useAccountStore();
  const [cookies, setCookie] = useCookies(['token']);
  const navigate = useNavigate();

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get('code');

    GetLogin(code)
      .then((res) => {
        console.log(res);
        setCookie(
          'token',
          { token: res.data.result.accessToken, refreshToken: res.data.result.refreshToken },
          { path: '/' }
        ); // 쿠키에 토큰 저장
        updateAccountInfo('id', Number(res.data.result.userId));
        updateAccountInfo('status', res.data.result.status);
        GetFriendList(Number(res.data.result.userId)).then((res) => {
          console.log(res);
          console.log(res.data.result);
          updateAccountInfo('friendCount', res.data.result.length);
          {
            res.data.result.map((user) => {
              addFriend(user.friendID);
            });
          }
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
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1>LoginAuth</h1>
    </div>
  );
}
