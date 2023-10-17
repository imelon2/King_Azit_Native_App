import {useCallback} from 'react';
import SocketIOClient, {Socket} from 'socket.io-client';
import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import {RootState} from '../store/reducer';
import { IProfileInfo, MAX_TABLE_LIMIT } from '@/config';

type IUseSocket = {
  socket:Socket | undefined,
  disconnect : () => void,
  reconnect: () => void,
}
let socket: Socket | undefined;
const useSocket = (): IUseSocket => {
  // const useSocket = (): [Socket | undefined, () => void, () => void] => {
  const access_token = useSelector(
    (state: RootState) => state.user.access_token,
  );

  const disconnect = useCallback(() => {
    if (socket) {
      socket.disconnect();
      socket = undefined;
    }
  }, []);

  const reconnect = useCallback(() => {
    // if (socket) {
    //   socket.disconnect();
    //   socket = undefined;

    //   console.log('Reconnect Socket : ' + nickName);
    //   socket = SocketIOClient(`${Config.SOCKET_URL}`, {
    //     transports: ['websocket'],
    //     extraHeaders: {
    //       Authorization: `Bearer ${access_token}`,
    //     },
    //   });

    //   socket.on('connect', function () {
    //     console.log('is reconnect socket : ' + socket?.connected);
    //   });
    // }
  }, []);
  
  if (!socket) {
    socket = SocketIOClient(`${Config.GAME_API_URL}`, {
      transports: ['websocket'],
      auth: {
        token: `Bearer ${access_token}`,
      },
    });
    socket.on('connect', () => {
      console.log('is connect socket : ' + socket?.connected);
    });

    socket.on('disconnected',(error) => {
      console.log(error);
    })
  }
  return {socket, disconnect, reconnect};
};


/**
 * @Title Trigger for socket.on.roomId
 * @description Trigger for socket.on.roomId
 */
export const callRoomInfo = ({roomId}:{roomId:string}) => {
  if (!socket) return;
  socket.emit('GetRoomInfo', {roomId});
}

export const callRoomTableInfo = ({roomId}:{roomId:string}) => {
  if (!socket) return;
  socket.emit('GetRoomTableInfo', {roomId});
}

/**
 * @TODO
 */
export const callTableInfo = ({roomId}:{roomId:string}) => {
  if (!socket) return;
  // socket.emit('GetRoomInfo', {roomId});
}

/**
 * @Title Get Game Info
 * @description [LIVE] 방 정보 수정 시, Re-Render
 */
export const getLiveRoomInfo = (roomId:string,listener:<T> (data:T | any) => void) => {
  if (!socket) return;
  return socket.on('RoomInfo-'+roomId,listener)
}
/**
 * @Title Get Table Players Info
 * @description [LIVE] 새로운 참가자 입장 시, Re-Render
 */
export const getLiveTablePlayers = (roomId:string,listener:<T> (data:T | any) => void) => {
  if (!socket) return;  
  return socket.on('TablePlayers-'+roomId,listener)
}

export const getLiveTableInfos = (roomId:string,listener:<T> (data:T | any) => void) => {
  if (!socket) return;  
  return socket.on('TableInfo-'+roomId,listener)
}

export const getLiveTableTimer = (roomId:string,listener:<T> (data:T | any) => void) => {
  if (!socket) return;  
  return socket.on('Timer-'+roomId,listener)
}

export const filterLiveTablePlayers = (_playerInfo: IProfileInfo[] = []) => {
  let length = _playerInfo.length
  // 참가자가 없는 경우
  if(_playerInfo.length === 0) {
    return [[]]
  } 
  
  let players:IProfileInfo[][]=[];
  for(let i = 0; i < Math.floor(length/MAX_TABLE_LIMIT) + 1; i++) {
    let bundle:IProfileInfo[] = []
    for(let j = 0; j < MAX_TABLE_LIMIT; j++) {
      if(!_playerInfo[0]) break;
      bundle.push(_playerInfo.shift() as IProfileInfo)
    }
    players.push(bundle)
    bundle=[]
  }

  return players;
}

export default useSocket;
