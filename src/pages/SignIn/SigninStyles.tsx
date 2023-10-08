import {Dimensions, StyleSheet} from 'react-native';
import {heightData, widthData} from '@/modules';
const heightScale = heightData;

export const SigninStyles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    // backgroundColor: '#fff',
    flex: 1,
  },
  title: {
    justifyContent: 'center',
  },
  contentInput: {},
  headerStyle: {
    // backgroundColor:'orange',
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#484848',
  },
  titleText: {
    fontSize: heightScale * 22,
    fontWeight: '400',
    paddingLeft: heightScale * 20,
    color: '#B9B9B9',
  },
  inputWrapper: {
    paddingHorizontal: heightScale * 29,
  },
  textInputWrapper: {
    marginTop: heightScale * 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'gray',
    // paddingRight: 5 * heightScale,
  },
  textInput: {
    fontSize: heightScale * 16,
    height: heightScale * 50,
    width: '85%',
    paddingHorizontal: 10,
    paddingBottom: 5,
    color: '#fff',
  },
  findIDPW: {flex: 1, flexDirection: 'row', marginTop: heightScale * 20, width: 245 * heightScale},
  loginButton: {
    backgroundColor: '#D9D9D9',
    height: heightScale * 64,
    width: widthData * 380,
    borderRadius: heightScale * 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  onLiginButton: {
    backgroundColor: '#F5FF82',
  },
  textStyle: {
    color: 'black',
    fontSize: heightScale * 18,
    fontWeight: 'bold',
  },
  onTextStyle: {
    color: '#000',
    fontSize: heightScale * 18,
  },
  subfont: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 13 * heightScale,
    fontWeight: '300',
  },
  headerStyle2: {
    flex: 1.4,
    alignItems: 'center',
    // backgroundColor:'yellow'
  },
  bottonStyle: {
    flex: 1,
  },
  loginButtonStyle: {
    backgroundColor: '#F5FF82',
    width: widthData * 380,
    height: heightData * 55,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: heightScale * 5,
  },
  buttonStyle: {
    height: heightScale * 60,
    width: widthData * 390,
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
  mainLogo: {
    flex: 1,
    aspectRatio: 1.5,
    resizeMode: 'contain',
  },
});
