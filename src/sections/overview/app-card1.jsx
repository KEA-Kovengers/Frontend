import React from 'react';
import AppCardData1 from './data/app-card-data1';

import AppCardImage from "./app-card-image";
import AppCardInfo from "./app-card-info";

// ----------------------------------------------------------------------

export default function AppCard1() {

  const [data, setData] = AppCardData1();

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
