import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Image, StyleSheet, View, SafeAreaView} from 'react-native';
import {RootStackParamList} from '../../../AppInner';
import {heightData} from '../../modules/globalStyles';
import {BottomButton} from '@/components/Button';
const heightScale = heightData;

type MainScreenProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

function Main({navigation}: MainScreenProps) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1.5}}></View>
      <View style={styles.headerStyle}>
        <Image source={require('@/assets/MainLogo.png')} style={styles.mainLogo} />
      </View>
      <View style={{flex: 1}}></View>
      <View style={styles.bottonStyle}>
        <View style={{alignItems: 'center'}}>
          <BottomButton
            onPress={() => navigation.navigate('Login')}
            title="로그인"
            backgroundColor="#F5FF82"
            color="#000"
          />
        </View>
        <View style={{alignItems: 'center', marginTop: 10 * heightData}}>
          <BottomButton
            onPress={() => navigation.navigate('SignUp')}
            title="회원가입"
            backgroundColor="000"
            color="#f5ff82"
          />
        </View>
      </View>
      <View style={{flex: 1}}></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
  headerStyle: {
    flex: 1.4,
    alignItems: 'center',
    // backgroundColor:'yellow'
  },
  bottonStyle: {
    flex: 1,
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
