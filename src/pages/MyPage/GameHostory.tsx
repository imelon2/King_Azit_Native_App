import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  HomeRootStackParamList,
  MyPageRootStackParamList,
} from '../../../AppInner';
import {heightData} from '../../modules/globalStyles';
const heightScale = heightData;

function GameHostory() {
  const navigation =
    useNavigation<
      NavigationProp<MyPageRootStackParamList & HomeRootStackParamList>
    >();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerStyle}>
        <Text style={styles.fontStyle}>게임 참여 기록</Text>
      </View>
      <IconAntDesign
        name="left"
        size={heightScale * 28}
        color="white"
        style={{
          position: 'absolute',
          marginTop: (heightScale * (61 - 28)) / 2,
          marginLeft: heightScale * 15,
        }}
        onPress={() => navigation.goBack()}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'black',
  },
  fontStyle: {fontSize: heightScale * 18, fontWeight: 'bold', color: 'white'},
  headerStyle: {
    height: heightScale * 61,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#484848',
  },
});
export default GameHostory;
