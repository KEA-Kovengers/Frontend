import httpApi from './http.api';
import api from './api';

export const GetReportList = () => {
  return httpApi.get(`/articles/report/all`);
};

export const GetTypeReportList = (type) => {
  return httpApi.get(`articles/report/reportlist/${type}`);
};

export const GetReportInfo = (id) => {
  return httpApi.get(`/articles/report/detail/${id}`);
};

export const PostReport = (contentId, body, type) => {
  return api.post(`/articles/report/create`, {
    contendID: contentId,
    body: body,
    type: type,
  });
};
