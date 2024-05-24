import React, { useState,useEffect,useRef  } from 'react';
import { useEditStore } from 'src/store/useEditStore';
import propTypes from 'prop-types';

import {
    Modal,
    Box,
    Button,
    Stack,
    IconButton,
    Typography,
    TextField 
} from '@mui/material';

import { colors } from 'src/theme/variableColors';

import Iconify from 'src/components/iconify';
// import { be } from 'date-fns/locale';

export default function AutoModal() {
    const [isOpen, setIsOpen] = useState(true);
    const [textField, setTextField] = useState('');

    const { 
        editorHtml1, editorHtml2,    
        editorRef1, editorRef2, 
        updateEditorHtml1, updateEditorHtml2 ,
        aiGeneratedText, handleAiText
    } = useEditStore((state) => ({
      editorHtml1: state.editInfo.editorHtml1,
      editorHtml2: state.editInfo.editorHtml2,
      
      updateEditorHtml1: state.updateEditInfo.bind(null, 'editorHtml1'),
      updateEditorHtml2: state.updateEditInfo.bind(null, 'editorHtml2'),

      aiGeneratedText: state.editInfo.aiGeneratedText,
      handleAiText: state.handleAiText,

      editorRef1: state.editInfo.editorRef1,
      editorRef2: state.editInfo.editorRef2,
    }));

    
    const closeModal = () => {
        setIsOpen(false);
    };

    // ------------------- AI 텍스트 생성 -------------------
    const handleAiTextClick = () => {
        const textToUse = editorHtml1 || editorHtml2;
        if (!textToUse) {
          console.log('No text available for AI text generation');
          return;
        }
        else{
            handleAiText(textToUse);
            console.log('editorHtml2:', editorHtml);
        }
      };
    // ------------------- 버튼 클릭시 에디터에 텍스트 추가 -------------------
    const handleAddTextClick = () => {
    console.log('aiGeneratedText: ',aiGeneratedText);

    if (editorRef1 && editorRef1.getInstance) {
        const editorInstance = editorRef1.getInstance();
        const currentText = editorInstance.getMarkdown();
        editorInstance.setMarkdown(`${currentText}\n${aiGeneratedText}`);
        updateEditorHtml1(`${editorHtml1}\n${aiGeneratedText}`);
        console.log('updateEditorHtml1:', editorHtml1);

    } else if (editorRef2 && editorRef2.getInstance) {
        console.log('2')
        const editorInstance = editorRef2.getInstance();
        const currentText = editorInstance.getMarkdown();
        editorInstance.setMarkdown(`${currentText}\n${aiGeneratedText}`);
        updateEditorHtml2(`${editorHtml2}\n${aiGeneratedText}`);
        console.log('updateEditorHtml2:', editorHtml2);

    } else {
        console.log('No editor instance found.');
    }
    closeModal(); // 모달 닫기
    };

    /*----------------------------------------------------------*/

    return (
        <>
        {isOpen && (
            <Modal 
                open={isOpen} 
                onClose={closeModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ display: 'flex' }}
            >
                <Box sx={{ ...modal_style }}>
                    <Stack direction="row">
                        <Typography 
                            id="modal-modal-title"
                            variant="h5"
                            component="h5"
                            sx={{ zIndex: 2, position: 'fixed', mt: '18px', ml: '18px', fontWeight: 'bold' }}
                        >
                        AI Generated Text
                        </Typography>
                    </Stack>

                    
                    <div style={{ display: 'flex', justifyContent: 'end', zIndex: 2 }}>
                        <IconButton onClick={closeModal} sx={{ mt: '8px', mr: '5px' }}>
                            <Iconify icon="eva:close-fill" sx={{ width: '25px', height: '25px' }} />
                        </IconButton>
                    </div>
            

                    <Box
                        sx={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            display: 'flex',
                            height: '75%',
                            }}
                    >
                        <TextField
                            id="outlined-basic"
                            value={aiGeneratedText}
                            onChange={(e) => setTextField(e.target.value)}
                            variant="outlined"
                            placeholder='AI 텍스트 생성 버튼을 눌러주세요'
                            multiline
                            rows={10}
                            maxRows={10}
                            color="secondary"
                            sx={{
                            width: '80%',
                            borderRadius: 2,
                            borderColor: colors.divider2,
                            }}
                        />
                    </Box>

                    <Box
                        sx={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        display: 'flex',
                        width: '100%'
                        }}
                    >
                    <Stack direction="row" justifyContent='space-between' sx={{ width: '50%'}}>
                        <Button
                            onClick={editorHtml1.length > 0 || editorHtml2.length > 0 ? handleAiTextClick : null}
                            sx={{
                            ...modal_style.complete_button,
                            weight: 90,
                            }}
                        >
                            <Typography variant="body1" sx={{ fontSize: '16px' }}>
                            ai 텍스트 생성
                            </Typography>
                        </Button>

                        <Button 
                            onClick={handleAddTextClick}
                            sx={{
                                ...modal_style.complete_button,
                                width: 70,   
                            }}
                        >
                            <Typography variant="body1" sx={{ fontSize: '16px' }}>
                            추가
                            </Typography>
                        </Button>
                    </Stack>
                    </Box>

                </Box>
            </Modal>
            )
        }
        </>
    );
};

const modal_style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 530,
    height: 450,
    bgcolor: 'background.paper',
    borderRadius: 2,
    border:'none',

    complete_button: {
        height: 30,
        bgcolor: '#1A2CDD',
        borderRadius: 7,
        color: 'white',
        fontSize: '18px',
    },
};
