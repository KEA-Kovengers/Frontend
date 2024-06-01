import { Client } from '@stomp/stompjs';
import 'bootstrap/dist/css/bootstrap.min.css';

import Cookies from 'js-cookie';

import api from './api';
import httpApi from './http.api';

export const GetPostsList = (id) => {
  return httpApi.get(`/articles/posts/list/${id}?page=0&size=10`);
};

export const GetPostDetail = (id) => {
  return httpApi.get(`/articles/posts/${id}`);
};

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

export const SetUpWebSocket = () => {
  
  let accessToken = null;
  const tokenString = Cookies.get('token');

  if(tokenString) {
    try {
      const tokenData = JSON.parse(tokenString);
      accessToken = tokenData.token;
    }catch(e) {
      console.error('Error parsing token from cookie:', e);
    }
  }

  const client = new Client({
    brokerURL: 'ws://newcord.kro.kr/ws',
    connectHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return client;
}

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

// 사진 업로드 
export const PostObjectUpload = (data) => {
  return api.post('/articles/object/upload', data,{
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
}