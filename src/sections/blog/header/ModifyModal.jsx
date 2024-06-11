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
import { useNavigate } from 'react-router-dom';
import { DeleteEditor } from 'src/api/posts.api'; // 필요한 API 가져오기
import Cookies from 'js-cookie'; // 쿠키에서 userId를 가져오기 위해 추가

export default function ModifyModal({ open, onClose, reportCases }) {
  const [selectedIndex, setSelectedIndex] = useState([]);
  const navigate = useNavigate();

  // 쿠키에서 userId를 가져옵니다.
  const tokenString = Cookies.get('token');
  let userId = null;
  if (tokenString) {
    try {
      const tokenData = JSON.parse(tokenString);
      userId = tokenData.userId;
    } catch (e) {
      console.error('Error parsing token from cookie:', e);
    }
  }

  const handleCheckboxChange = (event, index) => {
    event.stopPropagation();
    if (selectedIndex.includes(index)) {
      setSelectedIndex(selectedIndex.filter((selectedIndexIndex) => selectedIndexIndex !== index));
    } else {
      setSelectedIndex([...selectedIndex, index]);
    }
  };

  const handleDelete = async () => {
    if (!userId) {
      console.error('User ID not found.');
      return;
    }
    for (const index of selectedIndex) {
      const postId = parseInt(reportCases.drafts[index].postId, 10); // postId를 숫자로 변환
      try {
        console.log(`Attempting to delete post with userId: ${userId} and postId: ${postId}`);
        await DeleteEditor(userId, postId);
        console.log(`Deleted post ${postId}`);
        //새로고침
        window.location.reload();
      } catch (error) {
        console.error(`Failed to delete post ${postId}`, error);
      }
    }
    onClose(); // 모달을 닫습니다.
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
            }}
          >
            <Typography variant="h5" sx={{ mt: '18px', ml: '18px' }}>
              편집 중인 글
            </Typography>
            <IconButton onClick={onClose} sx={{ mt: '5px', mr: '5px' }}>
              <Iconify icon="eva:close-fill" sx={{ width: '25px', height: '25px' }} />
            </IconButton>
          </div>
          <div style={{ flexDirection: 'row', display: 'flex', margin: '0 3%' }}>
            <Typography sx={{ mt: '13px', ml: '13px', color: 'grey', fontSize: '14px' }}>
              총 {selectedIndex.length}개
            </Typography>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginRight: '13px',
                flexGrow: 1,
              }}
            >
              <ButtonStyled
                disabled={selectedIndex.length === 0}
                sx={{ backgroundColor: selectedIndex.length === 0 ? 'lightGrey' : '#1a2cdd' }}
                onClick={handleDelete}
              >
                삭제
              </ButtonStyled>
            </div>
          </div>
          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            <Table>
              <TableBody>
                {reportCases?.drafts?.map((reportCase, index) => (
                  <TableRow
                    hover
                    tabIndex={-1}
                    role="checkbox"
                    key={index}
                    sx={{ display: 'flex', flexDirection: 'row', cursor: 'pointer' }}
                    onClick={() => {
                      navigate(`/createEditSession/${parseInt(reportCase.postId, 10)}`);
                    }} // postId를 숫자로 변환
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
                        onChange={(event) => handleCheckboxChange(event, index)}
                        sx={{ marginRight: '10px' }}
                      />
                      <div>
                        <Typography sx={{ fontSize: '14px' }}>{reportCase.title}</Typography>
                        <Typography sx={{ fontSize: '11px', color: 'grey' }}>
                          {reportCase.updatedAt}
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
  font-weight: 400;
  margin-right: 13px;
  margin-bottom: 13px;
  margin-top: 13px;
  border-radius: 15px;
`;
