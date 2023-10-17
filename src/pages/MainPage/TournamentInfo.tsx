import {Header} from '@/components/Header';
import {FontStyle, GlobalStyles, UpperString, headerIconSize, height, heightData, width, widthData} from '@/modules';
import {useNavigation, NavigationProp, useFocusEffect, useIsFocused} from '@react-navigation/native';
import {HomeRootStackParamList} from 'AppInner';
import React, {useCallback, useEffect, useState} from 'react';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';
import {View, Text, Modal, Alert} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/reducer';
import {BottomMaxButton} from '@/components/Button';
import {TournametInfoPayTicketModal} from './Component/TournamentInfoComponent/TournametInfoPayTicket.modal';
import {CreateRoomsDto, IBlindInfo, IHeaderTitle, IPrizeInfo, IProfileInfo, ITournament, MAX_TABLE_LIMIT, demo_liveRooms} from '@/config/tournament';
import {TournamentInfoHeader} from './Component/TournamentInfoComponent/TournamentInfoHeader';
import {TournamentInfoDetail} from './Component/TournamentInfoComponent/TournamentInfoDetail';
import {TournamentInfoPrize} from './Component/TournamentInfoComponent/TournamentInfoPrize';
import {TournamentInfoBlind} from './Component/TournamentInfoComponent/TournamentInfoBlind';
import {TournamentInfoParticipant} from './Component/TournamentInfoComponent/TournamentInfoParticipant';
import {SafeAreaView} from 'react-native-safe-area-context';
import useSocket, {callRoomInfo, filterLiveTablePlayers, getLiveRoomInfo, getLiveTablePlayers} from '@/hooks/useSocket';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

type ScreenProps = NativeStackScreenProps<HomeRootStackParamList, 'TournamentInfo'>;

function TournamentInfo({route}: ScreenProps) {
  const {roomId} = route.params;
  const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();
  const {socket} = useSocket();
  const {roles, uuid, nickName} = useSelector((state: RootState) => state.user);
  const isAdmin = roles.find((e: string) => e == 'ROLE_ADMIN');
  const [currentTitle, setCurrentTitle] = useState<IHeaderTitle>('상세정보');
  const [prizeInfo, setPrizeInfo] = useState<IPrizeInfo[]>([]);
  const [blindInfo, setBlindInfo] = useState<IBlindInfo[]>([]);
  const [profiles, setProfiles] = useState<IProfileInfo[][]>([]);
  const [onEnterModal, setOnEnterModal] = useState(false);
  const [gameInfo, setGameInfo] = useState<CreateRoomsDto>(demo_liveRooms);


  // @ deprecated 
  // [LIVE] emit.EnterRoom -> on.gameId
  // useFocusEffect(
  //   useCallback(() => {
  //     /**
  //      * @Title [LIVE]Get Game Info
  //      * @description [Socket] 방 정보 수정 시, Re-Render
  //      */
  //     const getRoomInfoOn = getLiveRoomInfo(roomId, _roomInfo => {
  //       setGameInfo(_roomInfo);
  //     });

  //     /**
  //      * @Title [LIVE]Get Players Info
  //      * @description [Socket] 새로운 참가자 입장 시, Re-Render
  //      */
  //     const getRoomPlayersOn = getLiveTablePlayers(roomId, (_playerInfo: IProfileInfo[] = []) => {
  //       const players = filterLiveTablePlayers(_playerInfo);
  //       setProfiles(players);
  //     });

  //     /**
  //      * @Title Trigger for socket.on.roomId
  //      */
  //     callRoomInfo({roomId});

  //     // return () => {
  //     //   console.log('4');
  //     //   getRoomInfoOn?.off();
  //     //   getRoomPlayersOn?.off();
  //     // }
  //   }, []),
  // );

  /**
   * @todo 이미 참여중인 플레이어도 포함(&&) 구현 예정
   */
  const isPlayer = !!isAdmin;

  useEffect(() => {
    const demoPrizeInfo: IPrizeInfo[] = demo_liveRooms.grades.map((val, i) => {
      return {
        rank: i + 1,
        prize: `${val.count} ${UpperString(val.ticket)} Tickets`,
        point: val.point,
      };
    });
    setPrizeInfo(demoPrizeInfo);

    const _blindInfo: IBlindInfo[] = demo_liveRooms.blind.map((val, i) => {
      return {
        level: i + 1,
        blinds: `${val.BB}/${val.SB}`,
        ante: val.Ante,
      };
    });

    setBlindInfo(_blindInfo);
    
    const demo_players = new Array(25).fill(1).map((_,i) => {
      return  {
        uuid:"c121308f-579d-446d-876d-0f652f39ace4",
        nickName:"user"+i
      }
    })
    setProfiles(filterLiveTablePlayers(demo_players));
  }, [gameInfo]);

  const enterRoom = async () => {
    if (isPlayer) {
      navigation.navigate('GameRoomTable', {roomId});
    } else {
      setOnEnterModal(true);
    }
  };

  return (
    <SafeAreaView edges={['top', 'bottom']} style={[GlobalStyles.container, {flex: 1}]}>
      {/* header */}
      <Header
        title={gameInfo.title}
        leftIcon={() => (
          <IconAntDesign
            name="left"
            size={headerIconSize}
            color="white"
            onPress={() => {
              navigation.goBack();
            }}
          />
        )}
        rightIcon={() => (
          <IconFeather
            name="edit"
            onPress={() => Alert.alert('TODO:', 'Admin 토너먼트 정보 수정 기능 구현 예정')}
            size={headerIconSize}
            color="white"
            style={{display: !!isAdmin ? 'flex' : 'none'}}
          />
        )}
      />
      <TournamentInfoHeader setCurrentTitle={setCurrentTitle} currentTitle={currentTitle} />
      {currentTitle == '상세정보' ? <TournamentInfoDetail gameInfo={gameInfo} /> : <></>}
      {currentTitle == '프라이즈' ? <TournamentInfoPrize prizeInfo={prizeInfo} /> : <></>}
      {currentTitle == '블라인드' ? <TournamentInfoBlind blindInfo={blindInfo} /> : <></>}
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
          payInfo={{type: gameInfo.buyinTicketType, amount: gameInfo.buyinTicketCount, isNFT: gameInfo.entryCondition}}
          setOnEnterModal={setOnEnterModal}
        />
      </Modal>
    </SafeAreaView>
  );
}
export default TournamentInfo;
