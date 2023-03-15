import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import { Text, View, Image, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, FlatList, Pressable } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HomeRootStackParamList, MyPageRootStackParamList } from '../../../AppInner';
import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper';
import MemberModal from './MainPageModal/MemberModal';
import GuestJoin from './MainPageModal/GuestJoin';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { heightScale, MainStyles } from '../../modules/MainStyles';
import getProfileImage from '../../hooks/getProfileImage';
import getTickets from '../../hooks/getTickets';
import MainPageAdmin from './Compoents/MainPageAdmin';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/reducer';
import ticketsList, {ticketsListType} from '../../modules/ticketsList';
import useSocket from '../../hooks/useSocket';
import GameBox, { roomType } from './MainPageModal/GameBox';
const {width} = Dimensions.get('window');


function MainPage() {
  const navigation =
    useNavigation<
      NavigationProp<HomeRootStackParamList & MyPageRootStackParamList>
    >();
  const { roles } = useSelector((state: RootState) => state.user);
  // Only ROLE_ADMIN
  const isAdmin = roles.find((e: string) => e == 'ROLE_ADMIN');
  const [socket, disconnect] = useSocket();
  const [menu, setMenu] = useState([
    {name: '진행중', state: true},
    {name: '대기중', state: false},
    {name: '마감', state: false},
  ]);
  const [gameBox, setGameBox] = useState<roomType[]>();

  const [modalStatus, setModalStatus] = useState(false);
  // const [tiketModalStatus, setTiketModalStatus] = useState(false);
  const [playMemberStatus, setPlayMemberStatus] = useState(false);
  // const [myCard, setMyCard] = useState('');
  const { black, red, gold } = useSelector((state: RootState) => state.ticket);
  const CARDS = ticketsList('width');

  let _gap = 40;
  let _offset = 22;
  let _width = width - (_gap + _offset) * 2;


  useEffect(() => {
    const getGameRoomList = (data: any) => {
      console.log(data);
      
      const arr: roomType[] = new Array();
      Object.keys(data).map(key => {
        arr.push(data[key]);
      });
      setGameBox([...arr]);
    };

    if (socket) {
      socket.emit('getGameRoomList', 'init');
      socket.on('getGameRoomList', getGameRoomList);
      // socket.on('getMessage', callback);
    }
    return () => {
      console.log('off getGameRoomList');
      
      socket?.off('getGameRoomList')
    }
  }, [socket]);

  const onClickMember = () => {
    setPlayMemberStatus(true);
  };

  const onClickJoinButton = () => {
    setModalStatus(true);
  };

  const onMemu = (text: string) => {
    const currentMunu = [...menu];
    currentMunu.map(item => {
      if (item.name === text) {
        item.state = true;
      } else {
        item.state = false;
      }
    });
    setMenu(currentMunu);
  };

  // MyTickets 네비게이터
  const onOpenMyTikets = (text: any) => {
    let _count: number = 0;
    if (text === 'black') {
      _count = black;
    } else if (text === 'red') {
      _count = red;
    } else if (text === 'gold') {
      _count = gold;
    }
    navigation.navigate('MyTickets', { card: text, count: _count });
  };
  // 현재 유저 보유 티켓 가져오기
  getTickets();
  // 현재 유저 프로필 이미지 가져오기
  getProfileImage();

  const images = [
    `https://source.unsplash.com/1024x768/?nature`,
    'https://source.unsplash.com/1024x768/?water',
    'https://source.unsplash.com/1024x768/?girl',
    'https://source.unsplash.com/1024x768/?tree',
  ];
  return (
    <SafeAreaView style={MainStyles.container}>
      {isAdmin && <MainPageAdmin />}
      {!isAdmin &&
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
          <View style={{ marginTop: heightScale * 60 }}>
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
              renderItem={({ item }: { item: ticketsListType }) => (
                <Pressable
                  key={item.key}
                  onPress={() => onOpenMyTikets(item.type)}
                  style={{ justifyContent: 'center', alignItems: 'center' }}>
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
                  <View style={{ position: 'absolute', alignItems: 'center' }}>
                    <Text
                      style={{
                        color: 'white',
                        letterSpacing: 2,
                        fontSize: heightScale * 16,
                        fontWeight: '500',
                      }}>
                      {item.type[0].toUpperCase() + item.type.slice(1)} Ticket
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
                      style={{ flex: 1 }}
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
          <View style={{ marginTop: heightScale * 60 }}>
            {/* Header */}
            <View style={MainStyles.mainTextBox2}>
              <TouchableOpacity activeOpacity={1}>
                <Text style={MainStyles.mainText}>Game</Text>
              </TouchableOpacity>
            </View>
            {/* 방만들기 */}
            <TouchableOpacity
              activeOpacity={1}
              style={MainStyles.roomMakeBox}
              onPress={() => navigation.navigate('RoomMake')}>
              <Text style={MainStyles.roomMakeText}>+ 방 만들기</Text>
            </TouchableOpacity>

              {/* 게임 메뉴 Header */}
              <View style={MainStyles.gameMenuWrapper}>
                {menu.map((text) => (
                  <Pressable
                    style={MainStyles.gameMenuComponent} key={text.name} onPress={() => onMemu(text.name)}>
                    <Text style={MainStyles.gameMenuText}>{text.name}</Text>
                    <View style={text.state ? MainStyles.onGameMenu : { display: 'none' }}>
                      <View style={MainStyles.onGameMenuEdge}></View>
                      <View style={MainStyles.onGameMenuBody}></View>
                      <View style={MainStyles.onGameMenuEdge}></View>
                    </View>
                  </Pressable>
                ))}
              </View>
          </View>
            
          {/* Game 메뉴 Header */}
          <View style={MainStyles.gameMenuWrapper}>
            {menu.map(text => (
              <Pressable
                style={MainStyles.gameMenuComponent}
                key={text.name}
                onPress={() => onMemu(text.name)}>
                <Text style={MainStyles.gameMenuText}>{text.name}</Text>
                <View
                  style={
                    text.state ? MainStyles.onGameMenu : {display: 'none'}
                  }>
                  <View style={MainStyles.onGameMenuEdge}></View>
                  <View style={MainStyles.onGameMenuBody}></View>
                  <View style={MainStyles.onGameMenuEdge}></View>
                </View>
              </Pressable>
            ))}
          </View>
          {/* Game List */}
          <View style={{alignItems: 'center'}}>
            {/* game room component */}
              {gameBox?.map((item) => <GameBox key={item.game_id} item={item}/>)}

          </View>

          <Modal isVisible={modalStatus} style={{ flex: 1 }}>
            <GuestJoin setModalStatus={setModalStatus} />
          </Modal>

          <Modal isVisible={playMemberStatus}>
            <MemberModal setPlayMemberStatus={setPlayMemberStatus} />
          </Modal>
        </ScrollView>
      }
    </SafeAreaView>
  );
}

export default MainPage;
