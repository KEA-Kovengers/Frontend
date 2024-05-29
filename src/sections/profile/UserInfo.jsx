import { useState } from 'react';

export const useUserInfo = () => {
  const [userInfo, setUserInfo] = useState({
    id: null,
    nickName: '',
    blogName: '',
    profileImg: '',
    bio: '',
    role: '',
    friendCount: 0,
  });

  return { userInfo, setUserInfo };
};
