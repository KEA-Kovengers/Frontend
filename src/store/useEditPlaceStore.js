import { create } from 'zustand';

export const useEditPlaceStore = create((set) => ({
    isEditing: [],
    places: [],
    setIsEditing: (newIsEditing) => set({ isEditing: newIsEditing }),
    setPlaces: (newPlaces) => set({ places: newPlaces }),
}));