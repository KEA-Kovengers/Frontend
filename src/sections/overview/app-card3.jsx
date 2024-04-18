import AppCardImage from "./app-card-image";
import AppCardInfo from "./app-card-info";

// ----------------------------------------------------------------------

export default function AppCard3(){

  const images = [
    {
      id:0,
      src:'http://172.16.211.100:32001/test/sample.png',
    },
    {
      id:1,
      src:'/assets/images/meeting.png',
    },
    {
      id:2,
      src:'/assets/images/santamonica.jpg',
    }
  ];
  
    return (

      <div>
          <AppCardImage images={images}/>
          <AppCardInfo/>
      </div>

    );
}