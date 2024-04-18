import AppCardImage from "./app-card-image";
import AppCardInfo from "./app-card-info";

// ----------------------------------------------------------------------

const images = [
  {
    id:0,
    src:'http://172.16.211.100:32001/test/sample.png',
  },
];

export default function AppCard(){
  
    return (
      <div>
          <AppCardImage images={images}/>
          <AppCardInfo/>
      </div>
    );
}