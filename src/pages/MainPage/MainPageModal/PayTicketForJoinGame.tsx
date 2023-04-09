import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  FlatList,
  TextInput,
} from 'react-native';
import {heightData, StringUpperCase} from '../../../modules/globalStyles';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import ticketsList from '../../../modules/ticketsList';
import getTickets from '../../../hooks/getTickets';
import useSocket from '../../../hooks/useSocket';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/reducer';
import { roomType } from '../../../hooks/getGameList';
import { Alert } from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { MainStyles } from '../../../modules/MainStyles';
const {width, height} = Dimensions.get('window');
const heightScale = heightData;

interface propsType {
  setModalStatus(id: boolean): void;
  item: roomType;
  selectSeatNum:number;
  setIsGuest({ is, isFixed }:{ is: boolean, isFixed: boolean }): void;
  isGuest:{is:boolean,isFixed:boolean};
}

function PayTicketForJoinGame(props: propsType) {
  const [socket, disconnect] = useSocket();
  // 현재 유저 보유 티켓 가져오기
  const [refreshTickets] = getTickets();
  const CARDS = ticketsList('basic').filter(
    keys => keys.type == 'red' || keys.type == 'black',
  );
  const {uuid} = useSelector((state: RootState) => state.user);
  const [guestNickNameModal, setGuestNickNameModal] = useState(false);
  const [change, setChange] = useState<number>(5);
  const [price, setPrice] = useState<number>(0);
  const [isEnoughCard, setIsEnoughCard] = useState<boolean>(false);
  const {isGuest,setIsGuest} = props;

  
  let _gap = heightScale * 55;
  let _offset = heightScale * 60;
  let _width = width - (_gap + _offset) * 2;

  // Socket Msg
  useEffect(() => {
    const callback = (data: any) => {
      if(socket && data.type === 'enterGameRoom') {
        Alert.alert("안내",data.msg + "다른 자리를 선택헤주세요.")
      }
    };

    const userEnterRoom = (data: any) => {
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


  const onClickCheckBox = () => {
    if(isGuest.isFixed) return;
    setIsGuest({is: !isGuest.is,isFixed: false})
  };

  // GameId & Ticket 소모 필요
  const joinButton = () => {
    if (!isEnoughCard) {
      return;
    }

    if (socket) {
      socket.emit('seat', {gameId:props.item.game_id,chair:props.selectSeatNum,isGuest:props.isGuest.is});
      props.setModalStatus(false);
      refreshTickets();
    }
  };

  // Flatlist Focus된 page index 리턴
  const onViewableItemsChanged = ({viewableItems}: any) => {
    // 현재 Focus된 page index 전달
    let price: any;
    if (props.item.ticket_type === 'black') {
      if (viewableItems[0]?.item.type === 'red') {
        price = props.item.ticket_amount * 5;
        setChange(5);
      }
      if (viewableItems[0]?.item.type === 'black') {
        price = props.item.ticket_amount;
        setChange(5);
      }
    }
    if (props.item.ticket_type === 'red') {
      if (viewableItems[0]?.item.type === 'red') {
        price = props.item.ticket_amount;
        setChange(5);
      }
      if (viewableItems[0]?.item.type === 'black') {
        price = Math.ceil(props.item.ticket_amount / 5);
        setChange(5 - (props.item.ticket_amount % 5));
      }
    }
    setPrice(price);
    setIsEnoughCard(price <= viewableItems[0]?.item.count ? true : false);
  };
  const viewabilityConfig = {
    itemVisiblePercentThreshold: 50, // View에 50% 이상 노출될 경우 실행
  };
  const viewabilityConfigCallbackPairs = useRef([
    {viewabilityConfig, onViewableItemsChanged},
  ]);

  const infoMsg = useCallback(() => {
    let msg ="";
    if(change !== 5) {
      msg = `Red Ticekt ${change}장을 돌려드립니다!`
    }
    if(!isEnoughCard) {
      msg = `티켓이 부족합니다.`
    }
    if(msg == "") {
      return;
    }
    return (
      <>
      <View style={[MainStyles.onGameMenuEdge,{marginHorizontal:1}]}></View>
              <View style={[MainStyles.onGameMenuEdge,{marginHorizontal:1}]}></View>
              <View style={[MainStyles.onGameMenuEdge,{marginHorizontal:1}]}></View>
              <Text style={{color: '#fff',fontSize:heightScale*16,paddingHorizontal:4}}>{msg}</Text>
              <View style={[MainStyles.onGameMenuEdge,{marginHorizontal:1}]}></View>
              <View style={[MainStyles.onGameMenuEdge,{marginHorizontal:1}]}></View>
              <View style={[MainStyles.onGameMenuEdge,{marginHorizontal:1}]}></View>
              </>
    )
  },[change,isEnoughCard])

  
  return (
    <View style={styles.modalbox}>
      {/* Close Icon */}
      <View style={{alignItems: 'flex-end'}}>
        <IconAntDesign
          onPress={() => props.setModalStatus(false)}
          name="close"
          size={heightScale*30}
          color="#fff"
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
          keyExtractor={item => item.key?.toString()}
          data={CARDS}
          viewabilityConfigCallbackPairs={
            viewabilityConfigCallbackPairs.current
          }
          style={{marginTop: heightScale * 40}}
          contentContainerStyle={{
            paddingHorizontal: _offset + _gap / 2,
          }}
          renderItem={(item) => (
            <View style={{marginHorizontal: _gap / 2,paddingVertical:heightScale*5}}>
              <View style={{justifyContent: 'center', alignItems: 'center'}}>
                <View style={{flexDirection: 'row',marginBottom:heightScale*5}}>
                  <Text style={styles.cardText}>{StringUpperCase(item.item.type)} Tickets</Text>
                  <Text style={styles.cardText2}> | 보유 {item.item.count} 개</Text>
                </View>
                <Shadow distance={6} startColor={'#616161'} endColor={'rgba(61, 61, 61, 0.6)'}>
                <Image
                  style={{
                    resizeMode: 'stretch',
                    width: _width,
                    height: heightScale * 280,
                    borderWidth: 1,
                    borderColor: '#A1A1A1',
                    borderRadius: 14,
                  }}
                  source={item.item.image}
                />
                </Shadow>
              </View>
            </View>
          )}
        />
      </View>
      
      <View style={{alignItems: 'center'}}>
        {/* 게스트 체크 박스 */}
      <TouchableOpacity
          onPress={() => onClickCheckBox()}
          activeOpacity={1}
          style={{
            flexDirection: 'row',
            marginTop: heightScale * 15,
            justifyContent:'center',
            alignItems:'center',
          }}>
          <IconAntDesign
            name="checksquare"
            size={22}
            color={isGuest.is ? '#F5FF82' : '#848484'}
          />
          <Text style={[styles.checkText,{color:isGuest.is ? '#F5FF82' : '#848484'}]}>For Guest Player</Text>
        </TouchableOpacity>

        <View style={styles.useTextWrapper}>
          <Text style={styles.useText}>소모 : {price} 장</Text>
        </View>
        <View style={{height:heightData*80,width,justifyContent:'center', flexDirection:'row',alignItems:'center'}}>
          {infoMsg()}
        </View>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}>
        <TouchableOpacity
          onPress={joinButton}
          activeOpacity={1}
          style={isEnoughCard ? styles.gujoinButton2 : styles.gujoinButton}>
          <Text style={[styles.gujoinButtonText]}>
            {isGuest.is && "Guest"} 참가하기
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalbox: {
    height: heightScale * 680,
    backgroundColor: '#373737',
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
    color: '#fff',
    textAlign: 'center',
    fontSize: heightScale * 18,
    fontWeight: '600',
    marginBottom: heightScale * 5,
  },
  cardText2: {
    color: '#fff',
    textAlign: 'center',
    fontSize: heightScale * 17,
    fontWeight: '400',
    marginBottom: heightScale * 5,
  },
  checkText: {
    marginLeft: 10,
    fontSize: 17 * heightScale,
    fontWeight:'700',
  },
  useText: {
    fontSize:15,
    color:'#fff',
    fontWeight:'500',
    paddingHorizontal: heightScale * 10,
    paddingVertical: heightScale * 3,
  },
  useTextWrapper: {
    paddingHorizontal: heightScale * 10,
    paddingVertical: heightScale * 3,
    justifyContent: 'center',
    alignItems:'center',
    marginTop: heightScale * 15,
    borderRadius: 20,
    backgroundColor: '#595959',
    borderWidth:1,
    borderColor:'#F5FF82'
  },
  gujoinButton: {
    width: heightScale * 390,
    height: heightScale * 60,
    backgroundColor: '#808080',
    borderRadius: 6,
  },
  gujoinButton2: {
    width: heightScale * 390,
    height: heightScale * 60,
    backgroundColor: '#F5FF82',
    borderRadius: 6,
  },
  gujoinButtonText: {
    textAlign: 'center',
    lineHeight: heightScale * 60,
    color: '#000',
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
