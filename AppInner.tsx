import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {StyleSheet, Text, View} from 'react-native';
import { useSelector } from 'react-redux';
import SignIn from './src/pages/SignIn/SignIn';
import SignUp from './src/pages/SignUp';
import { RootState } from './src/store/reducer';


export type RootStackParamList = {
  SignIn: undefined;
  Main:undefined;
  Login:undefined;
  SignUp: undefined;
  SignUpLogin: undefined;
  SignUpHome: undefined;
  SignUpPassWord:undefined;
  SignUpNickName:undefined;
  SignUpCertification:undefined;
  SignUpFinal:undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppInner() {
  const isLoggedIn = useSelector((state: RootState) => !!state.user.email);
  console.log(isLoggedIn);
  
  return (
   <Stack.Navigator initialRouteName='SignIn' screenOptions={{
    animation: 'slide_from_right',
  }}>
    <Stack.Screen
      name="SignIn"
      component={SignIn}
      options={{title:'Login',headerShown:false}}
    />
    <Stack.Screen
      name="SignUp"
      component={SignUp}
      options={{title:'SignUp',headerShown:false}}
    />
   </Stack.Navigator>
  );
}

export default AppInner;
