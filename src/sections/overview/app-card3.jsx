import React from 'react';
import AppCardData3 from './data/app-card-data3';

import AppCardImage from "./app-card-image";
import AppCardInfo from "./app-card-info";

// ----------------------------------------------------------------------

export default function AppCard3() {

  const [data, setData] = AppCardData3();

  return (

    <div>
    {data.map(item => (
      <div key={item.id}>
        <AppCardImage images={[item.image]} />
        <AppCardInfo info={[item.info]} />
      </div>
    ))}
  </div>
  );
}
