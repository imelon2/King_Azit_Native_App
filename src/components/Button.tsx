import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {FontStyle, heightData, widthData} from '../modules/globalStyles';

export const BottomButton: React.FC<{
  title: string;
  backgroundColor: string;
  color: string;
  onPress?: any;
  leftIcon?: any;
}> = ({...props}) => {
  return (
    <Pressable onPress={() => props.onPress()} style={{flex:1,justifyContent:'flex-end'}}>
      <View
        style={[{backgroundColor: props.backgroundColor}, styles.container]}>
        <Text style={[FontStyle.fs16, FontStyle.fw600, {color: props.color}]}>
          {props.title}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 320 * widthData,
    height: 54 * heightData,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6
  },
});
