import Button from '@mui/material/Button';
import { useEffect } from 'react';
import { GetLogin } from 'src/api/auth.api';
import Cookies from 'js-cookie';

export default function LoginKakao() {
  const K_REST_API_KEY = import.meta.env.VITE_APP_K_REST_API_KEY;
  const K_REDIRECT_URI = 'http://localhost:3000/api/auth/login';
  const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${K_REST_API_KEY}&redirect_uri=${K_REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = kakaoURL;
  };

  return (
    <Button onClick={handleLogin}>
      <img src="assets/kakao_login_medium_narrow.png" alt="Kakao-Login" />
    </Button>
  );
}
