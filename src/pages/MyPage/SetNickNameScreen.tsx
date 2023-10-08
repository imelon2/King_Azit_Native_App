import {Text, View, TextInput, SafeAreaView} from 'react-native';
import React, {useCallback, useState} from 'react';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {MyPageRootStackParamList} from 'AppInner';
import {SignUpstyles} from '../SignUp/SignUpstyles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import userSlice from '@/slices/user';
import {useAppDispatch} from '@/store';
import axios, {AxiosError} from 'axios';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/reducer';
import {BottomButton, Header} from '@/components';
import {heightData} from '@/modules';

function SetNickNameScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<MyPageRootStackParamList>>();
  const [loading, setLoading] = useState(false);
  const [nickName, setNickName] = useState('');
  const [error, setError] = useState(false);
  const access_token = useSelector((state: RootState) => state.user.access_token);
  const onChangeNickName = useCallback((text: any) => {
    setNickName(text.trim());
  }, []);

  const onClickChangeNickName = async () => {
    try {
      if (!nickName) return;
      setLoading(true);
      /**
       * dev : 해당 API는 return이 없습니다.
       * 닉네임 변경 성공 시, status : 201
       */
      await axios.put(`${Config.API_URL}/member/changenick`, nickName, {
        headers: {
          'Content-Type': 'text/plain',
          Authorization: `Bearer ${access_token}`,
        },
      });
      dispatch(userSlice.actions.setNickname({nickName: nickName}));
      navigation.goBack();
    } catch (error) {
      // status 409 : 닉네임 중복 애러
      if ((error as AxiosError).response?.status === 409) {
        setError(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={SignUpstyles.container}>
      <KeyboardAwareScrollView>
        <View>
          <Header
            title=""
            leftIcon={() => (
              <IconAntDesign
                name="left"
                style={SignUpstyles.leftIcon}
                size={25}
                color="#fff"
                onPress={() => navigation.goBack()}
              />
            )}
          />
          <View style={SignUpstyles.topbar}></View>
          <View style={SignUpstyles.terms}>
            <Text style={SignUpstyles.termstext}> 닉네임 변경 </Text>
          </View>

          <View style={SignUpstyles.inputWrapper}>
            <View style={SignUpstyles.textInputWrapper}>
              <TextInput
                style={SignUpstyles.textInput}
                placeholder="새 닉네임 입력"
                onChangeText={onChangeNickName}
                value={nickName}
                placeholderTextColor="#6F6F6F"
              />
            </View>
            <View>{error && <Text style={SignUpstyles.errorText}>사용하실 수 없는 닉네임입니다.</Text>}</View>
          </View>
        </View>
      </KeyboardAwareScrollView>

      <View style={{alignItems: 'center', justifyContent: 'flex-end', paddingBottom: 20 * heightData}}>
        <BottomButton
          onPress={onClickChangeNickName}
          title="로그인"
          backgroundColor={nickName ? '#F5FF82' : '#808080'}
          color="#000"
        />
      </View>
    </SafeAreaView>
  );
}

export default SetNickNameScreen;
