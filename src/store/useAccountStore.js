import { create } from 'zustand';

export const useAccountStore = create((set) => ({
  accountInfo: {
    id: null,
    nickName: '',
    profileImg: '',
    blogName: '',
    bio: '',
    role: '',
    friendCount: 0,
    status: '',
  },
  updateAccountInfo: (field, value) =>
    set((state) => ({ accountInfo: { ...state.accountInfo, [field]: value } })),

  resetAccountInfo: () =>
    set((state) => ({
      accountInfo: {
        id: null,
        nickName: '',
        profileImg: '',
        blogName: '',
        bio: '',
        role: '',
        friendCount: 0,
        status: '',
      },
    })),
}));
