import { useEffect } from "react";
import { useSelector } from "react-redux";
import { TicketType } from "../modules/ticketsList";
import gamesSlice from "../slices/games";
import { useAppDispatch } from "../store";
import { RootState } from "../store/reducer";
import useSocket from "./useSocket";


interface IPlayers {
  [index:string] : string;
}
interface ISeatInfo {
  nickname : string;
  uuid:string;
}

export type roomType = {
  game_id: string;
  table_no: number;
  game_name: string;
  blind: string;
  ante: number | string;
  ticket_type: TicketType;
  ticket_amount: number;
  status: string;
  playing_users: IPlayers;
  sitout_users: IPlayers;
  seat:ISeatInfo[];
  dealer_id: string;
  entry_limit: number;
  entry: string;
};

export type roomDataType = {
  [key : string] : {[key : string] : roomType
  }}  

function getGameList() {
    const dispatch = useAppDispatch();
    const [socket, disconnect] = useSocket();
      // Socket
  useEffect(() => {
    const getGameRoomList = (data: any) => {
      dispatch(
        gamesSlice.actions.setGameData({
            gameData:data
        }),
      );
    };

    const callback = (data: any) => {
      console.log('Error From getGameList.ts',data);
    };

    if (socket) {
      socket.on('getGameRoomList', getGameRoomList);
      socket.emit('getGameRoomList', 'init');
      socket.on('error', callback);
    }
    return () => {
      console.log('off getGameRoomList');
      disconnect();
    };
  }, []);
}

export const getGameListArr = (gameData:any):roomType[] => {
    const arr: roomType[] = new Array();
    Object.keys(gameData["constructor"]).map((key) => {
      arr.push(gameData["constructor"][key]);
    });

    return arr
}

export const isEnterRoom = (gameData:roomType,userUuid:string) : boolean  => {
  return !!gameData.seat.find((item) => item !==null && item.uuid === userUuid)
}

export const isPlaying = (gameData:roomDataType, userUuid:string) :boolean => {
  return !!Object.keys(gameData['constructor']).find((item) => gameData['constructor'][item].seat.find((item) => item !==null && item.uuid === userUuid))
}

export default getGameList