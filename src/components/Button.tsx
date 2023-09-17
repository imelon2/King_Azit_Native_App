import React from 'react';
import {Pressable, StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {FontStyle, heightData, widthData} from '../modules/globalStyles';

export const BottomButton: React.FC<{
  title: string;
  backgroundColor: string;
  color: string;
  onPress?: any;
  leftIcon?: any;
}> = ({...props}) => {
  return (
    <Pressable onPress={() => props.onPress()}>
      <View
        style={[{backgroundColor: props.backgroundColor}, styles.container]}>
        <Text style={[FontStyle.fs16, FontStyle.fw600, {color: props.color}]}>
          {props.title}
        </Text>
      </View>
    </Pressable>
  );
};

export const BottomMaxButton: React.FC<{
  title: string;
  backgroundColor: string;
  color: string;
  onPress?: any;
  leftIcon?: any;
  componentStyle?:StyleProp<ViewStyle>;
}> = ({...props}) => {
  return (
    <Pressable onPress={() => props.onPress()} style={[styles.container,{backgroundColor: props.backgroundColor,width:'100%',borderRadius:0},props.componentStyle]}>
        <Text style={[FontStyle.fs16, FontStyle.fw600, {color: props.color}]}>
          {props.title}
        </Text>
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
