import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import SignIn from './src/pages/SignIn/SignIn';
import SignUp from './src/pages/SignUp';
import SignUpFinal from './src/pages/SignUpFinal';
import { RootState } from './src/store/reducer';
import MainPage from "./src/pages/MainPage/MainPage";


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
  const isLoggedIn = useSelector((state: RootState) => !!state.user.email);
  console.log(isLoggedIn);

  return (
    // <View>
      // {!isLoggedIn ? (
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
          <Stack.Screen
            name="SignUpFinal"
            component={SignUpFinal}
            options={{ title: 'SignUpFinal', headerShown: false }}
          />
        </Stack.Navigator>
      // ) : (
      //     <Tab.Navigator>
      //       <Tab.Screen name="MainPage" component={MainPage} />
      //     </Tab.Navigator>
      // )}
    // </View>
  );
}

export default AppInner;
