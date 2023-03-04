import {
  Text,
  View,
  TextInput,
  SafeAreaView,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import React, {useCallback, useState, useRef} from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import {MyPageRootStackParamList, RootStackParamList} from '../../../AppInner';
import {SignUpstyles} from '../../modules/SignUpstyles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import userSlice from '../../slices/user';
import {useAppDispatch} from '../../store';
import axios, {AxiosError} from 'axios';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/reducer';

function SetNickNameScreen() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<MyPageRootStackParamList>>();
  const [loading, setLoading] = useState(false);
  const [nickName, setNickName] = useState('');
  const [error, setError] = useState(false);
  const access_token = useSelector(
    (state: RootState) => state.user.access_token,
  );
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
          <Icon
            name="arrowleft"
            style={SignUpstyles.leftIcon}
            size={25}
            color="#fff"
            onPress={() => navigation.goBack()}
          />
          <View style={SignUpstyles.topbar}></View>
          <View style={SignUpstyles.terms}>
            <Text style={SignUpstyles.termstext}>
              {' '}
              닉네임을 다시 정해주세요.{' '}
            </Text>
          </View>

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
              {error && (
                <Text style={SignUpstyles.errorText}>
                  사용하실 수 없는 닉네임입니다.
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
              ? [SignUpstyles.nextButton, SignUpstyles.nextButton2]
              : [SignUpstyles.nextButton]
          }
          onPress={onClickChangeNickName} disabled={!!!nickName || loading}
          >
          {loading ? <ActivityIndicator color={'black'}/> : '바꾸기'}
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default SetNickNameScreen;
