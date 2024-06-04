import httpApi from './http.api';

export const GetReportList = () => {
  return httpApi.get(`/articles/report/all`);
};

export const GetTypeReportList = (type) => {
    return httpApi.get(`articles/report/reportlist/${type}`);
};

export const GetReportInfo = (id) => {
    return httpApi.get(`/articles/report/detail/${id}`);
};
