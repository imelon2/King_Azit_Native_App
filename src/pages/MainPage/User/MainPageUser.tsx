import {useNavigation, NavigationProp} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView, ScrollView, View, Image, Text, FlatList, Pressable, StyleSheet} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {HomeRootStackParamList, MyPageRootStackParamList} from 'AppInner';
import {RootState} from '@/store/reducer';
import {FontStyle, GlobalStyles, heightData, width, widthData, UpperString} from '@/modules';
import {TournamentInfoBoxDemo, TournamentInfoBox, Banner} from '@/components';
import {UserStyle} from './UserStyle';
import { TicketType, Ticket_Img } from '@/config/tickets';

function MainPageUser() {
  const navigation = useNavigation<NavigationProp<HomeRootStackParamList & MyPageRootStackParamList>>();
  const {black, red, gold} = useSelector((state: RootState) => state.ticket);
  const CARDS = [
    {
      type: 'black',
      image: Ticket_Img.width.BlackCardImg,
      count: black,
    },
    {
      type: 'red',
      image: Ticket_Img.width.RedCardImg,
      count: red,
    },
    {
      type: 'gold',
      image: Ticket_Img.width.GoldCardImg,
      count: gold,
    },
  ];

  let _gap = 16;
  let _offset = 50;
  let _width = width - (_gap + _offset) * 2;

  // MyTickets 네비게이터
  const onOpenMyTikets = (text: TicketType) => {
    let _count: number = 0;
    if (text === 'black') {
      _count = black;
    } else if (text === 'red') {
      _count = red;
    } else if (text === 'gold') {
      _count = gold;
    }

    if (_count == 0) {
      return;
    }
    navigation.navigate('MyTickets', {card: text, count: _count});
  };

  return (
    <SafeAreaView style={[GlobalStyles.container, {flex: 1}]}>
      <ScrollView bounces={false}>
        {/* 배너 */}
        <Banner />
        {/* 보유 티켓 */}
        <View style={{marginTop: heightData * 60}}>
          <View style={styles.TextBox}>
            <Text style={[FontStyle.fs22, FontStyle.fwBold]}>보유 티켓</Text>
          </View>
          <FlatList
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            automaticallyAdjustContentInsets={false}
            snapToInterval={_width + _gap}
            snapToAlignment="start"
            decelerationRate="fast"
            bounces={false}
            data={CARDS}
            keyExtractor={(_, index) => String(index)}
            contentContainerStyle={{
              paddingHorizontal: _offset + _gap / 2,
            }}
            renderItem={({item}: {item: any}) => (
              <Pressable
                key={item.key}
                onPress={() => onOpenMyTikets(item.type)}
                style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  style={[UserStyle.userTicketImg, {width: _width, marginHorizontal: _gap / 2}]}
                  source={item.image}
                />
                <View style={{position: 'absolute', alignItems: 'center'}}>
                  <Text style={UserStyle.userTicketText}>{UpperString(item.type)} Ticket</Text>
                  <Text style={UserStyle.userTicketTextSub}>보유 : {item.count}</Text>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    right: heightData * (_gap / 2 + 10),
                  }}>
                  <IconAntDesign name="right" size={heightData * 18} color="white" />
                </View>
              </Pressable>
            )}
          />
        </View>

        {/* 토너먼트 */}
        <View style={{marginTop: heightData * 60}}>
          <View style={styles.TextBox}>
            <Text style={[FontStyle.fs22, FontStyle.fwBold, {marginBottom: heightData * 32}]}>토너먼트</Text>
            {/* 토너먼트 Info Box todo : 파라미터 받을 예정 */}
            {[1, 2, 3].map((_, i) => {
              return (
                <View key={i} style={{marginBottom: heightData * 20}}>
                  <TournamentInfoBox Info={TournamentInfoBoxDemo} />
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  TextBox: {
    marginLeft: widthData * 18,
    marginBottom: heightData * 30,
  },
});
export default MainPageUser;
