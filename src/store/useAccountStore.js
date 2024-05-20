import { create } from 'zustand';

export const useAccountStore = create((set) => ({
  accountInfo: {
    id: '',
    displayName: '',
    email: '',
    profileUrl: '',
    blogName: '',
    blogDescription: '',
    friendCount: '',
    role: 'admin',
  },
  updateAccoutInfo: (field, value) =>
    set((state) => ({ accountInfo: { ...state.accountInfo, [field]: value } })),
}));
