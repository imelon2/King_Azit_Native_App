import axios from 'axios';
import Config from 'react-native-config';

const baseAPI = (url: string) => {
  return axios.create({
    baseURL: url,
  });
};

const api = baseAPI(Config.API_URL!);


