import {View, TextInput, SafeAreaView} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useCallback, useState, useRef} from 'react';
import {RootStackParamList} from 'AppInner';
import {SignUpstyles} from './SignUpstyles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SignUpHeader} from './SignUpComponent';
import {BottomButton} from '@/components/Button';
import {useAppDispatch} from '@/store';
import userSlice from '@/slices/user';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUpCertification'>;

export function SignUpCertification({navigation}: SignInScreenProps) {
  const dispatch = useAppDispatch();
  const [phoneNum, setPhoneNum] = useState('');
  const [name, setName] = useState('');
  const phoneNumRef = useRef<TextInput | null>(null);

  const NextButton = () => {
    dispatch(userSlice.actions.setName({name}));
    dispatch(userSlice.actions.setPhone({phone: phoneNum}));
    navigation.navigate('SignUpCertificationNum');
  };

  const onChangePhoneNum = useCallback((text: any) => {
    setPhoneNum(text.trim());
  }, []);

  const onChangeName = useCallback((text: any) => {
    setName(text.trim());
  }, []);

  return (
    <SafeAreaView style={SignUpstyles.container}>
      <KeyboardAwareScrollView>
        <View>
          <SignUpHeader text={'본인확인을 위해 \n번호인증을 진행해주세요.'} bar={288} />
        </View>

        <View style={SignUpstyles.inputWrapper}>
          <View style={SignUpstyles.textInputContainer}>
            <View style={[SignUpstyles.textInputWrapper, SignUpstyles.textInputWrapper2]}>
              <TextInput
                style={SignUpstyles.textInput}
                placeholder="실명 입력"
                onChangeText={onChangeName}
                value={name}
                placeholderTextColor="#6F6F6F"
                onSubmitEditing={() => phoneNumRef.current?.focus()}
                returnKeyType="next"
              />
            </View>
          </View>

          <View style={SignUpstyles.textInputContainer}>
            <View style={[SignUpstyles.textInputWrapper, SignUpstyles.textInputWrapper2]}>
              <TextInput
                style={SignUpstyles.textInput}
                ref={phoneNumRef}
                placeholder="휴대폰번호 입력"
                onChangeText={onChangePhoneNum}
                value={phoneNum}
                placeholderTextColor="#6F6F6F"
                keyboardType="number-pad"
              />
            </View>
          </View>
        </View>
        <View style={SignUpstyles.center}>
          <BottomButton
            onPress={NextButton}
            title="SNS 인증코드 받기"
            backgroundColor={name && phoneNum ? '#F5FF82' : '#808080'}
            color="#000"
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default SignUpCertification;
