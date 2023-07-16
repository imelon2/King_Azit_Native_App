import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  SafeAreaView,
} from 'react-native';
import {useState, useEffect} from 'react';
import {FontStyle, GlobalStyles, heightData, widthData} from '../../../modules/globalStyles';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {Shadow} from 'react-native-shadow-2';
import QrCode from '../../../components/QrCode';
import {HomeRootStackParamList} from '../../../../AppInner';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import Config from 'react-native-config';
import {RootState} from '../../../store/reducer';
import axios from 'axios';
import {img} from '../../../modules/ticketsList';
import Header from '../../../components/Header';
import Video from 'react-native-video';
import UpperString from '../../../modules/UpperString';
import { BottomButton } from '../../../components/Button';

type MyTicketsScreenProps = NativeStackScreenProps<
  HomeRootStackParamList,
  'MyTickets'
>;

function MyTickets({route, navigation}: MyTicketsScreenProps) {
  const {card, count} = route.params;
  const memberId = useSelector((state: RootState) => state.user.name);
  const [qrViewState, setQrViewState] = useState(false);
  const {access_token, uuid} = useSelector((state: RootState) => state.user);
  let deepLinkUrl: any;

  useEffect(() => {
    if(card != 'gold') getqrtoken();
  }, []);

  const getqrtoken = async () => {
    try {
      const qrtoken = await axios.get(`${Config.API_URL}/member/getqrtoken`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      deepLinkUrl = `kingazit://admin/${uuid}/${memberId}/${card}/${count}/${qrtoken.data.qrToken}`;
      // console.log(`kingazit://admin/${uuid}/${memberId}/${card}/${count}/${qrtoken.data.qrToken}`);
    } catch (error) {
      // todo :
      console.log(error);
    }
  };

  //ticketUI
  const ticketUI = () => {
    if (card == 'gold') {
      return gold();
    } else {
      return BlackRed();
    }
  };

  // Black, Red Ticket UI
  const BlackRed = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <View style={styles.ticketBox}>
          <View
            style={{
              position: 'absolute',
              top: 22 * heightData,
              left: 16 * widthData,
              zIndex: 2,
            }}>
            <Text
              style={[FontStyle.fs16,FontStyle.fw600]}>
              {UpperString(card)} Ticket
            </Text>
            <Text
              style={[FontStyle.fs16,{marginTop: 5}]}>
              보유 {count} 장
            </Text>
          </View>
          <Image
            style={styles.ticketImg}
            source={
              card == 'black'
                ? img['basic'].BlackCardImg
                : img['basic'].RedCardImg
            }
          />

          {/* QR 이미지(축소) */}
          <View style={styles.qrbox}>
            <View style={styles.qrStyle}>
              <QrCode value={deepLinkUrl} size={heightData * 66} />
            </View>
          </View>
        </View>
        
        {/* QR 크게보기 */}
        <Pressable
          style={styles.plusTextBox}
          onPress={() => setQrViewState(true)}>
          <View style={{flexDirection: 'row', alignItems: 'center',marginTop: heightData * 10}}>
            <Text style={[FontStyle.fs16,{paddingRight: heightData * 5}]}>QR 크게보기</Text>
            <FontAwesome5Icon
              name="search-plus"
              suppressHighlighting={false}
              size={heightData * 18}
              color={'#fff'}
            />
          </View>
        </Pressable>

        {/* 선물하기 버튼 */}
          <BottomButton onPress={() => console.log('hi')} title='선물하기' backgroundColor="#FCFF72" color='#000'/>
      </View>
    );
  };

  const gold = () => {
    return (
      <>
        <Video
          source={{
            uri: 'https://uploads-ssl.webflow.com/624b2c0795c4aab84ebe3296/624c5f468ac8f85e6acd1a08_kings%20NFT%203-transcode.mp4',
          }}
          style={styles.ticket}
          paused={false} // 재생/중지 여부
          resizeMode={'cover'} // 프레임이 비디오 크기와 일치하지 않을 때 비디오 크기를 조정하는 방법을 결정합니다. cover : 비디오의 크기를 유지하면서 최대한 맞게
          // onLoad={e => console.log(e)} // 미디어가 로드되고 재생할 준비가 되면 호출되는 콜백 함수입니다.
          repeat={true} // video가 끝나면 다시 재생할 지 여부
          // onAnimatedValueUpdate={() => {}}
        />
      </>
    );
  };

  return (
    <SafeAreaView style={[GlobalStyles.container,{flex: 1}]}>
      <Header
        title="마이티켓"
        rightIcon={() => (
          <AntDesignIcon
            name="close"
            size={26}
            color="#fff"
            onPress={() => navigation.goBack()}
          />
        )}
      />

      {/* 티켓 UI */}
      <View style={{alignItems: 'center',backgroundColor:'gray'}}>{ticketUI()}</View>

      {/* QR확대 팝업창 */}
      {qrViewState ? (
        <Pressable
          style={styles.qrViewContainer}
          onPress={() => setQrViewState(false)}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: heightData * 320,
              height: heightData * 320,
              backgroundColor: '#fff',
            }}>
            <QrCode value={deepLinkUrl} size={heightData * 280} />
          </View>
          <AntDesignIcon
            name="close"
            size={heightData * 40}
            color={'#fff'}
            style={{marginTop: heightData * 30}}
          />
        </Pressable>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  ticket: {
    marginTop: 50 * heightData,
    width: 264 * heightData,
    height: 419 * heightData,
  },
  plusTextBox: {
    alignItems: 'center',
    flexDirection: 'column',
  },
  qrbox: {
    backgroundColor: '#fff',
    alignItems: 'flex-end',
    flex:1
  },
  qrStyle: {marginTop: heightData * 11, marginRight: widthData * 17},
  buttonContaner: {
    flex:1,
    backgroundColor:'gray'
  },
  ticketBox: {
    width: 263 * widthData,
    height: 416 * heightData,
    borderColor: '#fff',
    borderWidth: 1,
    overflow: 'hidden',
    marginTop: 50 * heightData,
    borderRadius: 14,
  },
  ticketImg: {
    width: 263 * widthData,
    height: 325 * heightData,
  },
  qrViewContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(18, 18, 18, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MyTickets;
