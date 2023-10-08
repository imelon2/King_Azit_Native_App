import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, FlatList, Image, StyleSheet, Text, View, Pressable} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import MyTicketCarousel from './MyPageCompoents/MyTicketCarousel';
import TicketHistoryView from './MyPageCompoents/TicketHistoryView';
import {heightData, ticketsListType, widthData} from '@/modules';
import {HomeRootStackParamList, MyPageRootStackParamList} from 'AppInner';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {Ticket_Img} from '@/config';
import axios from 'axios';
import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/reducer';
import {Header} from '@/components';

const heightScale = heightData;

export type ticketHistory = {
  amount: number;
  date: string;
  summary: string;
  type: string;
};

function MyTicket(): JSX.Element {
  const navigation = useNavigation<NavigationProp<MyPageRootStackParamList & HomeRootStackParamList>>();
  const {red, black, gold} = useSelector((state: RootState) => state.ticket);
  const {access_token} = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);
  const [cache, setCache] = useState();

  const [selectCard, setSelectCard] = useState<ticketsListType>({
    type: '',
    image: '',
    count: 0,
  });

  const [LISTS, setLISTS] = useState<ticketHistory[]>([]);
  const [CARDS, setCARDS] = useState<ticketsListType[]>([
    {
      type: 'black',
      image: Ticket_Img['basic'].BlackCardImg,
      count: black,
    },
    {
      type: 'red',
      image: Ticket_Img['basic'].RedCardImg,
      count: red,
    },
    {
      type: 'gold',
      image: Ticket_Img['basic'].GoldCardImg,
      count: gold,
    },
  ]);

  useEffect(() => {
    const getTicketsUseHistory = async () => {
      try {
        setLoading(true);
        const getTicketsUseHistory = await axios.get(`${Config.API_URL}/member/ticket/history/use`, {
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        });
        setLISTS(getTicketsUseHistory.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getTicketsUseHistory();
  }, [cache]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="마이 티켓"
        leftIcon={() => (
          <IconAntDesign
            name="left"
            size={heightScale * 28}
            color="white"
            style={styles.headerLeftIcon}
            onPress={() => navigation.goBack()}
          />
        )}
      />

      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image style={styles.cardButtonStyle} source={require('@/assets/CardButton.png')} />
        <Image style={styles.lightImg} source={require('@/assets/light.png')} />
      </View>
      {/* 티켓 Carousel */}
      <View style={{marginTop: heightScale * 32}}>
        <MyTicketCarousel
          setSelectCard={setSelectCard}
          CARDS={CARDS}
          width={widthData * 154}
          height={heightScale * 227}
          gap={widthData * 30}
        />
      </View>
      {/* 티켓 보유 개수 */}
      <View style={{alignItems: 'center'}}>
        <Text style={styles.ticketInfoStyle}>보유 개수: {selectCard.count}장</Text>
      </View>
      {/* 선물하기 버튼 */}
      <View style={styles.giftWrapperStyle}>
        <Pressable
          style={styles.giftButtonStyle}
          onPress={() => {
            navigation.navigate('GiftTicket');
          }}>
          <Text style={styles.giftFontStyle}>선물하기</Text>
        </Pressable>
      </View>
      {/* 구매/결제 내역 contents */}
      <View style={{paddingHorizontal: heightScale * 24, flex: 1}}>
        {/* 구매/결제 내역 헤더 */}
        <View style={{flexDirection: 'row'}}>
          <Text style={[styles.fontStyle, styles.contentsStyle]}>사용내역</Text>
          <View style={{alignItems: 'flex-end', flex: 1}}>
            <Pressable style={styles.allViewWrapper} onPress={() => navigation.navigate('TicketsHistorys')}>
              <Text style={styles.allViewTextStyle}>더보기 </Text>
              <IconAntDesign name="right" size={heightScale * 14} color="white" />
            </Pressable>
          </View>
        </View>
        {/* 구매/결제 내역 리스트 */}
        {LISTS.length == 0 ? (
          <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 20 * heightScale}}>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Text style={{fontSize: 16, color: '#929292', fontWeight: '100'}}>티켓 없습니다.</Text>
            )}
          </View>
        ) : (
          <FlatList
            data={LISTS}
            keyExtractor={(_, index) => String(index)}
            bounces={false}
            renderItem={({item}) => <TicketHistoryView data={item} />}
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
  },
  headerLeftIcon: {
    position: 'absolute',
    marginTop: (heightData * (61 - 28)) / 2,
    marginLeft: heightData * 15,
  },
  fontStyle: {fontSize: heightScale * 15, fontWeight: 'bold', color: 'white'},
  headerStyle: {
    height: heightScale * 61,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#484848',
  },
  cardButtonStyle: {
    resizeMode: 'contain',
    width: heightScale * 210,
    height: widthData * 40,
    top: heightScale * 245,
    position: 'absolute',
  },
  lightImg: {
    resizeMode: 'contain',
    width: heightScale * 800,
    height: widthData * 160,
    top: heightScale * 190,
    position: 'absolute',
  },
  ticketInfoStyle: {
    paddingHorizontal: heightScale * 10,
    marginVertical: heightScale * 16,
    // backgroundColor: 'black',
    fontSize: heightScale * 13,
    // fontWeight: 'bold',
    color: 'white',
  },
  giftWrapperStyle: {
    alignItems: 'center',
    paddingBottom: heightScale * 50,
    borderBottomWidth: heightScale * 3,
    borderBottomColor: '#404040',
    marginTop: 35 * heightScale,
    // marginBottom: 50 * heightScale,
  },
  giftButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: widthData * 40,
    width: heightScale * 170,
    backgroundColor: '#F5FF82',
    borderRadius: 20,
  },
  giftFontStyle: {
    fontSize: heightScale * 15,
    fontWeight: '500',
    color: 'black',
  },
  contentsStyle: {
    paddingRight: heightScale * 19,
    paddingTop: heightScale * 17,
  },
  allViewWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: heightScale * 22,
  },
  allViewTextStyle: {
    fontSize: heightScale * 13,
    fontWeight: 'normal',
    color: 'white',
  },
});
export default MyTicket;
