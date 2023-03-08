import { widthData, heightData } from './globalStyles'
import { Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get('window');
const heightScale = heightData;

export const SignUpstyles = StyleSheet.create({
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
    width: 110,
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
    fontSize: heightScale * 23,
    marginLeft: 20,
    marginTop: 20,
    color: '#fff',
    marginBottom: heightScale * 74,
  },
  termsBox: {
    flexDirection: 'row',
    marginTop: 17,
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
    marginTop: 7,
  },
  textInput: {
    fontSize: heightScale * 18,
    width: '85%',
    paddingHorizontal: 10,
    paddingBottom: 3,
    color: '#fff'
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
    paddingBottom: heightScale * 57,
  },
  marginLeft: {
    marginLeft: heightScale * 12,
  }
});
