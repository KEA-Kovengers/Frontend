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
  },
  updateAccoutInfo: (field, value) =>
    set((state) => ({ accountInfo: { ...state.accountInfo, [field]: value } })),
}));
