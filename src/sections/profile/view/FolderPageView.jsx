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

export default function FolderPageView({ id, setId }) {
  const [open, setOpen] = useState(null);
  const [postList, setPostList] = useState([]);
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
    GetFolderArticleList(id.folderId)
      .then((res) => {
        console.log('폴더 아티클 리스트', res);
        setPostList(res.data.result);
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
          <AddArticleModal
            open={editFolderToggle.isOpen}
            onClose={editFolderToggle.toggle}
            buttonAction={editAlertToggle.toggle}
            id={id}
            setId={setId}
          />
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
          imgurl={article.imgurl}
          title={article.title}
          content={article.content}
          date={article.date}
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
