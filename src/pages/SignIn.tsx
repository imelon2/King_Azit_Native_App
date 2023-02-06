import {Image, StyleSheet, Text, View} from 'react-native';

function SignIn() {
  return (
    <>
      {/* <View style={{flex: 3,backgroundColor: 'white'}}></View> */}
      <View style={{flex: 7, alignItems: 'center', backgroundColor: 'white'}}>
        <View>
          <Image
            source={require('../assets/MainLogo.png')}
            style={styles.mainLogo}
          />
        </View>
      </View>
      <View style={{flex: 14, backgroundColor: 'yellow'}}>
        <View>
          <Text>아이디 (이메일)</Text>
        </View>
        <View>
          <Text>비밀번호</Text>
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
    </>
  );
}

const styles = StyleSheet.create({
  mainLogo: {
    marginTop:50,
    flex: 1,
    aspectRatio: 1.3,
    resizeMode: 'contain',
  },
});
export default SignIn;
