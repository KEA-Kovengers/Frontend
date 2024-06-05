import { Client } from '@stomp/stompjs';
import Cookies from 'js-cookie';

const connectWebSocket = (userId) => {
    // // 쿠키에서 userId를 추출
    // const tokenString = Cookies.get('token');
    // let userId = null;
    // if (tokenString) {
    //   try {
    //     const tokenData = JSON.parse(tokenString);
    //     userId = tokenData.userId;
    //     console.log('Extracted userId from cookie:', userId);
    //   } catch (e) {
    //     console.error('Error parsing token from cookie:', e);
    //   }
    // }
  const client = new Client({
    brokerURL: 'ws://newcord.kro.kr/notices/ws',
  });

  client.activate();

  client.onConnect = (frame) => {
    console.log('Connected: ' + frame);
    client.subscribe(`/exchange/notice.exchange/notice.${userId}`, (notification) => {
      console.log('Received notification:', notification);
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

export default connectWebSocket;
