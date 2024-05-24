// import { create } from 'zustand';

// export const useEditStore = create((set) => ({
//     editInfo: {
//         editorHtml1: '',
//         editorHtml2: '',
//         updateEditorHtml1: (value) => set({ editorHtml1: value }),
//         updateEditorHtml2: (value) => set({ editorHtml2: value }),
//     },
//     updateEditInfo: (field, value) =>
//         set((state) => ({ editInfo: { ...state.editInfo, [field]: value } })),

// }));
import { create } from 'zustand';
import { PostGenerateText } from '../api/ai.api';

export const useEditStore = create((set) => ({
  editInfo: {
    editorRef1: '',
    editorRef2: '', 
    editorHtml1: '',
    editorHtml2: '',
    updateEditorHtml1: (value) => set({ editorHtml1: value }),
    updateEditorHtml2: (value) => set({ editorHtml2: value }),
    updateEditorRef1: (value) => set({ editorRef1: value }),
    updateEditorRef2: (value) => set({ editorRef2: value }),
    aiGeneratedText: '',
  },
    updateEditInfo: (field, value) => 
        set((state) => ({
            editInfo: {
            ...state.editInfo,
            [field]: value,
            },
    })),
    handleAiText: async (text) => {
        try {
        const response = await PostGenerateText(text);
        console.log('AI text generation response:', response);
        set((state) => ({
            editInfo: {
            ...state.editInfo,
            aiGeneratedText: response.data,
            },
        }));
        } catch (error) {
        console.error('AI text generation error:', error);
        }
    },
}));