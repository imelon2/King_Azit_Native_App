import { heightData, widthData } from "@/modules";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    titleStyle: {
      color: '#F5FF82',
    },
    titleWrapper: {flexDirection: 'row', alignItems: 'center'},
    iconStyle: {
      marginRight: widthData * 8,
    },
    textInput: {
      width: widthData * 320,
      height: heightData * 40,
      paddingVertical: heightData * 11,
      paddingLeft: widthData * 10,
      borderRadius: 4,
      marginTop: heightData * 12,
      backgroundColor: '#222222',
      borderWidth: 1,
    },
    textInputOn: {borderColor: '#F5FF82'},
    textInputOff: {borderColor: '#777777'},
    textFontOn: {color: '#fff'},
    textFontOff: {color: '#929292'},
    tableSelect: {
      flex: 1,
      backgroundColor: '#222',
      height: 40 * heightData,
      borderWidth: 1,
      borderRadius: 4,
      marginTop: 20 * heightData,
      justifyContent: 'center',
    },
    downIcon: {
      position: 'absolute',
      alignItems: 'center',
      right: widthData * 10,
    },
    blindContainer: {
      marginTop: 27 * heightData,
      backgroundColor: '#222222',
      borderWidth: 1,
      borderRadius:5,
      borderColor: '#F5FF82',
      width: 320 * widthData,
      height: 40 * heightData,
    },
    isAntesButtonWrapper: {
      width:widthData * 100,
      height : heightData * 40,
      borderWidth:1,
      borderRadius:4
    },
    isAntesTrue : {
        borderColor: '#CDD94A',
        backgroundColor:"#F5FF82"
    },
    isAntesFalse : {
        borderColor: '#777777',
        backgroundColor:"#222222"
    },
    blindStructTitle : {width: widthData * 80,marginRight:widthData * 12},
    blindStructTextinput : {
      height: heightData * 40,
      borderWidth: 1,
      borderRadius: 4,
      paddingHorizontal: 10,
    },
    blindAddLevelBtn : {
      top:heightData * 13,
      borderWidth:1,
      borderColor:'#F5FF82',
      backgroundColor:'#222222',
      borderRadius:5,
      width:widthData * 320, 
      height : heightData * 40,
      alignItems:'center',
      justifyContent:'center'
    }
  });