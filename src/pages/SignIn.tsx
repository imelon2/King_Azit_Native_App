import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import DismissKeyboardView from '../components/DismissKeyboardView';
import {widthData,heightData} from '../modules/globalStyles'
const {width, height} = Dimensions.get('window');
const heightScale = heightData;

// console.log(widthData); 0.84
// console.log(heightData); 0.8
function SignIn() {
    
    
    
  return (
    <DismissKeyboardView style={styles.container}>
      <View style={{flex:2,backgroundColor: 'white'}}></View>
      <View
        style={{
        flex:5,
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <Image
          source={require('../assets/MainLogo.png')}
          style={styles.mainLogo}
        />
      </View>
      <View style={{
        flex:15,
        backgroundColor: 'white'}}>
        <View style={styles.inputWrapper}>
          <View style={styles.textInputWrapper}>
            <Image
              style={styles.emailIcom}
              source={require('../assets/Person.png')}
            />
            <TextInput
              style={styles.textInput}
              placeholder="아이디 (이메일)"/>
          </View>
          <View style={styles.textInputWrapper}>
            <Image
              style={styles.emailIcom}
              source={require('../assets/Lock.png')}
            />
            <TextInput
              style={styles.textInput}
              placeholder="비밀번호"
              />
          </View>
        </View>
        <View>
          <Text>아이디/비밀번호 찾기</Text>
        </View>
        <View>
          <Text>로그인</Text>
        </View>
        <View>
          <Text>아직 회원이 아니신가요?</Text>
        </View>
      </View>
    </DismissKeyboardView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    // maxHeight:'100%',
    height:height-(heightScale*37),
    // flex:1
  },
  inputWrapper: {
    paddingTop:heightScale*150,
    padding: 35,
  },
  textInputWrapper: {
    marginTop:30,
    flexDirection: 'row',
    alignItems:'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'gray',
  },
  textInput: {
    fontSize:heightScale*20,
    width:'90%',
    left:'15%',
  },
  mainLogo: {
    flex: 1,
    aspectRatio: 1.5,
    resizeMode: 'contain',
  },
  emailIcom: {
    width: heightScale*20,
    height: heightScale*20,
    resizeMode: 'contain',
  },
});
export default SignIn;
