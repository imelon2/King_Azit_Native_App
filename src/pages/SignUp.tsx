import {
  Text,
  View,
  Button,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  DeviceEventEmitter,
  SafeAreaView,
} from 'react-native';
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import {useCallback, useRef, useState} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {RootStackParamList} from '../../AppInner';
import {widthData, heightData} from '../modules/globalStyles';
const {width, height} = Dimensions.get('window');
const heightScale = heightData;
// import SignIn from '../pages/SignIn/SignIn'
// import DismissKeyboardView from '../components/DismissKeyboardView';
import IconOcticons from 'react-native-vector-icons/Octicons';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SignUpFinal from "./SignUpFinal";

const Stack = createNativeStackNavigator<RootStackParamList>();
type SignInScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SignUpHome'
>;
type SignInScreenProps2 = NativeStackScreenProps<
  RootStackParamList,
  'SignUpLogin'
>;
type SignInScreenProps3 = NativeStackScreenProps<
  RootStackParamList,
  'SignUpPassWord'
>;
type SignInScreenProps4 = NativeStackScreenProps<
  RootStackParamList,
  'SignUpNickName'
>;
type SignInScreenProps5 = NativeStackScreenProps<
  RootStackParamList,
  'SignUpCertification'
>;

function SignUpCertification({navigation}: SignInScreenProps5) {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [certNum, setCertNum] = useState('');
  const [certCheck, setCertCheck] = useState(false);

  const [keyboardOn, setKeyboardOn] = useState(false);

  const onClickSiginUp = () => {
    navigation.navigate('SignUpNickName');
  };

  const onClickCert = () => {
    setCertCheck(true);
  }

  const onChangeName = useCallback((text: any) => {
    setName(text.trim());
  }, []);

  const onChangeBirthDate = useCallback((text: any) => {
    setBirthDate(text.trim());
  }, []);

  const onChangePhoneNum = useCallback((text: any) => {
    setPhoneNum(text.trim());
  }, []);

  const onChangeCertNum = useCallback((text: any) => {
    setCertNum(text.trim());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        onKeyboardDidShow={() => setKeyboardOn(true)}
        onKeyboardDidHide={() => setKeyboardOn(false)}>
        <View>
          <Icon
            name="arrowleft"
            style={styles.leftIcon}
            size={25}
            color="#000"
            onPress={() => navigation.navigate('SignUpNickName')}
          />
          <View style={styles.topbar}>
            <View style={[styles.progress, styles.progress5]}></View>
          </View>
          <View style={styles.terms}>
            <Text style={styles.termstext}> 본인확인을 위해 </Text>
            <Text style={styles.termstext2}> 인증을 진행해주세요. </Text>
          </View>
        </View>

        <View style={styles.inputWrapper}>
          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.textInput}
              // ref={passwordRef}
              placeholder="이름 입력"
              onChangeText={onChangeName}
              // onSubmitEditing = {loginBtn} // Submit Key 클릭 시, 이벤트
              // blurOnSubmit={false} // Submit Key클릭 시, Keyboard 유지
              value={birthDate}
            />
          </View>

          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.textInput}
              // ref={passwordRef}
              placeholder="생년월일"
              onChangeText={onChangeBirthDate}
              // onSubmitEditing = {loginBtn} // Submit Key 클릭 시, 이벤트
              // blurOnSubmit={false} // Submit Key클릭 시, Keyboard 유지
              value={name}
            />
          </View>

          <View style={styles.textInputContainer} >
            <View style={[styles.textInputWrapper, styles.textInputWrapper2]}>
              <TextInput
                style={styles.textInput}
                // ref={passwordRef}
                placeholder="휴대폰번호 입력"
                onChangeText={onChangePhoneNum}
                // onSubmitEditing = {loginBtn} // Submit Key 클릭 시, 이벤트
                // blurOnSubmit={false} // Submit Key클릭 시, Keyboard 유지
                value={phoneNum}
              />
            </View>
            <TouchableOpacity style={styles.textInputButton} onPress={onClickCert} >
              <Text style={styles.textInputButtonText} >인증 요청</Text>
            </TouchableOpacity>
          </View>

        {certCheck && (
          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.textInput}
              // ref={passwordRef}
              placeholder="인정번호를 적어주세요."
              onChangeText={onChangeCertNum}
              // onSubmitEditing = {loginBtn} // Submit Key 클릭 시, 이벤트
              // blurOnSubmit={false} // Submit Key클릭 시, Keyboard 유지
              value={certNum}
            />
          </View>
        )}

        </View>
      </KeyboardAwareScrollView>

      <View>
        <Text
          style={
            certNum
              ? [
                  styles.nextButton,
                  styles.nextButton2,
                  keyboardOn && styles.nextButton3,
                ]
              : [styles.nextButton, keyboardOn && styles.nextButton3]
          }
          onPress={onClickSiginUp}>
          가입신청
        </Text>
      </View>


    </SafeAreaView>
  );
}

function SignUpNickName({navigation}: SignInScreenProps4) {
  // const [showPW, setShowPW] = useState(false);
  const [keyboardOn, setKeyboardOn] = useState(false);
  const [nickName, setNickName] = useState('');
  const [error, setError] = useState(false);

  const onChangeNickName = useCallback((text: any) => {
    setNickName(text.trim());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        onKeyboardDidShow={() => setKeyboardOn(true)}
        onKeyboardDidHide={() => setKeyboardOn(false)}>
        <View>
          <Icon
            name="arrowleft"
            style={styles.leftIcon}
            size={25}
            color="#000"
            onPress={() => navigation.navigate('SignUpPassWord')}
          />
          <View style={styles.topbar}>
            <View style={[styles.progress, styles.progress4]}></View>
          </View>
          <View style={styles.terms}>
            <Text style={styles.termstext}> 아지트에 사용할 </Text>
            <Text style={styles.termstext2}> 닉네임을 정해주세요. </Text>
          </View>

          <View style={styles.inputWrapper}>
            <View style={styles.textInputWrapper}>
              <TextInput
                style={styles.textInput}
                placeholder="닉네임 입력"
                onChangeText={onChangeNickName}
                value={nickName}
              />
            </View>
            <View>
              {error && (
                <Text style={styles.errorText}>
                  비밀번호가 일치하지 않습니다.
                </Text>
              )}
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>

      <View>
        <Text
          style={
            nickName
              ? [
                  styles.nextButton,
                  styles.nextButton2,
                  keyboardOn && styles.nextButton3,
                ]
              : [styles.nextButton, keyboardOn && styles.nextButton3]
          }
          onPress={() =>
            nickName && navigation.navigate('SignUpCertification')
          }>
          다음
        </Text>
      </View>
    </SafeAreaView>
  );
}

function SignUpPassWord({navigation}: SignInScreenProps3) {
  const [showPW, setShowPW] = useState(false);
  const [keyboardOn, setKeyboardOn] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [error, setError] = useState(false);
  const passwordRef = useRef<TextInput | null>(null);

  const onChangePassword = useCallback((text: any) => {
    setPassword(text.trim());
  }, []);

  const onChangePasswordCheck = useCallback((text: any) => {
    setPasswordCheck(text.trim());
  }, []);

  const onClickNextButton = () => {
    if (!password || !passwordCheck) {
      setError(true);
      return;
    }
    if (password !== passwordCheck) {
      setError(true);
      return;
    }
    navigation.navigate('SignUpNickName');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        onKeyboardDidShow={() => setKeyboardOn(true)}
        onKeyboardDidHide={() => setKeyboardOn(false)}
        keyboardShouldPersistTaps={'handled'}>
        <View>
          <Icon
            name="arrowleft"
            style={styles.leftIcon}
            size={25}
            color="#000"
            onPress={() => navigation.navigate('SignUpLogin')}
          />
          <View style={styles.topbar}>
            <View style={[styles.progress, styles.progress3]}></View>
          </View>
          <View style={styles.terms}>
            <Text style={styles.termstext}> 아지트에 사용할 </Text>
            <Text style={styles.termstext2}> 비밀번호를 입력해주세요. </Text>
          </View>
        </View>

        <View style={styles.inputWrapper}>
          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="비밀번호 입력"
              onChangeText={onChangePassword}
              secureTextEntry={!showPW ? true : false}
              value={password}
              returnKeyType="next" // next key로 변환
              onSubmitEditing = {() => passwordRef.current?.focus()} // Submit Key 클릭 시, 이벤트
              blurOnSubmit ={false} // Submit Key클릭 시, Keyboard 유지
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

          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="비밀번호 확인"
              onChangeText={onChangePasswordCheck}
              secureTextEntry={!showPW ? true : false}
              value={passwordCheck}
              ref={passwordRef}
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
          <View>
            {error && (
              <Text style={styles.errorText}>
                비밀번호가 일치하지 않습니다.
              </Text>
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>

      <View>
        <Text
          style={
            password && passwordCheck
              ? [
                  styles.nextButton,
                  styles.nextButton2,
                  keyboardOn && styles.nextButton3,
                ]
              : [styles.nextButton, keyboardOn && styles.nextButton3]
          }
          onPress={onClickNextButton}>
          다음
        </Text>
      </View>
    </SafeAreaView>
  );
}

function SignUpLogin({navigation}: SignInScreenProps2) {
  const [email, setEmail] = useState('');
  const [keyboardOn, setKeyboardOn] = useState(false);
  const [error, setError] = useState(false);
  const onChangeEmail = useCallback((text: any) => {
    setEmail(text.trim());
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAwareScrollView
        onKeyboardDidShow={() => setKeyboardOn(true)}
        onKeyboardDidHide={() => setKeyboardOn(false)}>
        <View>
          <Icon
            name="arrowleft"
            style={styles.leftIcon}
            size={25}
            color="#000"
            onPress={() => navigation.navigate('SignUpHome')}
          />
          <View style={styles.topbar}>
            <View style={[styles.progress, styles.progress2]}></View>
          </View>
          <View style={styles.terms}>
            <Text style={styles.termstext}> 로그인에 사용할 </Text>
            <Text style={styles.termstext2}> 아이디를 입력해주세요. </Text>
          </View>
        </View>

        <View style={styles.inputWrapper}>
          <View style={styles.textInputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="아이디 (이메일) 입력"
              onChangeText={onChangeEmail}
              importantForAutofill="yes" // 자동완성 불러오기
              autoComplete="email" // 자동완성 허용
              keyboardType="email-address" // 키보드 타입 변경
              // returnKeyType="next" // next key로 변환
              blurOnSubmit={false} // Submit Key클릭 시, Keyboard 유지
              value={email}
            />
          </View>
          <View>
            {error && (
              <Text style={styles.errorText}>
                사용하실 수 없는 닉네임 입니다.
              </Text>
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>

      <View>
        <Text
          style={
            email
              ? [
                  styles.nextButton,
                  styles.nextButton2,
                  keyboardOn && styles.nextButton3,
                ]
              : [styles.nextButton, keyboardOn && styles.nextButton3]
          }
          onPress={() => email && navigation.navigate('SignUpPassWord')}>
          다음
        </Text>
      </View>
    </SafeAreaView>
  );
}

function SignUpHome({navigation}: SignInScreenProps) {
  const [checkAll, setcheckAll] = useState(false);
  const [checkPrivacy, setCheckPrivacy] = useState(false);
  const [checkTerms, setcheckTerms] = useState(false);

  const onClickCheckAll = () => {
    setcheckAll(!checkAll);
    setCheckPrivacy(!checkAll);
    setcheckTerms(!checkAll);
    console.log(checkAll);
  };

  const onClickPrivacy = () => {
    setCheckPrivacy(!checkPrivacy);
  };

  const onClickTerms = () => {
    setcheckTerms(!checkTerms);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Icon
          name="arrowleft"
          style={styles.leftIcon}
          size={25}
          color="#000"
          onPress={() => navigation.navigate('SignIn')}
        />
        <View style={styles.topbar}>
          <View style={styles.progress}></View>
        </View>
        <Text style={styles.terms}>서비스 이용약관에 동의해주세요.</Text>
      </View>

      <View>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.termsBox}
          onPress={onClickCheckAll}>
          <Icon
            style={styles.checkBox}
            name="checksquareo"
            size={22}
            color={checkAll ? '#000' : '#848484'}
          />
          <Text style={styles.agreeText}>모두 동의</Text>
        </TouchableOpacity>
        <Text style={styles.bottomBar}></Text>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.termsBox}
          onPress={onClickPrivacy}>
          <Icon
            style={styles.check}
            name="check"
            size={15}
            color={checkPrivacy ? '#000' : '#848484'}
          />
          <Text style={{color: '#000'}}>[필수] 개인정보 </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={1}
          style={styles.termsBox}
          onPress={onClickTerms}>
          <Icon
            style={styles.check}
            name="check"
            size={15}
            color={checkTerms ? '#000' : '#848484'}
          />
          <Text style={{color: '#000'}}>이용약관 </Text>
        </TouchableOpacity>
      </View>

      <View style={{flex: 3}}>
        <Text
          style={
            checkPrivacy && checkTerms
              ? [styles.nextButton, styles.nextButton2]
              : styles.nextButton
          }
          onPress={() =>
            checkPrivacy && checkTerms && navigation.navigate('SignUpLogin')
          }>
          다음
        </Text>
      </View>
    </SafeAreaView>
  );
}

function SignUp() {
  return (
    <Stack.Navigator screenOptions={{animation: 'slide_from_right'}}>
      <Stack.Screen
        name="SignUpHome"
        component={SignUpHome}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpLogin"
        component={SignUpLogin}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpPassWord"
        component={SignUpPassWord}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpNickName"
        component={SignUpNickName}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpCertification"
        component={SignUpCertification}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // height : height-(heightScale*20),
  },
  leftIcon: {
    marginTop: 15,
    marginLeft: 15,
    marginBottom: 15,
  },
  topbar: {
    borderBottomWidth: 2,
    borderBottomColor: '#D9D9D9',
  },
  progress: {
    position: 'absolute',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    width: 110,
    top: 0,
    left: 0,
  },
  progress2: {
    width: 150,
  },
  progress3: {
    width: 190,
  },
  progress4: {
    width: 230,
  },
  progress5: {
    width: 270,
  },
  termsBox: {
    flexDirection: 'row',
    marginTop: 17,
    height: 30,
    lineHeight: 30,
  },
  bottomBar: {
    width: '92%',
    borderBottomWidth: 2,
    borderBottomColor: '#D9D9D9',
    marginLeft: '4%',
    height: 0,
  },
  terms: {
    fontSize: heightScale * 26,
    marginLeft: 20,
    marginTop: 20,
    color: '#000',
    marginBottom: heightScale * 100,
  },
  termstext: {
    fontSize: heightScale * 26,
    color: '#000',
  },
  termstext2: {
    fontSize: heightScale * 26,
    color: '#000',
    marginTop: 7,
  },
  checkBox: {
    marginLeft: 20,
  },
  agreeText: {
    marginTop: 2,
    marginLeft: 12,
    color: '#000',
  },
  check: {
    marginRight: 15,
    marginLeft: 25,
  },
  nextButton: {
    position: 'absolute',
    bottom: 35,
    width: '92%',
    textAlign: 'center',
    color: '#000',
    backgroundColor: '#D9D9D9',
    height: heightScale * 75,
    lineHeight: heightScale * 75,
    borderRadius: 16,
    marginLeft: '4%',
    fontSize: 20,
  },
  nextButton2: {
    backgroundColor: '#29a6fb',
    color: 'white',
  },
  nextButton3: {
    bottom: -135,
  },
  textInput: {
    fontSize: heightScale * 18,
    width: '85%',
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  textInputContainer: {
    flexDirection: 'row',
  },
  textInputWrapper: {
    marginTop: heightScale * 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'gray',
  },
  textInputWrapper2: {
    flex: 3,
  },
  textInputButton: {
    flex:1,
    height: heightScale * 50,
    lineHeight:heightScale * 50,
    backgroundColor: '#7C7C7C',
    borderRadius:6,
    marginTop: 10,
  },
  textInputButtonText: {
    color:'#fff',
    textAlign:'center',
    lineHeight:heightScale * 50,
  },
  errorText: {
    color: 'red',
    marginLeft: 9,
    marginTop: 4,
  },
  inputWrapper: {
    // paddingTop: heightScale * 0,
    paddingHorizontal: heightScale * 29,
    paddingBottom: heightScale * 57,
  },
});

export default SignUp;
