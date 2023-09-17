import React from 'react';
import {ImageStyle, StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {heightScale} from '../modules/MainStyles';

const Rectangle: React.FC<{
  type: 'straight' | 'big';
  scale: number;
  color: string;
  componentStyle?: StyleProp<ViewStyle>;
}> = ({...props}) => {
  return (
    <>
      {props.type == 'big' && (
        <View
          style={[
            styles.Edge,
            {
              width: heightScale * props.scale,
              height: heightScale * props.scale,
              backgroundColor: props.color,
            },
            props.componentStyle
          ]}></View>
      )}
      {props.type == 'straight' && (
        <View style={{flexDirection: 'row'}}>
          <View
            style={[
              styles.Edge,
              {
                width: heightScale * props.scale,
                height: heightScale * props.scale,
                backgroundColor: props.color,
              },
            ]}></View>
          <View
            style={[
              styles.Edge,
              {
                width: heightScale * props.scale,
                height: heightScale * props.scale,
                backgroundColor: props.color,
              },
            ]}></View>
          <View
            style={[
              styles.Edge,
              {
                width: heightScale * props.scale,
                height: heightScale * props.scale,
                backgroundColor: props.color,
              },
            ]}></View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  Edge: {
    transform: [{rotate: '45deg'}],
    // backgroundColor: '#F5FF82',
  },
});

export default Rectangle;
