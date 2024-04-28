import AppCardImage from "./app-card-image";
import AppCardInfo from "./app-card-info";

// ----------------------------------------------------------------------

export default function AppCard2() {
    const images = [
        {
          id: 1,
          src: '/assets/images/covers/jadu.jpg',
        }
      ];
      
      const info = [
        {
          id:1,
          userImage: '/assets/images/avatars/avatar_2.jpg',
          title: '떡볶이나 먹자',
          userName: 'Hello Jadoo TV 안녕 자두야',
          date: '2023-05-20',
        }
      ];

    return (
        <div>
            <AppCardImage images={images} />
            <AppCardInfo info={info}/>
        </div>
    );
}