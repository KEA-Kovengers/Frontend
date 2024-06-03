import React, { useEffect, useState } from 'react';
import UserInfo from '../profile-user-info';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import ProfileArticle from '../profile-article';
import ProfileFolder from '../profile-folder';
import ProfileActivity from '../profile-activity';
import IconButton from '@mui/material/IconButton';
import Iconify from 'src/components/iconify';
import { colors } from 'src/theme/variableColors';
import CustomModal from 'src/components/CustomModal/CustomModal';
import { useToggle } from 'src/hooks/useToggle';
import FolderPageView from './FolderPageView';
import { useFolder } from '../hooks/useFolder';
import { GetPostsList } from 'src/api/posts.api';
import { PostFolderAdd } from 'src/api/folder.api';
import { GetFolderList } from 'src/api/folder.api';
import { GetLikeArticle } from 'src/api/like.api';
import { useLikedPostStore } from 'src/store/useLikedPostStore';
import { useParams } from 'react-router-dom';
import { useAccountStore } from 'src/store/useAccountStore';
import { GetCommentedArticle } from 'src/api/comment.api';

export default function ProfileView() {
  const { accountInfo } = useAccountStore();
  const params = useParams();
  const userId = Number(params.id);

  const { likedPosts, setLikedPosts } = useLikedPostStore();
  const { isFolder } = useFolder();

  const [folderId, setFolderId] = useState({ folderId: null, folderName: '' });

  const [value, setValue] = useState(0);
  const [postList, setPostList] = useState([]);
  const [folderList, setFolderList] = useState([]);
  const [likedList, setLikedList] = useState([]);
  const [commentedList, setCommentedList] = useState([]);
  const createFolderToggle = useToggle();

  const CreateFolder = (name) => {
    PostFolderAdd(name)
      .then((res) => {
        console.log(res);
        setFolderList((prev) => [
          ...prev,
          {
            id: res.data.result.id,
            folderName: name,
          },
        ]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 1) {
      console.log('폴더 페이지로 이동');
      GetFolderList(userId).then((res) => {
        // console.log(res);
        console.log(res.data.result);
        setFolderList(res.data.result);
      });
    } else if (newValue === 2) {
      GetLikeArticle(userId)
        .then((res) => {
          // console.log(res);
          console.log('좋아요 누른 게시글', res.data.result);
          setLikedList(res.data.result);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (newValue === 3) {
      GetCommentedArticle(userId)
        .then((res) => {
          // console.log(res);
          console.log('댓글 단 게시글', res.data.result);
          setCommentedList(res.data.result);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}

        //style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', width: '100%' }}
      >
        {value === index && (
          <Box sx={{ p: 3, display: 'flex' }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  useEffect(() => {
    // console.log('내 정보', accountInfo);
    // console.log(userId);
    if (userId) {
      GetPostsList(userId)
        .then((res) => {
          // console.log(res);
          console.log('내 게시글 전체', res.data.result.editorPostResponseDTOS);
          setPostList(res.data.result.editorPostResponseDTOS);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userId]);

  useEffect(() => {
    setValue(0);
  }, [isFolder]);

  return !isFolder ? (
    <div style={{ width: '80%', alignItems: 'center', justifyItems: 'center' }}>
      <UserInfo />
      <div
        style={{
          display: 'flex',
          alignContent: 'center',
          marginTop: '20px',
          flexDirection: 'column',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
          <Box sx={{ display: 'flex' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              sx={{ width: '100%' }}
            >
              <Tab label="전체 게시글" {...a11yProps(0)} />
              <Tab label="폴더" {...a11yProps(1)} />
              <Tab label="좋아요" {...a11yProps(2)} />
              <Tab label="댓글" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <div
              style={{
                width: '100%',
                alignItems: 'center',
                flexDirection: 'column',
                display: 'flex',
              }}
            >
              {postList.map((article) => (
                <ProfileArticle
                  key={article.postList.post.id}
                  id={article.postList.post.id}
                  thumbnail={
                    article.postList.post.thumbnails[0] || {
                      url: '/assets/not_thumbnail.png',
                      type: 'IMAGE',
                    }
                  }
                  title={article.postList.post.title}
                  content={article.postList.post.body}
                  date={article.postList.post.updated_at}
                  isLike={likedPosts.some(
                    (like) => like.likes.post_id === article.postList.post.id
                  )}
                  likecnt={article.likeCnt}
                  commentcnt={article.commentCnt}
                />
              ))}
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                alignItems: 'center',
                justifyContent: 'space-between',
                width: '100%',
                gap: 30,
                // backgroundColor: 'pink',
              }}
            >
              {folderList.map((folder) => (
                <ProfileFolder
                  key={folder.id}
                  setId={setFolderId}
                  id={folder.id}
                  foldername={folder.folderName}
                  // articlecnt={folder.articlecnt}
                />
              ))}
              {accountInfo.id === userId && (
                <div
                  style={{
                    flexDirection: 'column',
                    display: 'flex',
                    width: 200,
                    height: 180,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <IconButton
                    style={{
                      border: '1.5px solid rgb(99, 115, 129)',
                      borderRadius: '10px',
                      padding: '5px',
                      width: '67%',
                      height: '60%',
                      borderBlockColor: colors.textGrey,
                    }}
                    onClick={() => createFolderToggle.toggle()}
                  >
                    <Iconify
                      icon="gg:add"
                      style={{ width: '30%', height: '20%', color: colors.textGrey }}
                    />
                  </IconButton>
                  {createFolderToggle.isOpen && (
                    <CustomModal
                      open={createFolderToggle.isOpen}
                      onClose={createFolderToggle.toggle}
                      title={'폴더 생성'}
                      mode={'textfield'}
                      contents="폴더 이름을 입력해주세요."
                      label={'폴더 이름'}
                      rightButton={'생성'}
                      buttonAction={{ rightAction: (value) => CreateFolder(value) }}
                    />
                  )}
                </div>
              )}
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <div
              style={{
                width: '100%',
                alignItems: 'center',
                flexDirection: 'column',
                display: 'flex',
              }}
            >
              {likedList.map((article) => (
                <ProfileArticle
                  key={article.likes.post_id}
                  id={article.likes.post_id}
                  thumbnail={
                    article.posts.thumbnails[0] || {
                      url: '/assets/not_thumbnail.png',
                      type: 'IMAGE',
                    }
                  }
                  title={article.posts.title}
                  content={article.posts.body}
                  date={article.posts.updated_at}
                  isLike={true}
                  likecnt={article.likeCnt}
                  commentcnt={article.commentCnt}
                />
              ))}
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <div
              style={{
                width: '100%',
                alignItems: 'center',
                flexDirection: 'column',
                display: 'flex',
              }}
            >
              {commentedList.map((article) => (
                <ProfileArticle
                  key={article.comments.post_id}
                  id={article.comments.post_id}
                  thumbnail={
                    article.posts.thumbnails[0] || {
                      url: '/assets/not_thumbnail.png',
                      type: 'IMAGE',
                    }
                  }
                  title={article.comments.title}
                  content={article.comments.body}
                  date={article.comments.updated_at}
                  isLike={likedPosts.some(
                    (like) => like.likes.post_id === article.comments.post_id
                  )}
                  likecnt={article.likeCnt}
                  commentcnt={article.commentCnt}
                />
              ))}
            </div>
          </CustomTabPanel>
        </Box>
      </div>
    </div>
  ) : (
    <FolderPageView id={folderId} setId={setFolderId} />
  );
}
