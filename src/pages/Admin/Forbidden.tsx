import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import {View, Text, StyleSheet, Image, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import { MyPageRootStackParamList, HomeRootStackParamList } from '../../../AppInner';
import {heightData} from '../../modules/globalStyles';
const heightScale = heightData;

type AdminScreenProps = NativeStackScreenProps<
  HomeRootStackParamList,
  'Forbidden'
>;

function Forbidden({route,navigation}:AdminScreenProps) {
    
  return (
    <SafeAreaView style={styles.container}>
        <View style={{alignItems:'center',marginTop:heightScale*180}}>
      <Image
        source={require('../../assets/MainLogo.png')}
        style={styles.mainLogo}
        />
        </View>
        <View style={{alignItems:'center',marginTop:heightScale*70}}>
            <Text style={styles.fontStyle}>{route.params.message}</Text>
        </View>
        <View style={styles.buttonWrapper}>
          <Pressable
            style={styles.buttonStyle
            }
            onPress={() => navigation.navigate('Home')}
            >
            <Text
              style={styles.buttonText
              }>
              홈으로
            </Text>
          </Pressable>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'black',
  },
  fontStyle: {fontSize: heightScale * 18, fontWeight: 'bold', color: 'white'},
  mainLogo: {
    width: heightScale * 280,
    height: heightScale * 205,
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: heightScale * 12,
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: heightScale * 390,
    height: heightScale * 64,
    backgroundColor: '#F5FF82',
    borderRadius: 4,
  },
  buttonText: {
    fontSize: heightScale * 20,
    fontWeight: '400',
    color: '#000',
  },
});
export default Forbidden;
