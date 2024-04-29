import { Helmet } from 'react-helmet-async';
import { LoginKakaoAuth } from 'src/sections/login';

export default function LoginAuthPage() {

    return (
        <>
            <Helmet>
                <title> LoginAuth | Newcord </title>
            </Helmet>

            <LoginKakaoAuth />
        </>
    );
}