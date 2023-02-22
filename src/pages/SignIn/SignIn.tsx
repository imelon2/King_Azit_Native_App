import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import React, {useCallback, useRef, useState} from 'react';
import {RootStackParamList} from '../../../AppInner';
import Login from './Login';
import Main from './Main';
import SignUpFinal from '../SignUp/SignUpFinal';

const Stack = createNativeStackNavigator<RootStackParamList>();

function SignIn() {
  return (
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        animation: 'slide_from_right',
      }}>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{title: 'Login', headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        // options={{title:'Login',headerTitle:'아이디 로그인' ,headerTitleAlign:'center'}}
        options={{title: 'Login', headerTitle: '', headerShown: false}}
      />
      <Stack.Screen
        name="SignUpFinal"
        component={SignUpFinal}
        options={{title: 'SignUpFinal', headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default SignIn;
