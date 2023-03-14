import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Pressable,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  HomeRootStackParamList,
  MyPageRootStackParamList,
} from '../../../AppInner';
import {Shadow} from 'react-native-shadow-2';
import Modal from 'react-native-modal';
import Swiper from 'react-native-swiper';
import MemberModal from './MainPageModal/MemberModal';
import GuestJoin from './MainPageModal/GuestJoin';
import LinearGradient from 'react-native-linear-gradient';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {heightScale, MainStyles} from '../../modules/MainStyles';
import getProfileImage from '../../hooks/getProfileImage';
import getTickets from '../../hooks/getTickets';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/reducer';
import ticketsList, {ticketsListType} from '../../modules/ticketsList';
const {width} = Dimensions.get('screen');

function MainPage() {
  const navigation =
    useNavigation<
      NavigationProp<HomeRootStackParamList & MyPageRootStackParamList>
    >();
  
  const [menu, setMenu] = useState([{name:'진행중',state:true},{name:'대기중',state:false},{name:'마감',state:false}]);
  const [gameBox, setGameBox] = useState([1, 2, 3, 4]);
  const [modalStatus, setModalStatus] = useState(false);
  // const [tiketModalStatus, setTiketModalStatus] = useState(false);
  const [playMemberStatus, setPlayMemberStatus] = useState(false);
  // const [myCard, setMyCard] = useState('');
  const {black, red, gold} = useSelector((state: RootState) => state.ticket);
  const CARDS = ticketsList('width');

  let _gap = 40;
  let _offset = 22;
  let _width = width - (_gap + _offset) * 2;

  const onClickMember = () => {
    setPlayMemberStatus(true);
  };

  const onClickJoinButton = () => {
    setModalStatus(true);
  };
  
  const onMemu = (text:string) => {
    const currentMunu = [...menu];
    currentMunu.map((item) => {
      if(item.name === text) {
        item.state = true
      } else {
        item.state = false
      }
    });
    setMenu(currentMunu)
  }

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
    navigation.navigate('MyTickets', {card: text, count: _count});
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
            {images.map((uri,index) => (
              <Image key={index} style={MainStyles.imgSlideBox2} source={{uri: uri}} />
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

          <View style={MainStyles.gameBox}>
            {/* 게임 메뉴 Header */}
            <View style={MainStyles.gameMenuWrapper}>
            {menu.map((text) => (
              <Pressable
                style={MainStyles.gameMenuComponent} key={text.name} onPress={() => onMemu(text.name)}>
                <Text style={MainStyles.gameMenuText}>{text.name}</Text>
                <View style={text.state ? MainStyles.onGameMenu : {display:'none'}}>
                  <View style={MainStyles.onGameMenuEdge}></View>
                  <View style={MainStyles.onGameMenuBody}></View>
                  <View style={MainStyles.onGameMenuEdge}></View>
                </View> 
              </Pressable>
            ))}
              
              
            </View>
            {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {gameBox.map((v, key) => (
                <View style={MainStyles.gameContainer} key={key}>
                  <Image
                    source={require('../../assets/game_bg.png')}
                    style={MainStyles.gameContainer2}
                  />
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                    }}>
                    <View style={{flex: 5}}>
                      <Text style={MainStyles.tableNumText}>Table NO. 1</Text>
                      <Text style={MainStyles.mainGameText}>Main Game</Text>
                    </View>

                    <View style={{flex: 2}}>
                      <View style={MainStyles.gameStatusBox}>
                        <Text style={MainStyles.gameStatus}>진행중</Text>
                      </View>
                      <View>
                        <Text style={MainStyles.entryText}>Entry: 16/26</Text>
                      </View>
                    </View>
                  </View>

                  <View style={{flex: 1}}>
                    <Text style={MainStyles.tiketBuy}>1 Black Ticket</Text>
                    <Text style={MainStyles.Blind}>Blind 100/200 Ante: 0</Text>
                  </View>

                  <TouchableOpacity
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                    }}
                    onPress={() => setPlayMemberStatus(true)}
                    activeOpacity={1}>
                    <Image
                      source={require('../../assets/Group_img.png')}
                      style={MainStyles.group_icon}
                    />
                  </TouchableOpacity>

                  <View
                    style={{
                      flex: 2,
                      flexDirection: 'row',
                      alignItems: 'flex-end',
                    }}>
                    <Shadow distance={5} offset={[0, 1]} startColor={'#FCFF72'}>
                      <TouchableOpacity
                        onPress={onClickJoinButton}
                        activeOpacity={1}
                        style={MainStyles.joinButton}>
                        <Text style={MainStyles.joinButtonText}>참가하기</Text>
                      </TouchableOpacity>
                    </Shadow>
                  </View>
                </View>
              ))}
            </ScrollView> */}
          </View>
        </View>

        <Modal isVisible={modalStatus} style={{flex: 1}}>
          <GuestJoin setModalStatus={setModalStatus} />
        </Modal>

        <Modal isVisible={playMemberStatus}>
          <MemberModal setPlayMemberStatus={setPlayMemberStatus} />
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

export default MainPage;
