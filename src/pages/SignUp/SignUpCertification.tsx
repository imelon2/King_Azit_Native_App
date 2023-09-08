import { Text, View, TextInput, SafeAreaView, KeyboardAvoidingView, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useState, useRef } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { RootStackParamList } from '../../../AppInner';
import { SignUpstyles } from '../../modules/SignUpstyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import { heightData } from '../../modules/globalStyles'
const heightScale = heightData;
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";
import Config from 'react-native-config';

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUpCertification'>;

export function SignUpCertification({ navigation }: SignInScreenProps) {
  const [phoneNum, setPhoneNum] = useState('');
  const [certNum, setCertNum] = useState('');
  const [certCheck, setCertCheck] = useState(false);

  const phoneNumRef = useRef<TextInput | null>(null);
  const user = useSelector((state: RootState) => state.user);

  const onClickSiginUp = () => {
    let data = {
      memberId: user.email,
      password: user.password,
      name: user.name,
      nickname: user.nickName,
      phone: phoneNum,
      birth: user.birth,
      gender: user.gender,
      fcmToken:user.phoneToken
    }
    axios.post(`${Config.API_URL}/join`, data)
      .then(function (res) {
        if (res.status == 201) {
          navigation.navigate('SignUpFinal');
        }
      }).catch(function (error) {
        console.log(error);
      });
  };

  const onClickCert = () => {
    setCertCheck(true);
  }

  const onChangePhoneNum = useCallback((text: any) => {
    setPhoneNum(text.trim());
  }, []);

  const onChangeCertNum = useCallback((text: any) => {
    setCertNum(text.trim());
  }, []);

  return (
    <SafeAreaView style={SignUpstyles.container}>
      <KeyboardAwareScrollView>
        <View>
          <Icon
            name="arrowleft"
            style={SignUpstyles.leftIcon}
            size={25}
            color="#fff"
            onPress={() => navigation.navigate('SignUpGender')}
          />
          <View style={SignUpstyles.topbar}>
            <View style={[SignUpstyles.progress, SignUpstyles.progress8]}></View>
          </View>
          <View style={SignUpstyles.terms}>
            <Text style={SignUpstyles.termstext}> 본인확인을 위해 </Text>
            <Text style={SignUpstyles.termstext2}> 인증을 진행해주세요. </Text>
          </View>
        </View>

        <View style={SignUpstyles.inputWrapper}>

          <View style={SignUpstyles.textInputContainer} >
            <View style={[SignUpstyles.textInputWrapper, SignUpstyles.textInputWrapper2]}>
              <TextInput
                style={SignUpstyles.textInput}
                ref={phoneNumRef}
                placeholder="휴대폰번호 입력"
                onChangeText={onChangePhoneNum}
                value={phoneNum}
                placeholderTextColor="#6F6F6F"
              />
            </View>
            <TouchableOpacity style={SignUpstyles.textInputButton} onPress={onClickCert} >
              <Text style={SignUpstyles.textInputButtonText} >인증 요청</Text>
            </TouchableOpacity>
          </View>

          {certCheck && (
            <View style={SignUpstyles.textInputWrapper}>
              <TextInput
                style={SignUpstyles.textInput}
                placeholder="인증번호를 적어주세요."
                onChangeText={onChangeCertNum}
                value={certNum}
              />
            </View>
          )}

        </View>
      <View style={{alignItems:'center'}}>
        <Text
          style={
            certNum
              ? [
                SignUpstyles.nextButton,
                SignUpstyles.nextButton2
              ]
              : [SignUpstyles.nextButton]
          }
          onPress={onClickSiginUp}>
          가입신청
        </Text>
      </View>
      </KeyboardAwareScrollView>



    </SafeAreaView>
  );
}

export default SignUpCertification;