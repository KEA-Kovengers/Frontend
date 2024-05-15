import { Helmet } from 'react-helmet-async';

import SelectOptionView from 'src/sections/thumbnail/select-option';

export default function SelectThumbnail() {
  return (
    <>
      <Helmet>
        <title> Select Thumbnail </title>
      </Helmet>

      <SelectOptionView />
    </>
  );
}
