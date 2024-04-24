import { Helmet } from 'react-helmet-async';

import { ProfileView } from 'src/sections/profile/view';

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
