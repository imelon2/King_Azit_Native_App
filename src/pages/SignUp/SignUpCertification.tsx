import { Text,View,TextInput,SafeAreaView,KeyboardAvoidingView , TouchableOpacity, StyleSheet} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useState, useRef } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { RootStackParamList } from '../../../AppInner';
import { SignUpstyles } from '../../modules/SignUpstyles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';
import {  heightData } from '../../modules/globalStyles'
const heightScale = heightData;
import { useSelector } from "react-redux";
import { RootState } from "../../store/reducer";

type SignInScreenProps = NativeStackScreenProps< RootStackParamList , 'SignUpCertification' >;

function SignUpCertification({navigation}: SignInScreenProps) {
    const [gender, setGender] = useState('');
    const [name, setName] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [phoneNum, setPhoneNum] = useState('');
    const [certNum, setCertNum] = useState('');
    const [certCheck, setCertCheck] = useState(false);
    const [keyboardOn, setKeyboardOn] = useState(false);
    const birthDateRef = useRef<TextInput | null>(null);
    const phoneNumRef = useRef<TextInput | null>(null);

    const user = useSelector((state: RootState) => state.user);
  
    const onClickSiginUp = () => {
      let data = {
        memberId: user.email,
        password: user.password,
        name: name,
        nickname: user.nickName,
        phone: phoneNum,
        birth: birthDate,
        gender: gender,
      }
      axios.post('http://43.201.146.251:8080/join', data)
      .then(function(res){
        if(res.status == 201) {
          navigation.navigate('SignUpFinal');
        }
      }).catch(function (error){
        console.log(error);
      });
    };
  
    const onClickCert = () => {
      setCertCheck(true);
    }

    const onClickGenderButton = (text : any) => {
      setGender(text);
    }
  
    const onChangeName = useCallback((text: any) => {
      setName(text.trim());
    }, []);
  
    const onChangeBirthDate = useCallback((text: any) => {
      setBirthDate(text.trim());
    }, []);
  
    const onChangePhoneNum = useCallback((text: any) => {
      setPhoneNum(text.trim());
    }, []);
  
    const onChangeCertNum = useCallback((text: any) => {
      setCertNum(text.trim());
    }, []);
  
    return (
      <SafeAreaView style={SignUpstyles.container}>
        <KeyboardAwareScrollView
          onKeyboardDidShow={() => setKeyboardOn(true)}
          onKeyboardDidHide={() => setKeyboardOn(false)}>
          <View>
            <Icon
              name="arrowleft"
              style={SignUpstyles.leftIcon}
              size={25}
              color="#000"
              onPress={() => navigation.navigate('SignUpNickName')}
            />
            <View style={SignUpstyles.topbar}>
              <View style={[SignUpstyles.progress, SignUpstyles.progress5]}></View>
            </View>
            <View style={SignUpstyles.terms}>
              <Text style={SignUpstyles.termstext}> 본인확인을 위해 </Text>
              <Text style={SignUpstyles.termstext2}> 인증을 진행해주세요. </Text>
            </View>
          </View>
  
          <View style={SignUpstyles.inputWrapper}>

            <View style={styles.genderBox} >
              <TouchableOpacity onPress={() => onClickGenderButton('male')} style={ [ styles.genderButton ,  gender == 'male' && styles.genderButtonOn ] }>
                <Text style={[styles.genderButtonText  ,  gender == 'male' && styles.genderButtonText2 ]} >남자</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => onClickGenderButton('female')} style={[ styles.genderButton , styles.genderButton2 , gender == 'female' && styles.genderButtonOn ]}>
                <Text style={[styles.genderButtonText ,  gender == 'female' && styles.genderButtonText2 ]} >여자</Text>
              </TouchableOpacity>
            </View>

            <View style={SignUpstyles.textInputWrapper}>
              <TextInput
                style={SignUpstyles.textInput}
                placeholder="이름 입력"
                onChangeText={onChangeName}
                value={name}
                returnKeyType="next" // next key로 변환
                onSubmitEditing = {() => birthDateRef.current?.focus()} // Submit Key 클릭 시, 이벤트
                blurOnSubmit ={false} // Submit Key클릭 시, Keyboard 유지
              />
            </View>
  
            <View style={SignUpstyles.textInputWrapper}>
              <TextInput
                style={SignUpstyles.textInput}
                ref={birthDateRef}
                placeholder="생년월일(YYMMDD)"
                onChangeText={onChangeBirthDate}
                returnKeyType="next" // next key로 변환
                onSubmitEditing = {() => phoneNumRef.current?.focus()} // Submit Key 클릭 시, 이벤트
                blurOnSubmit ={false} // Submit Key클릭 시, Keyboard 유지
                value={birthDate}
              />
            </View>
  
            <View style={SignUpstyles.textInputContainer} >
              <View style={[SignUpstyles.textInputWrapper, SignUpstyles.textInputWrapper2]}>
                <TextInput
                  style={SignUpstyles.textInput}
                  ref={phoneNumRef}
                  placeholder="휴대폰번호 입력"
                  onChangeText={onChangePhoneNum}
                  value={phoneNum}
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
        </KeyboardAwareScrollView>
  
        <View>
          <Text
            style={
              certNum
                ? [
                    SignUpstyles.nextButton,
                    SignUpstyles.nextButton2,
                    keyboardOn && styles.nextButton3,
                  ]
                : [SignUpstyles.nextButton, keyboardOn && styles.nextButton3]
            }
            onPress={onClickSiginUp}>
            가입신청
          </Text>
        </View>
  
  
      </SafeAreaView>
    );
  }


  const styles = StyleSheet.create({
    nextButton3: {
        bottom: -135,
        display:'none',
        opacity:0,
      },
    genderBox: {
      flexDirection: 'row',
      flex:1,
      borderWidth: 1,
      borderColor:'#aaa',
      borderRadius: 8,
      height: 50 * heightScale,
    },
    genderButton: {
      flex:1,
    },
    genderButton2: {
      borderColor:'#aaa',
      borderLeftWidth:1,
    },
    genderButtonText: {
       lineHeight: 50 * heightScale,
       textAlign: 'center',
    },
    genderButtonText2: {
      color:'white',
   },
    genderButtonOn: {
      backgroundColor: '#29a6fb',
      // overflow:'hidden',
    },
  });

  export default SignUpCertification;