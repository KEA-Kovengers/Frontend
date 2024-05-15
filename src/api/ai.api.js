import axios from 'axios';

const PostSummary = (text) => {
  return axios.post('https://d7fd-218-153-129-75.ngrok-free.app/generate/summary', {
    text: text,
  });
};

const PostSpellCheck = (text) => {
  return axios.post('https://d7fd-218-153-129-75.ngrok-free.app/modify/spell', {
    text: text,
  });
};

const PostGenerateText = (text) => {
  return axios.post('https://d7fd-218-153-129-75.ngrok-free.app/generate/text', {
    text: text,
  });
};

const PostGenerateHashtag = (text) => {
  return axios.post('https://d7fd-218-153-129-75.ngrok-free.app/generate/hashtag', {
    text: text,
  });
};

const PostGenerateImage = (text) => {
  return axios.post('https://d7fd-218-153-129-75.ngrok-free.app/generate/image', {
    text: text,
  });
};

export { PostSummary, PostSpellCheck, PostGenerateText, PostGenerateHashtag, PostGenerateImage };
