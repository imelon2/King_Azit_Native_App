import {useCallback} from 'react';
import SocketIOClient, {Socket} from 'socket.io-client';
import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';

let socket: Socket | undefined;
const useSocket = (): [Socket | undefined, () => void, () => void] => {
  const access_token = useSelector(
    (state: RootState) => state.user.access_token,
  );
  const nickName = useSelector((state: RootState) => state.user.nickName);
  const disconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
      socket = undefined;
    }
  }, []);

  const reconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
      socket = undefined;

      console.log('Reconnect Socket : ' + nickName);
      socket = SocketIOClient(`${Config.SOCKET_URL}`, {
        transports: ['websocket'],
        extraHeaders: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      socket.on('connect', function () {
        console.log('is reconnect socket : ' + socket?.connected);
      });
    }
  }, []);

  if (!socket) {
    console.log('connect Socket : ' + nickName);
    socket = SocketIOClient(`${Config.SOCKET_URL}`, {
      transports: ['websocket'],
      extraHeaders: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    socket.on('connect', function () {
      console.log('is connect socket : ' + socket?.connected);
    });
  }
  return [socket, disconnect, reconnect];
};

export default useSocket;
