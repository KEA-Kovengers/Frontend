import PropTypes from 'prop-types';

import { styled } from '@mui/system';

import AppCard from './app-card';
import AppCard1 from './app-card1';
import AppCard2 from './app-card2';
import AppCard3 from './app-card3';

// ----------------------------------------------------------------------

// 스크롤이 가능한 컨테이너에 스타일을 적용합니다.
const ScrollContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column', // 세로 방향으로 아이템을 배치
  scrollSnapType: 'y mandatory', // 세로 스크롤 스냅을 활성화
  overflowY: 'auto', // Y축으로 스크롤이 가능하도록 설정
  scrollbarWidth: 'none', 
  '&::-webkit-scrollbar': {
    display: 'none'
  }
});

// AppPost 컴포넌트에 스타일을 적용
const SnapElement = styled('div')({
  scrollSnapAlign: 'center',
});

// 필터와 컴포넌트를 매핑하는 객체
const filterComponentMap = {
  0: AppCard,
  1: AppCard1,
  2: AppCard2,
  3: AppCard3,
  // 추가된 필터에 맞는 컴포넌트를 추가
  4: AppCard,
  5: AppCard,
  6: AppCard,
};


// AppFilter 속 AppPost: filter가 바뀜에 따라 보여지는 컴포넌트도 달라짐
export default function AppPost({ filter }) {

  const Component = filterComponentMap[filter] || null;

  return (
    <ScrollContainer>
      <SnapElement>
        {Component && <Component />}
      </SnapElement>
    </ScrollContainer>
  );

}

AppPost.propTypes = {
  filter: PropTypes.number.isRequired,
};
