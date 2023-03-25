import {useNavigation, NavigationProp} from '@react-navigation/native';
import axios, { AxiosError } from 'axios';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Image,
  Text,
  FlatList,
  Pressable,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Swiper from 'react-native-swiper';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {
  HomeRootStackParamList,
  MyPageRootStackParamList,
} from '../../../../AppInner';
import {MainStyles, heightScale} from '../../../modules/MainStyles';
import ticketsList, {ticketsListType} from '../../../modules/ticketsList';
import {RootState} from '../../../store/reducer';
import GameList from './GameList';
const {width} = Dimensions.get('window');

function MainPageUser() {
  const navigation =
    useNavigation<
      NavigationProp<HomeRootStackParamList & MyPageRootStackParamList>
    >();
  const {black, red, gold} = useSelector((state: RootState) => state.ticket);
  const CARDS = ticketsList('width');

  let _gap = 40;
  let _offset = 22;
  let _width = width - (_gap + _offset) * 2;

  const images = [
    `https://source.unsplash.com/1024x768/?nature`,
    'https://source.unsplash.com/1024x768/?water',
    'https://source.unsplash.com/1024x768/?girl',
    'https://source.unsplash.com/1024x768/?tree',
  ];

  // MyTickets 네비게이터
  const onOpenMyTikets = (text: any) => {
    let _count: number = 0;
    if (text === 'Black') {
      _count = black;
    } else if (text === 'Red') {
      _count = red;
    } else if (text === 'Gold') {
      _count = gold;
    }

    if (_count == 0) {
      return;
    }
    navigation.navigate('MyTickets', {card: text, count: _count});
  };
  return (
    <SafeAreaView style={MainStyles.container}>
      <ScrollView bounces={false}>
        {/* 배너 */}
        <View style={MainStyles.imgSlideBox}>
          <Swiper
            horizontal={true}
            paginationStyle={{bottom: heightScale * 5}}
            activeDot={
              <View
                style={{
                  backgroundColor: '#484848',
                  width: 27,
                  height: 8,
                  borderRadius: 4,
                  marginLeft: 3,
                  marginRight: 3,
                  marginTop: 3,
                  marginBottom: 3,
                }}
              />
            }
            dot={
              <View
                style={{
                  backgroundColor: '#484848',
                  opacity: 0.5,
                  width: 8,
                  height: 8,
                  borderRadius: 4,
                  marginLeft: 3,
                  marginRight: 3,
                  marginTop: 3,
                  marginBottom: 3,
                }}
              />
            }>
            {images.map((uri, index) => (
              <Image
                key={index}
                style={MainStyles.imgSlideBox2}
                source={{uri: uri}}
              />
            ))}
          </Swiper>
        </View>

        {/* My Tickets */}
        <View style={{marginTop: heightScale * 60}}>
          <View style={MainStyles.mainTextBox2}>
            <Text style={MainStyles.mainText}>My Tikets</Text>
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
            keyExtractor={item => item.key.toString()}
            contentContainerStyle={{
              paddingHorizontal: _offset + _gap / 2,
            }}
            renderItem={({item}: {item: ticketsListType}) => (
              <Pressable
                key={item.key}
                onPress={() => onOpenMyTikets(item.type)}
                style={{justifyContent: 'center', alignItems: 'center'}}>
                <Image
                  style={{
                    resizeMode: 'stretch',
                    width: _width,
                    height: heightScale * 165,
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
                      fontSize: heightScale * 16,
                      fontWeight: '500',
                    }}>
                    {item.type} Ticket
                  </Text>
                  <Text
                    style={{
                      color: 'white',
                      fontSize: heightScale * 14,
                      fontWeight: '500',
                    }}>
                    보유 : {item.count}
                  </Text>
                </View>
                <View
                  style={{
                    position: 'absolute',
                    right: heightScale * (_gap / 2 + 10),
                  }}>
                  <IconAntDesign
                    style={{flex: 1}}
                    name="right"
                    size={heightScale * 18}
                    color="white"
                  />
                </View>
              </Pressable>
            )}
          />
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

export default MainPageUser;
