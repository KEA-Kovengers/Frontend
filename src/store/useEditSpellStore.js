import { create } from 'zustand';
import { PostSpellCheck } from '../api/ai.api';

export const useEditSpellStore = create((set) => ({
    editInfo: {
        spellCheckText: [],
    },
    updateEditInfo: (field, value) => 
        set((state) => ({
            editInfo: {
            ...state.editInfo,
            [field]: value,
            },
    })),
    // 자동 완성 스펠 체크
    handleAiSpellCheck: async (text) => {
        try {
          const response = await PostSpellCheck(text);
          console.log('AI spell check response:', response);
      
          // original과 corrected가 다른 문장만 필터링
          const differentSentences = response.data.sentences.filter(
            (sentence) => sentence.original !== sentence.corrected
        );

        // Map over the filtered data and create a new array of sentences
        const newSentences = differentSentences.map(sentence => ({
            original: sentence.original,
            corrected: sentence.corrected
        }));
      
          set((state) => ({
            editInfo: {
              ...state.editInfo,
              spellCheckText: newSentences,
            },
          }));
      
          console.log('spellCheckText:', newSentences);
        } catch (error) {
          console.error('AI spell check error:', error);
        }
    }
}));