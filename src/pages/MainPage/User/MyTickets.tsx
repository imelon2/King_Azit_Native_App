import {Text, View, Image, Pressable, SafeAreaView, ScrollView} from 'react-native';
import {useState, useEffect} from 'react';
import {FontStyle, GlobalStyles, UpperString, headerIconSize, heightData, widthData} from '@/modules';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import {BottomButton, QrCode, Header} from '@/components';
import {HomeRootStackParamList} from 'AppInner';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/reducer';
import {UserStyle} from './UserStyle';
import axios from 'axios';
import Config from 'react-native-config';
import Video from 'react-native-video';
import UpdownIcon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import { Ticket_Img } from '@/config/tickets';

type MyTicketsScreenProps = NativeStackScreenProps<HomeRootStackParamList, 'MyTickets'>;

const MyTickets = ({route, navigation}: MyTicketsScreenProps) => {
  const {card, count} = route.params;
  const memberId = useSelector((state: RootState) => state.user.name);
  const [qrViewState, setQrViewState] = useState(false);
  const {access_token, uuid} = useSelector((state: RootState) => state.user);

  const [TabState, setTabState] = useState(false);
  const [TabState2, setTabState2] = useState(false);
  const goldProps = {TabState, setTabState, TabState2, setTabState2};

  let deepLinkUrl: any;

  useEffect(() => {
    if (card != 'gold') getqrtoken();
  }, []);

  const getqrtoken = async () => {
    try {
      const qrtoken = await axios.get(`${Config.API_URL}/member/getqrtoken`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      deepLinkUrl = `kingazit://admin/${uuid}/${memberId}/${card}/${count}/${qrtoken.data.qrToken}`;
    } catch (error) {
      // todo :
      console.log(error);
    }
  };

  //ticketUI
  const ticketUI = (goldProps: any) => {
    if (card == 'gold') {
      return gold(goldProps);
    } else {
      return BlackRed();
    }
  };

  // Black, Red Ticket UI
  const BlackRed = () => {
    return (
      <View style={{alignItems: 'center', flex: 1}}>
        <View style={UserStyle.ticketBox}>
          <View
            style={{
              position: 'absolute',
              top: 22 * heightData,
              left: 16 * widthData,
              zIndex: 2,
            }}>
            <Text style={[FontStyle.fs16, FontStyle.fw600]}>{UpperString(card)} Ticket</Text>
            <Text style={[FontStyle.fs16, {marginTop: 5}]}>보유 {count} 장</Text>
          </View>
          <Image
            style={UserStyle.ticketImg}
            source={card == 'black' ? Ticket_Img['basic'].BlackCardImg : Ticket_Img['basic'].RedCardImg}
          />

          {/* QR 이미지(축소) */}
          <View style={UserStyle.qrbox}>
            <View style={UserStyle.qrStyle}>
              <QrCode value={deepLinkUrl} size={heightData * 66} />
            </View>
          </View>
        </View>

        {/* QR 크게보기 */}
        <Pressable style={UserStyle.plusTextBox} onPress={() => setQrViewState(true)}>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: heightData * 10}}>
            <Text style={[FontStyle.fs16, {paddingRight: heightData * 5}]}>QR 크게보기</Text>
            <FontAwesome5Icon name="search-plus" suppressHighlighting={false} size={heightData * 18} color={'#fff'} />
          </View>
        </Pressable>

        {/* 선물하기 버튼 */}
        <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 20 * heightData}}>
          <BottomButton
            onPress={() => navigation.navigate('GiftTicket')}
            title="선물하기"
            backgroundColor="#FCFF72"
            color="#000"
          />
        </View>
      </View>
    );
  };

  // Gold Ticket UI
  const gold = ({TabState, setTabState, TabState2, setTabState2}: any) => {
    return (
      <View style={{alignItems: 'center', flex: 1}}>
        <ScrollView>
          <View style={{flex: 2}}>
            <View style={UserStyle.plusTextBox}>
              <Video
                source={{
                  uri: 'https://uploads-ssl.webflow.com/624b2c0795c4aab84ebe3296/624c5f468ac8f85e6acd1a08_kings%20NFT%203-transcode.mp4',
                }}
                style={UserStyle.ticket}
                paused={false} // 재생/중지 여부
                resizeMode={'cover'} // 프레임이 비디오 크기와 일치하지 않을 때 비디오 크기를 조정하는 방법을 결정합니다. cover : 비디오의 크기를 유지하면서 최대한 맞게
                // onLoad={e => console.log(e)} // 미디어가 로드되고 재생할 준비가 되면 호출되는 콜백 함수입니다.
                repeat={true} // video가 끝나면 다시 재생할 지 여부
                // onAnimatedValueUpdate={() => {}}
              />
            </View>
          </View>
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={UserStyle.ticketCountBorder}></View>
              <View style={UserStyle.ticketNameBox}>
                <Text style={{color: 'white', fontSize: 11 * heightData}}>골드 티켓 보유: {count}장</Text>
              </View>
              <View style={UserStyle.ticketCountBorder}></View>
            </View>
            <View>
              <Text style={{color: 'white', textAlign: 'center', marginTop: 30 * heightData}}>Kings`NFT</Text>
              <View style={{marginTop: 15 * heightData}}>
                <Pressable onPress={() => setTabState(!TabState)}>
                  <LinearGradient
                    locations={[0, 1]}
                    colors={['rgba(45,45,45,0)', 'rgba(37,37,37,1)']}
                    style={[UserStyle.tabStyle, TabState && {height: 'auto'}]}>
                    <View style={UserStyle.tabBoxStyle}>
                      <Text style={UserStyle.tabFont}>Kings' Azit 멤버 전용 유틸리티 NFT란?</Text>
                      <UpdownIcon
                        style={UserStyle.tabiconStyle}
                        name={TabState ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                        size={heightData * 26}
                        color={'#fff'}
                      />
                    </View>
                    <View style={UserStyle.subTextBox}>
                      <Text style={UserStyle.subFont}>
                        {/* <View style={styles.Square} /> */}
                        Kings' Azit에서 열리는 NFT 토너먼트 우승을 통해 획득 할 수 있습니다.
                      </Text>
                      <Text style={UserStyle.subFont}>
                        등급에 따라 Gold, Platinum, Black NFT로 분류되며, 더 높은 등급의 홀더에게는 더 많은 혜택이
                        제공됩니다.
                      </Text>
                      <Text style={UserStyle.subFont}>
                        하위 단계 NFT 여러개의 합성을 통해 상위 단계의 NFT를 획득할 수 있습니다.
                      </Text>
                    </View>
                  </LinearGradient>
                </Pressable>
                <Pressable onPress={() => setTabState2(!TabState2)}>
                  <LinearGradient
                    locations={[0, 1]}
                    colors={['rgba(45,45,45,0)', 'rgba(37,37,37,1)']}
                    style={[UserStyle.tabStyle, TabState2 && {height: 'auto'}]}>
                    <View style={UserStyle.tabBoxStyle}>
                      <Text style={UserStyle.tabFont}>멤버십 NFT 주요 혜택 설명</Text>
                      <UpdownIcon
                        style={UserStyle.tabiconStyle}
                        name={TabState2 ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                        size={heightData * 26}
                        color={'#fff'}
                      />
                    </View>
                    <View style={[UserStyle.subTextBox, {alignItems: 'center'}]}>
                      <Image style={UserStyle.benefitImg} source={require(`@/assets/Benefits_img.png`)} />
                      <Image style={UserStyle.benefitImg} source={require(`@/assets/Benefits_img.png`)} />
                      <Image style={UserStyle.benefitImg} source={require(`@/assets/Benefits_img.png`)} />
                    </View>
                  </LinearGradient>
                </Pressable>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };

  return (
    <SafeAreaView style={[GlobalStyles.container, {flex: 1}]}>
      <Header
        title="마이티켓"
        rightIcon={() => (
          <AntDesignIcon name="close" size={headerIconSize} color="#fff" onPress={() => navigation.goBack()} />
        )}
      />

      {/* 티켓 UI */}
      {ticketUI(goldProps)}

      {/* QR확대 팝업창 */}
      {qrViewState ? (
        <Pressable style={UserStyle.qrViewContainer} onPress={() => setQrViewState(false)}>
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
            name="closecircleo"
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
};

export default MyTickets;
