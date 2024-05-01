import axios from 'axios';
import { useEffect } from 'react';

export default function LoginKakaoAuth() {

  
  useEffect(() => {

    const client_id =import.meta.env.VITE_APP_K_REST_API_KEY; 
    const redirect_uri = 'http://localhost:3000/api/auth/login';
    const grant_type = 'authorization_code';
    // 인가코드 받기
    const code = new URLSearchParams(window.location.search).get('code');
    
    console.log('인가코드:', code);
    axios.post(`https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${redirect_uri}&code=${code}`, 
      { 
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        } 
      }).then((res) => {
        console.log(res);
      })
    }, [])
   
{/*
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
     */}

  return (
    <div>
      <h1>LoginAuth</h1>
    </div>
  );
}
// https://dev-seolleung2.netlify.app/Final%20Project/FinalProject-KakaoLogin/