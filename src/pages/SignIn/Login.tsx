import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useRef, useState} from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
} from 'react-native';
import IconOcticons from 'react-native-vector-icons/Octicons';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import IconSimpleAntDesign from 'react-native-vector-icons/AntDesign';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {widthData, heightData} from '../../modules/globalStyles';
import { RootStackParamList } from '../../../AppInner';
const {width, height} = Dimensions.get('screen');
const heightScale = heightData;

// console.log(widthData); 0.84
// console.log(heightData); 0.8

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

function Login({navigation}:LoginScreenProps) {
  const [showPW, setShowPW] = useState(false);
  const [onKeyboard, setOnKeyboard] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

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
        return;
      }
      if (!password) {
        return;
      }
      setLoading(true);
      Alert.alert(
        '로그인 기능 구현',
        `email : ${email} \n password : ${password}`,
      );
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [email, password]);

  const isFillFrom = !!email && !!password;
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView enableOnAndroid 
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        onKeyboardDidShow={() => setOnKeyboard(true)}
        onKeyboardDidHide={() => setOnKeyboard(false)}
        >
        <View style={[styles.title, {height: (height / 29) * 3}]}>
          <Text style={styles.titleText}>Log in</Text>
        </View>
        <View style={[styles.contentInput, {height: (height / 29) * 6}]}>
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
                keyboardType="email-address" // 키보드 타입 변경
                returnKeyType="next" // next key로 변환
                onSubmitEditing={() => passwordRef.current?.focus()} // Submit Key 클릭 시, 이벤트
                blurOnSubmit={false} // Submit Key클릭 시, Keyboard 유지
                value={email}
              />
              <View style={{flex:1,alignItems:'flex-end'}}>
                <IconSimpleAntDesign 
                  name='closecircleo'
                  size={heightScale * 20}
                  color="black"
                  style={email ? {} :{display:'none'}}
                  onPress={() => setEmail('')}
                  />
              </View>
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
                onSubmitEditing={loginBtn} // Submit Key 클릭 시, 이벤트
                blurOnSubmit={true} // Submit Key클릭 시, Keyboard 유지
                secureTextEntry={!showPW ? true : false}
                value={password}
              />
              <View style={{flex:1,alignItems:'flex-end'}}>
              <IconOcticons
                name={showPW ? 'eye' : 'eye-closed'}
                size={heightScale * 25}
                color="black"
                onPress={() => {
                  setShowPW(!showPW);
                }}
              />
              </View>
            </View>
          </View>
        </View>
      <View style={onKeyboard ? {display:'none'} : styles.findIDPW}>
        <Pressable onPressIn={() => Alert.alert("구현예정","아이디 찾기 미구현")} style={{flex:1}}>
        <Text style={{color:'black',textAlign: 'right'}}>아이디 찾기   |</Text>
        </Pressable>
        <Pressable onPress={() => Alert.alert("구현예정","비밀번호 찾기 미구현")} style={{flex:1}}>
        <Text style={{color:'#000000'}}>   비밀번호 찾기</Text>
        </Pressable>
      </View>
      </KeyboardAwareScrollView>
      <Pressable
        style={[styles.buttonStyle, styles.loginButton]}
        // onPress={() => navigation.navigate('Login')}
        onPress={() => Alert.alert('Todo',"로그인 성공시 : HomePage or 신청완료 페이지")}
        >
        <Text style={styles.textStyle}>로그인</Text>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  title: {
    justifyContent: 'center',
    // backgroundColor: 'orange',
  },
  contentInput: {
    // backgroundColor: 'orange',
  },
  headerStyle: {
    alignItems: 'center',
  },
  titleText: {
    fontSize: heightScale * 22,
    fontWeight: '500',
    paddingHorizontal: heightScale * 23,
    color:'black'
  },
  inputWrapper: {
    paddingHorizontal: heightScale * 29,
  },
  textInputWrapper: {
    marginTop: heightScale * 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'gray',
  },
  textInput: {
    fontSize: heightScale * 16,
    height:heightScale * 50,
    width: '85%',
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  findIDPW: {flexDirection: 'row', padding: heightScale*20},
  buttonStyle: {
    margin:heightScale*20,
    marginHorizontal: heightScale * 29,
    backgroundColor: '#D9D9D9',
    height: heightScale * 64,
    borderRadius: heightScale * 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    backgroundColor: '#D9D9D9',
  },
  textStyle: {
    color: 'black',
    fontSize: heightScale * 16,
    fontWeight: 'bold',
  }
});

export default Login;
