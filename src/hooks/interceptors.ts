import axios, {AxiosError} from 'axios';
import {useEffect} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
import {useAppDispatch} from '../store';
import userSlice from '../slices/user';

// axios interceptors 중앙 경로
function interceptors() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    axios.interceptors.response.use(
      // 응답 전달
      response => {
        return response;
      },
      // 애러 발생 시,
      async error => {
        // config : 애러 전 요청 내용
        const {
          config,
          response: {status},
        } = error;
        if (status === 401) {
          if (error.response.data.errorMessage === '토큰 만료') {
            const originalRequest = config;
            const token = await EncryptedStorage.getItem('refreshToken');

            // token refresh 요청
            const refreshResult = await axios.get(`${Config.API_URL}/refresh`, {
              headers: {
                authorization: `Bearer ${token}`,
              },
            });
            const {access_token, refresh_token} = refreshResult.data;
            // 새로운 토큰 저장
            dispatch(userSlice.actions.setAccessToken({access_token:access_token}));
            await EncryptedStorage.setItem('refreshToken', refresh_token);
            originalRequest.headers.Authorization = `Bearer ${access_token}`;
            // 401 '토큰 만료'로 요청 실패했던 요청 새로운 토큰으로 재요청
            return axios(originalRequest);
          }
        }
        return Promise.reject(error);
      },
    );
  }, [dispatch]);
}

export default interceptors;
