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
    Checkbox,
    Typography,
    TextField,
    InputAdornment,
  } from '@mui/material';

import Iconify from 'src/components/iconify';
import { bool } from 'prop-types';
import { colors } from 'src/theme/variableColors';

// ----------------------------------------------------------------------

const words = [
    ['됬어 ','됐어 '],
    ['나 는','나는'],
    ['웬지','왠지'],
];

export default function GrammarModal(){
    // 모달 창
    const [isOpen, setIsOpen] = useState(true);

    const closeModal = () => {
        setIsOpen(false);
    };

    const buttonClick = () => {
        setIsOpen(false);
    };

    const [wordsCount, setWordsCount] = useState(0);
    const [isEditing, setIsEditing] = useState(new Array(words.length).fill(false));

    // 단어 개수 세기
    useEffect(() => {
        setWordsCount(words.length);
    }, []);

    // 수정 버튼 클릭 시 단어의 개수 변화
    const handleEditClick = (index) => {
        const newIsEditing = [...isEditing];
        newIsEditing[index] = !newIsEditing[index];
        setIsEditing(newIsEditing);
        setWordsCount((prevCount) => (newIsEditing[index] ? prevCount - 1 : prevCount + 1));
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


                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <Table>
                    <TableBody>
                  {words.map((words ,index) => (
                    <TableRow
                      hover
                      tabIndex={-1}
                      role="checkbox"
                      key={index}
                      sx={{ display: 'flex', flexDirection: 'row' }}
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

                            sx = {{
                                display: 'flex',
                                flexDirection: 'row',
                            }}
                        >
                            <Typography sx={{ color: 'red' , fontSize: '15px', maxWidth:'50px',mr: '50px'}}>
                                {words[0]}
                            </Typography>
                            <Typography sx={{ color: 'green', fontSize: '15px', mr: '10px'}}>
                                {words[1]}
                            </Typography>
                        </Stack>

                        <Button 
                            onClick={() => handleEditClick(index)}
                            sx={modal_style.complete_button}    
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

                </div>

        
                <Box
                    sx={{
                        display: 'flex',
                        position: 'fixed',
                        mt: '180px',
                        ml: '18px',
                    }}
                >
                    <Typography sx={{ color: colors.blueBlack, fontSize: '14px' }}>
                        총 {wordsCount}개
                    </Typography>

                    <Button 
                        variant="contained"
                        sx={{
                            ...modal_style.complete_button,
                        }}
                        onClick={buttonClick}
                    >
                        완료
                    </Button>
                </Box>
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
        position: 'fixed',
        right: '18px',
    },
};