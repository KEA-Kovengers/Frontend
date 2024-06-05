import { Helmet } from 'react-helmet-async';

// import Button from '@mui/material/Button';
import { useNavigate, useParams } from 'react-router-dom';
import { BlogView } from 'src/sections/blog/view';
import { useEffect } from 'react';
import { useAccountStore } from 'src/store/useAccountStore';
// import SelectOptionView from 'src/sections/thumbnail/select-option';

// ----------------------------------------------------------------------

export default function BlogPage() {
  const { accountInfo } = useAccountStore();
  const navigate = useNavigate();
  const params = useParams();
  const userId = Number(params.id);
  useEffect(() => {
    console.log('프로필 페이지 account 아이디', accountInfo.id);
    if (accountInfo.id === null && !userId) {
      navigate('/login');
    }
  }, []);
  return (
    <>
      <Helmet>
        <title> Create | Newcord </title>
      </Helmet>
      <BlogView />
      {/* <Button>Blog</Button> */}
      {/* <SelectOptionView /> */}
    </>
  );
}
