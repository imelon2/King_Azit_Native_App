import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import {RootStackParamList} from '../../../AppInner';
import {widthData, heightData} from '../../modules/globalStyles';
const heightScale = heightData;

type MainScreenProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

function Main({navigation}: MainScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 8}}></View>
      <View style={styles.headerStyle}>
        <Image
          source={require('../../assets/MainLogo.png')}
          style={styles.mainLogo}
        />
      </View>
      <View style={{flex: 9}}></View>
      <View style={styles.bottonStyle}>
        <View>
          <Pressable
            style={[styles.buttonStyle, styles.loginButton]}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.textStyle}>로그인</Text>
          </Pressable>
        </View>
        <Pressable
          style={[styles.buttonStyle, styles.signUpButton]}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.textStyle}> 회원가입</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  headerStyle: {
    flex: 12,
    alignItems: 'center',
    // backgroundColor:'yellow'
  },
  bottonStyle: {
    flex: 14,
  },
  buttonStyle: {
    marginHorizontal: heightScale * 29,
    height: heightScale * 60,
    borderRadius: heightScale * 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButton: {
    backgroundColor: '#D9D9D9',
  },
  signUpButton: {
    backgroundColor: 'white',
    marginTop: heightData * 26,
    borderWidth: 1,
    borderBottomColor: 'black',
  },
  textStyle: {
    color: '#000000',
    fontSize: heightScale * 16,
    fontWeight: 'bold',
  },
  mainLogo: {
    flex: 1,
    aspectRatio: 1.5,
    resizeMode: 'contain',
  },
});

export default Main;
