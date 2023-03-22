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
  TextInput,
} from 'react-native';
import {heightData} from '../../../modules/globalStyles';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HomeRootStackParamList} from '../../../../AppInner';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import React, {useEffect, useRef, useState} from 'react';
import ticketsList, {
  ticketsListType,
  TicketType,
} from '../../../modules/ticketsList';
import {roomType} from '../Compoents/GameBox';
import getTickets from '../../../hooks/getTickets';
import useSocket from '../../../hooks/useSocket';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/reducer';
const {width, height} = Dimensions.get('window');
const heightScale = heightData;

interface propsType {
  setModalStatus(id: boolean): void;
  item: roomType;
}

function PayTicketForJoinGame(props: propsType) {
  const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();
  const nickName = useSelector((state: RootState) => state.user.nickName);
  const [socket, disconnect] = useSocket();
  const CARDS = ticketsList('basic').filter(
    keys => keys.type == 'Red' || keys.type == 'Black',
  );
  const [check, setcheck] = useState(false);
  const [guestNickNameModal, setGuestNickNameModal] = useState(true);
  const [change, setChange] = useState<number>(5);
  const [price, setPrice] = useState<number>(0);
  const [isEnoughCard, setIsEnoughCard] = useState<boolean>(true);

  let _gap = heightScale * 40;
  let _offset = heightScale * 80;
  let _width = width - (_gap + _offset) * 2;

  useEffect(() => {
    const callback = (data: any) => {
      console.log(data);
    };

    const userEnterRoom = (data: any) => {
      if (socket && data === nickName + ' 게임 참가') {
        socket.emit('getGameRoomList', 'init');
      }
      console.log('userEnterRoom : ' + data);
    };

    if (socket) {
      socket.on('error', callback);
      socket.on('getMessage', userEnterRoom);
    }

    return () => {
      if (socket) {
        socket.off('error', callback);
        socket.off('getMessage', userEnterRoom);
      }
    };
  }, []);

  // 현재 유저 보유 티켓 가져오기
  getTickets();

  const onClickCheckBox = () => {
    setcheck(!check);
  };

  // GameId & Ticket 소모 필요
  const guJoinButton = () => {
    if (check) {
      return;
    }

    if (socket) {
      socket.emit('enterGameRoom', {gameId:props.item.game_id});
      props.setModalStatus(false);
    }
  };

  // Flatlist Focus된 page index 리턴
  const onViewableItemsChanged = ({viewableItems}: any) => {
    // 현재 Focus된 page index 전달
    let price: any;
    if (props.item.ticket_type === 'Black') {
      if (viewableItems[0].item.type === 'Red') {
        price = props.item.ticket_amount * 5;
        setChange(5);
      }
      if (viewableItems[0].item.type === 'Black') {
        price = props.item.ticket_amount;
        setChange(5);
      }
    }
    if (props.item.ticket_type === 'Red') {
      if (viewableItems[0].item.type === 'Red') {
        price = props.item.ticket_amount;
        setChange(5);
      }
      if (viewableItems[0].item.type === 'Black') {
        price = Math.ceil(props.item.ticket_amount / 5);
        setChange(5 - (props.item.ticket_amount % 5));
      }
    }
    setPrice(price);
    setIsEnoughCard(price <= viewableItems[0].item.count ? true : false);
  };
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50, // View에 50% 이상 노출될 경우 실행
  };
  const viewabilityConfigCallbackPairs = useRef([
    {viewabilityConfig, onViewableItemsChanged},
  ]);

  return (
    <View style={styles.modalbox}>
      {/* Close Icon */}
      <View style={{alignItems: 'flex-end'}}>
        <IconAntDesign
          onPress={() => props.setModalStatus(false)}
          name="close"
          size={30}
          color="#000"
          style={styles.closeButton}
        />
      </View>
      {/* 티켓 정보 */}
      <View>
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
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          style={{marginTop: heightScale * 40}}
          contentContainerStyle={{
            paddingHorizontal: _offset + _gap / 2,
          }}
          renderItem={({item}: {item: ticketsListType}) => (
            <View style={{marginHorizontal: _gap / 2}}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.cardText}>{item.type} Tickets</Text>
                  <Text style={styles.cardText2}> | 보유 {item.count} 개</Text>
                </View>
                <Image
                  style={{
                    resizeMode: 'stretch',
                    width: _width,
                    height: heightScale * 280,
                    borderWidth: 2,
                    borderColor: '#A1A1A1',
                    borderRadius: 11,
                  }}
                  source={item.image}
                />
              </View>
            </View>
          )}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <View style={styles.useTextWrapper}>
          <Text style={styles.useText}>소모 : {price} 장</Text>
        </View>
          {change === 5 ? (
            <Text> </Text>
          ) : (
            <Text style={{color: 'red'}}>Red Ticekt + {change} </Text>
          )}
        <TouchableOpacity
          onPress={() => {
            if (isEnoughCard) return;
            setGuestNickNameModal(true);
          }}
          activeOpacity={1}
          style={{
            flexDirection: 'row',
            marginTop: heightScale * 29,
          }}>
          <IconAntDesign
            name="checksquareo"
            size={30}
            color={check ? '#000' : '#848484'}
          />
          <Text style={styles.checkText}>For Guest Player</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'flex-end',
          marginTop: heightScale * 40,
        }}>
        <TouchableOpacity
          onPress={guJoinButton}
          activeOpacity={1}
          style={isEnoughCard ? styles.gujoinButton2 : styles.gujoinButton}>
          <Text style={[styles.gujoinButtonText]}>
            {isEnoughCard ? '참가하기' : '티켓이 부족합니다'}{' '}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 게스트 초대 시, 닉네임 설정 모달 */}
      {guestNickNameModal ? (
        <View style={styles.nickNameBoxWrapper}>
          <View style={styles.modalBox}>
            <IconAntDesign
              onPress={() => setGuestNickNameModal(false)}
              name="close"
              size={25}
              color="#000"
              style={{
                position: 'absolute',
                right: heightData * 10,
                marginTop: heightData * 10,
              }}
            />
            <Text style={styles.mainText}>임시 닉네임 설정</Text>
            <TextInput style={styles.textInput} placeholder="입력" />
            <Text style={styles.textsub}>
              설정할 닉네임을 입력해 주세요. (한글, 숫자, 영문2~8자)
            </Text>

            <View style={{alignItems: 'center'}}>
              <View style={styles.buttonBox}>
                <TouchableOpacity activeOpacity={1} style={styles.button}>
                  <Text style={styles.buttonText}> 중복확인 </Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={styles.button}>
                  <Text style={styles.buttonText}> 확인 </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  modalbox: {
    height: heightScale * 680,
    backgroundColor: '#C5C5C5',
    borderTopRightRadius: heightScale * 30,
    borderTopLeftRadius: heightScale * 30,
    width: width,
    position: 'absolute',
    bottom: -20,
    left: -20,
  },
  closeButton: {
    marginTop: heightScale * 15,
    marginRight: heightScale * 15,
  },

  cardText: {
    color: '#000',
    textAlign: 'center',
    fontSize: heightScale * 18,
    fontWeight: '600',
    marginBottom: heightScale * 5,
  },
  cardText2: {
    color: '#888',
    textAlign: 'center',
    fontSize: heightScale * 17,
    fontWeight: '400',
    marginBottom: heightScale * 5,
  },
  checkText: {
    marginLeft: 10,
    color: '#000',
    fontSize: 17 * heightScale,
    marginTop: 5,
  },
  useText: {
    fontSize:15,
    paddingHorizontal: heightScale * 10,
    paddingVertical: heightScale * 3,
  },
  useTextWrapper: {
    paddingHorizontal: heightScale * 10,
    paddingVertical: heightScale * 3,
    justifyContent: 'center',
    alignItems:'center',
    marginTop: heightScale * 30,
    borderRadius: 20,
    backgroundColor: '#D9D9D9',
  },
  gujoinButton: {
    width: heightScale * 250,
    height: heightScale * 60,
    backgroundColor: '#FF3434',
    borderRadius: 6,
  },
  gujoinButton2: {
    width: heightScale * 250,
    height: heightScale * 60,
    backgroundColor: '#2C2A2A',
    borderRadius: 6,
  },
  gujoinButtonText: {
    textAlign: 'center',
    lineHeight: heightScale * 60,
    color: 'white',
    fontSize: heightScale * 20,
    fontWeight: '500',
  },
  //
  nickNameBoxWrapper: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'rgba(12, 12, 12, 0.8)',
  },
  modalBox: {
    width: width - 80,
    height: heightData * 220,
    backgroundColor: '#C5C5C5',
    borderRadius: 15,
    alignItems: 'center',
    marginTop: heightScale * -20,
  },
  mainText: {
    color: '#000',
    fontWeight: '600',
    fontSize: heightData * 18,
    textAlign: 'center',
    marginTop: heightData * 12,
    marginBottom: heightData * 18,
  },
  textInput: {
    width: heightData * 280,
    height: heightData * 40,
    backgroundColor: '#D9D9D9',
    // lineHeight: heightData * 40,
    paddingLeft: 8,
    borderRadius: 3,
    paddingBottom: 0,
    paddingTop: 0,
  },
  textsub: {
    color: '#000',
    fontSize: heightData * 11,
    marginTop: heightData * 9,
  },
  buttonBox: {
    width: heightData * 280,
    flexDirection: 'row',
    marginTop: heightData * 40,
    alignItems: 'center',
  },
  button: {
    width: heightData * 120,
    height: heightData * 45,
    backgroundColor: '#2C2A2A',
    borderRadius: 4,
    marginLeft: heightData * 13,
  },
  buttonText: {
    lineHeight: heightData * 45,
    color: 'white',
    textAlign: 'center',
    fontSize: heightData * 15,
  },
});

export default PayTicketForJoinGame;
