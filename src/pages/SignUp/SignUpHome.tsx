import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
  } from 'react-native';
  import {
    createNativeStackNavigator,
    NativeStackScreenProps,
  } from '@react-navigation/native-stack';
  import {useState} from 'react';
  import Icon from 'react-native-vector-icons/AntDesign';
  import {RootStackParamList} from '../../../AppInner';
import { SignUpstyles } from '../../modules/SignUpstyles';
import { heightData } from '../../modules/globalStyles'
const Stack = createNativeStackNavigator<RootStackParamList>();
type SignInScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'SignUpHome'
>;

function SignUpHome({ navigation }: SignInScreenProps) {
    const [checkAll, setcheckAll] = useState(false);
    const [checkPrivacy, setCheckPrivacy] = useState(false);
    const [checkTerms, setcheckTerms] = useState(false);

    const onClickCheckAll = () => {
        setcheckAll(!checkAll);
        setCheckPrivacy(!checkAll);
        setcheckTerms(!checkAll);
    };

    const onClickPrivacy = () => {
        setCheckPrivacy(!checkPrivacy);
    };

    const onClickTerms = () => {
        setcheckTerms(!checkTerms);
    };

    return (
        <SafeAreaView style={SignUpstyles.container}>
            <View >
                <Icon
                    name="arrowleft"
                    style={SignUpstyles.leftIcon}
                    size={25}
                    color="#fff"
                    onPress={() => navigation.navigate('SignIn')}
                />
                <View style={SignUpstyles.topbar}>
                    <View style={SignUpstyles.progress} ></View>
                </View>
                <Text style={SignUpstyles.terms}>서비스 이용약관에 동의해주세요.</Text>
            </View>

            <View  style={{marginBottom:heightData*25}}>
                <TouchableOpacity
                    activeOpacity={1}
                    style={SignUpstyles.termsBox}
                    onPress={onClickCheckAll}>
                    <Icon
                        style={styles.checkBox}
                        name="checksquareo"
                        size={22}
                        color={checkAll ? '#F5FF82' : '#848484'}
                    />
                    <Text style={styles.agreeText}>모두 동의</Text>
                </TouchableOpacity>
                <Text style={styles.bottomBar}></Text>
                <TouchableOpacity
                    activeOpacity={1}
                    style={SignUpstyles.termsBox}
                    onPress={onClickPrivacy}>
                    <Icon
                        style={styles.check}
                        name="check"
                        size={15}
                        color={checkPrivacy ? '#F5FF82' : '#BCBCBC'}
                    />
                    <Text style={{ color: '#fff' }}>[필수] 개인정보 </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    activeOpacity={1}
                    style={SignUpstyles.termsBox}
                    onPress={onClickTerms}>
                    <Icon
                        style={styles.check}
                        name="check"
                        size={15}
                        color={checkTerms ? '#F5FF82' : '#BCBCBC'}
                    />
                    <Text style={{ color: '#fff' }}>이용약관 </Text>
                </TouchableOpacity>
            </View>
            <View style={{ alignItems:'center' }} >
                <Text
                    style={
                        checkPrivacy && checkTerms
                            ? [SignUpstyles.nextButton, SignUpstyles.nextButton2]
                            : SignUpstyles.nextButton
                    }
                    onPress={() =>
                        checkPrivacy && checkTerms && navigation.navigate('SignUpLogin')
                    }>
                    다음
                </Text>
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    bottomBar: {
      width: '92%',
      borderBottomWidth: 2,
      borderBottomColor: '#D9D9D9',
      marginLeft: '4%',
      height: 0,
    },
    checkBox: {
      marginLeft: 20,
    },
    agreeText: {
      marginTop: 2,
      marginLeft: 12,
      color: '#fff',
    },
    check: {
      marginRight: 15,
      marginLeft: 25,
    },
  });

  export default SignUpHome;