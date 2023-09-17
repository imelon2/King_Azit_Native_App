import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from '@/../AppInner';
import {
  SignUpHome,
  SignUpId,
  SignUpNickName,
  SignUpPassWord,
  SignUpCertification,
  SignUpFinal,
  SignUpCertificationNum,
} from './index';

const Stack = createNativeStackNavigator<RootStackParamList>();

function SignUp() {
  return (
    <Stack.Navigator screenOptions={{animation: 'slide_from_right'}}>
      <Stack.Screen name="SignUpHome" component={SignUpHome} options={{headerShown: false}} />
      <Stack.Screen name="SignUpId" component={SignUpId} options={{headerShown: false}} />
      <Stack.Screen name="SignUpPassWord" component={SignUpPassWord} options={{headerShown: false}} />
      <Stack.Screen name="SignUpCertification" component={SignUpCertification} options={{headerShown: false}} />
      <Stack.Screen name="SignUpNickName" component={SignUpNickName} options={{headerShown: false}} />
      <Stack.Screen name="SignUpCertificationNum" component={SignUpCertificationNum} options={{headerShown: false}} />
      <Stack.Screen name="SignUpFinal" component={SignUpFinal} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}

export default SignUp;
