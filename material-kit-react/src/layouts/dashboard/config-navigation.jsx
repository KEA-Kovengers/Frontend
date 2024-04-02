import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: '홈',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: '검색',
    path: '/products',
    icon: icon('ic_cart'),
  },
  {
    title: '프로필',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: '글 쓰기',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  {
    title: '로그인',
    path: '/login',
    icon: icon('ic_lock'),
  },
  {
    title: '더보기',
    path: '/more',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
