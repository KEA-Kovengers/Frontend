import { useState } from 'react';

export const useMusicInfo = () => {
  const [musicInfo, setMusicInfo] = useState({
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
