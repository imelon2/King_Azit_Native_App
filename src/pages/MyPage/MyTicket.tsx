import React, {useEffect, useState} from 'react';
import {
  TextInput,
  SafeAreaView,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import MyTicketCarousel from './MyPageCompoents/MyTicketCarousel';
import TicketHistoryView from './MyPageCompoents/TicketHistoryView';
import {Shadow} from 'react-native-shadow-2';
import {heightData} from '../../modules/globalStyles';
import {
  HomeRootStackParamList,
  MyPageRootStackParamList,
} from '../../../AppInner';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import GiftModal from './MyPageCompoents/GiftModal';
import ticketsList,{ticketsListType} from '../../modules/ticketsList';
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
];

const LISTS = [...Array(ContentsList.length).keys()].map((_, i) => {
  return {
    key: i,
    data: ContentsList[i],
  };
});

function MyTicket(): JSX.Element {
  const navigation =
    useNavigation<
      NavigationProp<MyPageRootStackParamList & HomeRootStackParamList>
    >();
  const [loading, setLoading] = useState(false);
  const [giftModalState, setGiftModalState] = useState(false); 
  const [selectCard, setSelectCard] = useState<ticketsListType>({
    key:0,
    type:"",
    image:"",
    count:0
  });
  const CARDS = ticketsList();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerStyle}>
        <Text style={styles.fontStyle}>마이 티켓</Text>
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
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={styles.cardButtonStyle}
          source={require('../../assets/CardButton.png')}
        />
      </View>
      {/* 티켓 Carousel */}
      <View style={{marginTop: heightScale * 16}}>
        <MyTicketCarousel
          setSelectCard={setSelectCard}
          data={CARDS}
          width={200}
          height={296}
          gap={40}
        />
      </View>
      {/* 티켓 보유 개수 */}
      <View style={{alignItems: 'center'}}>
        <Text style={styles.ticketInfoStyle}>보유 개수: {selectCard.count}장</Text>
      </View>
      {/* 선물하기 버튼 */}
      <View style={styles.giftWrapperStyle}>
        <Shadow distance={5} startColor={'#FCFF72'}>
          <Pressable
            style={styles.giftButtonStyle}
            onPress={() => setGiftModalState(true)}>
            <Text style={styles.giftFontStyle}>선물하기</Text>
          </Pressable>
        </Shadow>
      </View>
      {/* 구매/결제 내역 contents */}
      <View style={{paddingHorizontal: heightScale * 24, flex: 1}}>
        {/* 구매/결제 내역 헤더 */}
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.fontStyle, styles.contentsStyle]}>사용내역</Text>
          <View style={{alignItems: 'flex-end', flex: 1}}>
            <Pressable style={styles.allViewWrapper}>
              <Text style={styles.allViewTextStyle}>더보기 </Text>
              <IconAntDesign
                name="right"
                size={heightScale * 14}
                color="white"
              />
            </Pressable>
          </View>
        </View>
        {/* 구매/결제 내역 리스트 */}
        <FlatList
          data={LISTS}
          keyExtractor={item => String(item.key)}
          bounces={false}
          renderItem={({item}) => <TicketHistoryView data={item.data} />}
        />
      </View>
      <View style={{height: heightScale * 41}}></View>
      {/* 선물하기 팝업창 */}
      {giftModalState ? <GiftModal selectCard={selectCard} setGiftModalState={setGiftModalState}/> : <></>}
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
  cardButtonStyle: {
    resizeMode: 'contain',
    width: heightScale * 279,
    height: heightScale * 104,
    top: heightScale * 260,
    position: 'absolute',
  },
  ticketInfoStyle: {
    paddingHorizontal: heightScale * 10,
    marginVertical: heightScale * 34.5,
    backgroundColor: 'black',
    fontSize: heightScale * 14,
    fontWeight: 'bold',
    color: 'white',
  },
  giftWrapperStyle: {
    alignItems: 'center',
    paddingBottom: heightScale * 20,
    borderBottomWidth: heightScale * 5,
    borderBottomColor: '#404040',
  },
  giftButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: heightScale * 46 - 5,
    width: heightScale * 200 - 5,
    backgroundColor: '#F5FF82',
    borderRadius: 30,
  },
  giftFontStyle: {
    fontSize: heightScale * 17,
    fontWeight: 'bold',
    color: 'black',
  },
  contentsStyle: {
    paddingRight: heightScale * 35,
    paddingVertical: heightScale * 22,
  },
  allViewWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: heightScale * 22,
  },
  allViewTextStyle: {
    fontSize: heightScale * 14,
    fontWeight: 'normal',
    color: 'white',
  }
});
export default MyTicket;
