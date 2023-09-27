import React, {useState} from 'react';
import {Alert, Image, StyleSheet, Text, ScrollView, View, Dimensions, TouchableOpacity, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconAntDesign2 from 'react-native-vector-icons/Feather';
import Modal from 'react-native-modal';
import Config from 'react-native-config';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {HomeRootStackParamList} from 'AppInner';
import ProfileImg from '../../components/ProfileImg';
import {HeaderStyle, heightData, img} from '@/modules';
import {RootState} from '@/store/reducer';
import SearchId from '../Admin/SearchId';
import GiftTicketCountBox from './Component/GiftTicketCountBox';
import {Header} from '@/components';

const heightScale = heightData;
const {width} = Dimensions.get('window');

const TicketBox = ({img, text, GiftTicket, onClick}: any) => {
  return (
    <View style={styles.ticketBox}>
      <View style={{flex: 1, justifyContent: 'center'}}>
        <Image style={styles.ticketImg} source={img} />
      </View>
      <View style={[styles.ticketBoxCenter, {flex: 3.8}]}>
        <Text style={styles.fontStyle3}> {text}</Text>
        {GiftTicket}
      </View>
      <View style={{flex: 1.1, alignItems: 'flex-end'}}>
        <TouchableOpacity activeOpacity={1} style={styles.shopButton} onPress={onClick}>
          <IconAntDesign name="shoppingcart" size={heightScale * 25} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const GiftTicket = () => {
  const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();
  const maxBlack = useSelector((state: RootState) => state.ticket.black);
  const maxRed = useSelector((state: RootState) => state.ticket.red);
  const maxGold = useSelector((state: RootState) => state.ticket.gold);
  const {access_token, name} = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);
  const [ModalStatus, setModalStatus] = useState(false);
  const [SearchModalStatus, setSearchModalStatus] = useState(false);
  const [userInfo, setUserInfo] = useState({
    nickname: '닉네임 검색 ',
    uuid: '',
  });
  const [black, setBlack] = useState(0);
  const [red, setRed] = useState(0);
  const [gold, setGold] = useState(0);

  const [blackState, setBlackState] = useState(false);
  const [redState, setRedState] = useState(false);
  const [goldState, setGoldState] = useState(false);

  const onClickBlack = () => {
    if (black > 0) {
      setBlackState(true);
    }
  };

  const onClickRed = () => {
    if (red > 0) {
      setRedState(true);
    }
  };

  const onClickGold = () => {
    if (gold > 0) {
      setGoldState(true);
    }
  };

  const addtickets = async () => {
    if (loading) return;
    try {
      setLoading(true);
      //   await axios.put(
      //     `${Config.API_URL}/admin/addtickets`,
      //     {
      //         "uuid": userInfo.uuid,
      //         "blackAmount": black,
      //         "redAmount": red,
      //         "goldAmount": gold,
      //         "summary": "Admin:"+name
      //       },
      //     {
      //       headers: {
      //         Authorization: `Bearer ${access_token}`,
      //       },
      //     },
      //   );
      let _tickets: any = [];
      blackState && _tickets.push({type: 'black', counts: black});
      redState && _tickets.push({type: 'red', counts: red});
      goldState && _tickets.push({type: 'gold', counts: gold});
      setModalStatus(false);
      navigation.navigate('TicketsResult', {name: userInfo.nickname, type: 'gift', tickets: _tickets});
    } catch (error) {
      Alert.alert('Error', '내부 문제로 티켓 충전이 취소됬습니다.\n' + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="선물하기"
        leftIcon={() => (
          <IconAntDesign
            name="left"
            size={heightScale * 28}
            color="white"
            style={HeaderStyle.headerLeftIcon}
            onPress={() => navigation.goBack()}
          />
        )}
      />

      <ScrollView bounces={false}>
        <View style={{flex: 1}}>
          <View style={styles.container1}>
            <Text style={styles.fontStyle2}>티켓 선물 유저</Text>
            <Pressable onPress={() => setSearchModalStatus(true)} style={styles.giftModalTextInput}>
              {userInfo.uuid ? (
                <ProfileImg style={styles.userIconImg} source={Config.IMG_URL! + userInfo.uuid} />
              ) : (
                <></>
              )}
              <Text style={styles.textInput}>{userInfo.nickname}</Text>
              <View style={{alignItems: 'flex-end', flex: 1}}>
                <IconIonicons name="search" color={'#fff'} size={heightScale * 24} />
              </View>
            </Pressable>
          </View>
        </View>

        <View style={{flex: 3.2}}>
          <View style={styles.container1}>
            <Text style={styles.fontStyle2}>티켓 종류</Text>
            <TicketBox
              img={img['basic'].BlackCardImg}
              text={`블랙 티켓 (보유 : ${maxBlack})`}
              GiftTicket={<GiftTicketCountBox ticket={black} max={maxBlack} setTicket={setBlack} />}
              onClick={onClickBlack}
            />
            <TicketBox
              img={img['basic'].RedCardImg}
              text={`레드 티켓 (보유 : ${maxRed})`}
              GiftTicket={<GiftTicketCountBox ticket={red} max={maxRed} setTicket={setRed} />}
              onClick={onClickRed}
            />
            <TicketBox
              img={img['basic'].GoldCardImg}
              text={`골드 티켓 (보유 : ${maxGold})`}
              GiftTicket={<GiftTicketCountBox ticket={gold} max={maxGold} setTicket={setGold} />}
              onClick={onClickGold}
            />
          </View>
          <View style={styles.boxBorder}></View>
        </View>
        <View style={styles.container1}>
          <Text style={styles.fontStyle4}>장바구니</Text>
          {/* <ScrollView style={{ marginBottom: 50 * heightScale }} bounces={false}> */}
          {blackState && (
            <View style={styles.shopBox}>
              <View style={{flex: 1, alignItems: 'center', flexDirection: 'row'}}>
                <Image style={styles.ticketImg2} source={img['basic'].BlackCardImg} />
                <Text style={styles.fontStyle5}>Black Ticket</Text>
              </View>
              <View style={{flex: 1, alignItems: 'center', flexDirection: 'row', paddingLeft: 110 * heightScale}}>
                <Text style={styles.fontStyle5}>{black} 장</Text>
                <IconAntDesign2
                  name="trash-2"
                  size={heightScale * 25}
                  style={{marginLeft: 30 * heightScale}}
                  color="white"
                  onPress={() => setBlackState(false)}
                />
              </View>
            </View>
          )}
          {redState && (
            <View style={styles.shopBox}>
              <View style={{flex: 1, alignItems: 'center', flexDirection: 'row'}}>
                <Image style={styles.ticketImg2} source={img['basic'].RedCardImg} />
                <Text style={styles.fontStyle5}>Red Ticket</Text>
              </View>
              <View style={{flex: 1, alignItems: 'center', flexDirection: 'row', paddingLeft: 110 * heightScale}}>
                <Text style={styles.fontStyle5}>{red} 장</Text>
                <IconAntDesign2
                  name="trash-2"
                  size={heightScale * 25}
                  style={{marginLeft: 30 * heightScale}}
                  color="white"
                  onPress={() => setRedState(false)}
                />
              </View>
            </View>
          )}
          {goldState && (
            <View style={styles.shopBox}>
              <View style={{flex: 1, alignItems: 'center', flexDirection: 'row'}}>
                <Image style={styles.ticketImg2} source={img['basic'].GoldCardImg} />
                <Text style={styles.fontStyle5}>Gold Ticket</Text>
              </View>
              <View style={{flex: 1, alignItems: 'center', flexDirection: 'row', paddingLeft: 110 * heightScale}}>
                <Text style={styles.fontStyle5}>{gold} 장</Text>
                <IconAntDesign2
                  name="trash-2"
                  size={heightScale * 25}
                  style={{marginLeft: 30 * heightScale}}
                  color="white"
                  onPress={() => setGoldState(false)}
                />
              </View>
            </View>
          )}
        </View>
      </ScrollView>
      <View style={{flexDirection: 'row', height: heightScale * 70, backgroundColor: '#3B3B3B'}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            borderRightColor: '#fff',
            borderRightWidth: 1,
          }}>
          <Text style={{fontSize: heightScale * 18, color: '#fff', fontWeight: '400'}}>
            총 {(blackState ? black : 0) + (redState ? red : 0) + (goldState ? gold : 0)}장
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => setModalStatus(true)}
          activeOpacity={1}
          style={[
            styles.buttonStyle,
            userInfo.nickname !== '닉네임 검색' && (blackState || redState || goldState) && styles.buttonStyle2,
          ]}>
          <Text
            style={[
              styles.fontStyle5,
              userInfo.nickname !== '닉네임 검색' && (blackState || redState || goldState) && styles.fontStyle7,
            ]}>
            선물하기
          </Text>
        </TouchableOpacity>
      </View>

      <Modal isVisible={ModalStatus} style={{alignItems: 'center', justifyContent: 'center'}}>
        <View style={styles.popUpComponent}>
          <View style={{flex: 1.5}}>
            <Text style={[styles.fontStyle4, {paddingBottom: heightScale * 15, marginTop: 8 * heightScale}]}>
              {userInfo.nickname}님에게
            </Text>
            <Text style={[{}, styles.fontStyle4]}>
              {blackState && `[Black Ticket ${black}장]`} {'\n'}
              {redState && `[Red Ticket ${red}장]`}
              {goldState && `[Gold Ticket ${gold}장]`}
              {'\n'}을 선물 하시겠습니까?
            </Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-end', flexDirection: 'row', paddingHorizontal: 24 * heightScale}}>
            <TouchableOpacity onPress={() => setModalStatus(false)} activeOpacity={1} style={styles.buttonStyle4}>
              <Text style={styles.fontStyle6}>아니요</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => addtickets()} activeOpacity={1} style={styles.buttonStyle5}>
              <Text style={styles.fontStyle7}>네</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Modal isVisible={SearchModalStatus}>
        <SearchId setSearchModalStatus={setSearchModalStatus} setUserInfo={setUserInfo} />
      </Modal>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#121212',
  },
  container1: {
    paddingHorizontal: 24 * heightScale,
    paddingTop: 25 * heightScale,
  },
  fontStyle: {fontSize: heightScale * 18, fontWeight: 'bold', color: 'white'},
  fontStyle3: {
    fontSize: heightScale * 14,
    fontWeight: '400',
    color: 'white',
  },
  headerStyle: {
    height: heightScale * 61,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#999999',
  },
  fontStyle2: {
    fontSize: heightScale * 18,
    fontWeight: '500',
    color: 'white',
    paddingBottom: heightScale * 20,
  },
  fontStyle4: {
    fontSize: heightScale * 18,
    fontWeight: '400',
    color: 'white',
    paddingBottom: heightScale * 20,
  },
  fontStyle5: {
    paddingLeft: heightScale * 15,
    fontSize: heightScale * 16,
    color: 'white',
  },
  fontStyle6: {
    fontSize: heightScale * 20,
    color: 'white',
  },
  fontStyle7: {
    fontSize: heightScale * 20,
    color: 'black',
  },
  userIconImg: {
    marginLeft: heightScale * 10,
    width: heightScale * 30,
    height: heightScale * 30,
    borderRadius: 50,
  },
  giftModalTextInput: {
    flexDirection: 'row',
    alignItems: 'center',
    width: heightScale * 379,
    height: heightScale * 45,
    paddingHorizontal: 8 * heightScale,
    backgroundColor: '#121212',
    borderBottomColor: '#3D3D3D',
    borderBottomWidth: 1,
  },
  textInput: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: heightScale * 16,
    marginLeft: 8 * heightScale,
  },
  ticketBox: {
    width: 320 * heightScale,
    height: 84 * heightScale,
    borderWidth: 0.6 * heightScale,
    borderColor: '#F5FF82',
    borderRadius: 8,
    marginBottom: 18 * heightScale,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  ticketImg: {
    width: 45 * heightScale,
    height: 63 * heightScale,
    borderWidth: 0.5 * heightScale,
    borderColor: '#808080',
    borderRadius: 3,
    marginLeft: 9 * heightScale,
  },
  ticketImg2: {
    width: 38 * heightScale,
    height: 52 * heightScale,
    borderWidth: 0.5,
    borderColor: '#D9D9D9',
    borderRadius: 4,
    marginLeft: 18 * heightScale,
  },
  shopButton: {
    width: 60 * heightScale,
    height: 84 * heightScale,
    backgroundColor: '#F5FF82',
    alignItems: 'center',
    justifyContent: 'center',
  },
  boxBorder: {
    width: width,
    height: 5,
    backgroundColor: '#363636',
  },
  shopBox: {
    width: 320 * heightScale,
    height: 84 * heightScale,
    borderRadius: 8,
    backgroundColor: 'rgba(99, 99, 99, 0.3)',
    borderColor: '#aaa',
    borderWidth: 0.6 * heightScale,
    flexDirection: 'row',
    marginBottom: 15 * heightScale,
  },
  buttonStyle: {
    flex: 2,
    backgroundColor: '#3B3B3B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle2: {
    backgroundColor: '#F5FF82',
  },
  buttonStyle4: {
    width: 145 * heightScale,
    height: 60 * heightScale,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8A8A8A',
    marginRight: 33 * heightScale,
  },
  buttonStyle5: {
    width: 145 * heightScale,
    height: 60 * heightScale,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5ff82',
  },
  popUpComponent: {
    width: heightScale * 360,
    height: heightScale * 250,
    padding: heightScale * 24,
    backgroundColor: '#353535',
    // top: heightScale * 210,
    borderRadius: 20,
    alignItems: 'center',
  },
  ticketBoxCenter: {
    paddingHorizontal: 13 * heightScale,
    justifyContent: 'center',
  },
});
export default GiftTicket;
