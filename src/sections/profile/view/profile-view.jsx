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

export default function ProfileView() {
  const params = useParams();
  const userId = Number(params.id);

  const { likedPosts, setLikedPosts } = useLikedPostStore();
  const { isFolder } = useFolder();

  const [folderId, setFolderId] = useState({ folderId: null, folderName: '' });

  const [value, setValue] = useState(0);
  const [postList, setPostList] = useState([]);
  const [folderList, setFolderList] = useState([]);
  const [activityList, setActivityList] = useState([]);
  const createFolderToggle = useToggle();

  const CreateFolder = (name) => {
    PostFolderAdd(name)
      .then((res) => {
        console.log(res);
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
        console.log(res);
        console.log(res.data.result);
        setFolderList(res.data.result);
      });
    } else if (newValue === 2) {
      console.log('활동 페이지로 이동');
      GetLikeArticle(userId)
        .then((res) => {
          console.log(res);
          console.log(res.data.result.postList.content);
          setActivityList(res.data.result.postList.content);
          setLikedPosts(res.data.result.postList.content);
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

  // const activityList = [
  //   {
  //     imgurl:
  //       'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz27r0Cso3AdGfnuGyAKWZdQEgUHNkyfhR6Z3O-Sqsgg&s',
  //     title: '2024 국내 벚꽃 명소 추천 5곳!',
  //     content:
  //       '매년 많은 분들에게 사랑받고 있는 벚꽃, 올해는 평년보다 빠르게 찾아온다고 합니다. 곧 봄 내음을 물씬 맡을 수 있게 될 거 같아요. 겨우내 움츠러들었던 몸을 기지개 켜며 아름다...    ',
  //     date: '2024.3.20',
  //     isLike: true,
  //     likecnt: 12,
  //     isComment: true,
  //     commentcnt: 5,
  //   },
  //   {
  //     imgurl:
  //       'https://i.namu.wiki/i/TFjZQucX9NgQSuxUAttUqBFIXmRDFpvSW6iNmmBE1R6retRIYcIH1MQj4hPTkqaAePagFTc1Kg023mNWvGfpDw.webp',
  //     title:
  //       '영화 듄 2 개봉일 조조 후기 (쿠키없음/ 스포있음/ 출연진/ 평점/ 티모시 샬라메/ 듄3는 2027년개봉)',
  //     content:
  //       '듄: 파트2 정보 관람평 평점 출연진 예고편 상영일정 개봉일에 관람한 듄2 용산 아이맥스 영화 리뷰 후기 아트레이데스 가문의 몰락으로 폴 아트레이데스의 새로운 운명을 예고했...',
  //     date: '2024.3.20',
  //     isLike: true,
  //     likecnt: 12,
  //     isComment: false,
  //     commentcnt: 6,
  //   },
  // ];

  useEffect(() => {
    // console.log('내 정보', accountInfo);
    // console.log(userId);
    if (userId) {
      GetPostsList(userId)
        .then((res) => {
          console.log(res);
          console.log(res.data.result.postList.content);
          setPostList(res.data.result.postList.content);

          console.log('게시글 목록', postList);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userId]);

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
              <Tab label="활동" {...a11yProps(2)} />
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
                  key={article.id}
                  imgurl={article.post.thumbnail}
                  title={article.post.title}
                  content={article.post.body}
                  date={article.updated_at}
                  isLike={likedPosts.contains(article.id)}
                  // likecnt={article.likecnt}
                  // commentcnt={article.commentcnt}
                  likecnt={0}
                  commentcnt={0}
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
                  setId={setFolderId}
                  id={folder.id}
                  foldername={folder.folderName}
                  // articlecnt={folder.articlecnt}
                />
              ))}
              <div
                style={{
                  flexDirection: 'column',
                  display: 'flex',
                  width: '100%',
                  height: '100%',
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
              </div>
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
              {activityList.map((article) => (
                <ProfileArticle
                  key={article.id}
                  imgurl={article.imgurl}
                  title={article.title}
                  content={article.content}
                  date={article.date}
                  isLike={article.isLike}
                  likecnt={article.likecnt}
                  isComment={article.isComment}
                  commentcnt={article.commentcnt}
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
