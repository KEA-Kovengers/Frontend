// import axios from 'axios';

const PostSummary = (text) => {
  return axios.post('https://e2d0-203-249-126-181.ngrok-free.app/generate/summary', {
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

export { PostSummary, PostSpellCheck, PostGenerateText, PostGenerateHashtag };
