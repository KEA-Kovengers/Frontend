import React, { useState } from 'react';
import {
  Modal,
  Table, 
  TableBody,
  TableRow,
  TableCell,
  Checkbox,
  Typography,
  Box,
  IconButton,
  Button,
} from '@mui/material';

import Iconify from 'src/components/iconify';
import { styled } from 'styled-components';

const reportCases = [
  ['내일은 만우절', '2021-10-01'],
  ['오늘은 만우절.', '2021-10-02'],
  ['세비 스페인 광장', '2021-10-03'],
  ['LA 가고싶다', '2021-10-04'],
  ['LA 가고싶다', '2021-10-05'],
  ['LA 가고싶다', '2021-10-06'],
];

export default function ModifyModal({ open, onClose  }) {

    const [selectedIndex, setSelectedIndex] = useState([]);

    const handleCheckboxChange = (index) => {
      if (selectedIndex.includes(index)) {
        // If the checkbox is already selected, remove it from selectedIndex
        setSelectedIndex(selectedIndex.filter((selectedIndexIndex) => selectedIndexIndex !== index));
      } else {
        // If the checkbox is not selected, add it to selectedIndex
        setSelectedIndex([...selectedIndex, index]);
      }
    };
  
    const buttonClick = () => {
      onClose();
    };


    return(
        open && (
            <Modal open={open} onClose={onClose}>
              <Box sx={modal_style}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    zIndex: 2,
                    marginBottom: '10px',
                  }}
                >
                  <Typography variant="h5" sx={{ mt: '18px', ml: '18px' }}>
                    편집 중인 글
                  </Typography>
                  <IconButton onClick={onClose} sx={{ mt: '5px', mr: '5px' }}>
                    <Iconify icon="eva:close-fill" sx={{ width: '25px', height: '25px' }} />
                  </IconButton>
                </div>
                <div
                  style={{
                    flexDirection: 'row',
                    display: 'flex',
                    margin: '0 3%',
                  }}
                >
                  <Typography sx={{ mt: '13px', ml: '13px', color: 'grey', fontSize: '14px' }}>
                    총 {selectedIndex.length}개
                  </Typography>

                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginRight: '13px',
                        flexGrow: 1,
                    }}>
                    <ButtonStyled
                        disabled={selectedIndex === null ? true : false}
                        sx={{ 
                            backgroundColor: selectedIndex === null ? 'lightGrey' : '#1a2cdd',
                         }}
                        onClick={buttonClick}
                    >
                        삭제
                    </ButtonStyled>

                    <ButtonStyled
                        disabled={selectedIndex === null ? true : false}
                        sx={{ 
                            backgroundColor: selectedIndex === null ? 'lightGrey' : '#1a2cdd',
                         }}                        
                         onClick={buttonClick}
                    >
                        완료
                    </ButtonStyled>
                </div>  

                </div>
      
                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                <Table>
                    <TableBody>
                  {reportCases.map((reportCase, index) => (
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
                          padding: '7px',
                          display: 'flex',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                      >
                        <Checkbox
                          disableRipple
                          checked={selectedIndex.includes(index)}
                          onChange={() => handleCheckboxChange(index)}
                          sx={{ marginRight: '10px' }}
                        />
                        <div>
                          <Typography sx={{ fontSize: '14px' }}>{reportCase[0]}</Typography>
                          <Typography sx={{ fontSize: '11px', color: 'grey' }}>
                            {reportCase[1]}
                          </Typography>
                        </div>
                      </TableCell>
                    </TableRow>
                    ))}
                    </TableBody>
                </Table>

                </div>
              </Box>
            </Modal>
        )
    );
}

const modal_style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 530,
    height: 450,
    bgcolor: 'background.paper',
    borderRadius: 2,
    display: 'flex',
    flexDirection: 'column',
  };
  
export const ButtonStyled = styled(Button)`
    width: 50px;
    height: 30px;
    border-radius: 7px;
    color: white;
    font-size: 15px;
    font-weight: 300;
    margin-right: 13px;
    margin-bottom: 13px;
    margin-top: 13px;
    border-radius: 15px;

  `;