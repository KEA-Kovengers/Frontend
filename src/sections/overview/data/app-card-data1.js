// useData.js
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { GetSocialFeedByHashtag } from 'src/api/posts.api';
import { GetUserInfo } from 'src/api/user.api';
export default function AppCardData1({ tag }) {

  const [data, setData] = useState([]);


  const getPostByTag = () => {
    GetSocialFeedByHashtag(tag).then((res) => {
      const postsList = res.data.result.postsList.content;

      const userPromises = postsList.map((item) => getUserinfo(item.userId));

      Promise.all(userPromises)
        .then((userResults) => {
          const transformedData = postsList.map((item, index) => {
            const userData = userResults[index];
            const datetimeString = item.created;
            const date = new Date(datetimeString);
            const formattedDate = date.toISOString().split('T')[0];

            return {
              id: item.id,
              image: { src: String(item.thumbnails[0].url) || 'http://k.kakaocdn.net/dn/un84b/btsAaIdBjIX/k16a3FniQw1aw8sAx76fAk/img_640x640.jpg' }, // Adjust based on your actual image structure
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
  }

  const getUserinfo = (id) => {
    return GetUserInfo(id)
      .then((res) => {
        return res.data.result;
      })
      .catch((err) => {
        console.log(err);
      });
  }


  useEffect(() => {
    if (tag) {
      getPostByTag();
    }
  }, [tag]);

  // const [data, setData] = useState([
  //   {
  //     id: 0,
  //     image: { src: '/assets/images/covers/popular.jpg' },
  //     info: {
  //       userImage: '/assets/images/avatars/avatar_25.jpg',
  //       title: '인기 급상승',
  //       userName: '소정이의 블로그',
  //       date: '2024-03-15',
  //     }
  //   },
  //   {
  //     id: 1,
  //     image: { src: '/assets/images/covers/jadu.jpg' },
  //     info: {
  //       userImage: '/assets/images/avatars/avatar_2.jpg',
  //       title: '떡볶이나 먹자',
  //       userName: 'Hello Jadoo TV 안녕 자두야',
  //       date: '2023-05-20',
  //     }
  //   },
  //   {
  //     id: 2,
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

AppCardData1.propTypes = {
  tag: PropTypes.array.isRequired,
};