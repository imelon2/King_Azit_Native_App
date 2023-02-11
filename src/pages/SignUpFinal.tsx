import {NavigationProp, useNavigation} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
} from 'react-native';
import {RootStackParamList} from '../../AppInner';
import {widthData, heightData} from '../modules/globalStyles';
const heightScale = heightData;

type SignUpFinalScreenProps = NativeStackScreenProps<RootStackParamList,'SignUpFinal' >;

function SignUpFinal({navigation}:SignUpFinalScreenProps) {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={{flex: 8}}></View>
        <View style={styles.headerStyle}>
          <Image
            source={require('../assets/MainLogo.png')}
            style={styles.mainLogo}
          />
        </View>
        <View style={[styles.contentStyle, {flex: 23}]}>
          <Text style={styles.titleTextStyle}>
            가입 신청이 완료 되었습니다!
          </Text>
          <Text style={styles.contentsTextStyle}>Kings` Azit Membership 소지 여부에 따라</Text>
          <Text style={styles.contentsTextStyle}>가입 승인 될 예정 입니다.</Text>
        </View>
        <Pressable onPress={() => navigation.navigate('Main')} style={styles.homeButton}>
          <Text style={styles.buttonTextStyle}>처음으로</Text>
        </Pressable>
      </SafeAreaView>
    </>
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
  },
  contentStyle: {
    alignItems: 'center',
    marginTop: heightData * 63,
  },
  titleTextStyle: {
    fontSize: heightData * 22,
    paddingVertical: heightData * 10,
    color: 'black',
    fontWeight: 'bold',
  },
  contentsTextStyle: {
    fontSize: heightData * 14,
    color: 'black',
  },
  homeButton: {
    backgroundColor: '#D9D9D9',
    margin:heightScale*20,
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
    aspectRatio: 1.5,
    resizeMode: 'contain',
  },
});

export default SignUpFinal;
