import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import SignIn from './src/pages/SignIn/SignIn';
import SignUp from './src/pages/SignUp/SignUp'
import MainPage from "./src/pages/MainPage/MainPage";
import MyPage from './src/pages/MainPage/MyPage';
import SetNickNameScreen from './src/pages/MainPage/SetNickNameScreen';
import Admin from './src/pages/MainPage/Admin';
import MyTicket from './src/pages/MainPage/MyTicket';


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

export type HomeRootStackParamList = {
  Home:undefined; // Tab Navigator
  Admin:{
    id:number
  };
};

export type MyPageRootStackParamList = {
  SetNickNameScreen:undefined;
  MyTicket:undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();
const HomeStack = createNativeStackNavigator<HomeRootStackParamList & MyPageRootStackParamList>();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return(
    <Tab.Navigator>
      <Tab.Screen name="MainPage" component={MainPage}  options={{ title: 'MainPage', headerShown: false}} />
      <Tab.Screen name="MyPage" component={MyPage} options={{headerShown:false}}/>
    </Tab.Navigator>
  )
}
function AppInner() {
  // const isLoggedIn = useSelector((state: RootState) => !!state.user.email);
  const isLoggedIn = true
  // console.log(isLoggedIn);

  return (
    <>
      {isLoggedIn ? (
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
        <HomeStack.Navigator initialRouteName='Home' screenOptions={{headerShown:false}}>
          <HomeStack.Screen name='Home' component={TabNavigator}/>
          <HomeStack.Screen name='SetNickNameScreen' component={SetNickNameScreen} options={{animation:'none'}}/>
          <HomeStack.Screen name='MyTicket' component={MyTicket} options={{animation:'none'}}/>
          <HomeStack.Screen name='Admin' component={Admin} options={{animation:'none'}}/>
        </HomeStack.Navigator>
      )}
    </>
  );
}

export default AppInner;
