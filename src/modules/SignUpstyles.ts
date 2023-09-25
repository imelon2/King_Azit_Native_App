import {color} from 'react-native-reanimated';
import {widthData, heightData} from './globalStyles';
import {Dimensions, StyleSheet} from 'react-native';
const {width, height} = Dimensions.get('window');
const heightScale = heightData;

export const SignUpstyles = StyleSheet.create({
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  leftIcon: {
    marginTop: 15,
    marginLeft: 15,
    marginBottom: 15,
  },
  progress: {
    position: 'absolute',
    borderBottomWidth: 2,
    borderBottomColor: '#F5FF82',
    top: 0,
    left: 0,
  },
  progress2: {
    width: heightScale * 100,
  },
  progress3: {
    width: heightScale * 140,
  },
  progress4: {
    width: heightScale * 180,
  },
  progress5: {
    width: heightScale * 220,
  },
  progress6: {
    width: heightScale * 260,
  },
  progress7: {
    width: heightScale * 300,
  },
  progress8: {
    width: heightScale * 340,
  },
  topbar: {
    borderBottomWidth: 2,
    borderBottomColor: '#484848',
  },
  terms: {
    fontSize: heightScale * 21,
    marginLeft: heightScale * 20,
    marginTop: heightScale * 22,
    color: '#fff',
    marginBottom: heightScale * 54,
  },
  termsBox: {
    flexDirection: 'row',
    marginTop: 13 * heightScale,
    height: 30,
    lineHeight: 30,
  },
  nextButton: {
    // position: 'absolute',
    // bottom: 30,
    width: '92%',
    textAlign: 'center',
    color: '#000',
    backgroundColor: '#828282',
    height: heightScale * 64,
    lineHeight: heightScale * 64,
    borderRadius: 6,
    // marginLeft: '4%',
    fontSize: heightScale * 20,
  },
  nextButton2: {
    backgroundColor: '#F5FF82',
    color: 'black',
  },
  nextButton3: {
    bottom: -135,
    display: 'none',
    opacity: 0,
  },
  termstext: {
    fontSize: heightScale * 26,
    color: '#fff',
  },
  termstext2: {
    fontSize: heightScale * 26,
    color: '#fff',
    marginTop: 4,
  },
  textInput: {
    fontSize: heightScale * 18,
    width: '85%',
    paddingHorizontal: 10,
    paddingBottom: 3,
    color: '#fff',
  },
  textInputNumBox: {
    width: 46 * heightScale,
    height: 54 * heightScale,
    borderRadius: 8 * heightScale,
    borderColor: '#d9d9d9',
    borderWidth: 2 * heightScale,
    marginRight: 26 * heightScale,
    marginLeft: 10 * heightScale,
  },
  textInputNum: {
    flex: 1,
    color: 'white',
    fontSize: 24 * heightScale,
    textAlign: 'center',
  },

  textInputContainer: {
    flexDirection: 'row',
  },

  textInputWrapper: {
    marginTop: heightScale * 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'gray',
  },
  numInputWrapper: {
    marginTop: heightScale * 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    // borderBottomColor: 'gray',
  },
  textInputWrapper2: {
    flex: 3,
  },
  textInputButton: {
    flex: 1,
    height: heightScale * 50,
    lineHeight: heightScale * 50,
    backgroundColor: '#7C7C7C',
    borderRadius: 6,
    marginTop: 10,
  },
  textInputButtonText: {
    color: '#fff',
    textAlign: 'center',
    lineHeight: heightScale * 50,
  },
  errorText: {
    color: 'red',
    marginLeft: 9,
    marginTop: 4,
  },
  inputWrapper: {
    paddingHorizontal: heightScale * 29,
    paddingBottom: heightScale * 37,
  },
  marginLeft: {
    marginLeft: heightScale * 12,
  },
  bottomBar: {
    width: '92%',
    borderBottomWidth: 2,
    borderBottomColor: '#D9D9D9',
    marginLeft: '4%',
    height: 0,
  },
  checkBox: {
    marginLeft: 20,
  },
  agreeText: {
    marginTop: 2,
    marginLeft: 12,
    color: '#fff',
  },
  check: {
    marginRight: 15,
    marginLeft: 25,
  },
  next: {
    marginLeft: 10 * heightData,
  },
  numResend: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14 * heightScale,
    color: '#fff',
    marginLeft: 10 * heightScale,
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
    width: 100 * heightScale,
    marginTop: 23 * heightScale,
  },
});
