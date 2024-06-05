// connectWebSocket.js
import { Client } from '@stomp/stompjs';

const connectWebSocket = (userId, showModal) => {
  const client = new Client({
    brokerURL: 'ws://newcord.kro.kr/notices/ws', // 로컬 개발 서버 주소 사용
  });

  client.onConnect = (frame) => {
    console.log('Connected: ' + frame);
    client.subscribe(`/exchange/notice.exchange/notice.${userId}`, notification => {
      const message = JSON.parse(notification.body);
      showModal(message); // 메시지를 수신할 때 모달 창을 띄움
    });
  };

  client.onDisconnect = (frame) => {
    console.log('Disconnected: ' + frame);
  };

  client.onStompError = (frame) => {
    console.error('Broker connection error', frame);
  };

  client.activate();
};

export default connectWebSocket;
