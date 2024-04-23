import AppCardImage from "./app-card-image";
import AppCardInfo from "./app-card-info";

// ----------------------------------------------------------------------

export default function AppCard3(){

  const images = [
    {
      id:0,
      src:'/assets/images/santamonica.jpg',
    },
    {
      id:1,
      src:'/assets/images/la.jpg',
    },
    {
      id:2,
      src:'http://172.16.211.100:32001/test/sample.png',
    }
  ];
  
    return (

      <div style={{width: '100%'}}>
          <AppCardImage images={images}/>
          <AppCardInfo/>
      </div>

    );
}