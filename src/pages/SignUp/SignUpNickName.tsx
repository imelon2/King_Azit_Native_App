import { Text,View,TextInput,SafeAreaView,KeyboardAvoidingView , StyleSheet} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useState, useRef } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { RootStackParamList } from '../../../AppInner';
import { SignUpstyles } from '../../modules/SignUpstyles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
// import { useSelector, useDispatch } from 'react-redux';
// import { setUser , selectUser }   from '../../slices/user';


type SignInScreenProps = NativeStackScreenProps< RootStackParamList , 'SignUpNickName' >;

function SignUpNickName({navigation}: SignInScreenProps) {
    const [nickName, setNickName] = useState('');
    const [error, setError] = useState(false);
    // const dispatch = useDispatch();
  
    const onChangeNickName = useCallback((text: any) => {
      setNickName(text.trim());
    }, []);

    const onClickNextButton = () => {
        if(!nickName) return;
        // if( 중복확인 )
        // 리덕스에 데이터 저장 
        // setUser({ nickname: nickName });
        // const userData = useSelector(selectUser);
        // console.log(userData);
        navigation.navigate('SignUpCertification');
    };
  
    return (
      <SafeAreaView style={SignUpstyles.container}>
        <KeyboardAwareScrollView>
          <View>
            <Icon
              name="arrowleft"
              style={SignUpstyles.leftIcon}
              size={25}
              color="#000"
              onPress={() => navigation.navigate('SignUpPassWord')}
            />
            <View style={SignUpstyles.topbar}>
              <View style={[SignUpstyles.progress, SignUpstyles.progress4]}></View>
            </View>
            <View style={SignUpstyles.terms}>
              <Text style={SignUpstyles.termstext}> 아지트에 사용할 </Text>
              <Text style={SignUpstyles.termstext2}> 닉네임을 정해주세요. </Text>
            </View>
  
            <View style={SignUpstyles.inputWrapper}>
              <View style={SignUpstyles.textInputWrapper}>
                <TextInput
                  style={SignUpstyles.textInput}
                  placeholder="닉네임 입력"
                  onChangeText={onChangeNickName}
                  value={nickName}
                />
              </View>
              <View>
                {error && (
                  <Text style={SignUpstyles.errorText}>
                    비밀번호가 일치하지 않습니다.
                  </Text>
                )}
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
  
        <View>
          <Text
            style={ nickName ? [SignUpstyles.nextButton,SignUpstyles.nextButton2]: [SignUpstyles.nextButton] }
            onPress={onClickNextButton}>
            다음
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  export default SignUpNickName;