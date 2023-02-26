import { Text, View,  SafeAreaView, TouchableOpacity , StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {  useState } from 'react';
import Icon from 'react-native-vector-icons/AntDesign';
import { RootStackParamList } from '../../../AppInner';
import { SignUpstyles } from '../../modules/SignUpstyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {  heightData } from '../../modules/globalStyles'
const heightScale = heightData;

import userSlice from "../../slices/user";
import { useAppDispatch } from "../../store"

type SignInScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUpGender'>;

function SignUpGender({ navigation }: SignInScreenProps) {
    const dispatch = useAppDispatch();
    const [gender, setGender] = useState('');
    const onClickGenderButton = (text : any) => {
      setGender(text);
    }

    const onClickNextButton = () => {
        if (!gender) return;
        dispatch(userSlice.actions.setGender({ gender: gender }));
        navigation.navigate('SignUpCertification');
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
                        onPress={() => navigation.navigate('SignUpBirth')}
                    />
                    <View style={SignUpstyles.topbar}>
                        <View style={[SignUpstyles.progress, SignUpstyles.progress7]}></View>
                    </View>
                    <View style={SignUpstyles.terms}>
                        <Text style={SignUpstyles.termstext}> 성별을 선택해주세요 </Text>
                    </View>
                </View>

                <View style={SignUpstyles.inputWrapper}>
                    <View style={styles.genderBox} >
                        <TouchableOpacity onPress={() => onClickGenderButton('male')} style={[styles.genderButton, gender == 'male' && styles.genderButtonOn]}>
                            <Text style={[styles.genderButtonText, gender == 'male' && styles.genderButtonText2]} >남자</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onClickGenderButton('female')} style={[styles.genderButton, styles.genderButton2, gender == 'female' && styles.genderButtonOn]}>
                            <Text style={[styles.genderButtonText, gender == 'female' && styles.genderButtonText2]} >여자</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>

            <View style={{ flex: 3 }} >
                <Text
                    style={gender ? [SignUpstyles.nextButton, SignUpstyles.nextButton2] : SignUpstyles.nextButton}
                    onPress={onClickNextButton}>
                    다음
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
genderBox: {
    flexDirection: 'row',
    flex:1,
    borderWidth: 1,
    borderColor:'#aaa',
    borderRadius: 8,
    height: 50 * heightScale,
    overflow:'hidden',
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
     color: "#6F6F6F"
  },
  genderButtonText2: {
    color:'black',
 },
  genderButtonOn: {
    backgroundColor: '#F5FF82',
    // overflow:'hidden',
  },
});

export default SignUpGender;