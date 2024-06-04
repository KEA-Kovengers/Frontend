// useData.js
import { useEffect, useState } from 'react';
import { faker } from '@faker-js/faker';
import { GetSocialFeed } from 'src/api/posts.api';
import { GetUserInfo } from 'src/api/user.api';
import { get } from 'lodash';
import { it, tr } from 'date-fns/locale';

export default function AppCard() {

  const [data, setData] = useState([]);

  // Function to fetch social feed and update state
  const getSocialFeed = () => {
    GetSocialFeed().then((res) => {
      const postsList = res.data.result.postsList.content;


      const userPromises = postsList.map((item) => getUserinfo(item.userId));
      console.log('userPromises', userPromises);
      Promise.all(userPromises)
        .then((userResults) => {
          const transformedData = postsList.map((item, index) => {
            const userData = userResults[index];
            const datetimeString = item.created;
            const date = new Date(datetimeString);
            const formattedDate = date.toISOString().split('T')[0];
            const images = item.thumbnails
            return {
              id: item.id,
              image: { images }, // Adjust based on your actual image structure
              info: {
                id: item.id,
                userImage: userData.profileImg || '/assets/images/avatars/avatar_25.jpg', // Assuming userData contains userImage
                title: item.title,
                userName: userData.nickName || '알수없음', // Assuming userData contains userName
                date: formattedDate,
                likeCnt: item.likeCnt,
                commentCnt: item.commentCnt,
              },
            };
          });
          setData(transformedData);
        })
        .catch((err) => {
          console.log(err);
        });
    })
      .catch((err) => {
        console.log(err);
      });
  };

  // const getUserinfo = (id) => {
  //   console.log('id', id);
  //   GetUserInfo(id)
  //     .then((res) => {
  //       console.log('data', res.data.result);
  //       return res.data.result;
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }
  const getUserinfo = (userid) => {
    if (Array.isArray(userid)) {
      // userid가 배열인 경우
      return Promise.all(userid.map((id) => {

        return GetUserInfo(id)
          .then((res) => {

            return res.data.result;
          })
          .catch((err) => {
            console.log(err);
            return null; // 에러 발생 시 null 반환
          });
      }));
    } else {
      // userid가 배열이 아닌 경우 (단일 id)

      return GetUserInfo(userid)
        .then((res) => {

          return res.data.result;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };



  useEffect(() => {
    getSocialFeed();
  }, []);



  // data.map((item) => {
  //   item.id = item.string.uuid();
  //   item.image = { src: item.image };
  //   item.info = {
  //     userImage: item.user.profileImg,
  //     title: item.title,
  //     userName: item.user.nickName,
  //     date: item.createdAt,
  //   }
  // }
  // );

  // const [data, setData] = useState([
  //   {
  //     id: faker.string.uuid(),
  //     image: { src: '/assets/images/covers/cat.jpg' },
  //     info: {
  //       userImage: '/assets/images/avatars/avatar_25.jpg',
  //       title: '고양이 감기 : 허피스 바이러스',
  //       userName: '소정이의 블로그',
  //       date: '2024-03-15',
  //     }
  //   },
  //   {
  //     id: faker.string.uuid(),
  //     image: { src: '/assets/images/covers/jadu.jpg' },
  //     info: {
  //       userImage: '/assets/images/avatars/avatar_2.jpg',
  //       title: '떡볶이나 먹자',
  //       userName: 'Hello Jadoo TV 안녕 자두야',
  //       date: '2023-05-20',
  //     }
  //   },
  //   {
  //     id: faker.string.uuid(),
  //     image: { src: '/assets/images/covers/ghibli.jpg' },
  //     info: {
  //       userImage: '/assets/images/avatars/avatar_13.jpg',
  //       title: '2 시간 지브리 음악 🌍',
  //       userName: 'Ghibli Music',
  //       date: '2024-02-26',
  //     }
  //   },
  //   {
  //     id: faker.string.uuid(),
  //     image: { src: '/assets/images/covers/ghibli.jpg' },
  //     info: {
  //       userImage: '/assets/images/avatars/avatar_13.jpg',
  //       title: '2 시간 지브리 음악 🌍',
  //       userName: 'Ghibli Music',
  //       date: '2024-02-26',
  //     }
  //   },
  //   {
  //     id: faker.string.uuid(),
  //     image: { src: '/assets/images/covers/ghibli.jpg' },
  //     info: {
  //       userImage: '/assets/images/avatars/avatar_13.jpg',
  //       title: '2 시간 지브리 음악 🌍',
  //       userName: 'Ghibli Music',
  //       date: '2024-02-26',
  //     }
  //   },
  //   {
  //     id: faker.string.uuid(),
  //     image: { src: '/assets/images/covers/ghibli.jpg' },
  //     info: {
  //       userImage: '/assets/images/avatars/avatar_13.jpg',
  //       title: '2 시간 지브리 음악 🌍',
  //       userName: 'Ghibli Music',
  //       date: '2024-02-26',
  //     }
  //   }
  // ]);

  return [data, setData];
}