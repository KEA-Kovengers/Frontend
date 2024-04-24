import PropTypes from 'prop-types';

import AppCard from './app-card';
import AppCard3 from './app-card3';

// ----------------------------------------------------------------------

// AppFilter 속 AppPost: filter가 바뀜에 따라 보여지는 컴포넌트도 달라짐
export default function AppPost({ filter }) {

  switch (filter) {
    case 0:
      return (
        <div>
          <AppCard />
          <AppCard />
          <AppCard />
        </div>
      );
    case 1:
      return (
        <div>
          <AppCard />
          <AppCard />
          <AppCard />
        </div>
      );
    case 2:
      return (
        <div>
          <AppCard3 />
          <AppCard3 />
          <AppCard3 />
        </div>
      );
    case 3:
      return (
        <div>
          <AppCard3 />
          <AppCard3 />
          <AppCard3 />
        </div>
      );
    default:
      return null;
  };
}

AppPost.propTypes = {
  filter: PropTypes.number.isRequired,
};