import PropTypes from 'prop-types';

import AppCard from './app-card';

// ----------------------------------------------------------------------

export default function AppPost({ filter }) {

    switch (filter) {
      case 0:
        return <AppCard/>;
      case 1:
        return <div>인기 급상승 게시물</div>;
      case 2:
        return <div>해시태그1 게시물</div>;
      case 3:
        return <div>해시태그2 게시물</div>;
      default:
        return null;
    }
  }
  
  AppPost.propTypes = {
    filter: PropTypes.number.isRequired,
  };
