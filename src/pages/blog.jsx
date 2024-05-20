import { Helmet } from 'react-helmet-async';

// import Button from '@mui/material/Button';

import { BlogView } from 'src/sections/blog/view';
// import SelectOptionView from 'src/sections/thumbnail/select-option';

// ----------------------------------------------------------------------

export default function BlogPage() {
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
