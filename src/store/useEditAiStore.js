// import { create } from 'zustand';
// import { PostGenerateText } from '../api/ai.api';

// export const useEditAiStore = create((set) => ({
//     editInfo: {
//         aiGeneratedText: '',
//     },
//     updateEditInfo: (field, value) => 
//         set((state) => ({
//             editInfo: {
//             ...state.editInfo,
//             [field]: value,
//             },
//     })),
//     // 자동 완성 텍스트 생성
//     handleAiText: async (text) => {
//         try {
//         const response = await PostGenerateText(text);
//         console.log('AI text generation response:', response);
//         set((state) => ({
//             editInfo: {
//             ...state.editInfo,
//             aiGeneratedText: response.data,
//             },
//         }));
//         } catch (error) {
//         console.error('AI text generation error:', error);
//         }
//     },
// }));