import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {StyleSheet, Text, View} from 'react-native';
import { useSelector } from 'react-redux';
import SignIn from './src/pages/SignIn';
import SignUp from './src/pages/SignUp';
import { RootState } from './src/store/reducer';


export type RootStackParamList = {
  SignIn: undefined;
  SignUp: undefined;
  SignUpLogin: undefined;
  SignUpHome: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppInner() {
  const isLoggedIn = useSelector((state: RootState) => !!state.user.email);
  console.log(isLoggedIn);
  
  return (
   <Stack.Navigator >
    {/* <Stack.Screen
      name="SignIn"
      component={SignIn}
      options={{title:'Login',headerShown:false}}
    />  */}
    <Stack.Screen
      name="SignUp"
      component={SignUp}
      options={{title:'SignUp',headerShown:false}}
    />
   </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
});
export default AppInner;
