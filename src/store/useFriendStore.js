import { create } from 'zustand';

export const useFriendStore = create((set) => ({
  friendsList: [],
  setFriendsList: (friendsList) => set({ friendsList }),
  addFriend: (id) => set((state) => ({ friends: [...state.friends, id] })),
  removeFriend: (id) =>
    set((state) => ({
      friends: state.friends.filter((friendId) => friendId !== id),
    })),
}));
