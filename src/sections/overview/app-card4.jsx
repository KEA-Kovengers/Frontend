import AppCardImage from "./app-card-image";
import AppCardInfo from "./app-card-info";

// ----------------------------------------------------------------------

export default function AppCard4() {
    const images = [
        {
          id: 4,
          src: '/assets/images/covers/ghibli.jpg',
        }
      ];
      
      const info = [
        {
          id:4,
          userImage: '/assets/images/avatars/avatar_13.jpg',
          title: '2 시간 지브리 음악 🌍 치유, 공부, 일, 수면을위한 편안한 배경 음악 지브리 스튜디오',
          userName: 'Ghibli Music',
          date: '2024-02-26',
        }
      ];

    return (
        <div>
            <AppCardImage images={images} />
            <AppCardInfo info={info}/>
        </div>
    );
}