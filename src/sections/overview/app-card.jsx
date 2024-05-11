import React from 'react';
import AppCardData from './data/app-card-data';

import AppCardImage from "./app-card-image";
import AppCardInfo from "./app-card-info";

// ----------------------------------------------------------------------

export default function AppCard() {

  const [data, setData] = AppCardData();

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
