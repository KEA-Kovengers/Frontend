import { create } from 'zustand';

export const useFolder = create((set) => ({
  isFolder: false,
  toggleFolder: () => set((state) => ({ isFolder: !state.isFolder })),
  moveToFolder: () => set((state) => ({ isFolder: !state.isFolder })),
  initIsFolder: () => set({ isFolder: false }),
}));
