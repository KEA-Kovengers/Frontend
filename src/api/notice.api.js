import { Client } from '@stomp/stompjs';
import 'bootstrap/dist/css/bootstrap.min.css';

import api from './api';
import httpApi from './http.api';

//알림 웹소켓 연결
const connectWebSocket = () => {
    const client = new Client({
         brokerURL: 'ws://newcord.kro.kr/notices/ws',
    });

    client.activate(); // 클라이언트 활성화

    client.onConnect = (frame) => {
        console.log('Connected: ' + frame);
        client.subscribe('/exchange/notice.exchange/notice.12', notification => {
            showNotification(JSON.parse(notification.body));
        });
    };

    client.onDisconnect = (frame) => {
        console.log('Disconnected: ' + frame);
    };

    client.onStompError = (frame) => {
        console.error('Broker connection error', frame);
    };
};

// 알림 목록 조회
export const ViewNotice = (userId) => {
    return httpApi.get(`/notices/view/${userId}`);
};

// 알림 읽음 처리
export const ReadNotice = (userId) => {
    return httpApi.post(`/notices/status/${userId}`);
};