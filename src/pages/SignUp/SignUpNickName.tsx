import {Text, View, TextInput, SafeAreaView, KeyboardAvoidingView, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useCallback, useState, useRef} from 'react';
import {RootStackParamList} from 'AppInner';
import {SignUpstyles} from '@/modules/SignUpstyles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SignUpHeader} from './SignUpComponent';
import {BottomButton} from '@/components/Button';
import {nickCheck, SignUp} from '@/api/SignUp/SignUpApi';
import {RootState} from '@/store/reducer';
import {useSelector} from 'react-redux';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUpNickName'>;

export function SignUpNickName({navigation}: SignInScreenProps) {
  const user = useSelector((state: RootState) => state.user);
  const [nickName, setNickName] = useState('');
  const [error, setError] = useState(false);
  const [error2, setError2] = useState(false);

  const onChangeNickName = useCallback((text: any) => {
    setNickName(text.trim());
  }, []);

  const onClickNextButton = async () => {
    if (!nickName) return;
    if (nickName.length < 2 || nickName.length > 8) {
      setError(true);
      return;
    }
    const nicknameCheck: any = await nickCheck({nickname: nickName});
    if (nicknameCheck === 200) signUpHandler();
    else setError2(true);
  };

  const signUpHandler = async () => {
    const data = {
      memberId: user.email,
      password: user.password,
      name: user.name,
      nickname: nickName,
      phone: user.phone,
      birth: '',
      gender: '',
      fcmToken: '',
    };
    const signUpData: any = await SignUp(data);
    if (signUpData === '201') {
      navigation.navigate('SignUpFinal');
    }
  };

  return (
    <SafeAreaView style={SignUpstyles.container}>
      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}>
        <View>
          <SignUpHeader text={'사용할 닉네임을 정해주세요.'} bar={288} />
        </View>
        <View>
          <View style={SignUpstyles.inputWrapper}>
            <View style={SignUpstyles.textInputWrapper}>
              <TextInput
                style={SignUpstyles.textInput}
                placeholder="닉네임 입력"
                onChangeText={onChangeNickName}
                value={nickName}
                placeholderTextColor="#6F6F6F"
              />
            </View>
            <View>
              {error && <Text style={SignUpstyles.errorText}>사용할 수 없는 닉네임 입니다. 다시 입력해주세요.</Text>}
              {error2 && <Text style={SignUpstyles.errorText}>중복된 닉네임 입니다.</Text>}
            </View>
          </View>
        </View>
        <View style={SignUpstyles.center}>
          <BottomButton
            onPress={onClickNextButton}
            title="다음"
            backgroundColor={nickName ? '#F5FF82' : '#808080'}
            color="#000"
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

export default SignUpNickName;
