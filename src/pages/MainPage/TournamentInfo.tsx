import Header from '@/components/Header';
import {FontStyle, GlobalStyles, headerIconSize, heightData, widthData} from '@/modules';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {HomeRootStackParamList} from 'AppInner';
import React, {useEffect, useState} from 'react';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {View, Text, SafeAreaView, StyleSheet, Pressable, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/reducer';
import Rectangle from '@/components/Rectangle';
import {BottomButton, BottomMaxButton} from '@/components/Button';

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
function TournamentInfo() {
  const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();
  const {roles} = useSelector((state: RootState) => state.user);
  const isAdmin = roles.find((e: string) => e == 'ROLE_ADMIN');
  const [currentTitle, setCurrentTitle] = useState<IHeaderTitle>('상세정보');
  const [prizeInfo, setPrizeInfo] = useState<IPrizeInfo[]>();
  const [blindInfo, setBlindInfo] = useState<IBlindInfo[]>();

  useEffect(() => {
    const demoPrizeInfo: IPrizeInfo[] = new Array(5).fill(1).map((_, i) => {
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
    setPrizeInfo(demoPrizeInfo);
    setBlindInfo(demoBlindInfo);
  }, []);

  return (
    <SafeAreaView style={[GlobalStyles.container, {flex:1}]}>
      {/* header */}
      <Header
        title="[NFT Holder Main Event]"
        leftIcon={() => (
          <IconAntDesign name="left" size={headerIconSize} color="white" onPress={() => navigation.goBack()} />
        )}
        rightIcon={() => <Text style={[FontStyle.fs16, {display: isAdmin! ? 'none' : 'flex'}]}>수정</Text>}
      />
      {/* Tournament Header */}
      <TournamentHeader setCurrentTitle={setCurrentTitle} currentTitle={currentTitle} />
      {currentTitle == '상세정보' ? <DetailInfo /> : <></>}
      {currentTitle == '프라이즈' ? <Prize prizeInfo={prizeInfo!} /> : <></>}
      {currentTitle == '블라인드' ? <Blind blindInfo={blindInfo!} /> : <></>}
      {currentTitle == '참가자 현황' ? <Participant  /> : <></>}
      <View>
        <BottomMaxButton
          title="참여하기"
          color="#000"
          backgroundColor="#F5FF82"
          componentStyle={{position: 'absolute', bottom: 0}}
        />
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
    <ScrollView bounces={false} style={PrizeStyle.container}>
      <View style={{paddingLeft: widthData * 20}}>
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
    <ScrollView bounces={false} style={BlindStyle.container}>
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
            {((i + 1) % 5) == 0 ? (
              <View style={[BlindStyle.headerStyle, {backgroundColor: 'transparent'}, GlobalStyles.flexCenter]}>
                <Text style={[FontStyle.fs14, FontStyle.fw600, {flex: 1, textAlign: 'center'}]}>BREAK</Text>
              </View>
            ) : (
              <></>
            )}
          </>
        );
      })}
    </ScrollView>
  );
};

const Participant = () => {
  return (
    <View style={{flex:1}}>
      <Text style={FontStyle.fs16}>Participant</Text>
    </View>
  )
}

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
    marginTop: heightData * 28,
    marginBottom: heightData * 54,
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
    marginBottom: heightData * 54,
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

export default TournamentInfo;
