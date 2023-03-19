import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
import axios, { AxiosError } from 'axios';
import { useAppDispatch } from './src/store';
import userSlice from './src/slices/user';
import decodeJWT from './src/modules/decodeJWT';
import messaging from '@react-native-firebase/messaging';
import { RootState } from './src/store/reducer';
import SignIn from './src/pages/SignIn/SignIn';
import SignUp from './src/pages/SignUp/SignUp';
import MainPage from './src/pages/MainPage/MainPage';
import MyPage from './src/pages/MyPage/MyPage';
import SetNickNameScreen from './src/pages/MyPage/SetNickNameScreen';
import MyTicket from './src/pages/MyPage/MyTicket';
import GamePage from './src/pages/MainPage/GamePage';
import TabBar from './src/components/TabBar';
import Ranking from './src/pages/Ranking/Ranking';
import Game from './src/pages/Game/Game';
import GameHostory from './src/pages/MyPage/GameHostory';
import MyRanking from './src/pages/MyPage/MyRanking';
import MyRankingScore from './src/pages/MyPage/MyPageCompoents/MyRankingScore';
import interceptors from './src/hooks/interceptors';
import TicketsHistorys from './src/pages/MyPage/TicketsHistorys';
import RoomMake from './src/pages/Admin/RoomMake';
import TicketPay from './src/pages/Admin/TicketPay';
import TicketCharge from './src/pages/Admin/TicketCharge';
import MemberManagement from './src/pages/Admin/MemberManagement';
import UserDetail from './src/pages/Admin/UserDetail';
import MyTickets from './src/pages/MainPage/MainPageModal/MyTickets';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import TicketsResult from './src/pages/Admin/TicketsResult';
import { deepLinkController } from './src/modules/Linking';
import Forbidden from './src/pages/Admin/Forbidden';
import AdminTicketsHistory from './src/pages/Admin/AdminTicketsHistory';
import QRCodeScanner from './src/pages/Admin/Components/QRCodeScanner';
import CreateRoom from './src/pages/Admin/CreateRoom';

export type RootStackParamList = {
  SignIn: undefined;
  Main: undefined;
  Login: undefined;
  SignUp: undefined;
  SignUpLogin: undefined;
  SignUpHome: undefined;
  SignUpPassWord: undefined;
  SignUpNickName: undefined;
  SignUpGender: undefined;
  SignUpName: undefined;
  SignUpBirth: undefined;
  SignUpCertification: undefined;
  SignUpFinal: undefined;
};

export type HomeRootStackParamList = {
  Home: undefined; // Tab Navigator
  GamePage: undefined;
  RoomMake: undefined;
  MyTickets: {
    card: string;
    count: number;
  };
  TicketPay: {
    memberId: string;
    type: string;
    max: number;
  };
  TicketsResult: {
    name: string;
    tickets: [{
      type: string;
      counts: number;
    }]
  },
  Forbidden: {
    message: string;
  };
  TicketCharge: undefined;
  MemberManagement: undefined;
  UserDetail: {
    userData: {
      name: string;
      phone: string;
      id: string;
      nickname: string;
      state: string;
      date: string;
      profileImage: string;
      email: string;
    },
  }
  AdminTicketsHistory: undefined;
  QRCodeScanner : undefined;
  CreateRoom:undefined;
};

export type MyPageRootStackParamList = {
  SetNickNameScreen: undefined;
  MyTicket: undefined;
  GameHostory: undefined;
  MyRanking: undefined;
  MyRankingScore: undefined;
  TicketsHistorys: undefined;
};

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

const Stack = createNativeStackNavigator<RootStackParamList>();
const HomeStack = createNativeStackNavigator<
  HomeRootStackParamList & MyPageRootStackParamList
>();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator tabBar={props => <TabBar {...props} />}>
      <Tab.Screen
        name="MainPage"
        component={MainPage}
        options={{ title: 'MainPage', headerShown: false }}
      />
      <Tab.Screen
        name="Ranking"
        component={Ranking}
        options={{ title: 'Ranking', headerShown: false }}
      />
      <Tab.Screen name="Game" component={Game} options={{ title: 'Game' }} />
      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

function AppInner() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(
    (state: RootState) => !!state.user.access_token,
  );

  // 디바이스 토큰 설정 및 redex 저장
  // useEffect(() => {
  //   async function getToken() {
  //     try {
  //       if (!messaging().isDeviceRegisteredForRemoteMessages) {
  //         await messaging().registerDeviceForRemoteMessages();
  //       }
  //       const token = await messaging().getToken();
  //       dispatch(userSlice.actions.setphoneToken({phoneToken: token}));
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   getToken();
  // }, []);

  // Refresh Access & Refresh Token
  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await EncryptedStorage.getItem('refreshToken');
        if (!token) {
          return;
        }

        const refreshResult = await axios.get(`${Config.API_URL}/refresh`, {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        const { access_token, refresh_token } = refreshResult.data;
        const { sub, roles, nickname, uuid } = decodeJWT(access_token);
    
        dispatch(
          userSlice.actions.setUser({
            name: sub,
            roles: roles,
            access_token: access_token,
            nickName: nickname,
            uuid:uuid
          }),
        );
        await EncryptedStorage.setItem('refreshToken', refresh_token);
      } catch (error) {
        // refresh token 기간만료됬을 경우
        console.log('refresh Result Error')
        console.log((error as AxiosError).response?.status);
        if (
          (error as AxiosError).response?.status === 400 ||
          (error as AxiosError).response?.status === 401
        ) {
          Alert.alert(
            '알림',
            '자동로그인 기간이 만료되었습니다. 다시 로그인 해주세요.',
          );
        } else {
          Alert.alert('Error', '죄송합니다. 잠시후에 다시 시도해주세요.');
        }
      }
    };
    getToken();
  }, [dispatch]);

  // axios interceptors 중앙 경로
  interceptors();

  // DeepLink Controller
  deepLinkController(isLoggedIn)

  return (
    <>
      {isLoggedIn ? (
        <HomeStack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}>
          <HomeStack.Screen name="Home" component={TabNavigator} />
          <HomeStack.Screen
            name="SetNickNameScreen"
            component={SetNickNameScreen}
            options={{ animation: 'none' }}
          />
          <HomeStack.Screen
            name="MyTicket"
            component={MyTicket}
            options={{ animation: 'none' }}
          />
          <HomeStack.Screen
            name="MyTickets"
            component={MyTickets}
            options={{ animation: 'none' }}
          />
          <HomeStack.Screen
            name="TicketsHistorys"
            component={TicketsHistorys}
            options={{ animation: 'none' }}
          />
          <HomeStack.Screen
            name="GameHostory"
            component={GameHostory}
            options={{ animation: 'none' }}
          />
          <HomeStack.Screen
            name="MyRanking"
            component={MyRanking}
            options={{ animation: 'none' }}
          />
          <HomeStack.Screen
            name="MyRankingScore"
            component={MyRankingScore}
            options={{ animation: 'none' }}
          />
          <HomeStack.Screen
            name="TicketPay"
            component={TicketPay}
            options={{ animation: 'none' }}
          />
          <HomeStack.Screen
            name="TicketCharge"
            component={TicketCharge}
            options={{ animation: 'none' }}
          />
          <HomeStack.Screen
            name="AdminTicketsHistory"
            component={AdminTicketsHistory}
            options={{ animation: 'none' }}
          />
          <HomeStack.Screen
            name="MemberManagement"
            component={MemberManagement}
            options={{ animation: 'none' }}
          />
          <HomeStack.Screen
            name="UserDetail"
            component={UserDetail}
            options={{ animation: 'none' }}
          />
          <HomeStack.Screen
            name="TicketsResult"
            component={TicketsResult}
            options={{ animation: 'none' }}
          />
          <HomeStack.Screen
            name="GamePage"
            component={GamePage}
            options={{ animation: 'none' }}
          />
          <HomeStack.Screen
            name="RoomMake"
            component={RoomMake}
            options={{ animation: 'none' }}
          />
          <HomeStack.Screen
            name="CreateRoom"
            component={CreateRoom}
            options={{ animation: 'none' }}
          />
          <HomeStack.Screen
            name="Forbidden"
            component={Forbidden}
            options={{ animation: 'none' }}
          />
          <HomeStack.Screen
            name="QRCodeScanner"
            component={QRCodeScanner}
            options={{ animation: 'none' }}
          />
        </HomeStack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="SignIn"
          screenOptions={{
            animation: 'slide_from_right',
          }}>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ title: 'Login', headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ title: 'SignUp', headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </>
  );
}

export default AppInner;
