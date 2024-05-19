import { useState } from 'react';

import { Grid } from '@mui/material';
import AppCardImage from 'src/sections/overview/app-card-image';
import AppCardInfo from 'src/sections/overview/app-card-info';
import AppCardData from 'src/sections/overview/data/app-card-data';

// ----------------------------------------------------------------------

export default function ManagerMain() {
  const [data, setData] = AppCardData();

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '95%',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '20px',
        }}
      >
        <Grid container spacing={3} style={{ flexGrow: 1 }}>
          {data.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <AppCardImage images={[item.image]} />
              <AppCardInfo info={[item.info]} />
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}
