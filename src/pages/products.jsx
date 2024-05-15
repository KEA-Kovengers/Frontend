import { Helmet } from 'react-helmet-async';

import { SearchView } from 'src/sections/search/view';

// ----------------------------------------------------------------------

export default function SearchPage() {
  return (
    <>
      <Helmet>
        <title> Products | Newcord </title>
      </Helmet>

      <SearchView />
    </>
  );
}
