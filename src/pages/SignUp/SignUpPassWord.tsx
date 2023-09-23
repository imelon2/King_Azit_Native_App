import {Text, View, TextInput, SafeAreaView, KeyboardAvoidingView, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useState, useRef, useEffect} from 'react';
import {RootStackParamList} from 'AppInner';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import IconOcticons from 'react-native-vector-icons/Octicons';
import {heightData, SignUpstyles} from '@/modules';
import userSlice from '@/slices/user';
import {useAppDispatch} from '@/store';
import {SignUpHeader} from './SignUpComponent';
import {BottomButton} from '@/components/Button';

const heightScale = heightData;

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUpPassWord'>;

export function SignUpPassWord({navigation}: SignInScreenProps) {
  const dispatch = useAppDispatch();
  const [showPW, setShowPW] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passWordOn, setPassWordOn] = useState(false);
  const [passWordCheckOn, setPassWordCheckOn] = useState(false);
  const [error, setError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const passwordRef = useRef<TextInput | null>(null);

  /* 패스워드 저장 */
  const onChangePassword = (text: string) => {
    const password_ = text.trim();
    setPassword(password_);
    validityPassWord(password_);
  };

  /* 패스워드 유효성 체크 */
  const validityPassWord = (password_: string) => {
    const reg: RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (reg.test(password_) && password_.length >= 8 && password_.length <= 16) setPassWordOn(true);
    else setPassWordOn(false);
  };

  /* 비밀번호 확인 저장  */
  const onChangePasswordCheck = (text: string) => {
    const passwordCheck_ = text.trim();
    setPasswordCheck(passwordCheck_);
  };

  /* 다음페이지 버튼 */
  const onClickNextButton = () => {
    if (!password || !passwordCheck) {
      return;
    }

    var reg: RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!reg.test(password)) {
      setErrorText('문자 숫자 특수문자 포함 8자 이상으로 사용해주세요.');
      setError(true);
      return;
    }

    if (password !== passwordCheck) {
      setErrorText('비밀번호가 일치하지 않습니다. 다시 시도해주세요.');
      setError(true);
      return;
    }

    dispatch(userSlice.actions.setPassWord({password: password}));
    setError(false);
    navigation.navigate('SignUpCertification');
  };

  useEffect(() => {
    if (password === passwordCheck && passWordOn) setPassWordCheckOn(true);
    else setPassWordCheckOn(false);
  }, [password, passwordCheck]);

  return (
    <SafeAreaView style={SignUpstyles.container}>
      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}>
        <View>
          <SignUpHeader text={'로그인에 사용할 \n비밀번호를 입력해주세요. \n (영문+숫자 조합 8~16자 이내)'} bar={216} />
        </View>

        <View style={SignUpstyles.inputWrapper}>
          <View style={SignUpstyles.textInputWrapper}>
            <TextInput
              style={SignUpstyles.textInput}
              placeholder="비밀번호 입력"
              onChangeText={onChangePassword}
              secureTextEntry={!showPW ? true : false}
              value={password}
              returnKeyType="next" // next key로 변환
              onSubmitEditing={() => passwordRef.current?.focus()} // Submit Key 클릭 시, 이벤트
              blurOnSubmit={false} // Submit Key클릭 시, Keyboard 유지
              placeholderTextColor="#6F6F6F"
            />
            <IconOcticons
              name={showPW ? 'eye' : 'eye-closed'}
              size={heightScale * 20}
              color="#BCBCBC"
              onPress={() => {
                setShowPW(!showPW);
              }}
            />
            <IconOcticons
              name="check"
              size={heightScale * 18}
              color={passWordOn ? '#F5FF82' : '#BCBCBC'}
              style={SignUpstyles.marginLeft}
            />
          </View>

          <View style={SignUpstyles.textInputWrapper}>
            <TextInput
              style={SignUpstyles.textInput}
              placeholder="비밀번호 확인"
              onChangeText={onChangePasswordCheck}
              secureTextEntry={!showPW ? true : false}
              value={passwordCheck}
              ref={passwordRef}
              placeholderTextColor="#6F6F6F"
            />
            <IconOcticons
              name={showPW ? 'eye' : 'eye-closed'}
              size={heightScale * 20}
              color="#BCBCBC"
              onPress={() => {
                setShowPW(!showPW);
              }}
            />
            <IconOcticons
              name="check"
              size={heightScale * 18}
              color={passWordCheckOn ? '#F5FF82' : '#BCBCBC'}
              style={SignUpstyles.marginLeft}
            />
          </View>
          <View>{error && <Text style={SignUpstyles.errorText}>{errorText}</Text>}</View>
        </View>
        <View style={SignUpstyles.center}>
          <BottomButton
            onPress={onClickNextButton}
            title="다음"
            backgroundColor={password && passwordCheck ? '#F5FF82' : '#808080'}
            color="#000"
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default SignUpPassWord;
