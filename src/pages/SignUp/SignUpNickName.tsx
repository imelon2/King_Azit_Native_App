import {Text, View, TextInput, SafeAreaView, KeyboardAvoidingView, StyleSheet} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useCallback, useState, useRef} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {RootStackParamList} from '../../../AppInner';
import {SignUpstyles} from '../../modules/SignUpstyles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import userSlice from '../../slices/user';
import {useAppDispatch} from '../../store';
import axios from 'axios';
import Config from 'react-native-config';
import {SignUpHeader} from './SignUpComponent';
import {BottomButton} from '@/components/Button';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUpNickName'>;

export function SignUpNickName({navigation}: SignInScreenProps) {
  const dispatch = useAppDispatch();
  const [nickName, setNickName] = useState('');
  const [error, setError] = useState(false);

  const onChangeNickName = useCallback((text: any) => {
    setNickName(text.trim());
  }, []);

  const onClickNextButton = () => {
    if (!nickName) return;
    // if( 중복확인 )
    dispatch(userSlice.actions.setNickname({nickName: nickName}));
    axios
      .get(`${Config.API_URL}/nicknamecheck?nickname=${nickName}`)
      .then(res => {
        if (res.status == 200) {
          navigation.navigate('SignUpName');
        }
      })
      .catch(e => {
        console.log(e);
        setError(true);
      });
  };

  // const user = useSelector((state: RootState) => state.user);

  // const onClickSiginUp = () => {
  //   let data = {
  //     memberId: user.email,
  //     password: user.password,
  //     name: user.name,
  //     nickname: user.nickName,
  //     phone: phoneNum,
  //     birth: user.birth,
  //     gender: user.gender,
  //     fcmToken: user.phoneToken,
  //   };
  //   axios
  //     .post(`${Config.API_URL}/join`, data)
  //     .then(function (res) {
  //       if (res.status == 201) {
  //         navigation.navigate('SignUpFinal');
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

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
            </View>
          </View>
        </View>
        <View style={SignUpstyles.center}>
          <BottomButton
            onPress={() => navigation.navigate('SignUpFinal')}
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
