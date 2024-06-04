import React, { useEffect } from 'react';
import AppCardData1 from './data/app-card-data1';
import PropTypes from 'prop-types';
import AppCardImage from "./app-card-image";
import AppCardInfo from "./app-card-info";
import { Tag } from '@mui/icons-material';

// ----------------------------------------------------------------------

export default function AppCard1({ tag }) {
  useEffect(() => {
    console.log('tag', tag);
  }, []);
  const [data, setData] = AppCardData1({ tag: tag });

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

AppCard1.propTypes = {
  tag: PropTypes.string.isRequired,
};