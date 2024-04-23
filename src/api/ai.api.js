import axios from 'axios';

const PostSummary = (text) => {
  return axios.post('https://928c-210-102-180-12.ngrok-free.app/generate/summary', {
    text: text,
  });
};

const PostSpellCheck = (text) => {
  return axios.post('http://localhost:8000/modify/spell', {
    text: text,
  });
};

const PostGenerateText = (text) => {
  return axios.post('http://localhost:8000/generate/text', {
    text: text,
  });
};

const PostGenerateHashtag = (text) => {
  return axios.post('http://localhost:8000/generate/hashtag', {
    text: text,
  });
};

const PostGenerateImage = (text) => {
  return axios.post('https://928c-210-102-180-12.ngrok-free.app/generate/image', {
    text: text,
  });
};

export { PostSummary, PostSpellCheck, PostGenerateText, PostGenerateHashtag, PostGenerateImage };
