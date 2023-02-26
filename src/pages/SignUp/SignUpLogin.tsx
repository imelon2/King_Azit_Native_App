import { Text,View,TextInput,SafeAreaView,KeyboardAvoidingView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { RootStackParamList } from '../../../AppInner';
import { SignUpstyles } from '../../modules/SignUpstyles';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';

import userSlice from "../../slices/user";
import { useAppDispatch } from "../../store"

type SignInScreenProps = NativeStackScreenProps< RootStackParamList , 'SignUpLogin' >;

function SignUpLogin({ navigation }: SignInScreenProps) {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [error, setError] = useState(false);
    const onChangeEmail = useCallback((text: any) => {
        setEmail(text.trim());
    }, []);
    const onClickNextButton = () => {
        if(!email) return;
        dispatch(userSlice.actions.setEmail({email: email}));
        axios.get(`http://43.201.146.251:8080/idcheck?memberId=${email}`)
        .then(res => {
             if (res.status == 200) {
                navigation.navigate('SignUpPassWord');
             }
            }
        ).catch(e => {
            console.log(e)
            setError(true)
        });
       
    };

    return (
        <SafeAreaView style={SignUpstyles.container}>
            <KeyboardAwareScrollView>
                <View  >
                    <Icon
                        name="arrowleft"
                        style={SignUpstyles.leftIcon}
                        size={25}
                        color="#fff"
                        onPress={() => navigation.navigate('SignUpHome')}
                    />
                    <View style={SignUpstyles.topbar}>
                        <View style={[SignUpstyles.progress, SignUpstyles.progress2]}></View>
                    </View>
                    <View style={SignUpstyles.terms}>
                        <Text style={SignUpstyles.termstext}> 로그인에 사용할 </Text>
                        <Text style={SignUpstyles.termstext2}> 아이디를 입력해주세요. </Text>
                    </View>
                </View>

                <View style={SignUpstyles.inputWrapper}>
                    <View style={SignUpstyles.textInputWrapper}>
                        <TextInput
                            style={SignUpstyles.textInput}
                            placeholder="아이디 (이메일) 입력"
                            onChangeText={onChangeEmail}
                            importantForAutofill="yes" // 자동완성 불러오기
                            autoComplete="email" // 자동완성 허용
                            keyboardType="email-address" // 키보드 타입 변경
                            placeholderTextColor = "#6F6F6F"
                            value={email}
                        />
                    </View>
                    <View>
                        {error && (
                            <Text style={SignUpstyles.errorText}>
                                사용하실 수 없는 닉네임 입니다.
                            </Text>
                        )}
                    </View>
                </View>
            </KeyboardAwareScrollView>

            <View style={{ flex: 3}} >
                <Text
                    style={email ? [SignUpstyles.nextButton, SignUpstyles.nextButton2] : SignUpstyles.nextButton}
                    onPress={onClickNextButton}>
                    다음
                </Text>
            </View>
        </SafeAreaView>
    );
}

export default SignUpLogin;