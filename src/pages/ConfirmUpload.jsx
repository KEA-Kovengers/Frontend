import { Helmet } from 'react-helmet-async';

import ConfirmUploadPage from 'src/sections/confirmUpload/ConfirmUploadPage';

export default function ConfirmUpload() {
  return (
    <>
      <Helmet>
        <title> Confirm Upload </title>
      </Helmet>

      <ConfirmUploadPage />
    </>
  );
}
