import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  SafeAreaView
} from 'react-native';
import { useState,useEffect } from 'react';
import {heightData} from '../../modules/globalStyles';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Shadow} from 'react-native-shadow-2';
import QrCode from '../../components/QrCode';
import {
  HomeRootStackParamList,
} from '../../../AppInner';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import Config from 'react-native-config';
import {RootState} from '../../store/reducer';
import axios from 'axios';
import { img } from '../../modules/ticketsList';
const heightScale = heightData;

type MyTicketsScreenProps = NativeStackScreenProps<
  HomeRootStackParamList,
  'MyTickets'
>;

function MyTickets({route, navigation}: MyTicketsScreenProps) {
  const {card, count} = route.params;
  const memberId = useSelector((state: RootState) => state.user.name);
  const [qrViewState, setQrViewState] = useState(false);
  const {access_token,uuid} = useSelector((state: RootState) => state.user,);
  let deepLinkUrl;
  useEffect(() => {
    getqrtoken();
  }, []);

  const getqrtoken = async () => {
    try {
      const qrtoken = await axios.get(`${Config.API_URL}/member/getqrtoken`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      
    deepLinkUrl = (`kingazit://admin/${uuid}/${memberId}/${card}/${count}/${qrtoken.data.qrToken}`)
    // console.log(`kingazit://admin/${uuid}/${memberId}/${card}/${count}/${qrtoken.data.qrToken}`);
    } catch (error) {
      // todo :
      console.log(error);
    }
  }

  const ticketType = () => {
    if (card == 'black') {
      return (
        <Image
          style={styles.ticketImg}
          source={img['basic'].BlackCardImg}
        />
      );
    } else if (card == 'red') {
      return (
        <Image
          style={styles.ticketImg}
          source={img['basic'].RedCardImg}
        />
      );
    } else if (card == 'gold') {
      return (
        <Image
          style={styles.ticketImg}
          source={img['basic'].GoldCardImg}
        />
      );
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <AntDesignIcon
            name="close"
            style={styles.closeIcon}
            size={20}
            color="#fff"
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.headerText}>My Tickets</Text>
        </View>
      </View>
      <View style={{alignItems: 'center', flex: 12}}>
        <View>
          {/* <Video
              source={{ uri: "https://uploads-ssl.webflow.com/624b2c0795c4aab84ebe3296/624c5f468ac8f85e6acd1a08_kings%20NFT%203-transcode.mp4" }}
              style={styles.ticket}
              paused={false} // 재생/중지 여부
              resizeMode={"cover"} // 프레임이 비디오 크기와 일치하지 않을 때 비디오 크기를 조정하는 방법을 결정합니다. cover : 비디오의 크기를 유지하면서 최대한 맞게
              // onLoad={e => console.log(e)} // 미디어가 로드되고 재생할 준비가 되면 호출되는 콜백 함수입니다.
              repeat={true} // video가 끝나면 다시 재생할 지 여부
          // onAnimatedValueUpdate={() => {}}
          /> */}

          <View style={styles.ticketBox}>
            <View
              style={{
                position: 'absolute',
                top: 22 * heightScale,
                left: 16 * heightScale,
                zIndex: 2,
              }}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: '600',
                  fontSize: 18 * heightScale,
                }}>
                {card.charAt(0).toUpperCase() + card.slice(1)} Card
              </Text>
              <Text
                style={{
                  color: 'white',
                  fontSize: 16 * heightScale,
                  marginTop: 5,
                }}>
                보유 {count} 장
              </Text>
            </View>
            {ticketType()}
            <View style={styles.qrbox}>
              <View style={styles.qrStyle}>
                <QrCode value={deepLinkUrl} size={heightScale * 66} />
              </View>
            </View>
          </View>
        </View>

        <Pressable
          style={styles.plusTextBox}
          onPress={() => setQrViewState(true)}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={styles.plusText}>QR 크게보기</Text>
            <FontAwesome5Icon
              name='search-plus'
              suppressHighlighting={false}
              size={heightScale*20}
              color={'#fff'}
              style={{marginTop:heightScale* 10,paddingLeft:heightScale*5}}
            />
          </View>
        </Pressable>

        <View style={styles.buttonContaner}>
          <View style={styles.buttonBox}>
            <Shadow distance={6} startColor={'#FCFF72'}>
              <TouchableOpacity activeOpacity={1} style={styles.giftButton} onPress={() => navigation.navigate('GiftTicket')}>
                <View style={styles.textCenter}>
                  <AntDesignIcon name="gift" size={16} style={styles.iconStyle} />
                  <Text style={styles.giftButtonText}>선물하기</Text>
                </View>
              </TouchableOpacity>
            </Shadow>
          </View>
        </View>
      </View>
      {/* QR확대 팝업창 */}
      {qrViewState ? (
        <Pressable style={styles.qrViewContainer} onPress={() => setQrViewState(false)}>
          <View style={{justifyContent:'center',alignItems:'center',width:heightScale * 320,height:heightScale * 320,backgroundColor:'#fff'}}>
            <QrCode value={deepLinkUrl} size={heightScale * 280} />
          </View>
          <AntDesignIcon
            name="close"
            size={heightScale*40}
            color={"#fff"}
            style={{marginTop:heightScale*30}}
          />
          </Pressable>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    flex: 1,
    borderBottomColor: '#5A5A5A',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 19 * heightScale,
    color: '#fff',
    fontWeight: '500',
  },
  closeIcon: {
    position: 'absolute',
    right: 10,
  },
  ticket: {
    marginTop: 50 * heightScale,
    width: 264 * heightScale,
    height: 419 * heightScale,
  },
  plusText: {
    color: 'white',
    marginTop: 10,
    fontWeight:'500',
    fontSize: 16 * heightScale,
  },
  plusTextBox: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  qrbox: {
    backgroundColor: '#fff',
    alignItems: 'flex-end',
    width: 327 * heightScale,
    height: 120 * heightScale,
  },
  qrStyle: {marginTop: heightScale * 20, marginRight: heightScale * 24},
  giftButton: {
    width: 350 * heightScale,
    height: 55 * heightScale,
    backgroundColor: '#F5FF82',
    flexDirection: 'column',
    alignItems: 'center',
  },
  giftButtonText: {
    color: '#000',
    fontWeight: '500',
    lineHeight: 55 * heightScale,
    fontSize: 17 * heightScale,
  },
  buttonBox: {
    flex: 1,
    alignItems: 'center',
  },
  textCenter: {
    width: 86 * heightScale,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconStyle: {
    marginRight: 5 * heightScale,
  },
  buttonContaner: {
    marginTop: 60 * heightScale,
    alignItems: 'center',
    // backgroundColor: 'white',
    flexDirection: 'row',
  },
  ticketBox: {
    width: 327 * heightScale,
    height: 518 * heightScale,
    borderColor: '#fff',
    borderWidth: 1,
    overflow: 'hidden',
    marginTop: 50 * heightScale,
    borderRadius: 14,
  },
  ticketImg: {
    width: 327 * heightScale,
    height: 404 * heightScale,
  },
  qrViewContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(18, 18, 18, 0.9)',
    alignItems: 'center',
    justifyContent:'center',
  }
});

export default MyTickets;
