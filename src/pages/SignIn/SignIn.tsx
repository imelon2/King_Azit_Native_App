import {createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useRef, useState} from 'react';
import { RootStackParamList } from '../../../AppInner';
import Login from './Login';
import Main from './Main';

const Stack = createNativeStackNavigator<RootStackParamList>();

function SignIn() {
  return (
    <Stack.Navigator initialRouteName='Main' screenOptions={{
      animation: 'none',
    }}>
      <Stack.Screen
        name="Main"
        component={Main}
        options={{title:'Login',headerShown:false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        // options={{title:'Login',headerTitle:'이메일 회원가입' ,headerTitleAlign:'center'}}
        options={{title:'Login',headerTitle:'',headerShadowVisible:true}}
        
      />
     </Stack.Navigator>
  );
}

export default SignIn;
