import {FC, ReactPropTypes} from 'react';
import {StyleSheet, Text, View, ViewProps} from 'react-native';

/**
 * @description 팝업 활성 시, 배경 페이드아웃/Accessable Touch 기능 구현된 공통 컴포넌트
 * @returns
 */
export const PopupWrapper = ({PopupComponent}: {PopupComponent: JSX.Element}) => {
  return (
    <View style={styles.container}>
      {PopupComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(18, 18, 18, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

