// useData.js
import { useState } from 'react';

export default function AppCardData3() {

  const [data, setData] = useState([
    {
      id: 0,
      image: { src: '/assets/images/covers/exercise.jpg' },
      info: {
        userImage: '/assets/images/avatars/avatar_25.jpg',
        title: '운동을 하자!',
        userName: '소정이의 블로그',
        date: '2024-03-15',
      }
    },
    {
      id: 1,
      image: { src: '/assets/images/covers/jadu.jpg' },
      info: {
        userImage: '/assets/images/avatars/avatar_2.jpg',
        title: '떡볶이나 먹자',
        userName: 'Hello Jadoo TV 안녕 자두야',
        date: '2023-05-20',
      }
    },
    {
      id: 2,
      image: { src: '/assets/images/covers/ghibli.jpg' },
      info: {
        userImage: '/assets/images/avatars/avatar_13.jpg',
        title: '2 시간 지브리 음악 🌍',
        userName: 'Ghibli Music',
        date: '2024-02-26',
      }
    }
  ]);

  return [data, setData];
}