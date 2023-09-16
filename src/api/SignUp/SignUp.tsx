import axios from 'axios';
import Config from 'react-native-config';

const BASE_URL: any = Config.API_URL;

const baseAPI = (url: string) => {
  return axios.create({
    baseURL: url,
  });
};

export const signUpApi = baseAPI(BASE_URL);
