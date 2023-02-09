import { NavigationProp, useNavigation } from '@react-navigation/native';
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
import { RootStackParamList } from '../../AppInner';

function SignUpFinal() {
    const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <>
      <SafeAreaView style={styles.container}>
        <View style={{flex:8}}></View>
        <View style={styles.headerStyle}>
          <Image
            source={require('../assets/MainLogo.png')}
            style={styles.mainLogo}
          />
        </View>
        <View style={{flex: 23}}></View>
        <Pressable onPress={() => navigation.navigate('Main')}><Text>처음으로</Text></Pressable>
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
    // backgroundColor:'yellow'
  },
  mainLogo: {
    flex: 1,
    aspectRatio: 1.5,
    resizeMode: 'contain',
  },
});

export default SignUpFinal;
