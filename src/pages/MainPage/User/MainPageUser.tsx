import {useNavigation, NavigationProp} from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Text,
  FlatList,
  Pressable,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Swiper from 'react-native-swiper';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {
  HomeRootStackParamList,
  MyPageRootStackParamList,
} from '../../../../AppInner';
import {TicketType, img} from '../../../modules/ticketsList';
import {RootState} from '../../../store/reducer';
import {
  FontStyle,
  GlobalStyles,
  heightData,
  width,
  widthData,
} from '../../../modules/globalStyles';
import UpperString from '../../../modules/UpperString';
import Tournament, { TournamentInfoBoxDemo } from '../../../components/TournamentInfoBox';
import TournamentInfoBox from '../../../components/TournamentInfoBox';

function MainPageUser() {
  const navigation =
    useNavigation<
      NavigationProp<HomeRootStackParamList & MyPageRootStackParamList>
    >();
  const {black, red, gold} = useSelector((state: RootState) => state.ticket);
  const CARDS = [
    {
      type: 'black',
      image: img.width.BlackCardImg,
      count: black,
    },
    {
      type: 'red',
      image: img.width.RedCardImg,
      count: red,
    },
    {
      type: 'gold',
      image: img.width.GoldCardImg,
      count: gold,
    },
  ];

  let _gap = 16;
  let _offset = 50;
  let _width = width - (_gap + _offset) * 2;

  const images = [
    require('../../../assets/MainBanner.png'),
    require('../../../assets/MainBanner.png'),
  ];

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
        <View style={BannerStyle.imgSlideBox}>
          <Swiper
            horizontal={true}
            paginationStyle={{bottom: heightData * 5}}
            activeDot={<View style={BannerStyle.activeDot} />}
            dot={<View style={BannerStyle.dot} />}>
            {images.map((uri, index) => (
              <Image
                key={index}
                style={BannerStyle.imgSlideBox2}
                source={uri}
              />
            ))}
          </Swiper>
        </View>

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
                  style={{
                    resizeMode: 'stretch',
                    width: _width,
                    height: heightData * 130,
                    marginHorizontal: _gap / 2,
                    borderWidth: 1,
                    borderColor: '#A1A1A1',
                    borderRadius: 4,
                  }}
                  source={item.image}
                />
                <View style={{position: 'absolute', alignItems: 'center'}}>
                  <Text
                    style={{
                      color: 'white',
                      letterSpacing: 2,
                      fontSize: heightData * 12,
                      fontWeight: '500',
                    }}>
                    {UpperString(item.type)} Ticket
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: heightData * 9,
                      fontWeight: 'bold',
                    }}>
                    보유 : {item.count}
                  </Text>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    right: heightData * (_gap / 2 + 10),
                  }}>
                  <IconAntDesign
                    name="right"
                    size={heightData * 18}
                    color="white"
                  />
                </View>
              </Pressable>
            )}
          />
        </View>

        {/* 토너먼트 */}
        <View style={{marginTop: heightData * 60}}>
          <View style={styles.TextBox}>
            <Text
              style={[
                FontStyle.fs22,
                FontStyle.fwBold,
                {marginBottom: heightData * 32},
              ]}>
              토너먼트
            </Text>
            {/* 토너먼트 Info Box todo : 파라미터 받을 예정 */}
            {[1, 2, 3].map(() => {
              return (
                <View style={{marginBottom: heightData * 20}}>
                  <TournamentInfoBox Info={TournamentInfoBoxDemo}/>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const BannerStyle = StyleSheet.create({
  imgSlideBox: {
    height: heightData * 265,
  },
  imgSlideBox2: {
    width: width,
    height: heightData * 265,
    resizeMode: 'cover',
  },
  activeDot: {
    backgroundColor: '#484848',
    width: widthData * 27,
    height: heightData * 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  dot: {
    backgroundColor: '#484848',
    opacity: 0.5,
    width: widthData * 8,
    height: heightData * 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
});

const styles = StyleSheet.create({
  TextBox: {
    marginLeft: widthData * 18,
    marginBottom: heightData * 30,
  },
});
export default MainPageUser;
