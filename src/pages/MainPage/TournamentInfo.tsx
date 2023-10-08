import {Header} from '@/components/Header';
import {FontStyle, GlobalStyles, headerIconSize, height, heightData, width, widthData} from '@/modules';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {HomeRootStackParamList} from 'AppInner';
import React, {useEffect, useState} from 'react';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {View, Text, Modal, Alert} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/reducer';
import {BottomMaxButton} from '@/components/Button';
import {TournametInfoPayTicketModal} from './Component/TournamentInfoComponent/TournametInfoPayTicket.modal';
import {IBlindInfo, IHeaderTitle, IPrizeInfo, IProfileInfo} from '@/config/tournament';
import {TournamentInfoHeader} from './Component/TournamentInfoComponent/TournamentInfoHeader';
import {TournamentInfoDetail} from './Component/TournamentInfoComponent/TournamentInfoDetail';
import {TournamentInfoPrize} from './Component/TournamentInfoComponent/TournamentInfoPrize';
import {TournamentInfoBlind} from './Component/TournamentInfoComponent/TournamentInfoBlind';
import {TournamentInfoParticipant} from './Component/TournamentInfoComponent/TournamentInfoParticipant';
import {SafeAreaView} from 'react-native-safe-area-context';

function TournamentInfo() {
  const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();
  const {roles, uuid, nickName} = useSelector((state: RootState) => state.user);
  const isAdmin = roles.find((e: string) => e == 'ROLE_ADMIN');
  const [currentTitle, setCurrentTitle] = useState<IHeaderTitle>('상세정보');
  const [prizeInfo, setPrizeInfo] = useState<IPrizeInfo[]>();
  const [blindInfo, setBlindInfo] = useState<IBlindInfo[]>();
  const [profiles, setProfiles] = useState<IProfileInfo[][]>();
  const [onEnterModal, setOnEnterModal] = useState(false);

  /**
   * @todo 이미 참여중인 플레이어도 포함(&&) 구현 예정
   */
  const isPlayer = !!isAdmin;

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

  const enterRoom = () => {
    isPlayer ? navigation.navigate('GameRoomTable', {gameId: '1234'}) : setOnEnterModal(true);
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={[GlobalStyles.container, {flex: 1}]}>
      {/* header */}
      <Header
        title="[NFT Holder Main Event]"
        leftIcon={() => (
          <IconAntDesign name="left" size={headerIconSize} color="white" onPress={() => navigation.goBack()} />
        )}
        rightIcon={() => (
          <Text
            onPress={() => Alert.alert('TODO:', 'Admin 토너먼트 정보 수정 기능 구현 예정')}
            style={[FontStyle.fs16, {display: !!isAdmin ? 'flex' : 'none'}]}>
            수정
          </Text>
        )}
      />
      <TournamentInfoHeader setCurrentTitle={setCurrentTitle} currentTitle={currentTitle} />
      {currentTitle == '상세정보' ? <TournamentInfoDetail /> : <></>}
      {currentTitle == '프라이즈' ? <TournamentInfoPrize prizeInfo={prizeInfo!} /> : <></>}
      {currentTitle == '블라인드' ? <TournamentInfoBlind blindInfo={blindInfo!} /> : <></>}
      {currentTitle == '참가자 현황' ? <TournamentInfoParticipant profiles={profiles!} /> : <></>}
      <View style={{}}>
        <BottomMaxButton
          title={isPlayer ? '테이블로 이동' : '참여하기'}
          color="#000"
          backgroundColor="#F5FF82"
          onPress={() => enterRoom()}
        />
      </View>
      <Modal transparent visible={onEnterModal} animationType={'slide'}>
        <TournametInfoPayTicketModal
          payInfo={{type: 'black', amount: '20', isNFT: true}}
          setOnEnterModal={setOnEnterModal}
        />
      </Modal>
    </SafeAreaView>
  );
}
export default TournamentInfo;
