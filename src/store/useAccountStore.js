import { create } from 'zustand';

export const useAccountStore = create((set) => ({
  accountInfo: {
    id: '3426612937',
    nickName: '남소미',
    profileImg: 'http://k.kakaocdn.net/dn/rC03r/btsFEhBZ0pR/oO0YzcELWzk5pOOiVxR6Sk/img_640x640.jpg',
    blogName: '남소미의 블로그',
    bio: '',
    role: 'ADMIN',
    friendCount: '',
  },
  updateAccoutInfo: (field, value) =>
    set((state) => ({ accountInfo: { ...state.accountInfo, [field]: value } })),

  resetAccountInfo: () =>
    set((state) => ({
      accountInfo: {
        id: '',
        nickName: '',
        profileImg: '',
        blogName: '',
        bio: '',
        role: '',
        friendCount: '',
      },
    })),
}));
