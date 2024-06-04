import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, snackbarClasses } from '@mui/material';
import AppCardImage from 'src/sections/overview/app-card-image';
import AppCardInfo from 'src/sections/overview/app-card-info';
import { GetSocialFeed } from 'src/api/posts.api';

export default function ManagerMain() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    GetSocialFeed()
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
                images={
                  item.thumbnails.length > 0
                    ? item.thumbnails.map((thumbnail, idx) => ({
                        src: String(thumbnail.url),
                        id: idx,
                        type: String(thumbnail.type),
                      }))
                    : [{ src: '/assets/not_thumbnail.png', id: 0 }]
                }
                key={item.id}
              />
              <div>
                <AppCardInfo
                  info={[{
                    id: item.id,
                    title: item.title,
                    body: item.body,
                    likeCnt: item.likeCnt, // Pass likeCnt
                    commentCnt: item.commentCnt, // Pass commentCnt
                    userImage: item.userImage, // Assuming you have userImage
                    isLiked: false // Initial state can be true or false
                  }]}
                  onClick={() => navigate(`/article/${item.id}`)}
                />
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  );
}