import { Helmet } from 'react-helmet-async';

import { ProfileView } from 'src/sections/profile/view';
import { useEffect } from 'react';
import { useAccountStore } from 'src/store/useAccountStore';
import { useNavigate, useParams } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function UserPage() {
  const { accountInfo } = useAccountStore();
  const navigate = useNavigate();
  const params = useParams();
  const userId = Number(params.id);
  const isMine = userId === accountInfo.id;

  useEffect(() => {
    console.log('프로필 페이지 account 아이디', accountInfo.id);
    if (accountInfo.id === null && !userId) {
      navigate('/login');
    }
  }, []);

  return (
    <div style={{ justifyContent: 'center', display: 'flex' }}>
      <Helmet>
        <title> User | Newcord </title>
      </Helmet>

      <ProfileView />
    </div>
  );
}
