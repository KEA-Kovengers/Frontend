import axios from 'axios';
import api from './http.api';

const url = import.meta.env.VITE_FASTAPI_URL;

const PostSummary = (text) => {
  return api.post(`${url}/generate/summary`, {
    text: text,
  });
};

const PostSpellCheck = (text) => {
  return api.post(`${url}/modify/spell`, {
    text: text,
  });
};

const PostGenerateText = (text) => {
  return api.post(`${url}/generate/text`, {
    text: text,
  });
};

const PostGenerateHashtag = (text) => {
  return api.post(`${url}/generate/hashtag`, {
    text: text,
  });
};

const PostGenerateImage = (text) => {
  return api.post(`${url}/generate/image`, {
    text: text,
  });
};

export { PostSummary, PostSpellCheck, PostGenerateText, PostGenerateHashtag, PostGenerateImage };
