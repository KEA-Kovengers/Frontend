import axios from 'axios';

const url = import.meta.env.VITE_FASTAPI_URL;

const PostSummary = (text) => {
  return axios.post(`${url}/generate/summary`, {
    text: text,
  });
};

const PostSpellCheck = (text) => {
  return axios.post(`${url}/modify/spell`, {
    text: text,
  });
};

const PostGenerateText = (text) => {
  return axios.post(`${url}/generate/text`, {
    text: text,
  });
};

const PostGenerateHashtag = (text) => {
  return axios.post(`${url}/generate/hashtag`, {
    text: text,
  });
};

const PostGenerateImage = (text) => {
  return axios.post(`${url}/generate/image`, {
    text: text,
  });
};

export { PostSummary, PostSpellCheck, PostGenerateText, PostGenerateHashtag, PostGenerateImage };
