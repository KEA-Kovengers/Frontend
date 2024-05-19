import { Helmet } from 'react-helmet-async';

import MonitoringPage from 'src/sections/monitoring/MonitoringPage';

// ----------------------------------------------------------------------

export default function AppPage() {
  return (
    <>
      <Helmet>
        <title> Monitoring | Newcord </title>
      </Helmet>

      <MonitoringPage />
    </>
  );
}
