import { Text,View,TextInput,SafeAreaView,KeyboardAvoidingView , StyleSheet} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useState, useRef } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { MyPageRootStackParamList, RootStackParamList } from '../../../AppInner';
import { SignUpstyles } from '../../modules/SignUpstyles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import userSlice from "../../slices/user";
import { useAppDispatch } from "../../store"
import axios from 'axios'
import { NavigationProp, useNavigation } from '@react-navigation/native';

function SetNickNameScreen() {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<NavigationProp<MyPageRootStackParamList>>();
    const [nickName, setNickName] = useState('');
    const [error, setError] = useState(true);
  
    const onChangeNickName = useCallback((text: any) => {
      setNickName(text.trim());
    }, []);



    // const onClickNextButton = () => {
    //     if(!nickName) return;
    //     // if( 중복확인 )
    //     dispatch(userSlice.actions.setNickname({nickName: nickName}));
    //     axios.get(`http://43.201.146.251:8080/nicknamecheck?nickname=${nickName}`)
    //     .then(res => {
    //          if (res.status == 200) {
    //             navigation.navigate('SignUpName');
    //          }
    //         }
    //     ).catch(e => {
    //         console.log(e)
    //         setError(true)
    //     });
       
    // };
  
    return(
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
            <View style={SignUpstyles.topbar}>
            </View>
            <View style={SignUpstyles.terms}>
              <Text style={SignUpstyles.termstext}> 닉네임을 다시 정해주세요. </Text>
            </View>
  
            <View style={SignUpstyles.inputWrapper}>
              <View style={SignUpstyles.textInputWrapper}>
                <TextInput
                  style={SignUpstyles.textInput}
                  placeholder="닉네임 입력"
                  onChangeText={onChangeNickName}
                  value={nickName}
                  placeholderTextColor = "#6F6F6F"
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
            style={ nickName ? [SignUpstyles.nextButton,SignUpstyles.nextButton2]: [SignUpstyles.nextButton] }
            // onPress={onClickNextButton}
            >
            바꾸기
          </Text>
        </View>
      </SafeAreaView>
    )
}

export default SetNickNameScreen
