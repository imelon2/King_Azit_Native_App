import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {Alert, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import SignIn from './src/pages/SignIn/SignIn';
import SignUp from './src/pages/SignUp/SignUp';
import MainPage from './src/pages/MainPage/MainPage';
import MyPage from './src/pages/MainPage/MyPage';
import SetNickNameScreen from './src/pages/MainPage/SetNickNameScreen';
import Admin from './src/pages/MainPage/Admin';
<<<<<<< HEAD
import MainPageHome from './src/pages/MainPage/MainPageHome'


=======
import MyTicket from './src/pages/MainPage/MyTicket';
import {useEffect, useState} from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import Config from 'react-native-config';
import axios, {AxiosError} from 'axios';
import {useAppDispatch} from './src/store';
import userSlice from './src/slices/user';
import decodeJWT from './src/modules/decodeJWT';
import messaging from '@react-native-firebase/messaging';
import {RootState} from './src/store/reducer';
>>>>>>> 81b6928defde53d57425ed4c4712a742b9bb6d12

export type RootStackParamList = {
  SignIn: undefined;
  Main: undefined;
  Login: undefined;
  SignUp: undefined;
  SignUpLogin: undefined;
  SignUpHome: undefined;
  SignUpPassWord: undefined;
  SignUpNickName: undefined;
  SignUpCertification: undefined;
  SignUpFinal: undefined;
  MainPage: undefined;
  GamePage: undefined;
};

export type HomeRootStackParamList = {
  Home: undefined; // Tab Navigator
  Admin: {
    id: number;
  };
};

export type MyPageRootStackParamList = {
  SetNickNameScreen: undefined;
  MyTicket: undefined;
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
    <Tab.Navigator>
<<<<<<< HEAD
      <Tab.Screen name="MainPageHome" component={MainPageHome}  options={{ title: 'MainPage', headerShown: false}} />
      <Tab.Screen name="MyPage" component={MyPage} options={{headerShown:false}}/>
=======
      <Tab.Screen
        name="MainPage"
        component={MainPage}
        options={{title: 'MainPage', headerShown: false}}
      />
      <Tab.Screen
        name="MyPage"
        component={MyPage}
        options={{headerShown: false}}
      />
>>>>>>> 81b6928defde53d57425ed4c4712a742b9bb6d12
    </Tab.Navigator>
  );
}
function AppInner() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(
    (state: RootState) => !!state.user.access_token,
  );
  // const isLoggedIn = false

  // 디바이스 토큰 설정 및 redex 저장
  useEffect(() => {
    async function getToken() {
      try {
        if (!messaging().isDeviceRegisteredForRemoteMessages) {
          await messaging().registerDeviceForRemoteMessages();
        }
        const token = await messaging().getToken();
        dispatch(userSlice.actions.setphoneToken({phoneToken: token}));
      } catch (error) {
        console.error(error);
      }
    }
    getToken();
  }, []);

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
        const {access_token} = refreshResult.data;
        const {sub, roles} = decodeJWT(access_token);
        dispatch(
          userSlice.actions.setUser({
            name: sub,
            roles: roles,
            access_token: access_token,
          }),
        );
      } catch (error) {
        // refresh token 기간만료됬을 경우
        console.log((error as AxiosError).response?.status);
        if (
          (error as AxiosError).response?.status === 400 ||
          (error as AxiosError).response?.status === 401
        ) {
          Alert.alert('알림', '자동로그인 기간이 만료되었습니다. 다시 로그인 해주세요.');
        } else {
          Alert.alert('Error', '죄송합니다. 잠시후에 다시 시도해주세요.');
        }
      }
    };
    getToken();
  }, [dispatch]);

  return (
    <>
<<<<<<< HEAD
      {!isLoggedIn ? (
        <Stack.Navigator initialRouteName='SignIn' screenOptions={{
          animation: 'slide_from_right',
        }}>
=======
      {isLoggedIn ? (
        <HomeStack.Navigator
          initialRouteName="Home"
          screenOptions={{headerShown: false}}>
          <HomeStack.Screen name="Home" component={TabNavigator} />
          <HomeStack.Screen
            name="SetNickNameScreen"
            component={SetNickNameScreen}
            options={{animation: 'none'}}
          />
          <HomeStack.Screen
            name="MyTicket"
            component={MyTicket}
            options={{animation: 'none'}}
          />
          <HomeStack.Screen
            name="Admin"
            component={Admin}
            options={{animation: 'none'}}
          />
        </HomeStack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="SignIn"
          screenOptions={{
            animation: 'slide_from_right',
          }}>
>>>>>>> 81b6928defde53d57425ed4c4712a742b9bb6d12
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{title: 'Login', headerShown: false}}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{title: 'SignUp', headerShown: false}}
          />
        </Stack.Navigator>
      )}
    </>
  );
}

export default AppInner;
