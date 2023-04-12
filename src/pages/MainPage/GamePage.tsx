import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Alert,
  Pressable,
} from 'react-native';
import {HomeRootStackParamList} from '../../../AppInner';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import {heightData} from '../../modules/globalStyles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/reducer';
import PayTicketForJoinGame from './MainPageModal/PayTicketForJoinGame';
import useSocket from '../../hooks/useSocket';
import {isEnterRoom, isPlaying, roomType} from '../../hooks/getGameList';
import Config from 'react-native-config';
import ProfileImg from '../../components/ProfileImg';
import SitoutPopup, { ISitoutInfo } from './Compoents/SitoutPopup';
const heightScale = heightData;
const {width, height} = Dimensions.get('screen');

type GamePageScreenProps = NativeStackScreenProps<
  HomeRootStackParamList,
  'GamePage'
>;

type blindType = {
  [key: string]: string;
};

function GamePage({route, navigation}: GamePageScreenProps) {
  const gameData: any = useSelector((state: RootState) => state.games);
  const currentGameData: roomType =
    gameData['constructor'][route.params.gameId];
  const {roles, uuid} = useSelector((state: RootState) => state.user);
  const isAdmin = roles.find((e: string) => e == 'ROLE_ADMIN');
  const [socket, disconnect] = useSocket();
  const [modalStatus, setModalStatus] = useState(false);
  const [isSeatOut, setIsSeatOut] = useState(false);
  const [sitOutInfo, setSitOutInfo] = useState<ISitoutInfo>({nickname:'',uuid:'',seatNum:0});
  const [selectSeatNum, setSelectSeatNum] = useState<number>();
  const [isGuest, setIsGuest] = useState({is: false, isFixed: false});
  const [timer, setTimer] = useState('...');

  const [isStart, setIsStart] = useState(false);
  const [isReStart, setIsReStart] = useState(false);
  const [isBreak, setIsBreak] = useState(false);

  useEffect(() => {
    if (currentGameData?.status === 'waiting') setIsStart(true);
    if (currentGameData?.status === 'playing') setIsBreak(true);
    if (currentGameData?.status === 'break') setIsReStart(true);
    if (currentGameData?.status === 'closed') {
      setIsStart(false);
      setIsReStart(false);
      setIsReStart(false);
    }
  }, [currentGameData]);

  // 소켓 메세지 관리 및 어드민 게임 참여
  useEffect(() => {
    console.log('Enter Room ID : ' + route.params.gameId);

    const callbackError = (data: any) => {
      console.log(data);

      if (data.type === 'finishGame') {
        if (
          data.msg.includes(
            'insert others data error. try again and check the logs: ',
          )
        ) {
          Alert.alert('Error', data.msg);
        }
      }
    };


    const getMessage = (data: any) => {
      // 게임 종료 성공 시
      if (socket && data === '게임 기록 성공!') {
        // 삭제 후, 새로운 데이터 리턴
        socket.emit('getGameRoomList', 'init');
        // 권한 별 네비게이트
        navigateFunc();
      }
    };

    const getTimer = (data: any) => {
      setTimer(data);
    };

    const acessError = (data: any) => {
      Alert.alert('알림', '해당 게임의 딜러만 조작이 가능합니다.');
    };

    const recordSuccess = () => {
      // 권한 별 네비게이트
      navigateFunc();
    };

    if (socket) {
      // 방에 참여
      socket.on('timer', getTimer);
      socket.emit('enterGameRoom', {gameId: route.params.gameId});
      socket.on('error', callbackError);
      socket.on('finishGameError', callbackError);
      socket.on('getMessage', getMessage);
      socket.on('resetTimerError', acessError);
      socket.on('pauseTimerError', acessError);
      socket.on('closeGameError', acessError);
      socket.on('recordSuccess', recordSuccess);
    }

    return () => {
      if (socket) {
        socket.off('error', callbackError);
        socket.off('finishGameError', callbackError);
        socket.off('getMessage', getMessage);
        socket.off('timer', getTimer);
        socket.off('resetTimerError', acessError);
        socket.off('pauseTimerError', acessError);
        socket.off('closeGameError', acessError);
      }
    };
  }, []);

  const joinGame = (seatNum: number) => {
    if (currentGameData.status === 'closed') return;
    if (!!currentGameData.seat[seatNum]) {
      if (isAdmin) {
        sitout(seatNum);
      }
      return;
    }

    let msg = '';
    if (isPlaying(gameData, uuid)) {
      msg = '다른 테이블 게임에 참여 중에는 게스트 초대만 가능합니다.';
    }
    if (isEnterRoom(currentGameData, uuid)) {
      msg = '게임에 참여 중에는 게스트 초대만 가능합니다.';
    }
    if (isAdmin) {
      msg = '관리자는 게스트 초대만 가능합니다.';
    }

    if (msg) {
      setIsGuest({is: true, isFixed: true});
      Alert.alert('알림', msg, [
        {
          text: '확인',
          onPress: () => {
            setSelectSeatNum(seatNum);
            setModalStatus(true);
          },
        },
        {text: '취소'},
      ]);

      return;
    }

    setSelectSeatNum(seatNum);
    setModalStatus(true);
  };

  const breakTimer = () => {
    setIsBreak(false);
    if (socket) {
      socket.emit('pauseTimer');
    }
    setIsReStart(true);
  };

  const StartTimer = () => {
    setIsStart(false);
    if (socket) {
      socket.emit('startTimer');
    }
    setIsBreak(true);
  };

  const reStartTimer = () => {
    setIsReStart(false);
    if (socket) {
      socket.emit('startTimer');
    }
    setIsBreak(true);
  };

  const CloseGame = () => {
    if (socket) {
      socket.emit('closeGame');
    }
  };

  const finishGame = () => {
    if (socket) {
      console.log('try delete Room');
      navigation.navigate('Prize')
      // socket.emit(
      //   'finishGame',
      //   '',
      //   // {
      //   //   user_1st: user_1st,
      //   //   user_2nd: user_2nd,
      //   //   user_3rd: user_3rd,
      //   //   prize_type: prize_type,
      //   //   prize_amount: prize_amount,
      //   // }
      // );
    }
  };

  const sitout = (seatNum: number) => {
    setSitOutInfo({nickname:currentGameData.seat[seatNum].nickname,uuid:currentGameData.seat[seatNum].uuid,seatNum})
    setIsSeatOut(true);
  };

  const navigateFunc = () => {
    if (isAdmin) {
      navigation.navigate('CreateRoom');
    } else {
      navigation.navigate('Home');
    }
  };

  const _blindInfo: blindType = {
    'Level 1': '200/400',
    'Level 2': '400/800',
    'Level 3': '500/1000',
    'Level 4': '1000/2000',
    'Level 5': '1500/3000',
    'Level 6': '2000/4000',
    'Level 7': '2500/5000',
    'Level 8': '3000/6000',
    'Level 9': '4000/8000',
    'Level 10': '5000/10000',
    'Level 11': '6000/12000',
    'Level 12': '8000/16000',
    'Level 13': '10000/20000',
    'Level 14': '15000/30000',
    'Level 15': '20000/40000',
    'Level 16': '30000/60000',
  };

  const userSeat = (seat: number) => {
    const subStr = (input: any) => {
      if (typeof input == 'string' && input.length > 5) {
        return input.substr(0, 5) + '...';
      }
      return input;
    };
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <View style={styles.userProfileStyle} onTouchEnd={() => joinGame(seat)}>
          {currentGameData?.seat[seat] === null ? (
            <Text
              style={[
                {
                  color: '#000',
                  fontSize: heightScale * 25,
                  fontWeight: '400',
                },
                {
                  display:
                    currentGameData.status === 'closed' ? 'none' : 'flex',
                },
              ]}>
              +
            </Text>
          ) : (
            <ProfileImg
              style={styles.playerImg}
              source={Config.IMG_URL! + currentGameData?.seat[seat].uuid}
            />
          )}
        </View>
        <View style={styles.userNicknameStyle}>
          <Text
            style={{
              fontSize: heightScale * 13,
              color: '#000',
              fontWeight: 'bold',
            }}>
            {currentGameData?.seat[seat] === null
              ? ''
              : subStr(currentGameData?.seat[seat].nickname)}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View>
        <View style={styles.headerStyle}>
          <Text style={styles.fontStyle}>
            Table No. {currentGameData?.table_no}
          </Text>
        </View>
        <IconAntDesign
          name="left"
          size={heightScale * 28}
          color="white"
          style={styles.headerIcon}
          onPress={() => navigateFunc()}
        />
      </View>

      <View style={styles.contents}>
        <View>
          <Image
            source={require('../../assets/table.png')}
            style={styles.tableStyle}
          />
          <View style={styles.usersContainer}>
            {/* 1열 자리 (Seat number : 2) */}
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                top: heightScale * 43,
              }}>
              {userSeat(2)}
            </View>

            {/* 2열 자리 (Seat number : 1,3) */}
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: heightScale * 55,
                position: 'absolute',
                top: heightScale * 77,
                zIndex: 1,
              }}>
              {userSeat(3)}
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                {userSeat(1)}
              </View>
            </View>

            {/* 3열 자리 (Seat number : 0,4) */}
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: heightScale * 20,
                position: 'absolute',
                top: heightScale * 188,
                zIndex: 1,
              }}>
              {userSeat(4)}
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                {userSeat(0)}
              </View>
            </View>

            {/* 4열 자리 (Seat number : 딜러,5) */}
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: heightScale * 17,
                position: 'absolute',
                top: heightScale * 309,
                zIndex: 1,
              }}>
              {userSeat(5)}
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <View style={styles.dealerWrapperStyle}>
                  <View style={styles.dealerStyle}>
                    <Text style={styles.dealerText}>DEALER</Text>
                  </View>
                </View>
              </View>
            </View>

            {/* 5열 자리 (Seat number : 6,10) */}
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: heightScale * 20,
                position: 'absolute',
                top: heightScale * 433,
                zIndex: 1,
              }}>
              {userSeat(6)}
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                {userSeat(10)}
              </View>
            </View>

            {/* 6열 자리 (Seat number : 7,9) */}
            <View
              style={{
                flexDirection: 'row',
                marginHorizontal: heightScale * 31,
                position: 'absolute',
                top: heightScale * 561,
                zIndex: 1,
              }}>
              {userSeat(7)}
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                {userSeat(9)}
              </View>
            </View>

            {/* 7열 자리 (Seat number : 8) */}
            <View
              style={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                marginBottom: heightScale * 122,
                flex: 1,
              }}>
              {userSeat(8)}
            </View>

            {/* Current Blind Info */}
            <View style={styles.blindStyle}>
              <Text style={styles.blindTextStyle}>
                Blinds: {currentGameData?.blind.split(':')[0]}
              </Text>
              <Text style={styles.blindTextStyle}>
                {currentGameData?.blind.split(':')[1]} Ante:{' '}
                {currentGameData?.ante}
              </Text>
            </View>

            {/* Next Blind Info */}
            <View style={[styles.blindStyle, {top: heightScale * 461}]}>
              <Text style={styles.blindTextStyle}>
                Next Blinds : {_blindInfo[currentGameData?.blind.split(':')[0]]}
              </Text>
              <Text style={styles.blindTextStyle}>in {timer}</Text>
              {isAdmin ? (
                <>
                  {isStart && (
                    <Pressable style={styles.stateButton} onPress={StartTimer}>
                      <Text
                        style={{
                          paddingLeft: heightScale * 3,
                          fontSize: heightScale * 16,
                          fontWeight: 'bold',
                        }}>
                        Start
                      </Text>
                    </Pressable>
                  )}
                  {isReStart && (
                    <Pressable
                      style={styles.stateButton}
                      onPress={reStartTimer}>
                      <IconFeather size={heightScale * 20} name="play" />
                      <Text
                        style={{
                          paddingLeft: heightScale * 3,
                          fontSize: heightScale * 16,
                          fontWeight: 'bold',
                        }}>
                        Restart
                      </Text>
                    </Pressable>
                  )}
                  {isBreak && (
                    <Pressable
                      onPress={breakTimer}
                      style={[
                        styles.stateButton,
                        {backgroundColor: '#35312A', borderColor: '#DACFB1'},
                      ]}>
                      <IconFontAwesome
                        size={heightScale * 15}
                        name="pause"
                        color={'#C9BEA2'}
                      />
                      <Text
                        style={{
                          paddingLeft: heightScale * 6,
                          fontSize: heightScale * 16,
                          fontWeight: 'bold',
                          color: '#C9BEA2',
                        }}>
                        Break
                      </Text>
                    </Pressable>
                  )}
                </>
              ) : (
                <></>
              )}
            </View>
          </View>
        </View>

        {/* 게임 종료 버튼 */}
        <View style={styles.endButtonWrapper}>
          <View style={{alignItems: 'center'}}>
            {isAdmin && currentGameData?.status === 'closed' ? (
              <>
                <TouchableOpacity
                      style={styles.gameOutButton}
                      onPress={() => finishGame()}>
                      <IconIonicons
                        name="power"
                        color={'white'}
                        size={heightScale * 18}
                      />
                      <Text style={styles.endButtonText}>방 지우기</Text>
                    </TouchableOpacity>
              </>
            ) : (
              <>
                {isStart || isReStart ? (
                  <>
                    <TouchableOpacity
                  style={styles.gameOutButton}
                  onPress={() => CloseGame()}
                  activeOpacity={1}>
                  <IconIonicons
                    name="power"
                    color={'white'}
                    size={heightScale * 18}
                  />
                  <Text style={styles.endButtonText}>게임 마감</Text>
                </TouchableOpacity>
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          </View>
        </View>
      </View>

      {isSeatOut && (
        <SitoutPopup setIsSeatOut={setIsSeatOut} sitOutInfo={sitOutInfo} />
      )}

      <Modal isVisible={modalStatus} style={{flex: 1}}>
        <PayTicketForJoinGame
          setModalStatus={setModalStatus}
          item={currentGameData!}
          selectSeatNum={selectSeatNum!}
          isGuest={isGuest}
          setIsGuest={setIsGuest}
        />
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: height,
    backgroundColor: 'black',
  },
  fontStyle: {fontSize: heightScale * 18, fontWeight: 'bold', color: 'white'},
  headerStyle: {
    height: heightScale * 61,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#484848',
  },
  headerIcon: {
    position: 'absolute',
    marginTop: (heightScale * (61 - 28)) / 2,
    marginLeft: heightScale * 15,
  },
  contents: {},
  usersContainer: {
    position: 'absolute',
    width: width,
    height: 815 * heightScale,
  },
  userProfileStyle: {
    width: heightScale * 50,
    height: heightScale * 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(210, 210, 210, 0.6)',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
  },
  userNicknameStyle: {
    top: -5,
    width: heightScale * 70,
    height: heightScale * 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: heightScale * 17,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'black',
    backgroundColor: 'rgba(210, 210, 210, 0.8)',
  },
  dealerWrapperStyle: {
    height: heightScale * 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dealerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: heightScale * 60,
    height: heightScale * 60,
    backgroundColor: '#35312A',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#C9BEA2',
    borderRadius: heightScale * 60,
  },
  dealerText: {
    color: '#C9BEA2',
    fontSize: heightScale * 12,
    fontWeight: 'bold',
  },
  blindTextStyle: {
    fontSize: heightScale * 16,
    fontWeight: 'bold',
    color: '#C9BEA2',
    paddingBottom: heightScale * 3,
  },
  blindStyle: {
    width,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: heightScale * 234,
  },
  tableStyle: {
    width: width,
    height: 815 * heightScale,
    resizeMode: 'stretch',
  },
  playerImg: {
    width: heightScale * 50,
    height: heightScale * 50,
    borderRadius: 25,
  },
  gameOutButton: {
    width: 133 * heightScale,
    height: 40 * heightScale,
    backgroundColor: '#242424',
    borderRadius: 20,
    borderColor: 'white',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stateButton: {
    marginTop: heightScale * 20,
    backgroundColor: '#C9BEA2',
    width: heightScale * 120,
    height: heightScale * 40,
    borderRadius: 20,
    borderColor: 'black',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  endButtonWrapper: {
    position: 'absolute',
    bottom: heightScale * 40,
    width,
    alignItems: 'center',
  },
  endButtonText: {
    fontSize: 16 * heightScale,
    color: '#fff',
    paddingLeft: 5 * heightScale,
  },
});

export default GamePage;
