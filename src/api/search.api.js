import httpApi from './http.api';
const url = import.meta.env.VITE_FASTAPI_URL;
export const GetSearchUserList = (searchWord) => {
    return httpApi.get(`${url}/search_users?keyword=${searchWord}`);
}

export const GetSearchArticleList = (searchWord) => {
    return httpApi.get(`${url}/search_posts?keyword=${searchWord}`);
}