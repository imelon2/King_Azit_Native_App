import React from 'react';

import {
  StyleSheet,
  Text,
  Linking,
  Pressable
} from 'react-native';

import QRCodeScanners from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { HomeRootStackParamList } from '../../../../AppInner';

const QRCodeScanner = () => {
  const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();
  const onSuccess = (e:any) => {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured QRCodeScanner', err)
    );
  }

  return (
    <QRCodeScanners
    onRead={onSuccess}
    flashMode={RNCamera.Constants.FlashMode.off}
    showMarker={true}
    containerStyle={{backgroundColor:'black'}}
    topContent={
      <Pressable onPress={() => navigation.navigate('Home')}>
      <Text style={styles.centerText}>
        뒤로가기
      </Text>
      </Pressable>
    }
  />
  )
}

const styles = StyleSheet.create({
  centerText: {
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});

export default QRCodeScanner