import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import AppCardImage from 'src/sections/overview/app-card-image';
import AppCardInfo2 from 'src/sections/overview/app-card-info2';
import useData from 'src/sections/overview/data/app-card-data'; // Adjust the import path as needed

export default function ManagerMain() {
  const [data, target] = useData();
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '95%',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '20px',
        }}
      >
        <Grid container spacing={3} style={{ flexGrow: 1 }}>
          {data.map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <AppCardImage
                  images={item.image.images}
              />
              <div>
                <AppCardInfo2
                  id={item.info.id}
                  title={item.info.title}
                  body={item.info.body || ''}
                  likeCnt={item.info.likeCnt}
                  commentCnt={item.info.commentCnt}
                  userName={item.info.userName || []}
                  userImage={item.info.userImage || '/assets/not_thumbnail.png'}
                  isLiked={false}
                  date={item.info.date || ''}
                  onClick={() => navigate(`/article/${item.id}`)}
                />
              </div>
            </Grid>
          ))}
        </Grid>
        <div ref={target} style={{ height: '1px' }} />
      </div>
    </div>
  );
}
