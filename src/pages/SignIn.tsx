import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useCallback, useRef, useState} from 'react';
import {Keyboard} from 'react-native';
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import IconOcticons from 'react-native-vector-icons/Octicons';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {RootStackParamList} from '../../AppInner';
import DismissKeyboardView from '../components/DismissKeyboardView';
import {widthData, heightData} from '../modules/globalStyles';
const {width, height} = Dimensions.get('window');
const heightScale = heightData;

// console.log(widthData); 0.84
// console.log(heightData); 0.8

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

function SignIn({navigation}: SignInScreenProps) {
  const [showPW, setShowPW] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [loading,setLoading] = useState(false)
  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const onChangeEmail = useCallback((text: any) => {
    setEmail(text.trim());
  }, []);
  
  const onChangePassword = useCallback((text: any) => {
    setPassword(text.trim());
  }, []);

  const loginBtn = useCallback(() => {
    try {
      if (!email) {
        return
      }
      if (!password) {
        return 
      }
      setLoading(true)
      Alert.alert('로그인 기능 구현',`email : ${email} \n password : ${password}`);
    } catch(error) {

    } finally {
      setLoading(false)
    }
  }, [email,password]);

  const isFillFrom = !!email && !!password;
  return (
    // <View style={styles.container}>
      <DismissKeyboardView style={styles.container}>
      <View style={{flex: 3, backgroundColor: 'white'}}></View>
      <View
        style={{
          flex: 5.5,
          alignItems: 'center',
        }}>
        <Image
          source={require('../assets/MainLogo.png')}
          style={styles.mainLogo}
        />
      </View>
        <View style={{flex: 14.5}}>
          <View style={styles.inputWrapper}>
            <View style={styles.textInputWrapper}>
              <IconOcticons
                name="person"
                size={heightScale * 25}
                color="black"
              />
              <TextInput
                style={styles.textInput}
                ref={emailRef}
                placeholder="아이디 (이메일)"
                onChangeText={onChangeEmail}
                importantForAutofill="yes" // 자동완성 불러오기
                autoComplete="email" // 자동완성 허용
                keyboardType='email-address' // 키보드 타입 변경
                returnKeyType="next" // next key로 변환
                onSubmitEditing = {() => passwordRef.current?.focus()} // Submit Key 클릭 시, 이벤트
                blurOnSubmit ={false} // Submit Key클릭 시, Keyboard 유지
                value={email}
              />
            </View>
            <View style={styles.textInputWrapper}>
              <IconSimpleLineIcons
                name="lock"
                size={heightScale * 25}
                color="black"
              />
              <TextInput
                style={styles.textInput}
                ref={passwordRef}
                placeholder="비밀번호"
                onChangeText={onChangePassword}
                onSubmitEditing = {loginBtn} // Submit Key 클릭 시, 이벤트
                blurOnSubmit ={false} // Submit Key클릭 시, Keyboard 유지
                secureTextEntry={!showPW ? true : false}
                value={password}
              />
              <IconOcticons
                name={showPW ? 'eye' : 'eye-closed'}
                size={heightScale * 25}
                color="black"
                onPress={() => {
                  setShowPW(!showPW);
                }}
              />
            </View>
            <Pressable style={styles.findIDPW} onPress={() => Alert.alert('구현미정')}>
              <Text style={{fontSize: heightScale * 14}}>
                아이디/비밀번호 찾기
              </Text>
            </Pressable>
          </View>
          <View>
            <Pressable style={styles.loginBtn} onPress={loginBtn} >
              <Text style={isFillFrom ? styles.textStyle:[styles.textStyle,{color:'#A0A0A0'}]}>로그인</Text>
            </Pressable>
          </View>
          <Pressable
            style={styles.signWrapper}
            onPress={() => navigation.navigate('SignUp')}>
            <Text style={[styles.textStyle, {color: 'gray'}]}>
              아직 회원이 아니신가요?
              <Text style={styles.textStyle}> 회원가입</Text>
            </Text>
          </Pressable>
        </View>
              </DismissKeyboardView>
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height : height-(heightScale*20)
  },
  inputWrapper: {
    paddingTop: heightScale * 120,
    paddingHorizontal: heightScale * 29,
    paddingBottom: heightScale * 57,
  },
  textInputWrapper: {
    marginTop: heightScale*20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'gray',
  },
  textInput: {
    fontSize: heightScale * 18,
    width: '85%',
    // left:'5%',
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  findIDPW: {
    marginTop: 5,
    alignItems: 'flex-end',
  },
  loginBtn: {
    marginHorizontal: heightScale * 29,
    backgroundColor: '#D9D9D9',
    height: heightScale * 60,
    borderRadius: heightScale * 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: '#000000',
    fontSize: heightScale * 16,
    fontWeight: 'bold',
  },
  signWrapper: {
    // backgroundColor:'orange',
    marginTop: heightScale * 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainLogo: {
    flex: 1,
    aspectRatio: 1.5,
    resizeMode: 'contain',
  },
  icomStyle: {
    // backgroundColor: 'orange',
  },
});
export default SignIn;
