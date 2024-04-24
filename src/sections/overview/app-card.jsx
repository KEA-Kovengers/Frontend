import { id } from "date-fns/locale";
import AppCardImage from "./app-card-image";
import AppCardInfo from "./app-card-info";

// ----------------------------------------------------------------------

export default function AppCard() {

  const images = [
    {
      id: 0,
      src: '/assets/images/covers/cat.jpg',
    },
  ];
  
  const info = [
    {
      id: 0,
      userImage: '/assets/images/avatars/avatar_25.jpg',
      title: '고양이 감기 : 허피스 바이러스',
      userName: '소정이의 블로그',
      date: '2024-03-15',
    },
  ];

  return (
    <div>
      <AppCardImage images={images} />
      <AppCardInfo info={info}/>
    </div>
  );
}
