import {Header} from '@/components/Header';
import {FontStyle, GlobalStyles, headerIconSize, height, heightData, width, widthData} from '@/modules';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {HomeRootStackParamList} from 'AppInner';
import React, {useEffect, useState} from 'react';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {View, Text, SafeAreaView, StyleSheet, Pressable, ScrollView, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/reducer';
import Rectangle from '@/components/Rectangle';
import {BottomButton, BottomMaxButton} from '@/components/Button';
import Swiper from 'react-native-swiper';
import ProfileImg from '@/components/ProfileImg';
import Config from 'react-native-config';

type IHeaderTitle = '상세정보' | '프라이즈' | '블라인드' | '참가자 현황';
type IPrizeInfo = {
  rank: string | number;
  prize: string;
  point: string | number;
};
type IBlindInfo = {
  level: string | number;
  blinds: string;
  ante: string | number;
};
type IProfileInfo = {
  uuid: string;
  nickName: string;
};

function TournamentInfo() {
  const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();
  const {roles, uuid, nickName} = useSelector((state: RootState) => state.user);
  const isAdmin = roles.find((e: string) => e == 'ROLE_ADMIN');
  const [currentTitle, setCurrentTitle] = useState<IHeaderTitle>('상세정보');
  const [prizeInfo, setPrizeInfo] = useState<IPrizeInfo[]>();
  const [blindInfo, setBlindInfo] = useState<IBlindInfo[]>();
  const [profiles, setProfiles] = useState<IProfileInfo[][]>();

  useEffect(() => {
    const demoPrizeInfo: IPrizeInfo[] = new Array(15).fill(1).map((_, i) => {
      return {
        rank: i + 1,
        prize: '',
        point: i + 1,
      };
    });
    const demoBlindInfo: IBlindInfo[] = new Array(15).fill(1).map((_, i) => {
      return {
        level: i + 1,
        blinds: '100/200',
        ante: '',
      };
    });

    const _demoProfiles: IProfileInfo[] = new Array(11).fill(1).map((_, i) => {
      return {
        uuid: 'c121308f-579d-446d-876d-0f652f39ace4',
        nickName: '유저' + i,
      };
    });
    const demoProfiles: IProfileInfo[][] = [_demoProfiles, _demoProfiles];

    setPrizeInfo(demoPrizeInfo);
    setBlindInfo(demoBlindInfo);
    setProfiles(demoProfiles);
  }, []);

  return (
    <SafeAreaView style={[GlobalStyles.container, {flex: 1}]}>
      {/* header */}
      <Header
        title="[NFT Holder Main Event]"
        leftIcon={() => (
          <IconAntDesign name="left" size={headerIconSize} color="white" onPress={() => navigation.goBack()} />
        )}
        rightIcon={() => <Text style={[FontStyle.fs16, {display: !!isAdmin ? 'flex' : 'none'}]}>수정</Text>}
      />
      {/* Tournament Header */}
      <TournamentHeader setCurrentTitle={setCurrentTitle} currentTitle={currentTitle} />
      {currentTitle == '상세정보' ? <DetailInfo /> : <></>}
      {currentTitle == '프라이즈' ? <Prize prizeInfo={prizeInfo!} /> : <></>}
      {currentTitle == '블라인드' ? <Blind blindInfo={blindInfo!} /> : <></>}
      {currentTitle == '참가자 현황' ? <Participant profiles={profiles!} /> : <></>}
      <View>
        <BottomMaxButton title="참여하기" color="#000" backgroundColor="#F5FF82" />
      </View>
    </SafeAreaView>
  );
}

const TournamentHeader = ({...props}) => {
  const {setCurrentTitle, currentTitle} = props;
  const HeaderTitle: IHeaderTitle[] = ['상세정보', '프라이즈', '블라인드', '참가자 현황'];
  return (
    <View style={TournamentHeaderStyles.headerContainer}>
      {HeaderTitle.map((item, i) => {
        return (
          <Pressable
            key={i}
            onPress={() => setCurrentTitle(item)}
            style={[
              GlobalStyles.flexCenter,
              TournamentHeaderStyles.headerStyle,
              currentTitle == item ? TournamentHeaderStyles.selectHeader : undefined,
            ]}>
            <Text style={[FontStyle.fs15, FontStyle.fw600, {color: currentTitle == item ? '#F5FF82' : '#fff'}]}>
              {item}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const DetailInfo = () => {
  return (
    <View style={DetailInfoStyle.container}>
      <Text style={[FontStyle.fs20, FontStyle.fw400]}>[NFT Holder Main Event]</Text>
      {/* 시간 정보 */}
      <View style={DetailInfoStyle.componentWrapper}>
        <IconAntDesign name="clockcircleo" size={heightData * 24} color="white" />
        <View style={{marginLeft: widthData * 20}}>
          <Text style={[FontStyle.fs16, FontStyle.fw600, DetailInfoStyle.titleText]}>일요일, 2023. 05. 21</Text>
          <Text style={[FontStyle.fs14, FontStyle.fw400, DetailInfoStyle.textPadding]}>
            게임 시작 : 2023. 05. 21 (일) 7:00 PM
          </Text>
          <Text style={[FontStyle.fs14, FontStyle.fw400, DetailInfoStyle.textPadding]}>
            레지 마감 : 2023. 05. 21 (일) 9:00 PM
          </Text>
        </View>
      </View>
      {/* 장소 */}
      <View style={DetailInfoStyle.componentWrapper}>
        <IconFeather name="map-pin" size={heightData * 24} color="white" />
        <View style={{marginLeft: widthData * 20}}>
          <Text style={[FontStyle.fs16, FontStyle.fw600, DetailInfoStyle.titleText]}>전빌딩 2층</Text>
          <Text style={[FontStyle.fs14, FontStyle.fw400, DetailInfoStyle.textPadding]}>
            서울시 서초구 서래마을 서래로 28 전빌딩 2층
          </Text>
        </View>
      </View>
      {/* 참여조건 */}
      <View style={DetailInfoStyle.componentWrapper}>
        <IconMaterialCommunityIcons name="poker-chip" size={heightData * 24} color="white" />
        <View style={{marginLeft: widthData * 20}}>
          <Text style={[FontStyle.fs16, FontStyle.fw600, DetailInfoStyle.titleText]}>참여 조건</Text>
          <Text style={[FontStyle.fs14, FontStyle.fw400, DetailInfoStyle.textPadding]}>Kings’ Azit NFT Holder </Text>
          <Text style={[FontStyle.fs16, FontStyle.fw600, DetailInfoStyle.titleText, {marginTop: heightData * 22}]}>
            바이인
          </Text>
          <Text style={[FontStyle.fs14, FontStyle.fw400, DetailInfoStyle.textPadding]}>블랙티켓 2장</Text>
          <View style={{marginTop: heightData * 22, flexDirection: 'row'}}>
            <Rectangle
              type="big"
              color="#F5FF82"
              scale={6}
              componentStyle={{marginRight: 6, marginTop: heightData * 5}}
            />
            <Text style={[FontStyle.fs14, FontStyle.fw400]}>
              {'스타팅 칩: 30,000 / 리바인: 40,000 /\n애드온: 10,000'}
            </Text>
          </View>
        </View>
      </View>
      {/* Prize */}
      <View style={DetailInfoStyle.componentWrapper}>
        <IconIonicons name="trophy-outline" size={heightData * 24} color="white" />
        <View style={{marginLeft: widthData * 20}}>
          <Text style={[FontStyle.fs16, FontStyle.fw600, DetailInfoStyle.titleText]}>Prize</Text>
          <Text style={[FontStyle.fs14, FontStyle.fw400, DetailInfoStyle.textPadding]}>150,000,000 GTD</Text>
        </View>
      </View>
    </View>
  );
};

const Prize = ({...props}: {prizeInfo: IPrizeInfo[]}) => {
  const {prizeInfo} = props;
  return (
    <ScrollView bounces={false}>
      <View style={PrizeStyle.container}>
        <Text style={[FontStyle.fs20, FontStyle.fw400]}>프라이즈 및 승점 분배 표</Text>
        <Text style={[FontStyle.fs14, FontStyle.fw400, PrizeStyle.textPadding]}>
          * 엔트리 수에 따라 프라이즈는 상향 조정될 수 있습니다.
        </Text>
      </View>
      <View>
        {/* Header */}
        <View style={[PrizeStyle.headerStyle, GlobalStyles.flexCenter, {marginTop: heightData * 42}]}>
          <Text style={[FontStyle.fs14, FontStyle.fw600, {flex: 1, textAlign: 'center'}]}>등수</Text>
          <Text style={[FontStyle.fs14, FontStyle.fw600, {flex: 3, textAlign: 'center'}]}>Prize</Text>
          <Text style={[FontStyle.fs14, FontStyle.fw600, {flex: 1, textAlign: 'center'}]}>승점</Text>
        </View>
        {prizeInfo.map((data, i) => (
          <View key={i} style={[PrizeStyle.headerStyle, {backgroundColor: 'transparent'}, GlobalStyles.flexCenter]}>
            <Text style={[FontStyle.fs14, FontStyle.fw600, {flex: 1, textAlign: 'center'}]}>{data.rank}등</Text>
            <Text style={[FontStyle.fs14, FontStyle.fw600, {flex: 3, textAlign: 'center'}]}>{data.prize}</Text>
            <Text style={[FontStyle.fs14, FontStyle.fw600, {flex: 1, textAlign: 'center'}]}>{data.point} pt</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const Blind = ({...props}: {blindInfo: IBlindInfo[]}) => {
  const {blindInfo} = props;
  return (
    <ScrollView bounces={false}>
      <View style={BlindStyle.container}>
        {/* Header */}
        <View style={[BlindStyle.headerStyle, GlobalStyles.flexCenter]}>
          <Text style={[FontStyle.fs14, FontStyle.fw600, {flex: 1, textAlign: 'center'}]}>Level</Text>
          <Text style={[FontStyle.fs14, FontStyle.fw600, {flex: 3, textAlign: 'center'}]}>Blinds</Text>
          <Text style={[FontStyle.fs14, FontStyle.fw600, {flex: 1, textAlign: 'center'}]}>Ante</Text>
        </View>
        {blindInfo.map((data, i) => {
          return (
            <>
              <View key={i} style={[BlindStyle.headerStyle, {backgroundColor: 'transparent'}, GlobalStyles.flexCenter]}>
                <Text style={[FontStyle.fs14, FontStyle.fw600, {flex: 1, textAlign: 'center'}]}>{data.level}</Text>
                <Text style={[FontStyle.fs14, FontStyle.fw600, {flex: 3, textAlign: 'center'}]}>{data.blinds}</Text>
                <Text style={[FontStyle.fs14, FontStyle.fw600, {flex: 1, textAlign: 'center'}]}>{data.ante}</Text>
              </View>
              {(i + 1) % 5 == 0 ? (
                <View style={[BlindStyle.headerStyle, {backgroundColor: 'transparent'}, GlobalStyles.flexCenter]}>
                  <Text style={[FontStyle.fs14, FontStyle.fw600, {flex: 1, textAlign: 'center'}]}>BREAK</Text>
                </View>
              ) : (
                <></>
              )}
            </>
          );
        })}
      </View>
    </ScrollView>
  );
};

const Participant = ({...props}: {profiles: IProfileInfo[][]}) => {
  const TableNumber: React.FC<{number: number}> = ({number}) => {
    return (
      <View style={[GlobalStyles.flexCenter, {top: heightData * 16, flexDirection: 'row'}]}>
        <Rectangle type="big" scale={7} color="#C9BEA2" />
        <View style={{width: widthData * 25, height: 2, backgroundColor: '#C9BEA2'}} />
        <Text style={[FontStyle.fs16, FontStyle.fwBold, {color: '#C9BEA2', paddingHorizontal: widthData * 11}]}>
          Table {number}
        </Text>
        <View style={{width: widthData * 25, height: 2, backgroundColor: '#C9BEA2'}} />
        <Rectangle type="big" scale={7} color="#C9BEA2" />
      </View>
    );
  };

  const UserIcon: React.FC<{
    uuid: string;
    nickName: string;
    space?: number;
  }> = ({uuid, nickName, space = 0}) => {
    return (
      <View style={[GlobalStyles.flexCenter, {marginHorizontal: space}]}>
        <ProfileImg style={ParticipantStyle.playerImg} source={Config.IMG_URL! + uuid} />
        <View style={ParticipantStyle.userNicknameStyle}>
          <Text style={[FontStyle.fs12, FontStyle.fwBold, {color: '#000'}]}>{nickName}</Text>
        </View>
      </View>
    );
  };

  const Dealer: React.FC<{
    space?: number;
  }> = ({space = 0}) => {
    return (
      <View style={[GlobalStyles.flexCenter, {marginHorizontal: space}]}>
        <View
          style={[
            GlobalStyles.flexCenter,
            ParticipantStyle.dealerStyle,
          ]}>
          <Text style={{color: '#C9BEA2', fontSize: 8, fontWeight: 'bold'}}>DEALER</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <Swiper
        horizontal={true}
        paginationStyle={{bottom: heightData * 5}}
        activeDot={<View style={BannerStyle.activeDot} />}
        dot={<View style={BannerStyle.dot} />}>
        {props.profiles.map((data, index) => (
          <View key={index} style={{}}>
            <Image source={require('../../assets/table_wide.png')} style={ParticipantStyle.tableStyle} />
            <View style={{position: 'absolute', width: '100%'}}>
              <TableNumber number={index + 1} />
              {/* 1열 자리 (Seat number : 2) */}
              <View style={[{top: heightData * 36}, ParticipantStyle.profileWrapper]}>
                <UserIcon uuid={data[2].uuid} nickName={data[2].nickName} />
              </View>
              <View style={[{top: heightData * 10}, ParticipantStyle.profileWrapper]}>
                <UserIcon uuid={data[3].uuid} nickName={data[3].nickName} space={widthData * 70} />
                <UserIcon uuid={data[1].uuid} nickName={data[1].nickName} space={widthData * 70} />
              </View>
              <View style={[{top: heightData * 40}, ParticipantStyle.profileWrapper]}>
                <UserIcon uuid={data[4].uuid} nickName={data[4].nickName} space={widthData * 90} />
                <UserIcon uuid={data[0].uuid} nickName={data[0].nickName} space={widthData * 90} />
              </View>
              <View style={[{top: heightData * 80}, ParticipantStyle.profileWrapper]}>
                <UserIcon uuid={data[5].uuid} nickName={data[5].nickName} space={widthData * 105} />
                <Dealer space={widthData * 105} />
              </View>
              <View style={[{top: heightData * 120}, ParticipantStyle.profileWrapper]}>
                <UserIcon uuid={data[6].uuid} nickName={data[6].nickName} space={widthData * 100} />
                <UserIcon uuid={data[10].uuid} nickName={data[10].nickName} space={widthData * 100} />
              </View>
              <View style={[{top: heightData * 160}, ParticipantStyle.profileWrapper]}>
                <UserIcon uuid={data[7].uuid} nickName={data[7].nickName} space={widthData * 90} />
                <UserIcon uuid={data[9].uuid} nickName={data[9].nickName} space={widthData * 90} />
              </View>
              <View style={[{top: heightData * 150}, ParticipantStyle.profileWrapper]}>
                <UserIcon uuid={data[8].uuid} nickName={data[8].nickName} />
              </View>
            </View>
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const TournamentHeaderStyles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    borderBottomWidth: heightData * 1,
    borderBottomColor: '#B7B7B7',
  },
  headerStyle: {
    flex: 1,
    top: heightData * 2,
    paddingTop: heightData * 14,
    paddingBottom: heightData * 12,
  },
  selectHeader: {
    color: '#F5FF82',
    paddingTop: heightData * 14,
    paddingBottom: heightData * 10,
    borderBottomWidth: heightData * 2,
    borderBottomColor: '#F5FF82',
  },
});

const DetailInfoStyle = StyleSheet.create({
  container: {
    paddingLeft: widthData * 20,
    marginTop: heightData * 28,
    flex: 1,
  },
  componentWrapper: {
    flexDirection: 'row',
    marginTop: heightData * 22,
  },
  titleText: {
    color: '#F5FF82',
  },
  textPadding: {
    paddingTop: 4,
  },
});

const PrizeStyle = StyleSheet.create({
  container: {
    paddingLeft: widthData * 20,
    marginTop: heightData * 28,
  },
  textPadding: {
    paddingTop: 4,
  },
  headerStyle: {
    flexDirection: 'row',
    backgroundColor: '#2D2D2D',
    height: heightData * 40,
    borderBottomColor: '#2D2D2D',
    borderBottomWidth: 1,
  },
});

const BlindStyle = StyleSheet.create({
  container: {
    marginTop: heightData * 15,
  },
  textPadding: {
    paddingTop: 4,
  },
  headerStyle: {
    flexDirection: 'row',
    backgroundColor: '#2D2D2D',
    height: heightData * 40,
    borderBottomColor: '#2D2D2D',
    borderBottomWidth: 1,
  },
});

const ParticipantStyle = StyleSheet.create({
  tableStyle: {
    // flex:1,
    height: 593 * heightData,
    width: width,
    resizeMode: 'cover',
  },
  playerImg: {
    width: widthData * 35,
    height: heightData * 35,
    borderRadius: 25,
  },
  userNicknameStyle: {
    top: -5,
    width: widthData * 50,
    height: heightData * 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#856F36',
    backgroundColor: 'rgba(210, 210, 210, 0.8)',
  },
  profileWrapper: {flexDirection: 'row', justifyContent: 'center'},
  dealerStyle: {
    width: widthData * 40,
    height: heightData * 40,
    borderRadius: 25,
    backgroundColor: '#35312A',
    borderWidth: 1,
    borderColor: '#C9BEA2',
  }
});

const BannerStyle = StyleSheet.create({
  imgSlideBox: {
    height: heightData * 265,
  },
  imgSlideBox2: {
    width: width,
    height: heightData * 265,
    resizeMode: 'cover',
  },
  activeDot: {
    backgroundColor: '#484848',
    width: widthData * 27,
    height: heightData * 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  dot: {
    backgroundColor: '#484848',
    opacity: 0.5,
    width: widthData * 8,
    height: heightData * 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
});
export default TournamentInfo;
