import {Header} from '@/components/Header';
import ProfileImg from '@/components/ProfileImg';
import Rectangle from '@/components/Rectangle';
import {IBlindInfo, IProfileInfo, ITournamentLive, ITournamentRoomState} from '@/config/tournament';
import useSocket, {
  callRoomInfo,
  callRoomTableInfo,
  filterLiveTablePlayers,
  getLiveTableInfos,
  getLiveTablePlayers,
  getLiveTableTimer,
} from '@/hooks/useSocket';
import {FontStyle, GlobalStyles, headerIconSize, heightData, width, widthData} from '@/modules/globalStyles';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeRootStackParamList} from 'AppInner';
import {useCallback, useEffect, useState} from 'react';
import {Text, View, StyleSheet, Image, Pressable, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {GameRoomTableLiveBlind} from './Component/GameRoomTableComponent/GameRoomTableLiveBlind';

type ScreenProps = NativeStackScreenProps<HomeRootStackParamList, 'GameRoomTable'>;

function GameRoomTable({route}: ScreenProps) {
  const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();
  const {socket} = useSocket();
  const {roomId} = route.params;
  const [profiles, setProfiles] = useState<IProfileInfo[][]>([]); // [LIVE] Players
  const [tableBlindInfo, setTableBlindInfo] = useState<Omit<ITournamentLive, 'players'>>({
    gameState: 'wait',
    blindLevel: 0,
    currentBlind: {
      BB: '111',
      SB: '111',
      Ante: '111',
    },
    nextBlind: {
      BB: '222',
      SB: '222',
      Ante: '222',
    },
  }); 
  // [LIVE] Blind Info
  const [runningTime, setRunningTime] = useState('00:00');

  useEffect(() => {
    const demo_players = new Array(25).fill(1).map((_,i) => {
      return  {
        uuid:"c121308f-579d-446d-876d-0f652f39ace4",
        nickName:"user"+i
      }
    })
    setProfiles(filterLiveTablePlayers(demo_players));
  },[])
  
  // [LIVE] emit.EnterRoom -> on.gameId
  // useEffect(() => {
  //   /**
  //    * @Title [LIVE]Get Players Info
  //    * @description [Socket] 새로운 참가자 입장 시, Re-Render
  //    */
  //   const getRoomPlayersOn = getLiveTablePlayers(roomId, (_playerInfo: IProfileInfo[] = []) => {
  //     const players = filterLiveTablePlayers(_playerInfo);
  //     setProfiles(players);
  //   });

  //   const getLiveTableInfosOn = getLiveTableInfos(roomId, (_tableBlindInfo: Omit<ITournamentLive, 'players'>) => {
  //     setTableBlindInfo(_tableBlindInfo);
  //   });

  //   const getLiveTableTimerOn = getLiveTableTimer(roomId, (_runningTimer: string = '00:00') => {
  //     setRunningTime(_runningTimer);
  //   });

  //   /**
  //    * @Title Trigger for socket.on.roomId
  //    */
  //   callRoomInfo({roomId});
  //   callRoomTableInfo({roomId});

  //   return () => {
  //     getRoomPlayersOn!.off();
  //     getLiveTableTimerOn!.off();
  //     getLiveTableInfosOn!.off();
  //   };
  // }, []);

  const TableNumber: React.FC<{number: number}> = ({number}) => {
    return (
      <View style={[GlobalStyles.flexCenter, {marginTop: heightData * 16, flexDirection: 'row'}]}>
        <Rectangle type="big" scale={5} color="#C9BEA2" />
        <View style={{width: widthData * 25, height: 2, backgroundColor: '#C9BEA2'}} />
        <Text style={[FontStyle.fs16, FontStyle.fwBold, {color: '#C9BEA2', paddingHorizontal: widthData * 11}]}>
          Table {number}
        </Text>
        <View style={{width: widthData * 25, height: 2, backgroundColor: '#C9BEA2'}} />
        <Rectangle type="big" scale={5} color="#C9BEA2" />
      </View>
    );
  };

  const UserIcon = useCallback(
    ({uuid = '', nickName = '', space = 0}) => {
      return (
        <Pressable
          onPress={() => Alert.alert('TODO', 'Sit-OUT 구현 예정')}
          style={[GlobalStyles.flexCenter, {marginHorizontal: space}]}>
          <ProfileImg style={ParticipantStyle.playerImg} uuid={uuid} />
          <View style={ParticipantStyle.userNicknameStyle}>
            <Text style={[FontStyle.fs12, FontStyle.fwBold, {color: '#000'}]}>{nickName}</Text>
          </View>
        </Pressable>
      );
    },
    [profiles],
  );

  const Dealer: React.FC<{
    space?: number;
  }> = ({space = 0}) => {
    return (
      <View style={[GlobalStyles.flexCenter, {marginHorizontal: space}]}>
        <View style={[GlobalStyles.flexCenter, ParticipantStyle.dealerStyle]}>
          <Text style={{color: '#C9BEA2', fontSize: heightData * 11, fontWeight: 'bold'}}>DEALER</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView edges={['top']} style={[GlobalStyles.container, {flex: 1}]}>
      {/* header */}
      <Header
        title={'게임'}
        leftIcon={() => (
          <IconAntDesign name="left" size={headerIconSize} color="white" onPress={() => navigation.goBack()} />
        )}
      />
      <View style={{flex: 1}}>
        <Swiper
          loop={false}
          horizontal={true}
          activeDot={<View style={BannerStyle.activeDot} />}
          dot={<View style={BannerStyle.dot} />}>
          {profiles.map((data, index) => (
            <View key={index} style={{flex: 1}}>
              <Image source={require('../../assets/table_wide.png')} style={ParticipantStyle.tableStyle} />
              <View  style={{position: 'absolute',width: '100%'}}>
                <TableNumber number={index + 1} />
                <View style={[{top: heightData * 50}, ParticipantStyle.profileWrapper]}>
                  <UserIcon uuid={data[2]?.uuid} nickName={data[2]?.nickName} />
                </View>
                <View style={[{top: heightData * 20}, ParticipantStyle.profileWrapper]}>
                  <UserIcon uuid={data[3]?.uuid} nickName={data[3]?.nickName} space={widthData * 70} />
                  <UserIcon uuid={data[1]?.uuid} nickName={data[1]?.nickName} space={widthData * 70} />
                </View>
                <View style={[{top: heightData * 45}, ParticipantStyle.profileWrapper]}>
                  <UserIcon uuid={data[4]?.uuid} nickName={data[4]?.nickName} space={widthData * 90} />
                  <UserIcon uuid={data[0]?.uuid} nickName={data[0]?.nickName} space={widthData * 90} />
                </View>
                <View style={[{top: heightData * 70}, ParticipantStyle.profileWrapper]}>
                  <UserIcon uuid={data[5]?.uuid} nickName={data[5]?.nickName} space={widthData * 100} />
                  <Dealer space={widthData * 100} />
                </View>
                <View style={[{top: heightData * 95}, ParticipantStyle.profileWrapper]}>
                  <UserIcon uuid={data[6]?.uuid} nickName={data[6]?.nickName} space={widthData * 90} />
                  <UserIcon uuid={data[10]?.uuid} nickName={data[10]?.nickName} space={widthData * 90} />
                </View>
                <View style={[{top: heightData * 125}, ParticipantStyle.profileWrapper]}>
                  <UserIcon uuid={data[7]?.uuid} nickName={data[7]?.nickName} space={widthData * 70} />
                  <UserIcon uuid={data[9]?.uuid} nickName={data[9]?.nickName} space={widthData * 70} />
                </View>
                <View style={[{top: heightData * 115}, ParticipantStyle.profileWrapper]}>
                  <UserIcon uuid={data[8]?.uuid} nickName={data[8]?.nickName} />
                </View>
              </View>
              <View pointerEvents="box-none" style={[{...StyleSheet.absoluteFillObject,flex:1}, GlobalStyles.flexCenter]}>
                <GameRoomTableLiveBlind roomId={roomId} tableBlindInfo={tableBlindInfo} timer={runningTime} />
              </View>
            </View>
          ))}
        </Swiper>
      </View>
    </SafeAreaView>
  );
}

const ParticipantStyle = StyleSheet.create({
  tableStyle: {
    flex: 1,
    width: width,
    resizeMode: 'cover',
  },
  playerImg: {
    width: widthData * 45,
    height: heightData * 45,
    borderRadius: 25,
  },
  userNicknameStyle: {
    top: -5 * heightData,
    width: widthData * 60,
    height: heightData * 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#35312A',
    backgroundColor: 'rgba(210, 210, 210, 0.8)',
  },
  profileWrapper: {flexDirection: 'row', justifyContent: 'center'},
  dealerStyle: {
    width: widthData * 50,
    height: heightData * 50,
    borderRadius: 25,
    backgroundColor: '#35312A',
    borderWidth: 1,
    borderColor: '#C9BEA2',
  },
});

const BannerStyle = StyleSheet.create({
  activeDot: {
    backgroundColor: '#6E5E48',
    width: widthData * 20,
    height: heightData * 5,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  dot: {
    backgroundColor: '#C6C6C680',
    opacity: 0.5,
    width: widthData * 5,
    height: heightData * 5,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
});
export default GameRoomTable;
