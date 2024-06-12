import PropTypes from 'prop-types';
import { useRef, useEffect } from 'react';

import { styled } from '@mui/system';

import AppCard from './app-card';
import AppCard1 from './app-card1';
import AppCard2 from './app-card2';
import AppCard3 from './app-card3';

// ----------------------------------------------------------------------

// 스크롤이 가능한 컨테이너에 스타일을 적용합니다.
const ScrollContainer = styled('div')({
  // display: 'flex',
  justifyContent: 'center', // SnapElement를 가로 방향으로 가운데로 정렬
  flexDirection: 'column',
  scrollSnapType: 'y mandatory',
  overflowY: 'auto',
  scrollbarWidth: 'none',
  '&::-webkit-scrollbar': {
    display: 'none'
  },
  height: '100vh',
});

// AppFilter 속 AppPost: filter가 바뀜에 따라 보여지는 컴포넌트도 달라짐
export default function AppPost({ filter }) {

  useEffect(() => {
    console.log('filter', filter);
  }, []);

  // 필터와 컴포넌트를 매핑하는 객체
  // const filterComponentMap = {
  //   '전체': AppCard,
  //   '여행': () => <AppCard1 tag={filter} />,
  //   2: AppCard2,
  // };

  // const Component = filterComponentMap[filter] || null;
  if (filter === '전체') {
    var Component = () => <AppCard />;
  }
  else {
    var Component = () => <AppCard1 tag={filter} />;

  }
  return (
    <ScrollContainer>
      {Component && <Component />}
    </ScrollContainer>
  );

}

AppPost.propTypes = {
  filter: PropTypes.string.isRequired,
};
