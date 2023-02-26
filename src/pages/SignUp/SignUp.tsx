import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../../AppInner';
import SignUpHome from './SignUpHome';
import SignUpLogin from "./SignUpLogin";
import SignUpPassWord from "./SignUpPassWord";
import SignUpNickName from "./SignUpNickName";
import SignUpCertification from './SignUpCertification';
import SignUpFinal from './SignUpFinal';

import SignUpName from "./SignUpName";
import SignUpGender from './SignUpGender';
import SignUpBirth from './SignUpBirth';



const Stack = createNativeStackNavigator<RootStackParamList>();

function SignUp() {
  return (
    <Stack.Navigator screenOptions={{ animation: 'slide_from_right' }}>
      <Stack.Screen
        name="SignUpHome"
        component={SignUpHome}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpLogin"
        component={SignUpLogin}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpPassWord"
        component={SignUpPassWord}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpNickName"
        component={SignUpNickName}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SignUpName"
        component={SignUpName}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SignUpBirth"
        component={SignUpBirth}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SignUpGender"
        component={SignUpGender}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SignUpCertification"
        component={SignUpCertification}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SignUpFinal"
        component={SignUpFinal}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}



export default SignUp;
