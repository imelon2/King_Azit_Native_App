import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
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
        <View style={{alignItems: 'center'}}>
          <Shadow distance={8} startColor={'#FCFF72'}>
            <Pressable
              onPress={() => navigation.navigate('Login')}
              style={styles.loginButtonStyle}>
              <Text style={styles.textStyle}>로그인</Text>
            </Pressable>
          </Shadow>
        </View>
        <View style={{alignItems: 'center'}}>
        <Pressable
          style={[styles.buttonStyle, styles.signUpButton]}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={[styles.textStyle, {color: '#fff'}]}> 회원가입</Text>
        </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
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
  loginButtonStyle: {
    backgroundColor: '#F5FF82',
    width: heightScale * 380,
    height: heightData * 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: heightScale * 5,
  },
  buttonStyle: {
    height: heightScale * 60,
    width: heightScale * 390,
    // marginHorizontal: heightScale * 29,
    borderRadius: heightScale * 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpButton: {
    backgroundColor: '#000',
    borderColor: '#F5FF82',
    marginTop: heightData * 26,
    borderWidth: 2,
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
