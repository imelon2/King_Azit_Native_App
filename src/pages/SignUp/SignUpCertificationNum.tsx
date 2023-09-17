import {SignUpstyles} from '@/modules';
import {useCallback, useRef, useState} from 'react';
import {View, TextInput, SafeAreaView, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SignUpHeader} from './SignUpComponent';
import {BottomButton} from '@/components/Button';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from 'AppInner';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUpCertificationNum'>;

export const SignUpCertificationNum = ({navigation}: SignInScreenProps) => {
  const [num, setNum] = useState();
  const [num1, setNum1] = useState();
  const [num2, setNum2] = useState();
  const [num3, setNum3] = useState();

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

  return (
    <SafeAreaView style={SignUpstyles.container}>
      <KeyboardAwareScrollView>
        <View>
          <SignUpHeader text={'본인확인을 위해 \n 인증을 진행해주세요.'} bar={288} />
        </View>

        <View style={SignUpstyles.inputWrapper}>
          <View style={SignUpstyles.numInputWrapper}>
            <View style={SignUpstyles.textInputNumBox}>
              <TextInput style={SignUpstyles.textInputNum} maxLength={1} value={num} onChangeText={onChangeNum} />
            </View>
            <View style={SignUpstyles.textInputNumBox}>
              <TextInput
                style={SignUpstyles.textInputNum}
                maxLength={1}
                ref={refNum1}
                value={num1}
                onChangeText={onChangeNum1}
              />
            </View>
            <View style={SignUpstyles.textInputNumBox}>
              <TextInput
                style={SignUpstyles.textInputNum}
                maxLength={1}
                ref={refNum2}
                value={num2}
                onChangeText={onChangeNum2}
              />
            </View>
            <View style={SignUpstyles.textInputNumBox}>
              <TextInput
                style={SignUpstyles.textInputNum}
                maxLength={1}
                ref={refNum3}
                value={num3}
                onChangeText={onChangeNum3}
              />
            </View>
          </View>
        </View>
        <View style={SignUpstyles.center}>
          <BottomButton
            onPress={() => navigation.navigate('SignUpNickName')}
            title="다음"
            backgroundColor={'#F5FF82'}
            color="#000"
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};
