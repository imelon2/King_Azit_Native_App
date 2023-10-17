import store from '@/store';
import axios from 'axios';
import Config from 'react-native-config';

const BaseAPI = (url: string) => {
  const access_token = store.getState().user.access_token;
  return axios.create({
    baseURL: url,
    headers: {
      authorization: `Bearer ${access_token}`,
    },
  });
};

const api = BaseAPI(Config.GAME_API_URL!);

export const tournamentTest = async () => {
  try {
    const result = await api.get('/rooms/test');
    console.log(result.data);
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const tournamentStartGame = async (roomId: string) => {
  return await api.post('/rooms/startGame', {roomId});
};
export const tournamentRestartGame = async (roomId: string) => {
  return await api.post('/rooms/restartGame', {roomId});
};
export const tournamentBreakGame = async (roomId: string) => {
  return await api.post('/rooms/breakGame', {roomId});
};
