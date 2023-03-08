import { Text, View, TextInput, SafeAreaView, KeyboardAvoidingView, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useCallback, useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { RootStackParamList } from '../../../AppInner';
import { SignUpstyles } from '../../modules/SignUpstyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { heightData } from '../../modules/globalStyles'
const heightScale = heightData;

import userSlice from "../../slices/user";
import { useAppDispatch } from "../../store"

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUpName'>;

function SignUpName({ navigation }: SignInScreenProps) {
    const dispatch = useAppDispatch();
    const [name, setName] = useState('');

    const onChangeName = useCallback((text: any) => {
        setName(text.trim());
      }, []);

      const onClickNextButton = () => {
        if (!name) return;
        dispatch(userSlice.actions.setName({ name: name }));
        navigation.navigate('SignUpBirth');
    };

    return (
        <SafeAreaView style={SignUpstyles.container}>
            <KeyboardAwareScrollView enableOnAndroid 
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        >
                <View  >
                    <Icon
                        name="arrowleft"
                        style={SignUpstyles.leftIcon}
                        size={25}
                        color="#fff"
                        onPress={() => navigation.navigate('SignUpNickName')}
                    />
                    <View style={SignUpstyles.topbar}>
                        <View style={[SignUpstyles.progress, SignUpstyles.progress5]}></View>
                    </View>
                    <View style={SignUpstyles.terms}>
                        <Text style={SignUpstyles.termstext}> 이름을 입력해 주세요. </Text>
                        {/* <Text style={SignUpstyles.termstext2}> 아이디를 입력해주세요. </Text> */}
                    </View>
                </View>

                <View style={SignUpstyles.inputWrapper}>
                    <View style={SignUpstyles.textInputWrapper}>
                        <TextInput
                            style={SignUpstyles.textInput}
                            placeholder="이름 입력"
                            onChangeText={onChangeName}
                            value={name}
                            returnKeyType="next" // next key로 변환
                            // onSubmitEditing={() => birthDateRef.current?.focus()} // Submit Key 클릭 시, 이벤트
                            blurOnSubmit={false} // Submit Key클릭 시, Keyboard 유지
                            placeholderTextColor="#6F6F6F"
                        />
                    </View>
                </View>
            <View style={{alignItems:'center'}} >
                <Text
                    style={name ? [SignUpstyles.nextButton, SignUpstyles.nextButton2] : SignUpstyles.nextButton}
                    onPress={onClickNextButton}>
                    다음
                </Text>
            </View>
            </KeyboardAwareScrollView>

        </SafeAreaView>
    );
}


export default SignUpName;