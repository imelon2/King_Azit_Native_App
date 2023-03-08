import { Text, View, TextInput, SafeAreaView, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useState , useRef } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { RootStackParamList } from '../../../AppInner';
import { SignUpstyles } from '../../modules/SignUpstyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import userSlice from "../../slices/user";
import { useAppDispatch } from "../../store"

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUpBirth'>;

function SignUpBirth({ navigation }: SignInScreenProps) {
    const dispatch = useAppDispatch();
    const [birthDate, setBirthDate] = useState('');

    const onChangeBirthDate = useCallback((text: any) => {
      setBirthDate(text.trim());
    }, []);

    const onClickNextButton = () => {
        if (!birthDate) return;
        dispatch(userSlice.actions.setBirth({ birth: birthDate }));
        navigation.navigate('SignUpGender');
    };

    return (
        <SafeAreaView style={SignUpstyles.container}>
            <KeyboardAwareScrollView enableOnAndroid 
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}>
                <View  >
                    <Icon
                        name="arrowleft"
                        style={SignUpstyles.leftIcon}
                        size={25}
                        color="#fff"
                        onPress={() => navigation.navigate('SignUpName')}
                    />
                    <View style={SignUpstyles.topbar}>
                        <View style={[SignUpstyles.progress, SignUpstyles.progress6]}></View>
                    </View>
                    <View style={SignUpstyles.terms}>
                        <Text style={SignUpstyles.termstext}> 생년월일을 입력해주세요. </Text>
                    </View>
                </View>

                <View style={SignUpstyles.inputWrapper}>
                    <View style={SignUpstyles.textInputWrapper}>
                        <TextInput
                            style={SignUpstyles.textInput}
                            // ref={birthDateRef}
                            placeholder="생년월일(YYMMDD)"
                            onChangeText={onChangeBirthDate}
                            returnKeyType="next" // next key로 변환
                            // onSubmitEditing={() => phoneNumRef.current?.focus()} // Submit Key 클릭 시, 이벤트
                            blurOnSubmit={false} // Submit Key클릭 시, Keyboard 유지
                            value={birthDate}
                            placeholderTextColor="#6F6F6F"
                        />
                    </View>
                </View>
            <View style={{alignItems:'center'}} >
                <Text
                    style={birthDate ? [SignUpstyles.nextButton, SignUpstyles.nextButton2] : SignUpstyles.nextButton}
                    onPress={onClickNextButton}>
                    다음
                </Text>
            </View>
            </KeyboardAwareScrollView>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

});

export default SignUpBirth;