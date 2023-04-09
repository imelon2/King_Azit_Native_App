import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {heightData} from '../../../modules/globalStyles';
const heightScale = heightData;
const GiftAlert = () => {
    return(
        <View style={styles.container}>
        {/* Header */}
        <View style={styles.wrapper}>
          <Text style={styles.fontStyle}>선물 전송 성공 알림 페이지</Text>
        </View>
        </View>
    )
}

export default GiftAlert

const styles = StyleSheet.create({
    container: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: 'rgba(12, 12, 12, 0.8)',
      alignItems: 'center',
    },
    wrapper: {
      width: heightScale * 380,
      height: heightScale * 430,
      backgroundColor: '#353535',
      top: heightScale * 128,
      borderRadius: 20,
      alignItems: 'center',
    },
    fontStyle : {
        color:'#fff',
        fontSize:20
    }
})