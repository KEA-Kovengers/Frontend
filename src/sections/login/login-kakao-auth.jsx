import axios from 'axios';
import { useEffect } from 'react';

export default function LoginKakaoAuth() {
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 인가코드 받기
                const code = new URLSearchParams(window.location.search).get('code');
                console.log('인가코드:', code);

                const headers = {
                    'Content-Type':  'application/x-www-form-urlencoded',
                };

                const response = await axios.post(
                    `http://localhost:8080/api/auth/login`,
                    { code }, // 요청 본문에 code를 객체로 포함하여 전송
                    { headers }
                  );
        
                console.log(response.data);
                console.log(response.data.result.user_id);
                console.log(response.data.result.jwt);
            } catch (e) {
                console.error(e);
            }
            };
        
            fetchData();
    }, [])
    
  return (
    <div>
      <h1>LoginAuth</h1>
    </div>
  );
}