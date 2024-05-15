import { sub } from 'date-fns';
import { faker } from '@faker-js/faker';

const NOTIFICATIONS = [
  
    {
      id: faker.string.uuid(),
      title: '2soJeong',
      description: '님이 친구 신청을 보냈어요.',
      avatar: '/assets/images/avatars/avatar_1.jpg',
      type: 'friend_interactive',
      createdAt: sub(new Date(), { hours: 3, minutes: 30 }),
      isUnRead: true,
    },
    {
      id: faker.string.uuid(),
      title: '2soJeong',
      description: '님이 댓글을 달았어요: 우와 맛있겠네요~ 안녕하세요 만나서 반갑습니다. 같이 소식을 나눠요~',
      avatar: '/assets/images/covers/pizza.png',
      type: 'friend_interactive',
      createdAt: sub(new Date(), { days: 1, hours: 3, minutes: 30 }),
      isUnRead: false,
    },
    {
      id: faker.string.uuid(),
      title: 'Hyecircle',
      description: '님이 좋아요를 눌렀어요.',
      avatar: '/assets/images/covers/cat.jpg',
      type: 'friend_interactive',
      createdAt: sub(new Date(), { days: 1, hours: 3, minutes: 30 }),
      isUnRead: false,
    },
  ];

  export default NOTIFICATIONS;