import axios from 'axios';
import { useEffect } from 'react';

export default function LoginKakaoAuth() {

  useEffect(() => {

    const client_id =import.meta.env.VITE_APP_K_REST_API_KEY; 
    const K_REDIRECT_URI = 'http://localhost:3000/login-auth';
    const grant_type = 'authorization_code';
    // 인가코드 받기
    const code = new URLSearchParams(window.location.search).get('code');
    
    console.log('인가코드:', code);
    axios.post(`https://kauth.kakao.com/oauth/token?grant_type=${grant_type}&client_id=${client_id}&redirect_uri=${K_REDIRECT_URI}&code=${code}`, 
      { 
        headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        } 
      }).then((res) => {
        console.log(res);
      })
    }, [])

  return (
    <div>
      <h1>LoginAuth</h1>
    </div>
  );
}
