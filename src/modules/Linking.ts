import {
  LinkingOptions,
  NavigationProp,
  PathConfigMap,
  useNavigation,
} from '@react-navigation/native';
import axios, { AxiosError } from 'axios';
import {useEffect} from 'react';
import {Linking} from 'react-native';
import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import {MyPageRootStackParamList, HomeRootStackParamList} from '../../AppInner';
import {RootState} from '../store/reducer';

type Iconfig =
  | {
      screens: PathConfigMap<ReactNavigation.RootParamList>;
    }
  | undefined;

const config: Iconfig = {
  screens: {
    Admin: {
      path: 'admin/:uuid/:memberId/:type/:max/:token',
      parse: {
        uuid: (uuid: any) => `${uuid}`,
        memberId: (memberId: any) => `${memberId}`,
        type: (type: any) => `${type}`,
        max: (max: any) => `${max}`,
        token: (token: any) => `${token}`,
      },
    },
  },
};

const linking: LinkingOptions<ReactNavigation.RootParamList> = {
  prefixes: ['kingazit://'],
  config,
};

export function deepLinkController(isLoggedIn: boolean) {
  const navigation =
    useNavigation<
      NavigationProp<MyPageRootStackParamList & HomeRootStackParamList>
    >();
  const {roles,access_token} = useSelector((state: RootState) => state.user);
  
  useEffect(() => {
    if (isLoggedIn) {
      // 최초 실행 시에 Universal link 또는 URL scheme요청이 있었을 때 여기서 찾을 수 있음
      Linking.getInitialURL().then(e => {
        if (e) {
          // Only ROLE_ADMIN
          const isPermitted = roles.find((e: string) => e == 'ROLE_ADMIN');
          if (!isPermitted) {
            return navigation.navigate('Forbidden',{message:'회원님은 해당 페이지를 이용할 권한이 없습니다.'});
          }
          navigateTicketPay(e);
        }
      });

      // 앱이 실행되어있는 상태에서 요청이 왔을 때 처리하는 이벤트 등록
      Linking.addEventListener('url', e => {
        if (e.url) {
          // Only ROLE_ADMIN
          const isPermitted = roles.find((e: string) => e == 'ROLE_ADMIN');
          if (!isPermitted) {
            return navigation.navigate('Forbidden',{message:'회원님은 해당 페이지를 이용할 권한이 없습니다.'});
          }
          navigateTicketPay(e.url);
        }
      });
    }
    return () => {
      Linking.removeAllListeners('url');
    };
  }, [isLoggedIn]);

  // Check QR Access Token & QR Ticket Pay Navigiate
  const navigateTicketPay = async(url: any) => {
    try {
      const _params = url.split('/');
      const qrtoken = await axios.get(`${Config.API_URL}/admin/verifyqr`,{
        headers: {
          Authorization: `Bearer ${access_token}`,
          qrToken:`Bearer ${_params[7]}`
        },
      });
      if(qrtoken.data) {
        navigation.navigate('TicketPay', {
          uuid:_params[3],
          memberId: _params[4],
          type: _params[5],
          max: Number(_params[6]),
        });
      }
    } catch (error) {
      if(((error as AxiosError).response?.data as any).errorMessage === "유효하지 않은 qr 코드") {
        return navigation.navigate('Forbidden',{message:'해당 QR코드는 유효하지 않은 QR 코드입니다.'});
      } else if (((error as AxiosError).response?.data as any).errorMessage ==="만료된 qr 코드") {
        return navigation.navigate('Forbidden',{message:'해당 QR코드는 유효기간이 만료된 qr 코드입니다.'});
      }
    }
  };

}

export default linking;
