import React, { useState,useEffect,useRef  } from 'react';
import { useEditStore } from 'src/store/useEditStore';
import propTypes from 'prop-types';

//  test

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
import { be } from 'date-fns/locale';

export default function AutoModal() {
    const [isOpen, setIsOpen] = useState(true);

    const closeModal = () => {
        setIsOpen(false);
    };
    

    const editorRef1 = useRef(null);
    const editorRef2 = useRef(null);

    const { editorHtml1, editorHtml2, updateEditInfo, updateEditorHtml1, updateEditorHtml2 ,aiGeneratedText, handleAiText } = 
    useEditStore((state) => ({
      editorHtml1: state.editInfo.editorHtml1,
      editorHtml2: state.editInfo.editorHtml2,
      updateEditInfo: state.updateEditInfo,

      updateEditorHtml1: state.updateEditInfo.bind(null, 'editorHtml1'),
      updateEditorHtml2: state.updateEditInfo.bind(null, 'editorHtml2'),
      aiGeneratedText: state.editInfo.aiGeneratedText,
      handleAiText: state.handleAiText,
    }));

    
    const handleAiTextClick = () => {
        const textToUse = editorHtml1 || editorHtml2;
        if (!textToUse) {
          console.log('No text available for AI text generation');
          return;
        }
        handleAiText(textToUse);
      };
    
      useEffect(() => {
        if (aiGeneratedText) {
          if (editorRef1.current) {
            const editorInstance = editorRef1.current.getInstance();
            editorInstance.insertText(`\n${aiGeneratedText}`);
            updateEditInfo('editorHtml1', editorInstance.getMarkdown());
          }
          else if (editorRef2.current) {
            const editorInstance2 = editorRef2.current.getInstance();
            editorInstance2.insertText(`\n${aiGeneratedText}`);
            updateEditInfo('editorHtml2', editorInstance2.getMarkdown());
          }
        }
      }, [aiGeneratedText, updateEditInfo]);


    const [textField, setTextField] = useState('');

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
                            placeholder='No AI text generated yet.'
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
