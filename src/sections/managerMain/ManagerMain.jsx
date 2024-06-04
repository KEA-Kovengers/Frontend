import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import AppCardImage from 'src/sections/overview/app-card-image';
import AppCardInfo from 'src/sections/overview/app-card-info';
import { GetAllPost } from 'src/api/posts.api';

// ----------------------------------------------------------------------

export default function ManagerMain() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    GetAllPost()
      .then(response => {
        if (response.data.isSuccess) {
          setData(response.data.result.postsList.content);
        } else {
          console.error('Failed to fetch posts');
        }
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  console.log(data); // 데이터 확인

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
          {data.map((item) => (
            <Grid item xs={12} sm={6} md={4} key={item.id}>
              <div onClick={() => navigate(`/article/${item.id}`)}>
                <AppCardImage images={item.thumbnails.map(thumbnail => thumbnail.url)} key={item.id} />
                <AppCardInfo info={[{ title: item.title, body: item.body }]} />
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}