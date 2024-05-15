import AppCardImage from "./app-card-image";
import AppCardInfo from "./app-card-info";

// ----------------------------------------------------------------------

export default function AppCard2(){

  const data = [
    {
      id: 0,
      image: [ 
        {src: '/assets/images/covers/santamonica.jpg' },
        {src: '/assets/images/covers/la.jpg' },
        {src: 'http://172.16.211.100:32001/test/sample.png'},
      ],
    },
  ]
  
  const info = [
    {
      id: 0,
      userImage: '/assets/images/avatars/avatar_5.jpg',
      title: '여행의 시작, 산타모니카 비치',
      userName: '혜원이의 블로그',
      date: '2024-04-24',
    },
  ];

    return (
      <div style={{width: '100%'}}>
            {data.map(item => (
              <div key={item.id}>
                <AppCardImage images={item.image} />
              </div>
            ))}
          <AppCardInfo info={info}/>
      </div>

    );
}