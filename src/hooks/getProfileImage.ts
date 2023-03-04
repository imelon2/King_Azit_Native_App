import axios, {AxiosError} from 'axios';
import {useEffect} from 'react';
import Config from 'react-native-config';
import {useAppDispatch} from '../store';
import userSlice from '../slices/user';
import { useSelector } from 'react-redux';
import BinaryToBase64 from '../modules/BinaryToBase64';
import { RootState } from '../store/reducer';

// 프로필 사진 갖고오기
function getProfileImage() {
    const dispatch = useAppDispatch();
    const access_token = useSelector((state: RootState) => state.user.access_token);
  useEffect(() => {
    const getProfileImage = async () => {
      try {
        const profileImageResult = await axios.get(
          `${Config.API_URL}/member/image`,
          {
            responseType: 'arraybuffer',
            headers: {
              authorization: `Bearer ${access_token}`,
            },
          },
        );
        const base64ImageString = BinaryToBase64(profileImageResult.data);
        // console.log(profileImageResult.data);

        dispatch(
          userSlice.actions.setProfileImage({
            profileImage: `data:image/png;base64,${base64ImageString}`,
          }),
        );
      } catch (error) {
        if ((error as AxiosError).response?.status === 400) {
          console.log('error from hooks/getProfileImage.ts','프로필사진 없음');
        } else {
          console.log((error as AxiosError).response?.status,'error from hooks/getProfileImage.ts');
        }
      }
    };
    getProfileImage();
  }, [dispatch]);
}

export default getProfileImage