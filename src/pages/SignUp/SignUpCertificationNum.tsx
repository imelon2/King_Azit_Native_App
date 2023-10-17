import {heightData, widthData} from '@/modules';
import {SignUpstyles} from './SignUpstyles';
import {useCallback, useEffect, useRef, useState} from 'react';
import {View, TextInput, SafeAreaView, StyleSheet, Alert} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SignUpHeader} from './SignUpComponent';
import {BottomButton} from '@/components/Button';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'AppInner';
import {Text} from 'react-native';
import {Pressable} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/reducer';
import {RequestVerify, Verify} from '@/api/SignUp/SignUpApi';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUpCertificationNum'>;

export const SignUpCertificationNum = ({navigation}: SignInScreenProps) => {
  const user = useSelector((state: RootState) => state.user);
  const [num, setNum] = useState('');
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [num3, setNum3] = useState('');
  const [error, setError] = useState(false);
  const [minute, setMinute] = useState<Number>(3);
  const [seconds, setSeconds] = useState<Number>(0);
  const time = useRef(180);
  const timeId = useRef(0);

  const onChangeNum = useCallback((text: any) => {
    setNum(text.trim());
    if (text.length !== 0) refNum1.current?.focus();
  }, []);

  const onChangeNum1 = useCallback((text: any) => {
    setNum1(text.trim());
    if (text.length !== 0) refNum2.current?.focus();
  }, []);

  const onChangeNum2 = useCallback((text: any) => {
    setNum2(text.trim());
    if (text.length !== 0) refNum3.current?.focus();
  }, []);

  const onChangeNum3 = useCallback((text: any) => {
    setNum3(text.trim());
  }, []);

  const refNum1 = useRef<TextInput | null>(null);
  const refNum2 = useRef<TextInput | null>(null);
  const refNum3 = useRef<TextInput | null>(null);

  const onPressNextButton = async () => {
    const authKey = num + num1 + num2 + num3;
    const data = {to: user.phone, authKey};
    const status: any = await Verify(data);
    if (status === '200') {
      navigation.navigate('SignUpNickName');
    } else {
      setError(true);
    }
  };

  const RequestVerifyapi = () => {
    const data = {to: user.phone, authKey: ''};
    RequestVerify(data);
  };

  const timeCheck = () => {
    timeId.current = setInterval(() => {
      setMinute(Math.floor(time.current / 60));
      setSeconds(time.current % 60);
      time.current -= 1;
    }, 1000);
    // return () => clearInterval(timeId.current);
  };

  const ResetTime = () => {
    time.current = 180;
    clearInterval(timeId.current);
    setMinute(3);
    setSeconds(0);
    timeCheck();
    RequestVerifyapi();
  };

  useEffect(() => {
    RequestVerifyapi();
  }, []);

  useEffect(() => {
    timeCheck();
  }, []);

  useEffect(() => {
    if (time.current <= -1) {
      clearInterval(timeId.current);
    }
  }, [seconds]);

  return (
    <SafeAreaView style={SignUpstyles.container}>
      <KeyboardAwareScrollView>
        <View>
          <SignUpHeader text={'본인확인을 위해 \n인증을 진행해주세요.'} bar={288} />
        </View>

        <View style={SignUpstyles.inputWrapper}>
          <View style={SignUpstyles.numInputWrapper}>
            <View style={SignUpstyles.textInputNumBox}>
              <TextInput
                style={SignUpstyles.textInputNum}
                maxLength={1}
                value={num}
                onChangeText={onChangeNum}
                inputMode="numeric"
              />
            </View>
            <View style={SignUpstyles.textInputNumBox}>
              <TextInput
                style={SignUpstyles.textInputNum}
                maxLength={1}
                ref={refNum1}
                value={num1}
                onChangeText={onChangeNum1}
                inputMode="numeric"
              />
            </View>
            <View style={SignUpstyles.textInputNumBox}>
              <TextInput
                style={SignUpstyles.textInputNum}
                maxLength={1}
                ref={refNum2}
                value={num2}
                onChangeText={onChangeNum2}
                inputMode="numeric"
              />
            </View>
            <View style={SignUpstyles.textInputNumBox}>
              <TextInput
                style={SignUpstyles.textInputNum}
                maxLength={1}
                ref={refNum3}
                value={num3}
                onChangeText={onChangeNum3}
                inputMode="numeric"
              />
            </View>
          </View>

          <View style={{marginTop: 10 * heightData}}>
            {error && <Text style={SignUpstyles.errorText}>인증번호가 일치하지 않습니다. 다시 시도해주세요.</Text>}
          </View>

          <View style={{flex: 1, flexDirection: 'row', marginTop: 8 * heightData}}>
            <View style={{flex: 2, marginLeft: 10 * widthData}}>
              <Text style={{color: '#F5FF82', fontSize: 12}}>
                유효시간 {String(minute).padStart(2, '0')} : {String(seconds).padStart(2, '0')}
              </Text>
            </View>
            <Pressable onPress={ResetTime} style={{flex: 1, alignContent: 'flex-end'}}>
              <Text style={SignUpstyles.numResend}>인증번호 다시 보내기</Text>
            </Pressable>
          </View>
        </View>
        <View style={SignUpstyles.center}>
          <BottomButton onPress={onPressNextButton} title="다음" backgroundColor={'#F5FF82'} color="#000" />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
