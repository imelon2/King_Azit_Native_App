import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Image, View, SafeAreaView} from 'react-native';
import {RootStackParamList} from 'AppInner';
import {heightData} from '@/modules';
import {BottomButton} from '@/components/Button';
import {SigninStyles} from './SigninStyles';
const heightScale = heightData;

type MainScreenProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

function Main({navigation}: MainScreenProps) {
  return (
    <SafeAreaView style={SigninStyles.container}>
      <View style={{flex: 1.5}}></View>
      <View style={SigninStyles.headerStyle2}>
        <Image source={require('@/assets/MainLogo.png')} style={SigninStyles.mainLogo} />
      </View>
      <View style={{flex: 1}}></View>
      <View style={SigninStyles.bottonStyle}>
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

export default Main;
