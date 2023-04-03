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
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HomeRootStackParamList} from '../../../AppInner';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import {heightData} from '../../modules/globalStyles';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/reducer';
import PayTicketForJoinGame from './MainPageModal/PayTicketForJoinGame';
import useSocket from '../../hooks/useSocket';
import {isEnterRoom, isPlaying, roomType} from '../../hooks/getGameList';
import Config from 'react-native-config';
const heightScale = heightData;
const {width, height} = Dimensions.get('screen');

type GamePageScreenProps = NativeStackScreenProps<
  HomeRootStackParamList,
  'GamePage'
>;

type blindInfoType = {
  level: number;
  ante: number;
};

type blindType = {
  [key: string]: blindInfoType;
};

function GamePage({route, navigation}: GamePageScreenProps) {
  const gameData: any = useSelector((state: RootState) => state.games);
  const currentGameData: roomType =
    gameData['constructor'][route.params.gameId];
  const {roles, uuid} = useSelector((state: RootState) => state.user);
  const isAdmin = roles.find((e: string) => e == 'ROLE_ADMIN');
  const [socket, disconnect] = useSocket();
  const [modalStatus, setModalStatus] = useState(false);
  const [selectSeatNum, setSelectSeatNum] = useState<number>();
  // const [currentGameData, setCurrentGameData] = useState<any>();

  // 소켓 메세지 관리 및 어드민 게임 참여
  useEffect(() => {
    console.log('Enter Room ID : ' + route.params.gameId);
    // admin이면 바로 입장
    if (isAdmin && socket && route.params.gameId) {
      socket.emit('enterGameRoom', {gameId: route.params.gameId});
    }

    const callbackError = (data: any) => {
      if (data.type === 'finishGame') {
        if (
          data.msg.includes(
            'insert others data error. try again and check the logs: ',
          )
        ) {
          Alert.alert('Error', data.msg);
        }
      }

      if (data.type === 'sitout') {
        Alert.alert('Sitout Error', data.msg);
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

    if (socket) {
      socket.on('error', callbackError);
      socket.on('getMessage', getMessage);
    }

    return () => {
      if (socket) {
        socket.off('error', callbackError);
        socket.off('getMessage', getMessage);
      }
    };
  }, []);

  const onClickUser = (seatNum: number) => {
    
    if (!!currentGameData.seat[seatNum]) return;
    let msg = '';
    if (isPlaying(gameData, uuid)) {
      msg = '다른 테이블 게임에 참여 중에는 게스트 초대만 가능합니다.';
    }
    if (isEnterRoom(currentGameData, uuid)) {
      msg = '게임에 참여 중에는 게스트 초대만 가능합니다.';
    }
    if (msg) {
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

  const finishGame = () => {
    if (socket) {
      console.log('try delete Room');
      socket.emit(
        'finishGame',
        '',
        // {
        //   user_1st: user_1st,
        //   user_2nd: user_2nd,
        //   user_3rd: user_3rd,
        //   prize_type: prize_type,
        //   prize_amount: prize_amount,
        // }
      );
    }
  };

  const sitout = (seatNum: number) => {
    if (socket) {
      Alert.alert(
        '알림',
        `${currentGameData.seat[seatNum].nickname}플레이어를 싯아웃 하겠습니까?`,
        [
          {
            text: '예',
            onPress: () =>
              socket.emit('sitout', currentGameData.seat[seatNum].nickname),
          },
          {text: '아니오'},
        ],
      );
    }
  };

  const navigateFunc = () => {
    if (isAdmin) {
      navigation.navigate('CreateRoom');
    } else {
      navigation.navigate('Home');
    }
  };

  const _blindInfo: blindType = {
    '100/200': {level: 1, ante: 0},
    '200/400': {level: 2, ante: 0},
    '400/800': {level: 3, ante: 0},
    '500/1000': {level: 4, ante: 0},
    '1000/2000': {level: 5, ante: 0},
    '1500/3000': {level: 6, ante: 1500},
    '2000/4000': {level: 7, ante: 2000},
    '2500/5000': {level: 8, ante: 2500},
    '3000/6000': {level: 9, ante: 3000},
    '4000/8000': {level: 10, ante: 4000},
    '5000/10000': {level: 11, ante: 5000},
    '6000/12000': {level: 12, ante: 6000},
    '8000/16000': {level: 13, ante: 8000},
    '10000/20000': {level: 14, ante: 10000},
    '15000/30000': {level: 15, ante: 15000},
    '20000/40000': {level: 16, ante: 20000},
    '30000/60000': {level: 17, ante: 60000},
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
        <View
          style={styles.userProfileStyle}
          // onTouchEnd={() => onClickUser(seat)}>
          onTouchEnd={() => sitout(seat)}>
          {currentGameData?.seat[seat] === null ? (
            <Text
              style={{
                color: '#000',
                fontSize: heightScale * 25,
                fontWeight: '400',
              }}>
              +
            </Text>
          ) : (
            <Image
              style={styles.playerImg}
              defaultSource={require('../../assets/UserIcon.png')}
              source={{uri: Config.IMG_URL! + currentGameData?.seat[seat].uuid}}
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
                Blinds: Level{' '}
                {currentGameData?.blind
                  ? _blindInfo[currentGameData.blind].level
                  : ''}
              </Text>
              <Text style={styles.blindTextStyle}>
                {currentGameData?.blind} Ante:
                {currentGameData?.blind
                  ? _blindInfo[currentGameData.blind].ante
                  : ''}
              </Text>
            </View>

            {/* Next Blind Info */}
            <View style={[styles.blindStyle, {top: heightScale * 461}]}>
              <Text style={styles.blindTextStyle}>
                Next Blinds:{' '}
                {
                  Object.keys(_blindInfo)[
                    Object.keys(_blindInfo).findIndex(
                      value => value === currentGameData?.blind,
                    ) + 1
                  ]
                }
              </Text>
              <Text style={styles.blindTextStyle}>in 03:56</Text>
              {isAdmin ? (              <View
                style={styles.stateButton}>
                <IconFeather size={heightScale * 20} name="play" />
                <Text
                  style={{
                    paddingLeft: heightScale * 3,
                    fontSize: heightScale * 16,
                    fontWeight: 'bold',
                  }}>
                  Restart
                </Text>
              </View>) : <></>}
            </View>
          </View>
        </View>

        {/* 게임 종료 버튼 */}
        <View style={styles.endButtonWrapper}>
          {isAdmin ? (
            <TouchableOpacity
              onPress={() => finishGame()}
              activeOpacity={1}
              style={{alignItems: 'center'}}>
              <View style={styles.gameOutButton}>
                <IconIonicons
                  name="power"
                  color={'white'}
                  size={heightScale * 18}
                />
                <Text style={styles.endButtonText}>게임 종료</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      </View>

      <Modal isVisible={modalStatus} style={{flex: 1}}>
        <PayTicketForJoinGame
          setModalStatus={setModalStatus}
          item={currentGameData!}
          selectSeatNum={selectSeatNum!}
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
    borderRadius: heightScale*60,
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
