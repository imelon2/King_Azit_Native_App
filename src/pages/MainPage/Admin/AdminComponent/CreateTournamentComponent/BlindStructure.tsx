import { heightData, FontStyle, widthData, headerIconSize } from "@/modules";
import React from "react";
import { View, Text, TextInput, Alert } from "react-native";
import { styles } from "../../AdminStyles/NewTournamentStyles";
import IconFeather from 'react-native-vector-icons/Feather';

const BlindStructure = ({...props}) => {
    const {blind, index, onChangeBlind,removeBlindStruct, isAntes} = props;
    return (
      <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: heightData * 15}}>
        <Text style={[FontStyle.fs16, {width: widthData * 18}]}>{index + 1}</Text>
        <TextInput
          style={[
            FontStyle.fs16,
            blind.SB ? styles.textInputOn : styles.textInputOff,
            blind.SB ? styles.textFontOn : styles.textFontOff,
            styles.blindStructTitle,
            styles.blindStructTextinput,
          ]}
          keyboardType="number-pad"
          placeholderTextColor={'#929292'}
          onChangeText={(data) => onChangeBlind(data,index,'SB')}
          value={blind.SB}
          placeholder="100"
        />
        <TextInput
          style={[
            FontStyle.fs16,
            blind.BB ? styles.textInputOn : styles.textInputOff,
            blind.BB ? styles.textFontOn : styles.textFontOff,
            styles.blindStructTitle,
            styles.blindStructTextinput,
          ]}
          keyboardType="number-pad"
          placeholderTextColor={'#929292'}
          value={blind.BB}
          onChangeText={(data) => onChangeBlind(data,index,'BB')}
          placeholder="200"
        />
        <TextInput
          editable={isAntes}
          selectTextOnFocus={isAntes}
          style={[
            FontStyle.fs16,
            blind.Ante && isAntes ? styles.textInputOn : styles.textInputOff,
            blind.Ante && isAntes ? styles.textFontOn : styles.textFontOff,
            styles.blindStructTitle,
            styles.blindStructTextinput,
          ]}
          keyboardType="number-pad"
          placeholderTextColor={'#929292'}
          value={blind.Ante}
          onChangeText={(data) => onChangeBlind(data,index,'Ante')}
          placeholder="-"
        />
        <IconFeather
          name="trash-2"
          size={headerIconSize}
          color="white"
          onPress={() => removeBlindStruct(index)}
        />
      </View>
    );
  }

  export default BlindStructure;