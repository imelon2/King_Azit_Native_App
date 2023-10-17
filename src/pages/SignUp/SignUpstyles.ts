import {widthData, heightData} from '@/modules';
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
    borderBottomWidth: 2 * widthData,
    borderBottomColor: '#F5FF82',
    top: 0,
    left: 0,
  },
  topbar: {
    borderBottomWidth: 2 * widthData,
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
    fontSize: heightScale * 20,
    color: '#B9B9B9',
  },
  termstext2: {
    fontSize: heightScale * 26,
    color: '#fff',
    marginTop: 4,
  },
  textInput: {
    fontSize: heightScale * 14,
    width: '85%',
    paddingHorizontal: 10,
    paddingBottom: 3,
    color: '#fff',
  },
  textInputNumBox: {
    width: 46 * widthData,
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
  errorText: {
    color: 'red',
    marginLeft: 9,
    marginTop: 4,
  },
  inputWrapper: {
    paddingHorizontal: widthData * 29,
    paddingBottom: heightScale * 37,
  },
  marginLeft: {
    marginLeft: widthData * 12,
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
    marginLeft: 10 * widthData,
  },
  numResend: {
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 14 * heightScale,
    color: '#fff',
    // marginLeft: 10 * heightScale,
    borderBottomColor: '#D9D9D9',
    borderBottomWidth: 1,
    // width: 100 * widthData,
    // marginTop: 23 * heightScale,
  },
});
