import { sample } from 'lodash';
import { faker } from '@faker-js/faker';

// Function to generate a random date in the format 'YYYY-MM-DD HH:MM'
const getRandomDate = () => {
  const year = Math.floor(Math.random() * (2024 - 2000 + 1)) + 2000; // Random year between 2000 and 2024
  const month = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0'); // Random month between 01 and 12
  const day = String(Math.floor(Math.random() * 28) + 1).padStart(2, '0'); // Random day between 01 and 28 (assuming all months have 28 days)
  const hours = String(Math.floor(Math.random() * 24)).padStart(2, '0'); // Random hours between 00 and 23
  const minutes = String(Math.floor(Math.random() * 60)).padStart(2, '0'); // Random minutes between 00 and 59

  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

// ----------------------------------------------------------------------

export const Reports = [...Array(24)].map((_, index) => ({
  id: faker.string.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  name: faker.person.fullName(),
  content: sample([
    '스팸홍보/도배글입니다.',
    '음란물입니다.',
    '불법정보를 포함하고 있습니다.',
    '불법정보를 포함하고 있습니다.',
    '개인정보 노출 게시글입니다.',
    '불쾌한 표현이 있습니다.',
  ]),
  date: getRandomDate(),
  status: sample(['대기', '완료']),
  title: sample([
    'Tesla Cybertruck-inspired camper trailer for Tesla fans who can’t just wait for the truck!',
    'Designify Agency Landing Page Design',
    '✨What is Done is Done ✨',
    'Examining the Evolution of the Typical Web Design Client',
    'Katie Griffin loves making that homey art',
    '【Playlist】공부할때 듣기 좋은 지브리 ost 모음 ㅣ 센과 치히로 하울의 움직이는 성 마녀 배달부 키키 토토로 ㅣ 수면 공부 카페 음악 ㅣ 중간 광고 없음',
    '영화 듄 2 개봉일 조조 후기 (쿠키없음/ 스포있음/ 출연진/ 평점/ 티모시 샬라메/ 듄3는 2027년개봉) 영화 듄 2 개봉일 조조 후기 (쿠키없음/ 스포있음/ 출연진/ 평점/ 티모시 샬라메/ 듄3는 2027년개봉)',
  ]),
}));
