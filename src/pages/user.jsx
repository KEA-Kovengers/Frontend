import { Helmet } from 'react-helmet-async';

import { ProfileView } from 'src/sections/profile/view';
import { useFolder } from 'src/sections/profile/hooks/useFolder';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

export default function UserPage() {
  return (
    <div style={{ justifyContent: 'center', display: 'flex' }}>
      <Helmet>
        <title> User | Newcord </title>
      </Helmet>

      <ProfileView />
    </div>
  );
}
