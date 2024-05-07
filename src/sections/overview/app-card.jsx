import React from 'react';

import AppCardImage from "./app-card-image";
import AppCardInfo from "./app-card-info";

// ----------------------------------------------------------------------

// const images = [
//   {
//     id: 0,
//     src: '/assets/images/covers/cat.jpg',
//   },
// ];

// const info = [
//   {
//     id: 0,
//     userImage: '/assets/images/avatars/avatar_25.jpg',
//     title: '고양이 감기 : 허피스 바이러스',
//     userName: '소정이의 블로그',
//     date: '2024-03-15',
//   },
// ];

export default function AppCard() {

  const data = [
    {
      id: 0,
      image: { src: '/assets/images/covers/cat.jpg' },
      info: {
        userImage: '/assets/images/avatars/avatar_25.jpg',
        title: '고양이 감기 : 허피스 바이러스',
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
      id: 4,
      image: { src: '/assets/images/covers/ghibli.jpg' },
      info: {
        userImage: '/assets/images/avatars/avatar_13.jpg',
        title: '2 시간 지브리 음악 🌍',
        userName: 'Ghibli Music',
        date: '2024-02-26',
      }
    }
  ];


  return (
    // <div>
    //   <AppCardImage images={images} />
    //   <AppCardInfo info={info}/>
    // </div>

    <div>
    {data.map(item => (
      <div key={item.id}>
        <AppCardImage images={[item.image]} />
        <AppCardInfo info={[item.info]} />
      </div>
    ))}
  </div>
  );
}
