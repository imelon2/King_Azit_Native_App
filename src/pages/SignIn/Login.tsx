import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Alert, Dimensions, Pressable, Text, TextInput, View, SafeAreaView} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';
import IconOcticons from 'react-native-vector-icons/Octicons';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import IconSimpleAntDesign from 'react-native-vector-icons/AntDesign';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {heightData} from '@/modules';
import {RootStackParamList} from 'AppInner';
const {width, height} = Dimensions.get('screen');
const heightScale = heightData;
import Config from 'react-native-config';
import axios, {AxiosError} from 'axios';
import {useAppDispatch} from '@/store';
import userSlice from '@/slices/user';
import decodeJWT from '@/modules/decodeJWT';
import {Header} from '@/components/Header';
import {BottomButton} from '@/components/Button';
import {SigninStyles} from './SigninStyles';

type LoginScreenProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

function Login({navigation}: LoginScreenProps) {
  const dispatch = useAppDispatch();

  const [showPW, setShowPW] = useState(false);
  const [checkLoginInfo, setCheckLoginInfo] = useState(true); // 가입정보가 맞으면 true, 가입정보가 틀리면 false
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const emailRef = useRef<TextInput | null>(null);
  const passwordRef = useRef<TextInput | null>(null);

  const onChangeEmail = useCallback((text: any) => {
    setEmail(text.trim());
  }, []);

  const onChangePassword = useCallback((text: any) => {
    setPassword(text.trim());
  }, []);

  const loginBtn = useCallback(async () => {
    try {
      if (!email) {
        return;
      }
      if (!password) {
        return;
      }
      setLoading(true);

      const loginResult = await axios.post(`${Config.API_URL}/login`, {
        memberId: email,
        password: password,
      });

      const {access_token, refresh_token} = loginResult.data;
      const {sub, roles, nickname, uuid} = decodeJWT(access_token);

      // 아직 승인되지 않은 유저
      const isPermitted = roles.find((e: string) => e == 'ROLE_PERMITTED');
      if (!isPermitted) {
        // return navigation.navigate('SignUpFinal');
      }
      dispatch(
        userSlice.actions.setUser({
          name: sub,
          roles: roles,
          nickName: nickname,
          access_token: access_token,
          uuid: uuid,
        }),
      );
      await EncryptedStorage.setItem('refreshToken', refresh_token);
    } catch (error) {
      if ((error as AxiosError).response?.status === 401) {
        // console.error((error as AxiosError).response?.status);
        setCheckLoginInfo(false);
      } else {
        Alert.alert('Error', '죄송합니다. 잠시후에 다시 시도해주세요.');
      }
    } finally {
      setLoading(false);
    }
  }, [email, password, loading]);

  const isFillFrom = !!email && !!password;
  return (
    <SafeAreaView style={SigninStyles.container}>
      <Header
        title=""
        leftIcon={() => (
          <IconSimpleAntDesign
            // style={{width: heightScale * 26, height: heightScale * 26}}
            name="arrowleft"
            size={heightScale * 26}
            color="#fff"
            onPress={() => navigation.goBack()}
          />
        )}
      />

      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}>
        <View style={[SigninStyles.title, {height: (height / 29) * 3}]}>
          <Text style={SigninStyles.titleText}>Log In</Text>
        </View>
        <View style={[SigninStyles.contentInput, {height: (height / 29) * 6}]}>
          <View style={SigninStyles.inputWrapper}>
            <View style={SigninStyles.textInputWrapper}>
              <IconOcticons name="person" size={heightScale * 25} color="#fff" />
              <TextInput
                style={SigninStyles.textInput}
                ref={emailRef}
                placeholder="아이디"
                placeholderTextColor={'#6F6F6F'}
                onChangeText={onChangeEmail}
                autoCapitalize='none'
                importantForAutofill="yes" // 자동완성 불러오기
                autoComplete="email" // 자동완성 허용
                keyboardType="email-address" // 키보드 타입 변경
                returnKeyType="next" // next key로 변환
                onSubmitEditing={() => passwordRef.current?.focus()} // Submit Key 클릭 시, 이벤트
                blurOnSubmit={false} // Submit Key클릭 시, Keyboard 유지
                value={email}
              />
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <IconSimpleAntDesign
                  name="closecircleo"
                  size={heightScale * 20}
                  color="#fff"
                  style={email ? {} : {display: 'none'}}
                  onPress={() => setEmail('')}
                  suppressHighlighting={true}
                />
              </View>
            </View>
            <View style={SigninStyles.textInputWrapper}>
              <IconSimpleLineIcons name="lock" size={heightScale * 25} color="#fff" />
              <TextInput
                style={SigninStyles.textInput}
                ref={passwordRef}
                placeholder="비밀번호"
                placeholderTextColor={'#6F6F6F'}
                onChangeText={onChangePassword}
                onSubmitEditing={loginBtn} // Submit Key 클릭 시, 이벤트
                blurOnSubmit={false}
                secureTextEntry={!showPW ? true : false}
                value={password}
              />
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <IconOcticons
                  name={showPW ? 'eye' : 'eye-closed'}
                  size={heightScale * 20}
                  color="#fff"
                  onPress={() => {
                    setShowPW(!showPW);
                  }}
                  suppressHighlighting={true}
                />
              </View>
            </View>
            <View>
              <Text
                style={
                  checkLoginInfo
                    ? {display: 'none'}
                    : {fontSize: heightScale * 14, padding: heightScale * 5, color: 'red'}
                }>
                아이디 또는 비밀번호를 다시 확인해주세요.
              </Text>
            </View>
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <BottomButton
            onPress={loginBtn}
            title="로그인"
            backgroundColor={isFillFrom ? '#F5FF82' : '#808080'}
            color="#000"
          />
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <View style={SigninStyles.findIDPW}>
            <Pressable
              onPressIn={() => Alert.alert('구현예정', '아이디 찾기 미구현')}
              style={{flex: 1, flexDirection: 'row'}}>
              <Text style={SigninStyles.subfont}>아이디 찾기</Text>
              <Text style={[SigninStyles.subfont, {paddingLeft: 10 * heightScale}]}> |</Text>
            </Pressable>
            <Pressable
              onPress={() => Alert.alert('구현예정', '비밀번호 찾기 미구현')}
              style={{flex: 1, flexDirection: 'row'}}>
              <Text style={SigninStyles.subfont}> 비밀번호 찾기</Text>
              <Text style={[SigninStyles.subfont, {paddingLeft: 10 * heightScale}]}> |</Text>
            </Pressable>
            <Pressable onPress={() => Alert.alert('구현예정', '비밀번호 찾기 미구현')} style={{flex: 1}}>
              <Text style={SigninStyles.subfont}> 회원가입</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default Login;
