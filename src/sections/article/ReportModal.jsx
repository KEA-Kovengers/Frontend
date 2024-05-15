import {
  Modal,
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
import { useState } from 'react';

const reportCases = [
  '스팸홍보/도배글입니다.',
  '음란물입니다.',
  '불법정보를 포함하고 있습니다.',
  '불법정보를 포함하고 있습니다.',
  '개인정보 노출 게시글입니다.',
  '불쾌한 표현이 있습니다.',
];
const modal_style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 'auto',
  bgcolor: 'background.paper',
  borderRadius: 2,
  display: 'flex',
  flexDirection: 'column',
};

export default function ReportModal({ open, onClose, buttonAction }) {
  const [selectedCaseIndex, setSelectedCaseIndex] = useState(null);

  const handleCheckboxChange = (index) => {
    console.log('selectedCaseIndex:', selectedCaseIndex);
    console.log('index:', index);
    if (index === selectedCaseIndex) {
      setSelectedCaseIndex(null); // Deselect if the same checkbox is clicked again
    } else {
      setSelectedCaseIndex(index); // Select the clicked checkbox
    }
    console.log('selectedCaseIndex:', selectedCaseIndex);
  };

  const buttonClick = () => {
    buttonAction();
    onClose();
  };

  return (
    open && (
      <Modal open={open} onClose={onClose}>
        <Box sx={modal_style}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              zIndex: 2,
              marginBottom: '10px',
              //   backgroundColor: 'pink',
            }}
          >
            <Typography variant="h5" sx={{ mt: '13px', ml: '13px' }}>
              신고 사유 선택
            </Typography>
            <IconButton onClick={onClose} sx={{ mt: '5px', mr: '5px' }}>
              <Iconify icon="eva:close-fill" sx={{ width: '25px', height: '25px' }} />
            </IconButton>
          </div>

          {reportCases.map((reportCase, index) => (
            <TableRow
              hover
              tabIndex={-1}
              role="checkbox"
              key={index}
              sx={{ display: 'flex', flexDirection: 'row' }}
            >
              <TableCell padding="none" sx={{ width: '100%', padding: '7px' }}>
                <Checkbox
                  disableRipple
                  checked={index === selectedCaseIndex}
                  onChange={() => handleCheckboxChange(index)}
                  sx={{ marginRight: '10px' }}
                />
                {reportCase}
              </TableCell>
            </TableRow>
          ))}
          <div
            style={{
              width: '100%',
              justifyContent: 'flex-end',
              display: 'flex',
            }}
          >
            <ButtonStyled
              disabled={selectedCaseIndex === null ? true : false}
              sx={{ backgroundColor: selectedCaseIndex === null ? 'lightGrey' : '#1a2cdd' }}
              onClick={buttonClick}
            >
              신고
            </ButtonStyled>
          </div>
        </Box>
      </Modal>
    )
  );
}

export const ButtonStyled = styled(Button)`
  width: 50px;
  height: 30px;
  border-radius: 7px;
  color: white;
  font-size: 15px;
  margin-right: 13px;
  margin-bottom: 13px;
  margin-top: 13px;
`;
