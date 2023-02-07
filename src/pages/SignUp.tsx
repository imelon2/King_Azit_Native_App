import { Text, View, Button } from "react-native";
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/AntDesign';
import { RootStackParamList } from '../../AppInner';
import SignIn from '../pages/SignIn';

const Stack = createNativeStackNavigator<RootStackParamList>();

function SignUpLogin() {
    return (
        <View>
            <Text>SignUpLogin</Text>
        </View>
    )
}

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUpHome'>;

function SignUpHome({ navigation  } : SignInScreenProps) {
    return (
    <View style={{ flex: 1 }}>
            <Icon name="arrowleft" style={{ marginTop: 10,  marginLeft: 10 , marginBottom: 15}}  size={18} color="#000" onPress={() => navigation.navigate('SignIn')} />
            <Text  style={{ margin: 0, borderBottomColor:'#000' , flex: 14 }} ></Text>
            <Text>서비스 이용약관에 동의해주세요.</Text>

            <Text>모두 동의</Text>
            <Text>[필수] 개인정보 </Text>
            <Text>이용약관</Text>
            <Button title="다음" onPress={() => navigation.navigate('SignUpLogin')} />
      </View>
    )
}


function SignUp() {
    return(
      <Stack.Navigator>
        <Stack.Screen name="SignUpHome" component={SignUpHome}  options={{headerShown:false }} />
        <Stack.Screen name="SignUpLogin" component={SignUpLogin}   options={{headerShown:false}}/>
        <Stack.Screen name="SignIn" component={SignIn}  options={{headerShown:false}} />
      </Stack.Navigator>
    )
}

export default SignUp;