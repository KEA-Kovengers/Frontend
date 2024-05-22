import React, { useState } from 'react';
import { Folder, SpaceBar } from '@mui/icons-material';
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

export default function ProfileView() {
  const { isFolder } = useFolder();

  const [value, setValue] = useState(0);
  // const [id, setId] = useState('');
  const createFolderToggle = useToggle();

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
  const select_style = {
    fontSize: '20px',
    cursor: 'pointer',
  };

  const articleList = [
    {
      imgurl: 'https://tourimage.interpark.com//Spot/157/13239/201512/6358657306494964572.jpg',
      title: '세빌 스페인 광장',
      content:
        '마차를 타고 광장으로 들어섰는데 반달 모양의 웅장한 건물, 넓은 광장, 분수가 압도합니다. 건물의 아래쪽 벽면에는 에스파냐의 지역별 역사를 타일 모자이크로 만든 작품이 이어져 있습니다. 바르셀로나 타일을 찾아 한 컷 찍었습니다. 스페인 광장 어디서 찍어도 사진이 화보처럼 나와요. 스...',
      date: '2021.10.10',
      likecnt: 10,
      commentcnt: 5,
      isLike: true,
    },
    {
      imgurl: 'https://cdn.ablenews.co.kr/news/photo/202207/20220726_1_99366.jpg',
      title: '에펠탑',
      content:
        '프랑스 파리 안나톨 5가(5 Av.Anatole)에 있는 탑이다. 탑의 이름은 건축가 에펠의 이름을 딴것으로 1889년 3월 31일 준공해 1889년 5월 6일에 개장했다. 프랑스의 건축가 알렉상드르 귀스타브 에펠(Alexandre Gustave Eiffel, 1832~1923)[6]이 만든 거대한 철탑.    ',
      date: '2020.1.10',
      likecnt: 10,
      commentcnt: 5,
      isLike: false,
    },
  ];

  const folderList = [
    { foldername: '일상', articlecnt: 5 },
    { foldername: '맛집', articlecnt: 3 },
    { foldername: '쇼핑', articlecnt: 2 },
    { foldername: '기타', articlecnt: 1 },
  ];

  const activityList = [
    {
      imgurl:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz27r0Cso3AdGfnuGyAKWZdQEgUHNkyfhR6Z3O-Sqsgg&s',
      title: '2024 국내 벚꽃 명소 추천 5곳!',
      content:
        '매년 많은 분들에게 사랑받고 있는 벚꽃, 올해는 평년보다 빠르게 찾아온다고 합니다. 곧 봄 내음을 물씬 맡을 수 있게 될 거 같아요. 겨우내 움츠러들었던 몸을 기지개 켜며 아름다...    ',
      date: '2024.3.20',
      isLike: true,
      likecnt: 12,
      isComment: true,
      commentcnt: 5,
    },
    {
      imgurl:
        'https://i.namu.wiki/i/TFjZQucX9NgQSuxUAttUqBFIXmRDFpvSW6iNmmBE1R6retRIYcIH1MQj4hPTkqaAePagFTc1Kg023mNWvGfpDw.webp',
      title:
        '영화 듄 2 개봉일 조조 후기 (쿠키없음/ 스포있음/ 출연진/ 평점/ 티모시 샬라메/ 듄3는 2027년개봉)',
      content:
        '듄: 파트2 정보 관람평 평점 출연진 예고편 상영일정 개봉일에 관람한 듄2 용산 아이맥스 영화 리뷰 후기 아트레이데스 가문의 몰락으로 폴 아트레이데스의 새로운 운명을 예고했...',
      date: '2024.3.20',
      isLike: true,
      likecnt: 12,
      isComment: false,
      commentcnt: 6,
    },
  ];
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
              {articleList.map((article) => (
                <ProfileArticle
                  key={article.id}
                  imgurl={article.imgurl}
                  title={article.title}
                  content={article.content}
                  date={article.date}
                  isLike={article.isLike}
                  likecnt={article.likecnt}
                  commentcnt={article.commentcnt}
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
              }}
            >
              {folderList.map((folder) => (
                <ProfileFolder
                  // setId={setId}
                  key={folder.id}
                  foldername={folder.foldername}
                  articlecnt={folder.articlecnt}
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
                  // buttonAction={{rightAction: }}
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
    <FolderPageView />
  );
}
