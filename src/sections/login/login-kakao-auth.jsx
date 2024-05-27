import axios from 'axios';
import { useEffect } from 'react';
import { GetAuthValidate, GetLogin } from 'src/api/auth.api';
import { useCookies } from 'react-cookie';
import { useAccountStore } from 'src/store/useAccountStore';
import { PostUserInfo } from 'src/api/user.api';
import { update } from 'lodash';
import { GetUserInfo } from 'src/api/user.api';

export default function LoginKakaoAuth() {
  const { accountInfo, updateAccountInfo } = useAccountStore();
  const [cookies, setCookie] = useCookies(['token']);

  useEffect(() => {
    // 인가코드 받기
    const code = new URLSearchParams(window.location.search).get('code');

    console.log('인가코드:', code);

    setCookie(
      'token',
      {
        token:
          'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNDI2NjEyOTM3IiwiaXNzIjoia292ZW5nZXJzIiwiaWF0IjoxNzE2NDUzNjUwLCJleHAiOjE3MTgyNTM2NTB9.nUtA_AQqcV_5445OWdM89pt9eCLpBNIlJvWAz2XmTYY',
        refreshToken:
          'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNDI2NjEyOTM3IiwiaXNzIjoia292ZW5nZXJzIiwiaWF0IjoxNzE2NDUzNjUwLCJleHAiOjIzMjEyNTM2NTB9.VDq2WO07l4_sTlUBZ-YxAWIsyh-dC6cbJ72XKO2gH4M',
      },
      { path: '/' }
    );
    console.log(cookies.token);

    // GetLogin(code)
    //   .then((res) => {
    //     console.log(res);
    //     setCookie(
    //       'token',
    //       { token: res.result.token, refreshToken: res.result.refreshToken },
    //       { path: '/' }
    //     ); // 쿠키에 토큰 저장
    //     // updateAccountInfo('id', res.result.id);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    GetUserInfo(accountInfo.id)
      .then((res) => {
        console.log(res);
        console.log(res.data.result);
        updateAccountInfo('nickName', res.data.result.nickName);
        updateAccountInfo('blogName', res.data.result.blogName);
        updateAccountInfo('profileImg', res.data.result.profileImg);
        updateAccountInfo('bio', res.data.result.bio);
        updateAccountInfo('role', res.data.result.role);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  {
    /*
    // 백엔드 서버로 인가코드 전달
    // 인가코드 받기
    const url = new URLSearchParams(window.location.search)
    const authorizationCode = url.get('code')
    console.log('인가코드:', authorizationCode);

    useEffect(() => {
      const getAccessToken =  authorizationCode => {
        const tokenData =  axios
        .post('http://localhost:8080/api/auth/login', {
            authorizationCode,
          })
          .then(res => {
            const accessToken = res.data.accessToken
            const refreshToken = res.headers['refresh-token']
            localStorage.setItem('CC_Token', accessToken)
            localStorage.setItem('RF_Token', refreshToken)
          })
      }
      if (authorizationCode) {
         getAccessToken(authorizationCode)
      }
    }, [])
     */
  }

  return (
    <div>
      <h1>LoginAuth</h1>
    </div>
  );
}
// https://dev-seolleung2.netlify.app/Final%20Project/FinalProject-KakaoLogin/
