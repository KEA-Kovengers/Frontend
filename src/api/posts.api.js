import api from './http.api';

// export const GetPostsList = (id) => {
//   return api.get(`/articles/articles/posts/${id}?page=0&size=10`);
// };

// 해시태그 수정
export const PostUpdateHashtags = (data) => {
  return api.post('/articles/posts/updateHashtags', data,{
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// 제목 수정
// 상태: POST
export const PostEdit = (data) => {
  return api.post('/articles/posts/editPost', data,{
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

export const GetPostID = (id) => {
  return api.get( `/articles/posts/${id}`);
}

// 게시글 페이지 생성
// 상태: EDIT
export const PostCreate = (data) => {
  return api.post('/articles/posts/createPost', data,{
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// 게시글 내용 수정
export const PostCreateEditSession = (data) => {
  return api.post('/articles/posts/createEditSession', data,{
    headers: {
      'Content-Type': 'application/json',
    },
  });
};

// 게시글 편집 세션 삭제
export const PostDeletEditSession = (data) => {
  return api.post('/articles/posts/deleteEditSession', data,{
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export const PostObjectUpload = (data) => {
  return api.post('/articles/object/upload', data,{
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}