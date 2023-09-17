import axios from 'axios';
import Config from 'react-native-config';
const BASE_URL: any = 'http://43.200.171.141:8080/';

const baseAPI = (url: string) => {
  return axios.create({
    baseURL: url,
  });
};

export const signUpApi = baseAPI(BASE_URL);
