import axios from "axios";
import { useCallback } from "react"
import Config from "react-native-config";
import EncryptedStorage from "react-native-encrypted-storage";
import userSlice from "../slices/user";
import { useAppDispatch } from "../store";

const useRefreshToken = () => {
    const dispatch = useAppDispatch()

    const refreshToken = useCallback(async () => {
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
        return access_token;
        
    },[])

    return [refreshToken];
}

export default useRefreshToken