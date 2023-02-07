import { Text, View, Button, StyleSheet, Dimensions } from "react-native";
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/AntDesign';
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { RootStackParamList } from '../../AppInner';
import {widthData,heightData} from '../modules/globalStyles'
const {width, height} = Dimensions.get('window');
const heightScale = heightData;
import SignIn from '../pages/SignIn';
import DismissKeyboardView from '../components/DismissKeyboardView'

const Stack = createNativeStackNavigator<RootStackParamList>();
type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUpHome'>;
type SignInScreenProps2 = NativeStackScreenProps<RootStackParamList, 'SignUpLogin'>;

function SignUpLogin({ navigation  } : SignInScreenProps2) {
    return (
      <DismissKeyboardView style={styles.container}>
        <Icon name="arrowleft" style={styles.leftIcon}    size={25} color="#000" onPress={() => navigation.navigate('SignUpHome')} />
        <View  style={styles.topbar} >
          <View  style={styles.progress2} ></View>
        </View>
        <View>
          <Text style={styles.terms1} >로그인에 사용할  </Text>
          <Text style={styles.terms} > 아이디를 입력해주세요.  </Text>
        </View>
      </DismissKeyboardView>
    )
}

function SignUpHome({ navigation  } : SignInScreenProps) {
    return (
    <View  style={styles.container} >
            <Icon name="arrowleft" style={styles.leftIcon}    size={25} color="#000" onPress={() => navigation.navigate('SignIn')} />
            <View  style={styles.topbar} >
              <View  style={styles.progress} ></View>
            </View>
              <Text style={styles.terms} >서비스 이용약관에 동의해주세요.</Text>
            <View style={styles.termsBox} >
              <Icon  style={styles.checkBox} name="checksquareo" size={25} color="#848484" />
              <Text style={styles.agreeText} >모두 동의</Text>
            </View>
            <Text style={styles.bottomBar} ></Text>
            <View style={styles.termsBox} >
              <Icon  style={styles.check} name="check" size={15} color="#848484" />
              <Text>[필수] 개인정보 </Text>
            </View>
            <View style={styles.termsBox} >
              <Icon  style={styles.check} name="check" size={15} color="#848484" />
              <Text>이용약관 </Text>
            </View>
            <Text style={styles.nextButton} onPress={() => navigation.navigate('SignUpLogin')} >
              다음
            </Text>
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    height:height-(heightScale*37),
  },
  leftIcon: {
    marginTop: 15,
    marginLeft: 15, 
    marginBottom: 15
  },
  topbar: {
    borderBottomWidth: 2,
    borderBottomColor:'#D9D9D9',
  },
  progress: {
    position:"absolute",
    borderBottomWidth: 2,
    borderBottomColor:'#000',
    width:110,
    top:0,
    left:0,
  },
  progress2: {
    position:"absolute",
    borderBottomWidth: 2,
    borderBottomColor:'#000',
    width:150,
    top:0,
    left:0,
  },
  termsBox: {
    flexDirection: "row",
    marginTop: heightScale*15,
  },
  bottomBar: {
    width: "92%",
    borderBottomWidth: 2,
    borderBottomColor:'#D9D9D9',
    marginLeft: "4%",
    marginTop: -15,
  },
  terms1: {
    fontSize:heightScale*22,
    marginLeft: 20,
    marginTop: 10,
    color:"#000",
  },
  terms : {
    fontSize:heightScale*22,
    marginLeft: 20,
    marginTop: 20,
    color:"#000",
    marginBottom: heightScale*100
  },
  checkBox : {
    marginLeft: 20,
  },
  agreeText: {
    marginTop:4,
    marginLeft:10,
  },
  check: {
    marginRight: 15,
    marginLeft: 25,
  },
  nextButton: {
    marginTop:heightScale*360,
    width: '92%',
    textAlign:"center",
    color: '#000',
    backgroundColor:'#D9D9D9',
    height: heightScale*80,
    lineHeight: heightScale*80,
    borderRadius:16,
    marginLeft:'4%',
  }
});

export default SignUp;