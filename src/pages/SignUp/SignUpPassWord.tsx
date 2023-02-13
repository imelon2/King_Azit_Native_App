import { Text,View,TextInput,SafeAreaView,KeyboardAvoidingView , StyleSheet} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useState, useRef } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { RootStackParamList } from '../../../AppInner';
import { SignUpstyles } from '../../modules/SignUpstyles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import IconOcticons from 'react-native-vector-icons/Octicons';
import {heightData} from '../../modules/globalStyles';
const heightScale = heightData;

type SignInScreenProps = NativeStackScreenProps< RootStackParamList , 'SignUpPassWord' >;

function SignUpPassWord({navigation}: SignInScreenProps) {
    const [showPW, setShowPW] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordCheck, setPasswordCheck] = useState('');
    const [error, setError] = useState(false);
    const [errorText , setErrorText] = useState('');
    const passwordRef = useRef<TextInput | null>(null);
  
    const onChangePassword = useCallback((text: any) => {
      setPassword(text.trim());
    }, []);
  
    const onChangePasswordCheck = useCallback((text: any) => {
      setPasswordCheck(text.trim());
    }, []);
  
    const onClickNextButton = () => {

      if (!password || !passwordCheck) {
        return;
      }

      var reg : RegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
      if( !reg.test(password) ) {
          setErrorText("문자 숫자 특수문자 포함 8자 이상으로 사용해주세요.");
          setError(true);
          return;
      }

      if (password !== passwordCheck) {
        setErrorText("비밀번호가 일치하지 않습니다.");
        setError(true);
        return;
      }
      // 리덕스 비밀번호 저장 
      // 비밀번호 특수문자 

      setError(false);
      navigation.navigate('SignUpNickName');
    };
  
    return (
      <SafeAreaView style={SignUpstyles.container}>
        <KeyboardAwareScrollView>
          <View >
            <Icon
              name="arrowleft"
              style={SignUpstyles.leftIcon}
              size={25}
              color="#000"
              onPress={() => navigation.navigate('SignUpLogin')}
            />
            <View style={SignUpstyles.topbar}>
              <View style={[SignUpstyles.progress, SignUpstyles.progress3]}></View>
            </View>
            <View style={SignUpstyles.terms}>
              <Text style={SignUpstyles.termstext}> 아지트에 사용할 </Text>
              <Text style={SignUpstyles.termstext2}> 비밀번호를 입력해주세요. </Text>
            </View>
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
  
            <View style={SignUpstyles.textInputWrapper}>
              <TextInput
                style={SignUpstyles.textInput}
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
                <Text style={SignUpstyles.errorText}>
                  {errorText}
                </Text>
              )}
            </View>
          </View>
        </KeyboardAwareScrollView>
  
        <View >
          <Text
            style={ password && passwordCheck ? [ SignUpstyles.nextButton,SignUpstyles.nextButton2 ]
                 : [SignUpstyles.nextButton] }
            onPress={onClickNextButton}>
            다음
          </Text>
        </View>
      </SafeAreaView>
    );
  }


export default SignUpPassWord;