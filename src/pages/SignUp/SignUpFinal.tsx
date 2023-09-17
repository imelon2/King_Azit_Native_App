import {NavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Alert, Dimensions, Image, Pressable, StyleSheet, Text, TextInput, View, SafeAreaView} from 'react-native';
import {RootStackParamList} from '../../../AppInner';
import {widthData, heightData} from '../../modules/globalStyles';
import {BottomButton} from '@/components/Button';
import {SignUpstyles} from '@/modules';
const heightScale = heightData;

type SignUpFinalScreenProps = NativeStackScreenProps<RootStackParamList, 'SignUpFinal'>;

export function SignUpFinal({navigation}: SignUpFinalScreenProps) {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={{flex: 1}}></View>
        <View style={styles.headerStyle}>
          <Image source={require('../../assets/MainLogo.png')} style={styles.mainLogo} />
        </View>
        <View style={styles.contentStyle}>
          <Text style={styles.titleTextStyle}>회원가입이 완료 되었습니다.</Text>
          <Text style={styles.contentsTextStyle}>Kings` Azit 멤버가 되신것을 축하드립니다.</Text>
        </View>
        <View style={styles.buttonBox}>
          <View style={[SignUpstyles.center, styles.paddingBottom]}>
            <BottomButton
              onPress={() => navigation.navigate('Main')}
              title="확인"
              backgroundColor={'#F5FF82'}
              color="#000"
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
  headerStyle: {
    flex: 1,
    alignItems: 'center',
  },
  contentStyle: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'flex-end',
    // paddingTop: heightData * 63,
  },
  titleTextStyle: {
    fontSize: heightData * 22,
    paddingVertical: heightData * 10,
    color: '#fff',
    fontWeight: '700',
    marginTop: 62 * heightScale,
  },
  contentsTextStyle: {
    fontSize: heightData * 18,
    color: '#fff',
  },
  homeButton: {
    backgroundColor: '#F5FF82',
    margin: heightScale * 20,
    marginHorizontal: heightScale * 29,
    height: heightScale * 64,
    borderRadius: heightScale * 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTextStyle: {
    color: 'black',
    fontSize: heightScale * 16,
    fontWeight: 'bold',
  },
  mainLogo: {
    flex: 1,
    // aspectRatio: 1.5,
    resizeMode: 'contain',
  },
  buttonBox: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  paddingBottom: {
    paddingBottom: 45 * heightScale,
  },
});

export default SignUpFinal;
