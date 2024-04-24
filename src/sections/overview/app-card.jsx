
import AppCardImage from "./app-card-image";
import AppCardInfo from "./app-card-info";

// ----------------------------------------------------------------------

const images = [
  {
    id: 0,
    src: '/assets/images/cat.jpg',
  },
];

export default function AppCard() {

  return (
    <div>
      <AppCardImage images={images} />
      <AppCardInfo />
    </div>
  );
}
