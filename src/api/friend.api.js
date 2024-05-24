import api from './http.api';
import { useAccountStore } from 'src/store/useAccountStore';

// export const PostFriendRequest
export const GetFriendList = (id) => {
  return api.get(`/users/users/friend/friend/${id}`);
};
