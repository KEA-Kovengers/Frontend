import { Icon, Typography } from '@mui/material';
import Popover from '@mui/material/Popover';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';
import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import ProfileArticle from '../profile-article';
import CustomModal from 'src/components/CustomModal/CustomModal';
import { useToggle } from 'src/hooks/useToggle';
import { useFolder } from '../hooks/useFolder';
import AddArticleModal from '../AddArticleModal';
import { GetFolderArticleList, DeleteFolder } from 'src/api/folder.api';
import { useParams } from 'react-router-dom';
import { GetPostDetail } from 'src/api/posts.api';

export default function FolderPageView({ id, setId }) {
  const [open, setOpen] = useState(null);
  const [postList, setPostList] = useState([]);
  const [postIds, setPostIds] = useState([]);
  const params = useParams();
  const userId = Number(params.id);
  const handleOpenMenu = (event) => {
    setOpen(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const editFolderToggle = useToggle();
  const editAlertToggle = useToggle();
  const deleteFolderToggle = useToggle();

  const { initIsFolder } = useFolder();

  useEffect(() => {
    setPostList([]);
    GetFolderArticleList(id.folderId)
      .then((res) => {
        console.log('폴더 아티클 리스트', res.data.result);
        {
          res.data.result &&
            res.data.result.map((article) => {
              setPostIds((prev) => [...prev, article.post_id]);
              GetPostDetail(article.post_id).then((res) => {
                console.log('포스트 디테일', res.data.result);
                setPostList((prev) => [
                  ...prev,
                  {
                    id: res.data.result.id,
                    title: res.data.result.title,
                    body: res.data.result.body,
                    date: res.data.result.updated,
                    // likecnt: res.data.result.likecnt,
                    // commentcnt: res.data.result.commentcnt,
                    likecnt: 10,
                    commentcnt: 5,
                    thumbnail: res.data.result.thumbnails[0] || {
                      url: '/assets/not_thumbnail.png',
                      type: 'IMAGE',
                    },
                  },
                ]);
              });
            });
        }
      })
      .catch((err) => {
        console.log('폴더 아티클 리스트 에러', err);
      });
  }, [id]);

  const CallDeleteFolder = () => {
    console.log('폴더 삭제');
    DeleteFolder(id.folderName)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    initIsFolder();
  };

  return (
    <Wrapper>
      <div
        style={{
          width: '100%',
          justifyContent: 'space-between',
          display: 'flex',
          margin: '5px 5px 0 5px',
        }}
      >
        <IconButton onClick={() => initIsFolder()}>
          <Iconify icon="fluent:ios-arrow-24-filled" />
        </IconButton>
        <IconButton onClick={handleOpenMenu}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
        <Popover
          open={!!open}
          anchorEl={open}
          onClose={handleCloseMenu}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: { width: 140 },
          }}
        >
          <MenuItem onClick={() => editFolderToggle.toggle()}>
            <Iconify icon="mdi:folder-edit" sx={{ mr: 2 }} />
            폴더 편집
          </MenuItem>
          {editFolderToggle.isOpen && (
            <AddArticleModal
              open={editFolderToggle.isOpen}
              onClose={editFolderToggle.toggle}
              buttonAction={editAlertToggle.toggle}
              id={id}
              setId={setId}
              postIds={postIds}
            />
          )}
          <CustomModal
            open={editAlertToggle.isOpen}
            onClose={editAlertToggle.toggle}
            mode={'alert'}
            title={'폴더 편집'}
            contents={'편집이 완료되었습니다.'}
          />

          <MenuItem onClick={() => deleteFolderToggle.toggle()} sx={{ color: 'error.main' }}>
            <Iconify icon="f7:folder-badge-minus" sx={{ mr: 2 }} />
            폴더 삭제
          </MenuItem>
          <CustomModal
            open={deleteFolderToggle.isOpen}
            onClose={deleteFolderToggle.toggle}
            rightButton={'삭제'}
            mode={'title'}
            title={'폴더 삭제'}
            contents={'해당 폴더를 삭제하시겠습니까?'}
            buttonAction={{
              rightAction: () => CallDeleteFolder(),
            }}
          />
        </Popover>
      </div>
      <Typography variant="h3" style={{ marginBottom: 20 }}>
        {id.folderName}
      </Typography>
      {postList.length === 0 && (
        <Typography variant="h5" style={{ color: 'grey', marginTop: 50, textAlign: 'center' }}>
          해당 폴더에 게시글이 없습니다.
          <br /> 게시글을 추가해보세요!
        </Typography>
      )}
      {postList.map((article) => (
        <ProfileArticle
          key={article.id}
          thumbnail={article.thumbnail}
          title={article.title}
          content={article.body}
          date={article.date}
          // date={'2024-05-24T17:15:35.869+00:00'}
          isLike={article.isLike}
          likecnt={article.likecnt}
          commentcnt={article.commentcnt}
        />
      ))}
    </Wrapper>
  );
}

export const Wrapper = styled.div`
  display: flex;
  width: 70%;
  align-items: center;
  height: auto;
  box-shadow: 0px 0px 10px 1px rgba(128, 128, 128, 0.2);
  border-radius: 10px;
  padding-bottom: 30px;
  flex-direction: column;
`;
