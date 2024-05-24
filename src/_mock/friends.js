import { faker } from '@faker-js/faker';
// ----------------------------------------------------------------------

export const FRIENDS_LIST = [
    { name: '2soJeong', photoURL: '/assets/images/avatars/avatar_1.jpg' },
    { name: '3soJeong', photoURL: '/assets/images/avatars/avatar_2.jpg' },
    { name: '4soJeong', photoURL: '/assets/images/avatars/avatar_3.jpg' },
    { name: '5soJeong', photoURL: '/assets/images/avatars/avatar_4.jpg' },
    { name: 'Nam Somi', photoURL: '/assets/images/avatars/avatar_5.jpg' },
    { name: 'HyeCircle', photoURL: '/assets/images/avatars/avatar_6.jpg' },
    { name: 'Wooing', photoURL: '/assets/images/avatars/avatar_7.jpg' },
    { name: 'Miso', photoURL: '/assets/images/avatars/avatar_8.jpg' },
  ];
export const friends = FRIENDS_LIST.map((friend) => ({
    id: faker.string.uuid(),
    name: friend.name,
    photoURL: friend.photoURL,
  }));