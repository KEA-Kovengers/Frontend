import { Client } from '@stomp/stompjs';
import 'bootstrap/dist/css/bootstrap.min.css';

import api from './api';
import httpApi from './http.api';

// 알림 목록 조회
export const ViewNotice = (userId) => {
    return httpApi.get(`/notices/view/${userId}`);
};

// 알림 읽음 처리
export const ReadNotice = (noticeId) => {
    return httpApi.post(`/notices/status/${noticeId}`);
};