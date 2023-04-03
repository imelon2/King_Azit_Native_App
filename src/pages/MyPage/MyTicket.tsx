import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
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
import ticketsList, {img, ticketsListType} from '../../modules/ticketsList';
import axios from 'axios';
import Config from 'react-native-config';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';
const heightScale = heightData;

export type ticketHistory = {
  amount:number;
  date:string;
  summary:string;
  type:string;
}

function MyTicket(): JSX.Element {
  const navigation =
    useNavigation<
      NavigationProp<MyPageRootStackParamList & HomeRootStackParamList>
    >();
    const {red, black, gold} = useSelector((state: RootState) => state.ticket);
    const {access_token} = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);
  const [giftModalState, setGiftModalState] = useState(false);
  const [selectCard, setSelectCard] = useState<ticketsListType>({
    type: '',
    image: '',
    count: 0,
  });

  const [LISTS, setLISTS] = useState<ticketHistory[]>([]);
  const [CARDS, setCARDS] = useState<ticketsListType[]>([
    {
      type: 'black',
      image: img['basic'].BlackCardImg,
      count: black,
    },
    {
      type: 'red',
      image: img['basic'].RedCardImg,
      count: red,
    },
    {
      type: 'gold',
      image: img['basic'].GoldCardImg,
      count: gold,
    },
  ]);

  useEffect(() => {
    const getTicketsUseHistory = async () => {
      try {
        setLoading(true)
          const getTicketsUseHistory = await axios.get(
              `${Config.API_URL}/member/ticket/history/use`,
              {
                  headers: {
                      authorization: `Bearer ${access_token}`,
                  },
              },
          );
          setLISTS(getTicketsUseHistory.data)
      } catch (error) {
          console.error(error);
      } finally {
        setLoading(false)
      }
  };
  getTicketsUseHistory();
  },[])


  return (
    <SafeAreaView style={styles.container}>
      <View>
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
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={styles.cardButtonStyle}
          source={require('../../assets/CardButton.png')}
        />
      </View>
      {/* 티켓 Carousel */}
      <View style={{marginTop: heightScale * 45}}>
        <MyTicketCarousel
          setSelectCard={setSelectCard}
          CARDS={CARDS}
          width={heightScale*200}
          height={heightScale*296}
          gap={heightScale*40}
        />
      </View>
      {/* 티켓 보유 개수 */}
      <View style={{alignItems: 'center'}}>
        <Text style={styles.ticketInfoStyle}>
          보유 개수: {selectCard.count}장
        </Text>
      </View>
      {/* 선물하기 버튼 */}
      <View style={styles.giftWrapperStyle}>
        <Shadow
          distance={5}
          startColor={selectCard.count === 0 ? '#828282' : '#FCFF72'}>
          <Pressable
            style={
              selectCard.count === 0
                ? [styles.giftButtonStyle, {backgroundColor: '#828282'}]
                : styles.giftButtonStyle
            }
            onPress={() => {
              if (selectCard.count !== 0) setGiftModalState(true);
            }}>
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
            <Pressable
              style={styles.allViewWrapper}
              onPress={() => navigation.navigate('TicketsHistorys')}>
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
        {LISTS.length == 0 ? (
          <View style={{justifyContent:'center',alignItems:'center',marginTop:30}}>
            {loading ? <ActivityIndicator /> :<Text style={{fontSize:16,color:'#929292',fontWeight:'100'}}>티켓 없습니다.</Text>}
          </View>
        ) : (
          <FlatList
            data={LISTS}
            keyExtractor={(_,index) => String(index)}
            bounces={false}
            renderItem={({item}) => <TicketHistoryView data={item} />}
          />
        )}
      </View>
      <View style={{height: heightScale * 15}}></View>
      {/* 선물하기 팝업창 */}
      {giftModalState ? (
        <GiftModal
          selectCard={selectCard}
          setSelectCard={setSelectCard}
          setGiftModalState={setGiftModalState}
        />
      ) : (
        <></>
      )}
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
  },
});
export default MyTicket;
