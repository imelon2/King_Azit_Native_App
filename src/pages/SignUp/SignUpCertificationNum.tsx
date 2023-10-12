import {heightData} from '@/modules';
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

  const onPressNextButton = () => {
    const authKey = num + num1 + num2 + num3;
    const data = {to: user.phone, authKey};
    const status = Verify(data);
    console.log(status);
    // navigation.navigate('SignUpNickName')
  };

  const RequestVerifyapi = () => {
    const data = {to: user.phone, authKey: ''};
    RequestVerify(data);
  };

  useEffect(() => {
    RequestVerifyapi();
  });

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
          <Pressable onPress={RequestVerifyapi} style={{marginBottom: 15 * heightData}}>
            <Text style={SignUpstyles.numResend}>인증번호 다시 보내기</Text>
          </Pressable>
        </View>
        <View style={SignUpstyles.center}>
          <BottomButton onPress={onPressNextButton} title="다음" backgroundColor={'#F5FF82'} color="#000" />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
