import { widthData, heightData } from './globalStyles'
import { Dimensions,  StyleSheet  } from "react-native";
const { width, height } = Dimensions.get('window');
const heightScale = heightData;

export const SignUpstyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    leftIcon: {
        marginTop: 15,
        marginLeft: 15,
        marginBottom: 15,
    },
    progress: {
        position: 'absolute',
        borderBottomWidth: 2,
        borderBottomColor: '#000',
        width: 110,
        top: 0,
        left: 0,
    },
    progress2: {
        width: 150,
    },
    progress3: {
        width: 190,
    },
    progress4: {
        width: 230,
    },
    progress5: {
        width: 270,
    },
    topbar: {
        borderBottomWidth: 2,
        borderBottomColor: '#D9D9D9',
    },
    terms: {
        fontSize: heightScale * 23,
        marginLeft: 20,
        marginTop: 20,
        color: '#000',
        marginBottom: heightScale * 74,
    },
    termsBox: {
        flexDirection: 'row',
        marginTop: 17,
        height: 30,
        lineHeight: 30,
    },
    nextButton: {
        position: 'absolute',
        bottom: 30,
        width: '92%',
        textAlign: 'center',
        color: '#000',
        backgroundColor: '#D9D9D9',
        height: heightScale * 70,
        lineHeight: heightScale * 70,
        borderRadius: 16,
        marginLeft: '4%',
        fontSize: 20,
      },
      nextButton2: {
        backgroundColor: '#29a6fb',
        color: 'white',
      },
      nextButton3: {
        bottom: -135,
        display:'none',
        opacity:0,
      },
      termstext: {
        fontSize: heightScale * 26,
        color: '#000',
      },
      termstext2: {
        fontSize: heightScale * 26,
        color: '#000',
        marginTop: 7,
      },
      textInput: {
        fontSize: heightScale * 18,
        width: '85%',
        paddingHorizontal: 10,
        paddingBottom: 3,
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
        flex:1,
        height: heightScale * 50,
        lineHeight:heightScale * 50,
        backgroundColor: '#7C7C7C',
        borderRadius:6,
        marginTop: 10,
      },
      textInputButtonText: {
        color:'#fff',
        textAlign:'center',
        lineHeight:heightScale * 50,
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
});
