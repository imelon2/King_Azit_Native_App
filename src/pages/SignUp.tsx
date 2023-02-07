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
type SignInScreenProps3 = NativeStackScreenProps<RootStackParamList, 'SignUpPassWord'>;
type SignInScreenProps4 = NativeStackScreenProps<RootStackParamList, 'SignUpNickName'>;
type SignInScreenProps5 = NativeStackScreenProps<RootStackParamList, 'SignUpCertification'>;

function SignUpCertification({ navigation  } : SignInScreenProps5) {
  return (
    <DismissKeyboardView style={styles.container}>
      <Icon name="arrowleft" style={styles.leftIcon}   size={25} color="#000" onPress={() => navigation.navigate('SignUpNickName')} />
      <View  style={styles.topbar} >
        <View  style={styles.progress5} ></View>
      </View>
      <View style={styles.terms}>
        <Text style={styles.termstext} > 본인확인을 위해  </Text>
        <Text style={styles.termstext2} > 인증을 진행해주세요.  </Text>
      </View>
      <Text style={styles.nextButton} onPress={() => navigation.navigate('SignIn')} >
         가입신청
      </Text>
    </DismissKeyboardView>
  )
}

function SignUpNickName({ navigation  } : SignInScreenProps4) {
  return (
    <DismissKeyboardView style={styles.container}>
      <Icon name="arrowleft" style={styles.leftIcon}    size={25} color="#000" onPress={() => navigation.navigate('SignUpPassWord')} />
      <View  style={styles.topbar} >
        <View  style={styles.progress4} ></View>
      </View>
      <View style={styles.terms}>
        <Text style={styles.termstext} > 아지트에 사용할  </Text>
        <Text style={styles.termstext2} > 닉네임을 정해주세요.  </Text>
      </View>
      <Text style={styles.nextButton} onPress={() => navigation.navigate('SignUpCertification')} >
         다음
      </Text>
    </DismissKeyboardView>
  )
}

function SignUpPassWord({ navigation  } : SignInScreenProps3) {
  return (
    <DismissKeyboardView style={styles.container}>
      <Icon name="arrowleft" style={styles.leftIcon}    size={25} color="#000" onPress={() => navigation.navigate('SignUpLogin')} />
      <View  style={styles.topbar} >
        <View  style={styles.progress3} ></View>
      </View>
      <View style={styles.terms}>
        <Text style={styles.termstext} > 아지트에 사용할  </Text>
        <Text style={styles.termstext2} > 비밀번호를 입력해주세요.  </Text>
      </View>
      <Text style={styles.nextButton} onPress={() => navigation.navigate('SignUpNickName')} >
         다음
      </Text>
    </DismissKeyboardView>
  )
}


function SignUpLogin({ navigation  } : SignInScreenProps2) {
    return (
      <DismissKeyboardView style={styles.container}>
        <Icon name="arrowleft" style={styles.leftIcon}    size={25} color="#000" onPress={() => navigation.navigate('SignUpHome')} />
        <View  style={styles.topbar} >
          <View  style={styles.progress2} ></View>
        </View>
        <View style={styles.terms}>
          <Text style={styles.termstext} > 로그인에 사용할  </Text>
          <Text style={styles.termstext2} > 아이디를 입력해주세요.  </Text>
        </View>
        <Text style={styles.nextButton} onPress={() => navigation.navigate('SignUpPassWord')} >
           다음
        </Text>
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
        <Stack.Screen name="SignUpPassWord" component={SignUpPassWord}  options={{headerShown:false}} />
        <Stack.Screen name="SignUpNickName" component={SignUpNickName}  options={{headerShown:false}} />
        <Stack.Screen name="SignUpCertification" component={SignUpCertification}  options={{headerShown:false}} />
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
  progress3: {
    position:"absolute",
    borderBottomWidth: 2,
    borderBottomColor:'#000',
    width:190,
    top:0,
    left:0,
  },
  progress4: {
    position:"absolute",
    borderBottomWidth: 2,
    borderBottomColor:'#000',
    width:230,
    top:0,
    left:0,
  },
  progress5: {
    position:"absolute",
    borderBottomWidth: 2,
    borderBottomColor:'#000',
    width:270,
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
  terms : {
    fontSize:heightScale*26,
    marginLeft: 20,
    marginTop: 20,
    color:"#000",
    marginBottom: heightScale*100
  },
  termstext: {
    fontSize:heightScale*26,
    color:"#000",
  },
  termstext2: {
    fontSize:heightScale*26,
    color:"#000",
    marginTop: 7,
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
    position:'absolute',
    bottom: 35,
    width: '92%',
    textAlign:"center",
    color: '#000',
    backgroundColor:'#D9D9D9',
    height: heightScale*75,
    lineHeight: heightScale*75,
    borderRadius:16,
    marginLeft:'4%',
  }
});

export default SignUp;