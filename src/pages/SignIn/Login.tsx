import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useRef, useState} from 'react';
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
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import IconOcticons from 'react-native-vector-icons/Octicons';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import IconSimpleAntDesign from 'react-native-vector-icons/AntDesign';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {widthData, heightData} from '../../modules/globalStyles';
import { RootStackParamList } from '../../../AppInner';
import {Shadow} from 'react-native-shadow-2';
const {width, height} = Dimensions.get('screen');
const heightScale = heightData;

import Config from 'react-native-config';
import axios, { AxiosError } from 'axios';
import { useAppDispatch } from '../../store';
import userSlice from '../../slices/user';
import decodeJWT from '../../modules/decodeJWT';


type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

function Login({navigation}:LoginScreenProps) {
  const dispatch = useAppDispatch();
  
  const [showPW, setShowPW] = useState(false);
  const [checkLoginInfo,setCheckLoginInfo] = useState(true) // 가입정보가 맞으면 true, 가입정보가 틀리면 false
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  useEffect(() => {
  },[])
  const onChangeEmail = useCallback((text: any) => {
    setEmail(text.trim());
  }, []);

  const onChangePassword = useCallback((text: any) => {
    setPassword(text.trim());
  }, []);

  const loginBtn = useCallback(async() => {
    try {
      if (!email) {
        return;
      }
      if (!password) {
        return;
      }
      setLoading(true);
      const loginResult = await axios.post(`${Config.API_URL}/login`,{
        "memberId":email,
        "password":password
      })

      const {access_token,refresh_token} = loginResult.data;
      
      const {sub,roles,nickname} = decodeJWT(access_token);
      
      // 아직 승인되지 않은 유저
      const isPermitted = roles.find((e:string) => e == 'ROLE_PERMITTED')
      if(!isPermitted) {
        return navigation.navigate('SignUpFinal');
      }

      dispatch(
        userSlice.actions.setUser({
          name: sub,
          roles:roles,
          nickName:nickname,
          access_token: access_token,
        }),
      );
      await EncryptedStorage.setItem(
        'refreshToken',
        refresh_token
      );
    } catch (error) {
      if((error as AxiosError).response?.status === 401) {
        // console.error((error as AxiosError).response?.status);
        setCheckLoginInfo(false)
      } else {
        Alert.alert("Error","죄송합니다. 잠시후에 다시 시도해주세요.")
      }
    } finally {
      setLoading(false);
    }
  }, [email, password,loading]);

  const isFillFrom = !!email && !!password;
  return (
    <SafeAreaView style={styles.container}>
      <View style={[styles.headerStyle,{height:60}]}>
        <IconSimpleAntDesign style={{width:heightScale * 32,height:heightScale * 32}} name="arrowleft"  size={heightScale * 32} color="#fff" onPress={() => navigation.goBack()} />
      </View>
      <KeyboardAwareScrollView enableOnAndroid 
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        >
        <View style={[styles.title, {height: (height / 29) * 3}]}>
          <Text style={styles.titleText}>Log In</Text>
        </View>
        <View style={[styles.contentInput, {height: (height / 29) * 6}]}>
          <View style={styles.inputWrapper}>
            <View style={styles.textInputWrapper}>
              <IconOcticons
                name="person"
                size={heightScale * 25}
                color="#fff"
              />
              <TextInput
                style={styles.textInput}
                ref={emailRef}
                placeholder="아이디 (이메일)"
                placeholderTextColor={'#6F6F6F'}
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
                  color="#fff"
                  style={email ? {} :{display:'none'}}
                  onPress={() => setEmail('')}
                  suppressHighlighting={true}
                  />
              </View>
            </View>
            <View style={styles.textInputWrapper}>
              <IconSimpleLineIcons
                name="lock"
                size={heightScale * 25}
                color="#fff"
              />
              <TextInput
                style={styles.textInput}
                ref={passwordRef}
                placeholder="비밀번호"
                placeholderTextColor={'#6F6F6F'}
                onChangeText={onChangePassword} 
                onSubmitEditing={loginBtn} // Submit Key 클릭 시, 이벤트
                blurOnSubmit={false}
                secureTextEntry={!showPW ? true : false}
                value={password}
              />
              <View style={{flex:1,alignItems:'flex-end'}}>
              <IconOcticons
                name={showPW ? 'eye' : 'eye-closed'}
                size={heightScale * 25}
                color="#fff"
                onPress={() => {
                  setShowPW(!showPW);
                }}
                suppressHighlighting={true}
              />
              </View>
            </View>
            <View><Text style={checkLoginInfo ?{display:'none'} : {fontSize:heightScale * 14,padding:heightScale*5,color:'red'}}>아이디 또는 비밀번호를 다시 확인해주세요.</Text></View>
          </View>
        </View>
          <View style={{alignItems: 'center'}}>
        <Shadow distance={isFillFrom ? 8 : 0} startColor={'#FCFF72'}>
      <Pressable
        style={isFillFrom ? [styles.loginButton,styles.onLiginButton] : styles.loginButton}
        onPress={loginBtn}
        disabled={!isFillFrom || loading}
        >
        {loading ? (<ActivityIndicator />) : (<Text style={isFillFrom ? [styles.textStyle,styles.onTextStyle] : styles.textStyle} >로그인</Text>)}
      </Pressable>
      </Shadow>
      </View>
      <View style={styles.findIDPW}>
        <Pressable onPressIn={() => Alert.alert("구현예정","아이디 찾기 미구현")} style={{flex:1}}>
        <Text style={{color:'#fff',textAlign: 'right'}}>아이디 찾기   |</Text>
        </Pressable>
        <Pressable onPress={() => Alert.alert("구현예정","비밀번호 찾기 미구현")} style={{flex:1}}>
        <Text style={{color:'#fff'}}>   비밀번호 찾기</Text> 
        </Pressable>
      </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    // backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    justifyContent: 'center',
  },
  contentInput: {
  },
  headerStyle: {
    // backgroundColor:'orange',
    justifyContent:'center',
    paddingHorizontal:15,
    borderBottomWidth:2,
    borderBottomColor:'#484848'
  },
  titleText: {
    fontSize: heightScale * 26,
    fontWeight:'400',
    paddingLeft: heightScale * 20,
    color:'#B9B9B9'
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
    color:'#fff'
  },
  findIDPW: {flexDirection: 'row', padding: heightScale*20,marginTop:heightScale*15},
  loginButton: {
    backgroundColor: '#D9D9D9',
    height: heightScale * 64,
    width: heightScale * 380,
    borderRadius: heightScale * 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  onLiginButton: {
    backgroundColor:'#F5FF82'
  },
  textStyle: {
    color: 'black',
    fontSize: heightScale * 18,
    fontWeight: 'bold',
  },
  onTextStyle: {
    color: '#000',
    fontSize: heightScale * 18
  }
});

export default Login;
