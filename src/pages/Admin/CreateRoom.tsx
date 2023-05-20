import {useNavigation, NavigationProp} from '@react-navigation/native';
import React from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  MyPageRootStackParamList,
  HomeRootStackParamList,
} from '../../../AppInner';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {HeaderStyle, heightData} from '../../modules/globalStyles';
import {MainStyles} from '../../modules/MainStyles';
import GameList from '../MainPage/Compoents/GameList';
const heightScale = heightData;

function CreateRoom() {
  const navigation =
    useNavigation<
      NavigationProp<MyPageRootStackParamList & HomeRootStackParamList>
    >();
  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <View>
        <View style={HeaderStyle.headerStyle}>
          <Text style={HeaderStyle.headerFontStyle}>방만들기</Text>
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
          onPress={() => navigation.navigate('Home')}
        />
      </View>
      <ScrollView bounces={false}>
      {/* 방 만들기 */}
      <View style={{alignItems: 'center', marginTop: heightScale * 41}}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => navigation.navigate('RoomMake')}
          style={styles.createRoomBtnWrapper}>
          <View style={{borderRadius: 50, backgroundColor: '#F5FF82'}}>
            <Text style={styles.createRoomBtnText}>방 만들기</Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* Game */}
      <View style={{marginTop: heightScale * 60}}>
        {/* Header */}
        <View style={MainStyles.mainTextBox2}>
          <TouchableOpacity activeOpacity={1}>
            <Text style={MainStyles.mainText}>Game</Text>
          </TouchableOpacity>
        </View>

        {/* 게임 현재 리스트 */}
        <GameList />
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#121212',
  },
  createRoomBtnWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#222222',
    width: heightScale * 380,
    height: heightScale * 220,
    borderWidth: 1,
    borderColor: '#F5FF82',
    borderRadius: 5,
  },
  createRoomBtnText: {
    fontSize: heightScale * 16,
    paddingVertical: heightScale * 15,
    paddingHorizontal: heightScale * 30,
    color: 'black',
  },
});
export default CreateRoom;
