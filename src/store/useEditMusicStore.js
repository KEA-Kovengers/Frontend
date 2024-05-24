import { create } from 'zustand';

export const useEditMusicStore = create((set) => ({
    isEditing: [],
    albums: [],
    setIsEditing: (newIsEditing) => set({ isEditing: newIsEditing }),
    setAlbums: (newAlbums) => set({ albums: newAlbums }),
}));