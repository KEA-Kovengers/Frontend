import { create } from 'zustand';
import { PostGenerateText } from '../api/ai.api';

export const useEditStore = create((set) => ({
  editInfo: {
    editorHtml1: '',
    editorHtml2: '',
    // updateEditorHtml1: (value) => set({ editorHtml1: value }),
    // updateEditorHtml2: (value) => set({ editorHtml2: value }),

    editorRef1: null,
    editorRef2: null,

    aiGeneratedText: '',
  },
  updateEditorHtml1: (newHtml) => set((state) => ({
    editInfo: {
        ...state.editInfo,
        editorHtml1: newHtml,
    },
  })),
  updateEditorHtml2: (newHtml) => set((state) => ({
      editInfo: {
          ...state.editInfo,
          editorHtml2: newHtml,
      },
  })),
  updateEditInfo: (field, value) => 
      set((state) => ({
          editInfo: {
          ...state.editInfo,
          [field]: value,
          },
  })),
  // 자동 완성 텍스트 생성
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
  setEditorRef1: (ref) => set((state) => ({
    editInfo: {
      ...state.editInfo,
      editorRef1: ref,
    },
  })),
  setEditorRef2: (ref) => set((state) => ({
    editInfo: {
      ...state.editInfo,
      editorRef2: ref,
    },
  })),
}));