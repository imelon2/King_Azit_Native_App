import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import SignIn from './src/pages/SignIn/SignIn';
import SignUp from './src/pages/SignUp';
import { RootState } from './src/store/reducer';
import MainPage from "./src/pages/MainPage/MainPage";
import MyPage from './src/pages/MainPage/MyPage';


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
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function AppInner() {
  // const isLoggedIn = useSelector((state: RootState) => !!state.user.email);
  const isLoggedIn = true
  console.log(isLoggedIn);

  return (
    <>
      {!isLoggedIn ? (
        <Stack.Navigator initialRouteName='SignIn' screenOptions={{
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
      ) : (
          <Tab.Navigator>
            <Tab.Screen name="MainPage" component={MainPage} />
            <Tab.Screen name="MyPage" component={MyPage} options={{headerShown:false}}/>
          </Tab.Navigator>
      )}
    </>
  );
}

export default AppInner;
