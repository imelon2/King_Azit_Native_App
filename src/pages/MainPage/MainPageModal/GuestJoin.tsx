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
import React, {useEffect, useState} from 'react';
import ticketsList, {ticketsListType, TicketType} from '../../../modules/ticketsList';
import { roomType } from './GameBox';
const {width, height} = Dimensions.get('window');
const heightScale = heightData;

interface propsType {
  setModalStatus(id: boolean): void;
  item: roomType;
}

function GuestJoin(props: propsType) {
  const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();
  const CARDS = ticketsList('basic');
  const [ticket,setTicket] = useState<ticketsListType>();
  const [check, setcheck] = useState(false);
  const [isEnoughCard, setIsEnoughCard] = useState(false);

  const onClickCheckBox = () => {
    setcheck(!check);
  };

  // GameId & Ticket 소모 필요
  const guJoinButton = () => {
    if (!check) {
      return;
    }
    if(props.item.ticket_amount <= ticket!.count) {
      return
    }

    props.setModalStatus(false);
    navigation.navigate('GamePage');
  };
  
  useEffect(() => {
    const _ticket = CARDS.find(i => i.type == props.item.ticket_type)
    setTicket(_ticket);
    setIsEnoughCard(props.item.ticket_amount <= _ticket!.count)
  },[])

  return (
    <View style={styles.modalbox}>
      {/* Close Icon */}
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <IconAntDesign
          onPress={() => props.setModalStatus(false)}
          name="close"
          size={30}
          color="#000"
          style={styles.closeButton}
        />
      </View>

      {/* 티켓 정보 */}
      <View style={{flex: 7, alignItems: 'center'}}>
        <View
          // onPrss={() => onOpenMyTikets(item.type)}
          style={{justifyContent: 'center', alignItems: 'center'}}>
          <View style={{flexDirection: 'row'}}>
            <Text style={styles.cardText}>{ticket?.type} Card</Text>
            <Text style={styles.cardText2}> | 보유 {ticket?.count} 개</Text>
          </View>
          <Image
            style={{
              resizeMode: 'stretch',
              width: 220*heightScale,
              height: heightScale * 280,
              borderWidth: 2,
              borderColor: '#A1A1A1',
              borderRadius: 11,
            }}
            source={ticket?.image}
          />
        </View>
        <TouchableOpacity
          onPress={onClickCheckBox}
          activeOpacity={1}
          style={{flex: 1, flexDirection: 'row',marginTop:heightScale*35}}>
          <IconAntDesign
            name="checksquareo"
            size={30}
            color={check ? '#000' : '#848484'}
          />
          <Text style={styles.checkText}>For Guest Player</Text>
        </TouchableOpacity>
        <View style={styles.useText}>
          <Text>소모 : {props.item.ticket_amount} 장</Text>
        </View>
      </View>
      <View style={{flex: 2.5, alignItems: 'center'}}>
        <TouchableOpacity
          onPress={guJoinButton}
          activeOpacity={1}
          style={isEnoughCard ? styles.gujoinButton2: styles.gujoinButton}>
          <Text style={[styles.gujoinButtonText]}> {isEnoughCard ? "참가하기": "티켓이 부족합니다"} </Text>
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
    marginTop: 20 * heightScale,
    width: 100 * heightScale,
    height: 30 * heightScale,
    borderRadius:20,
    backgroundColor: '#D9D9D9',
    justifyContent:'center',
    alignItems:'center'
  },
  gujoinButton: {
    width: heightScale * 250,
    height: heightScale * 60,
    backgroundColor: '#FF3434',
    borderRadius: 6,
    marginTop: heightScale * 50,
  },
  gujoinButton2: {
    width: heightScale * 250,
    height: heightScale * 60,
    backgroundColor: '#2C2A2A',
    borderRadius: 6,
    marginTop: heightScale * 50,
  },
  gujoinButtonText: {
    textAlign: 'center',
    lineHeight: heightScale * 60,
    color: 'white',
    fontSize: heightScale * 20,
    fontWeight:"500",
  },
});

export default GuestJoin;
