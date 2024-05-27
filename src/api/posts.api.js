import api from './http.api';

export const GetPostsList = (id) => {
  return api.get(`/articles/articles/posts/${id}?page=0&size=10`);
};

export const PostCreatePost = (data) => {
  return api.post('/articles/posts/createPost', data);
}
