import { Helmet } from 'react-helmet-async';

// import Button from '@mui/material/Button';

import BlogView2 from 'src/sections/blog/view/blog-view2';
// import SelectOptionView from 'src/sections/thumbnail/select-option';

// ----------------------------------------------------------------------

export default function BlogPage2() {
    return (
        <>
            <Helmet>
                <title> Create | Newcord </title>
            </Helmet>
            <BlogView2 />
            {/* <Button>Blog</Button> */}
            {/* <SelectOptionView /> */}
        </>
    );
}
