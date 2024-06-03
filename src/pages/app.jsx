import { Helmet } from 'react-helmet-async';
import ManagerMain from 'src/sections/managerMain/ManagerMain';
import { useAccountStore } from 'src/store/useAccountStore';

import { AppView } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

export default function AppPage() {
  const { accountInfo } = useAccountStore();
  return (
    <>
      <Helmet>
        <title> Newcord </title>
      </Helmet>

      {accountInfo.status !== 'admin' ? <AppView /> : <ManagerMain />}
    </>
  );
}
