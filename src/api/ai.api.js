import axios from 'axios';

const PostSummary = (text) => {
  return axios.post('http://172.16.211.44/generate/summary', {
    text: text,
  });
};

const PostSpellCheck = (text) => {
  return axios.post('http://172.16.211.44/modify/spell', {
    text: text,
  });
};

const PostGenerateText = (text) => {
  return axios.post('http://172.16.211.44/generate/text', {
    text: text,
  });
};

const PostGenerateHashtag = (text) => {
  return axios.post('http://172.16.211.44/generate/hashtag', {
    text: text,
  });
};

const PostGenerateImage = (text) => {
  return axios.post('http://172.16.211.44/generate/image', {
    text: text,
  });
};

export { PostSummary, PostSpellCheck, PostGenerateText, PostGenerateHashtag, PostGenerateImage };
