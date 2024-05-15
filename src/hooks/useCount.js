import { create } from 'zustand';

export const useCounter = create((set) => ({
  aiCreateCount: 5,
  decrement: () => set((state) => ({ aiCreateCount: state.aiCreateCount - 1 })),
  reset: () => set({ aiCreateCount: 5 }),
}));
