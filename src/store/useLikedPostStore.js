import { create } from 'zustand';

export const useLikedPostStore = create((set) => ({
  likedPosts: [],
  setLikedPosts: (likedPosts) => set({ likedPosts }),
  addLikedPost: (id) => set((state) => ({ posts: [...state.posts, id] })),
  removeLikedPost: (id) =>
    set((state) => ({
      posts: state.posts.filter((postId) => postId !== id),
    })),
}));
