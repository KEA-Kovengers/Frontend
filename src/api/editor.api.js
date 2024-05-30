import httpApi from './http.api';

export const GetEditorList = (id) => {
  return httpApi.get(`/articles/editor/list/${id}`);
};
