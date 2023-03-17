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
import Config from 'react-native-config';
import Modal from "react-native-modal";
import Swiper from 'react-native-swiper';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {
  HomeRootStackParamList,
  MyPageRootStackParamList,
} from '../../../../AppInner';
import useSocket from '../../../hooks/useSocket';
import BinaryToBase64 from '../../../modules/BinaryToBase64';
import {MainStyles, heightScale} from '../../../modules/MainStyles';
import ticketsList, {ticketsListType} from '../../../modules/ticketsList';
import {RootState} from '../../../store/reducer';
import GameBox, {roomType} from '../MainPageModal/GameBox';
import GuestJoin from '../MainPageModal/GuestJoin';
import MemberModal from '../MainPageModal/MemberModal';
const {width} = Dimensions.get('window');

function MainPageUser() {
  const access_token = useSelector((state: RootState) => state.user.access_token);
  const navigation =
    useNavigation<
      NavigationProp<HomeRootStackParamList & MyPageRootStackParamList>
    >();

  const [socket, disconnect] = useSocket();
  const [menu, setMenu] = useState([
    {name: 'playing', state: true},
    {name: 'waiting', state: false},
    {name: 'end', state: false},
  ]);
  const [gameBox, setGameBox] = useState<roomType[]>([]);
  const [selectGameItems, setSelectGameItems] = useState<roomType>();
  const [playMemberStatus, setPlayMemberStatus] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
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

  // useEffect(() => {
  //   console.log('images test');
  //   const list = ['admin','user','user1','user2']
  //   const a = async() => {
  //     try {
  //       for(let i = 0; i < list.length ; i++) {
  //         const profileImageResult = await axios.get(
  //           `${Config.API_URL}/member/image?member=${list[i]}`,
  //           {
  //             responseType: 'arraybuffer',
  //             headers: {
  //               authorization: `Bearer ${access_token}`,
  //             },
  //           },
  //         );
  
  //         console.log('images test ' + list[i]);
          
  //         const base64ImageString = BinaryToBase64(profileImageResult.data);
  //         console.log(base64ImageString.length);
  //       }
  //     } catch (error) {
  //       console.log((error as AxiosError).response?.errorMessage);
        
  //     }
  //     }
  //   a();
  // },[])


  // Socket
  useEffect(() => {
    const getGameRoomList = (data: any) => {
      console.log(data);

      const arr: roomType[] = new Array();
      Object.keys(data).map(key => {
        data[key].playing_users
        arr.push(data[key]);
      });
      setGameBox([...arr]);
    };

    const callback = (data: any) => {
      console.log(data);
    };

    if (socket) {
      socket.emit('getGameRoomList', 'init');
      socket.on('getGameRoomList', getGameRoomList);
      socket.on('error', callback);
    }
    return () => {
      console.log('off getGameRoomList');

      socket?.off('getGameRoomList');
    };
  }, [socket]);

  // Game List 분류작업
  const setGameBoxArr = () => {
    const curr = menu.find(i => i.state);
    const sort = gameBox!.filter(i => i.status == curr?.name);
    if (sort.length == 0) {
      let _name;
      if (curr?.name == 'playing') _name = '진행중인';
      else if (curr?.name == 'waiting') _name = '대기중인';
      else if (curr?.name == 'end') _name = '마감된';
      return (
        <View style={MainStyles.noGameBoxContainer}>
          <Text style={{color: '#A1A1A1', fontSize: heightScale * 18}}>
            현재 {_name} 게임이 없습니다.
          </Text>
        </View>
      );
    }
    return sort.map(item => (
      <GameBox
        key={item.game_id}
        item={item}
        onClickJoinButton={onClickJoinButton}
        onClickMember={onClickMember}
      />
    ));
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

  const onClickMember = () => {
    setPlayMemberStatus(true);
  };

  const onClickJoinButton = (items: roomType) => {
    setSelectGameItems(items);
    setModalStatus(true);
  };

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
          {/* 방만들기 */}
          <TouchableOpacity
            activeOpacity={1}
            style={MainStyles.roomMakeBox}
            onPress={() => navigation.navigate('RoomMake')}>
            <Text style={MainStyles.roomMakeText}>+ 방 만들기</Text>
          </TouchableOpacity>

          {/* 게임 메뉴 Header */}
          <View style={MainStyles.gameMenuWrapper}>
            {menu.map(text => {
              let _name;
              if (text.name == 'playing') _name = '진행중';
              else if (text.name == 'waiting') _name = '대기중';
              else if (text.name == 'end') _name = '마감';
              return (
                <Pressable
                  style={MainStyles.gameMenuComponent}
                  key={text.name}
                  onPress={() => onMemu(text.name)}>
                  <Text style={MainStyles.gameMenuText}>{_name}</Text>
                  <View
                    style={
                      text.state ? MainStyles.onGameMenu : {display: 'none'}
                    }>
                    <View style={MainStyles.onGameMenuEdge}></View>
                    <View style={MainStyles.onGameMenuBody}></View>
                    <View style={MainStyles.onGameMenuEdge}></View>
                  </View>
                </Pressable>
              );
            })}
          </View>
          {/* Game List */}
          <View style={{alignItems: 'center'}}>
            {/* game room component */}
            {setGameBoxArr()}
          </View>
        </View>
      </ScrollView>

      <Modal isVisible={modalStatus} style={{flex:1}}>
        <GuestJoin setModalStatus={setModalStatus} item={selectGameItems!} />
      </Modal>

      <Modal isVisible={playMemberStatus}>
        <MemberModal setPlayMemberStatus={setPlayMemberStatus} />
      </Modal>
    </SafeAreaView>
  );
}

export default MainPageUser;
