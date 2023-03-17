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
import {heightData} from '../../../modules/globalStyles';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HomeRootStackParamList} from '../../../../AppInner';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import React, {useEffect, useRef, useState} from 'react';
import ticketsList, {
  ticketsListType,
  TicketType,
} from '../../../modules/ticketsList';
import {roomType} from './GameBox';
import getTickets from '../../../hooks/getTickets';
const {width, height} = Dimensions.get('window');
const heightScale = heightData;

interface propsType {
  setModalStatus(id: boolean): void;
  item: roomType;
}

function GuestJoin(props: propsType) {
  const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();
  const CARDS = ticketsList('basic').filter(
    keys => keys.type == 'Red' || keys.type == 'Black',
  );
  const [check, setcheck] = useState(false);
  const [change, setChange] = useState<number>(5);
  const [price, setPrice] = useState<number>(0);
  const [isEnoughCard, setIsEnoughCard] = useState<boolean>(true);

  let _gap = heightScale*40;
  let _offset = heightScale*80;
  let _width = width - (_gap + _offset) * 2;

  // 현재 유저 보유 티켓 가져오기
  getTickets();

  const onClickCheckBox = () => {
    setcheck(!check);
  };

  // GameId & Ticket 소모 필요
  const guJoinButton = () => {
    if (!check) {
      return;
    }
    // if (props.item.ticket_amount <= ticket!.count) {
    //   return;
    // }

    props.setModalStatus(false);
    navigation.navigate('GamePage');
  };

  // useEffect(() => {
  //   const _ticket = CARDS.find(i => i.type == props.item.ticket_type);
  //   setTicket(_ticket);
  //   setIsEnoughCard(props.item.ticket_amount <= _ticket!.count);
  // }, []);

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
          {change === 5 ? (
            <Text> </Text>
          ) : (
            <Text style={{color:"red"}}>Red Ticekt + {change} </Text>
          )}
        </View>
        <TouchableOpacity
          onPress={onClickCheckBox}
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
    paddingHorizontal: heightScale * 10,
    paddingVertical: heightScale * 3,
    borderRadius: 20,
    backgroundColor: '#D9D9D9',
  },
  useTextWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: heightScale * 30,
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
});

export default GuestJoin;
