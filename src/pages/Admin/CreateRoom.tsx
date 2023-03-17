import {useNavigation, NavigationProp} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {
  MyPageRootStackParamList,
  HomeRootStackParamList,
} from '../../../AppInner';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {heightData} from '../../modules/globalStyles';
const heightScale = heightData;
function CreateRoom() {
  const navigation =
    useNavigation<
      NavigationProp<MyPageRootStackParamList & HomeRootStackParamList>
    >();
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.headerStyle}>
          <Text style={styles.fontStyle}>방만들기</Text>
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '121212',
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
export default CreateRoom;
