import React, { useState, useEffect } from 'react';

import {
    Box,
    Button ,
    IconButton,
    Stack,
    Modal,
    Table, 
    TableBody,
    TableRow,
    TableCell,
    Typography,
    InputAdornment,
  } from '@mui/material';

import Iconify from 'src/components/iconify';
// import { bool } from 'prop-types';
import { colors } from 'src/theme/variableColors';
import { useEditStore } from 'src/store/useEditStore';
import { useEditSpellStore } from 'src/store/useEditSpellStore';

// ----------------------------------------------------------------------

export default function GrammarModal(){
    // 모달 창
    const [isOpen, setIsOpen] = useState(true);
    const [isEditing, setIsEditing] = useState([]);

    const { 
        editorRef1, editorRef2,
        editorHtml1, editorHtml2,
        updateEditorHtml1, updateEditorHtml2, 
    } = useEditStore((state) => ({
            editorRef1: state.editInfo.editorRef1,
            editorRef2: state.editInfo.editorRef2,

            editorHtml1: state.editInfo.editorHtml1,
            editorHtml2: state.editInfo.editorHtml2,

            updateEditorHtml1: state.updateEditorHtml1,
            updateEditorHtml2: state.updateEditorHtml2,
    }));

    const { spellCheckText, handleAiSpellCheck } = 
        useEditSpellStore((state) => ({
        spellCheckText: state.editInfo.spellCheckText,
        handleAiSpellCheck: state.handleAiSpellCheck,
    }));

    // 맞춤법 검사 실행
    useEffect(() => {
        if(isOpen){
            handleAiSpellCheck(editorHtml1);
            // handleAiSpellCheck(editorHtml2);
        }
    }, [isOpen]);

    const [count, setCount] = useState(0);
    // 단어 개수 세기
    useEffect(() => {
        setIsEditing(new Array(spellCheckText.length).fill(false));
        setCount(spellCheckText.length);
    }, [spellCheckText]);

    // 수정 버튼 클릭 시 단어의 개수 변화
    const handleEditClick = (index) => {
        const newIsEditing = [...isEditing];
        newIsEditing[index] = !newIsEditing[index];
        setIsEditing(newIsEditing);

        // 우하하! 개수 줄이기!
        if (newIsEditing[index]) {
            setCount(prevCount => prevCount - 1);
        } else {
            setCount(prevCount => prevCount + 1);
        }
    };

    const closeModal = () => {
        setIsOpen(false); // 모달 닫기
        setIsEditing([]);
        setCount(0);
    };

    // 완료 버튼 클릭 시 수정된 문장 적용
    const buttonClick = () => {
        const selectedSentences = spellCheckText.filter((_, index) => isEditing[index]);

        if (editorRef1 && editorRef1.getInstance) {
            const editorInstance = editorRef1.getInstance();
            let currentText = editorInstance.getMarkdown();

            selectedSentences.forEach(({ original, corrected }) => {
                currentText = currentText.replace(original, corrected);
            });

            editorInstance.setMarkdown(currentText);
            updateEditorHtml1(currentText);
        } else if (editorRef2 && editorRef2.getInstance) {
            const editorInstance = editorRef2.getInstance();
            let currentText = editorInstance.getMarkdown();

            selectedSentences.forEach(({ original, corrected }) => {
                currentText = currentText.replace(original, corrected);
            });

            editorInstance.setMarkdown(currentText);
            updateEditorHtml2(currentText);
        } else {
            console.log('No editor instance found.');
        }
        closeModal();
    };


    return (
        isOpen && (
        <Modal
            open={isOpen}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            sx={{ display: 'flex' }}
        >
            <Box sx={modal_style}>
                <Stack direction="row">
                    <Typography
                        id="modal-modal-title"
                        variant="h5"
                        component="h5"
                        sx={{ zIndex: 2, position: 'fixed', mt: '18px', ml: '18px', fontWeight: 'bold' }}
                        >
                        맞춤법
                    </Typography>
                </Stack>

                <div style={{ display: 'flex', justifyContent: 'end', zIndex: 2 }}>
                    <IconButton onClick={closeModal} sx={{ mt: '8px', mr: '5px' }}>
                        <Iconify icon="eva:close-fill" sx={{ width: '25px', height: '25px' }} />
                    </IconButton>
                </div>


                <Box style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <Table>
                    <TableBody>
                    {spellCheckText.map((sentence, index) => (
                    <TableRow
                      hover
                      tabIndex={-1}
                      role="checkbox"
                      key={index}
                    >
                      <TableCell
                        padding="none"
                        sx={{
                          width: '100%',
                          padding: '18px',
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <Stack 
                            direction='row'
                            spacing={2} 
                            alignItems="center" 
                            sx={{ flex: 1 }}
                        >
                            <Typography sx={{ color: 'red' , fontSize: '15px',mr: '50px'}}>
                                {sentence.original}
                            </Typography>
                            <Typography sx={{ color: 'green', fontSize: '15px', mr: '10px'}}>
                                {sentence.corrected}
                            </Typography>
                        </Stack>

                        <Button 
                            onClick={() => handleEditClick(index)}
                            sx={{
                                ...modal_style.complete_button,
                                ml: 2
                            }}
                        >
                            {isEditing[index] ? (
                                <Iconify icon="material-symbols:check" />
                            ) : (
                                '수정'
                            )}
                        </Button>

                      </TableCell>
                    </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </Box>

        
                <Stack 
                    direction="row" 
                    justifyContent="space-between" 
                    alignItems="center" 
                    sx={{                           
                        padding: '18px',
                        position: 'fixed',
                    }}
                >
                    <Typography sx={{ color: colors.blueBlack, fontSize: '14px' }}>
                        총 {count}개
                    </Typography>

                    <Button 
                        variant="contained"
                        sx={{
                            ...modal_style.complete_button,
                            ml: '370px'
                        }}
                        onClick={buttonClick}
                    >
                        완료
                    </Button>
                </Stack>
            </Box>
        </Modal>
        )
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
        width: 70,
        height: 30,
        bgcolor: '#1A2CDD',
        borderRadius: 7,
        color: 'white',
        fontSize: '13px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
};