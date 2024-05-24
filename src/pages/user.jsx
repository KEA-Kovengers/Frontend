import { Helmet } from 'react-helmet-async';

import { ProfileView } from 'src/sections/profile/view';
import { useEffect } from 'react';
import { useAccountStore } from 'src/store/useAccountStore';
import { useNavigate } from 'react-router-dom';

// ----------------------------------------------------------------------

export default function UserPage() {
  const { accountInfo } = useAccountStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (accountInfo.id === null) {
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
