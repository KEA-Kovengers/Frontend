import api from './http.api';

// export const PostFriendRequest
export const GetFriendList = (id) => {
  return api.get(`/users/users/friend/friend/${id}`);
};
