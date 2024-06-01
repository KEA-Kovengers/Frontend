import { create } from 'zustand';

export const useFriendStore = create((set) => ({
  friendsList: [],
  setFriendsList: (friendsList) => set({ friendsList }),
  addFriend: (friend) => set((state) => ({ friendsList: [...state.friendsList, friend] })),
  removeFriend: (id) =>
    set((state) => ({
      friendsList: state.friendsList.filter((friend) => friend.id !== id),
    })),
}));
