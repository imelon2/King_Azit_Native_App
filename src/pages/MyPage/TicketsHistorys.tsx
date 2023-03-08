import {NavigationProp, useNavigation} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet, Pressable, Image, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  MyPageRootStackParamList,
  HomeRootStackParamList,
} from '../../../AppInner';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

import {heightData} from '../../modules/globalStyles';
import TicketHistoryViewDetail from './MyPageCompoents/TicketHistoryViewDetail';
const heightScale = heightData;

const ContentsList = [
  {
    type: 'black',
    count: '3',
    content: 'Main Game',
    date: '2022.02.15',
  },
  {
    type: 'black',
    count: '3',
    content: 'Main Game',
    date: '2022.02.15',
  },
  {
    type: 'red',
    count: '3',
    content: 'Main Game',
    date: '2022.02.15',
  },
  {
    type: 'gold',
    count: '3',
    content: 'Main Game',
    date: '2022.02.15',
  },
  {
    type: 'gold',
    count: '3',
    content: 'Main Game',
    date: '2022.02.15',
  },
  {
    type: 'gold',
    count: '3',
    content: 'Main Game',
    date: '2022.02.15',
  },
  {
    type: 'gold',
    count: '3',
    content: 'Main Game',
    date: '2022.02.15',
  },
  {
    type: 'black',
    count: '3',
    content: 'Main Game',
    date: '2022.02.15',
  },
  {
    type: 'red',
    count: '3',
    content: 'Main Game',
    date: '2022.02.15',
  },
  {
    type: 'gold',
    count: '3',
    content: 'Main Game',
    date: '2022.02.15',
  },
  {
    type: 'black',
    count: '3',
    content: 'Main Game',
    date: '2022.02.15',
  },
  {
    type: 'red',
    count: '3',
    content: 'Main Game',
    date: '2022.02.15',
  },
  {
    type: 'gold',
    count: '3',
    content: 'Main Game',
    date: '2022.02.15',
  },
];

const LISTS = [...Array(ContentsList.length).keys()].map((_, i) => {
  return {
    key: i,
    data: ContentsList[i],
  };
});

function TicketsHistorys() {
  const navigation =
    useNavigation<
      NavigationProp<MyPageRootStackParamList & HomeRootStackParamList>
    >();
  return (
    <SafeAreaView style={styles.container}>
      <View>
        
      <View style={styles.headerStyle}>
        <Text style={styles.fontStyle}>전체 사용 내역</Text>
      </View>
      <IconAntDesign
        name="left"
        size={heightScale * 28}
        color="white"
        style={styles.beforeIcon}
        onPress={() => navigation.goBack()}
        />
      <Pressable
        style={styles.FadersBox}
        // onPress={() => setModalStatus(true)}
        >
        <Image
          source={require('../../assets/FadersHorizontal.png')}
          style={styles.Faders}
          />
      </Pressable>
        </View>
      {/* 리스트 */}
      <View>
        {LISTS.length === 0 ? (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 30,
            }}>
            <Text style={{fontSize: 16, color: '#929292', fontWeight: '100'}}>
              티켓 사용 내역이 없습니다.
            </Text>
          </View>
        ) : (
          <FlatList
            data={LISTS}
            style={{marginBottom:heightScale*30}}
            keyExtractor={item => String(item.key)}
            bounces={false}
            renderItem={({item}) => (
              <TicketHistoryViewDetail data={item.data} />
            )}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'black',
    paddingBottom: heightScale * 40,
  },
  fontStyle: {fontSize: heightScale * 18, fontWeight: 'bold', color: 'white'},
  headerStyle: {
    height: heightScale * 61,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#999999',
  },
  beforeIcon: {
    position: 'absolute',
    marginTop: (heightScale * (61 - 28)) / 2,
    marginLeft: heightScale * 15,
  },
  Faders: {
    width: heightScale * 32,
    height: heightScale * 32,
  },
  FadersBox: {
    position: 'absolute',
    right: 0,
    marginTop: (heightScale * (61 - 28)) / 2,
    marginRight: heightScale * 15,
  },
});
export default TicketsHistorys;
