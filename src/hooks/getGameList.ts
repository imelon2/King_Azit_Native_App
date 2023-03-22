import { useEffect } from "react";
import { useSelector } from "react-redux";
import { roomType } from "../pages/MainPage/Compoents/GameBox";
import gamesSlice from "../slices/games";
import { useAppDispatch } from "../store";
import { RootState } from "../store/reducer";
import useSocket from "./useSocket";

function getGameList() {
    const dispatch = useAppDispatch();
    const [socket, disconnect] = useSocket();
      // Socket
  useEffect(() => {
    const getGameRoomList = (data: any) => {
      console.log(data);
      dispatch(
        gamesSlice.actions.setGameData({
            gameData:data
        }),
      );
    };

    const callback = (data: any) => {
      console.log('here?');
      
      console.log(data);
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

export default getGameList