import React, { useEffect, useState } from 'react';
import {
  Modal,
  TableRow,
  TableCell,
  Checkbox,
  Typography,
  Box,
  IconButton,
  Button,
  OutlinedInput,
} from '@mui/material';
import Iconify from 'src/components/iconify';
import { styled } from 'styled-components';
import { GetPostsList } from 'src/api/posts.api';
import { useParams } from 'react-router-dom';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { PostFolderUpdate } from 'src/api/folder.api';

export default function AddArticleModal({ open, onClose, buttonAction, id, setId }) {
  const [selectedIndex, setSelectedIndex] = useState([]);
  const [postList, setPostList] = useState([]);
  const params = useParams();
  const userId = params.id;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return format(date, 'yyyy-MM-dd hh:mm', { locale: ko });
  };

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
    PostFolderUpdate({ folderId: id.folderId, folderName: id.folderName, postIds: selectedIndex })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    buttonAction();
    onClose();
  };

  useEffect(() => {
    GetPostsList(userId)
      .then((res) => {
        console.log(res);
        console.log(res.data.result);
        setPostList(res.data.result.postList.content);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
            {/* <Typography variant="h5" sx={{ mt: '18px', ml: '18px' }}>
              폴더 편집
            </Typography> */}
            <OutlinedInput
              defaultValue={id.folderName}
              sx={{ mt: '18px', ml: '18px', height: 40 }}
              onChange={(e) => {
                setId({ ...id, folderName: e.target.value });
              }}
              endAdornment={
                <Iconify
                  icon={'mynaui:pencil'}
                  sx={{ color: 'grey', width: '25px', height: '25px' }}
                />
              }
            />
            <IconButton onClick={onClose} sx={{ mt: '5px', mr: '5px' }}>
              <Iconify icon="eva:close-fill" sx={{ width: '25px', height: '25px' }} />
            </IconButton>
          </div>
          <div
            style={{
              flexDirection: 'row',
              display: 'flex',
              margin: '0 3%',
              justifyContent: 'space-between',
            }}
          >
            <Typography sx={{ mt: '13px', ml: '13px', color: 'grey', fontSize: '14px' }}>
              총 {selectedIndex.length}개
            </Typography>
            <ButtonStyled
              disabled={selectedIndex === null ? true : false}
              sx={{ backgroundColor: selectedIndex === null ? 'lightGrey' : '#1a2cdd' }}
              onClick={buttonClick}
            >
              완료
            </ButtonStyled>
          </div>

          <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
            {postList.map((article) => (
              <TableRow
                hover
                tabIndex={-1}
                role="checkbox"
                key={article.id}
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
                    checked={selectedIndex.includes(article.id)}
                    onChange={() => handleCheckboxChange(article.id)}
                    sx={{ marginRight: '10px' }}
                  />
                  <div>
                    <Typography sx={{ fontSize: '14px' }}>{article.post.title}</Typography>
                    <Typography sx={{ fontSize: '11px', color: 'grey' }}>
                      {formatDate(article.updated_at)}
                    </Typography>
                  </div>
                </TableCell>
              </TableRow>
            ))}
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
  margin-right: 13px;
  margin-bottom: 13px;
  margin-top: 13px;
`;
