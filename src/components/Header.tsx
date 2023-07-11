import React from "react";
import { Dimensions, StyleProp, StyleSheet, Text, View } from "react-native";
import { heightScale } from "../modules/MainStyles";
import { heightData } from "../modules/globalStyles";

// const Header: React.FC<{
//     title:string;
//     rightIcon: any;
//     leftIcon: any;
//   }> = ({...props}) => {
//     return (
//         <View>
//             <View style={HeaderStyle.headerStyle}>
//             <Text style={HeaderStyle.headerFontStyle}>방만들기</Text>
//             </View>
//             <IconAntDesign
//             name="left"
//             size={heightScale * 28}
//             color="white"
//             style={{
//                 position: 'absolute',
//                 marginTop: (heightScale * (61 - 28)) / 2,
//                 marginLeft: heightScale * 15,
//             }}
//             onPress={() => navigation.navigate('Home')}
//             />
//       </View>
//     )
// }

// export const HeaderStyle = StyleSheet.create({
//     container : {
//       height: height,
//       backgroundColor: 'black',
//     },
//     headerStyle: {
//       height: heightData * 63,
//       justifyContent: 'center',
//       alignItems: 'center',
//       borderBottomWidth: 1,
//       borderBottomColor: '#323232',
//     },
//     headerFontStyle: {
//       fontSize: heightData * 17,
//       fontWeight: 'bold',
//       color: 'white',
//       paddingVertical: heightData * 4.5,
//     },
//     headerLeftIcon: {
//       position: 'absolute',
//       marginTop: (heightData * (61 - 28)) / 2,
//       marginLeft: heightData * 15,
//     },
//     headerRightIcon: {
//       position: 'absolute',
//       right: heightData * 15,
//       top: (heightData * (61 - 28)) / 2,
//     }
//   });