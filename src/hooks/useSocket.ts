import {useCallback} from 'react';
import SocketIOClient, {Socket} from 'socket.io-client';
import Config from 'react-native-config';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';

let socket: Socket | undefined;
const useSocket = (): [Socket | undefined, () => void] => {
    const access_token = useSelector((state: RootState) => state.user.access_token);
  const disconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
      socket = undefined;
    }
  }, []);

  if (!socket) {
    console.log('connect Socket');
    socket = SocketIOClient(`${Config.SOCKET_URL}`, {
      transports: ['websocket'],
      extraHeaders: {
        Authorization:`Bearer ${access_token}`
      }
    });
    
  }
  return [socket, disconnect];
};

export default useSocket;