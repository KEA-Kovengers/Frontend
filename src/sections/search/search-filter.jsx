import * as React from 'react';
import PropTypes from 'prop-types';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify';
import ProfileArticle from '../profile/profile-article';
import LikeRow from '../article/article-like-row';
import { Table, TableBody, TableContainer } from '@mui/material';
import TableNoData from '../user/TableNoData';

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
const userList = [
  {
    name: '이소정',
    avatarUrl: `/assets/images/avatars/avatar_1.jpg`,
    company: '소정이의 블로그',
    isFriend: true,
  },
  {
    name: '김미소',
    avatarUrl: `/assets/images/avatars/avatar_2.jpg`,
    company: '미소의 블로그',
    isFriend: false,
  },
  {
    name: '남소미',
    avatarUrl: `/assets/images/avatars/avatar_3.jpg`,
    company: '솜2의 블로그',
    isFriend: true,
  },
  {
    name: '윤혜원',
    avatarUrl: `/assets/images/avatars/avatar_4.jpg`,
    company: '혜원이의 블로그',
    isFriend: false,
  },
  {
    name: '정성훈',
    avatarUrl: `/assets/images/avatars/avatar_5.jpg`,
    company: '성훈이의 블로그',
    isFriend: true,
  },
  {
    name: '김미소',
    avatarUrl: `/assets/images/avatars/avatar_2.jpg`,
    company: '미소의 블로그',
    isFriend: true,
  },
];

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function SearchFilter({ query }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab
            icon={<Iconify icon="majesticons:article-line" />}
            iconPosition="start"
            style={{ height: '10px' }}
            label="게시글"
            {...a11yProps(0)}
          />
          <Tab
            icon={<Iconify icon="ep:user-filled" />}
            iconPosition="start"
            label="닉네임"
            {...a11yProps(1)}
          />
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
          {/* {articleList.map((article) => (
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
          ))} */}
          <TableNoData query={query} />
        </div>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <TableContainer sx={{ overflow: 'unset' }}>
          <Table sx={{ minWidth: 300 }}>
            {/* {userList.map((row) => (
              <LikeRow
                key={row.id}
                name={row.name}
                company={row.company}
                isFriend={row.isFriend}
                avatarUrl={row.avatarUrl}
              />
            ))} */}
            <TableNoData query={query} />
          </Table>
        </TableContainer>
      </CustomTabPanel>
    </Box>
  );
}
