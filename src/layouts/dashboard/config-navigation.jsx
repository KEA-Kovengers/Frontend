import SvgColor from 'src/components/svg-color';
import { useAccountStore } from 'src/store/useAccountStore';

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = () => {
  const { accountInfo } = useAccountStore();

  const config = [
    {
      title: '홈',
      path: '/',
      icon: icon('ic_analytics'),
    },
    {
      title: '검색',
      path: '/search',
      icon: icon('ic_cart'),
    },
    {
      title: '프로필',
      path: '/user',
      icon: icon('ic_user'),
    },
    {
      title: '글 쓰기',
      path: '/create-article',
      icon: icon('ic_blog'),
    },
    {
      title: '로그인',
      path: '/login',
      icon: icon('ic_lock'),
    },
  ];

  if (accountInfo.role === 'admin') {
    config.push({
      title: '모니터링',
      path: '/monitoring',
      icon: icon('ic_siren'),
    });
  }

  return config;
};

export default navConfig;
