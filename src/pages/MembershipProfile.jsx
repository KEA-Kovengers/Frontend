import { Helmet } from 'react-helmet-async';

import { MembershipProfile } from 'src/sections/login';


// ----------------------------------------------------------------------

export default function MembershipPage() {
    return (
      <>
        <Helmet>
          <title> Membership | Newcord  </title>
        </Helmet>
  
        <MembershipProfile />
      </>
    );
  }
  