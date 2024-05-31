import api from './api';

export const GetFriendList = (id) => {
  return api.get(`/users/friend/view/${id}`);
};

export const GetFriendRequestList = (id) => {
  return api.get(`/users//friend/received/${id}`);
};

export const PostFriendRequest = (toId) => {
  return api.post(`/users/friend/request`, toId);
};

export const PostFriendAccept = (fromId) => {
  return api.post(`/users/friend/accept`, fromId);
};

export const DeleteFriend = (id) => {
  // return api.delete(`/users/users/friend/delete`, id);
  return api({
    method: 'delete',
    url: `/users/friend/delete`,
    data: { id: id },
  });
};

export const DeleteFriendReject = (id) => {
  // return api.delete(`/users/users/friend/reject`, { id: id });
  return api({
    method: 'delete',
    url: `/users/friend/reject`,
    data: { id: id },
  });
};
