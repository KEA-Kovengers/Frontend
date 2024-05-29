import api from './http.api';

export const GetFriendList = (id) => {
  return api.get(`/users/users/friend/friend/${id}`);
};

export const GetFriendRequestList = (id) => {
  return api.get(`/users//users/friend/received/${id}`);
};

export const PostFriendRequest = (toId) => {
  return api.post(`/users/users/friend/request`, toId);
};

export const PostFriendAccept = (fromId) => {
  return api.post(`/users/users/friend/accept`, fromId);
};

export const DeleteFriend = (id) => {
  // return api.delete(`/users/users/friend/delete`, id);
  return api({
    method: 'delete',
    url: `/users/users/friend/delete`,
    data: { id: id },
  });
};

export const DeleteFriendReject = (id) => {
  // return api.delete(`/users/users/friend/reject`, { id: id });
  return api({
    method: 'delete',
    url: `/users/users/friend/reject`,
    data: { id: id },
  });
};
