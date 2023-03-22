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
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HomeRootStackParamList } from '../../../AppInner';
import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconAntDesign2 from 'react-native-vector-icons/Feather';
import { widthData, heightData } from '../../modules/globalStyles';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';
import { roomType } from './Compoents/GameBox';
import PayTicketForJoinGame from './MainPageModal/PayTicketForJoinGame';
import useSocket from '../../hooks/useSocket';
const heightScale = heightData;
const { width, height } = Dimensions.get('window');

type GamePageScreenProps = NativeStackScreenProps<
  HomeRootStackParamList,
  'GamePage'
>;

function GamePage({route,navigation}:GamePageScreenProps) {
  const gameData:any = useSelector((state: RootState) => state.games);
  const {roles} = useSelector((state: RootState) => state.user);
  const isAdmin = roles.find((e: string) => e == 'ROLE_ADMIN');
  const [socket, disconnect] = useSocket();
  
  const [modalStatus, setModalStatus] = useState(false); 
  const [currentGameData, setCurrentGameData] = useState<roomType>();

  useEffect(() => {
    const data:roomType = gameData['constructor'][route.params.gameId]
    setCurrentGameData(data)

  },[gameData])

  // 소켓 메세지 관리 및 어드민 게임 참여
  useEffect(() => {
      console.log("Enter Room ID : " + route.params.gameId);
      // admin이면 바로 입장
      if(isAdmin && socket && route.params.gameId) {
        socket.emit('enterGameRoom', {gameId:route.params.gameId});
      }

    const callbackError = (data: any) => {
      if(data.type === 'finishGame') {
        if(data.msg.includes('insert others data error. try again and check the logs: ')) {
          Alert.alert('Error',"현재 게임 종료에 문제가 생겼습니다. 잠시만 기다려 주세요.");
        }
        console.log(data.msg);
      }

      if(data.type === 'sitout') {
        Alert.alert('Sitout Error',data.msg)
      }
    };
    
    const getMessage = (data:any) => {
      // 싯아웃 성공 시
      if(socket && data === '유저닉네임sitout') {
        console.log("sitout : ",data);
        socket.emit('getGameRoomList', 'init');
      }
      
      // 게임 종료 성공 시
      if(socket && data === "게임 기록 성공!") {
          // 삭제 후, 새로운 데이터 리턴
          socket.emit('getGameRoomList', 'init');
          // 권한 별 네비게이트
          navigateFunc();
        }
    }

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
  },[])

  const onClickJoinButton = () => {
    setModalStatus(true);
  };
  
  const finishGame = () => {
    if (socket) {
      console.log("delete Room");
      socket.emit('finishGame',""
      // {
      //   user_1st: user_1st,
      //   user_2nd: user_2nd,
      //   user_3rd: user_3rd,
      //   prize_type: prize_type,
      //   prize_amount: prize_amount,
      // }
      );
    }
  }

  const sitout = () => {
    if (socket) {
      socket.emit('sitout', '유저닉네임');
    }
  }

  const navigateFunc = () => {
      if(isAdmin) {
        navigation.navigate('CreateRoom')
      } else {
        navigation.navigate('Home')
      }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.headerStyle}>
          <Text style={styles.fontStyle}>Table No. {currentGameData?.table_no}</Text>
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
        <View style={styles.contentsBox}>
          <Image
            source={require('../../assets/table.png')}
            style={styles.mainLogo}
          />

          <View
            style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ alignItems: 'flex-end', flex: 1 }}>
              <View style={{ position: 'absolute',alignItems:'center', top: 25 * heightScale }} >
                <View style={styles.joinIcon}
                  onTouchEnd={() => onClickJoinButton()}>
                  <Text style={{ color: '#000', fontSize: 22, fontWeight: '600' }} >+</Text>
                </View>
                <View
                  style={styles.joinText}>
                  <Text></Text>
                </View>
              </View>
            </View>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <View style={styles.joinIcon}
                onTouchEnd={() => Alert.alert('Todo :', '자리 정하기 기능')}>
                <Text style={{ color: '#000', fontSize: 22, fontWeight: '600' }} >+</Text>
              </View>
              <View
                style={styles.joinText}>
                <Text></Text>
              </View>
            </View>
            <View style={{ alignItems: 'flex-start', flex: 1 }}>
              <View style={{ position: 'absolute', top: 25 * heightScale,alignItems:'center' }} >
                <View style={styles.joinIcon}
                  onTouchEnd={() => Alert.alert('Todo :', '자리 정하기 기능')}>
                  <Text style={{ color: '#000', fontSize: 22, fontWeight: '600' }} >+</Text>
                </View>
                <View
                  style={styles.joinText}>
                  <Text></Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{ flex: 1, flexDirection: 'row', paddingHorizontal: heightScale * 35 }}>
            <View style={{ alignItems: 'flex-start', flex: 1 }}>
              <View style={styles.joinIcon}
                onTouchEnd={() => Alert.alert('Todo :', '자리 정하기 기능')}>
                <Text style={{ color: '#000', fontSize: 22, fontWeight: '600' }} >+</Text>
              </View>
              <View
                style={styles.joinText}>
                <Text></Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ color: '#000', fontWeight: '600' }}>Blinds : Level 2</Text>
              <Text style={{ color: '#000', fontWeight: '600' }}>{currentGameData?.blind} Ante: {currentGameData?.ante}</Text>
            </View>
            <View style={{ alignItems: 'flex-end', flex: 1 }}>
              <View style={styles.joinIcon}
                onTouchEnd={() => Alert.alert('Todo :', '자리 정하기 기능')}>
                <Text style={{ color: '#000', fontSize: 22, fontWeight: '600' }} >+</Text>
              </View>
              <View
                style={styles.joinText}>
                <Text></Text>
              </View>
            </View>
          </View>


          <View
            style={{ flex: 1, flexDirection: 'row', paddingHorizontal: heightScale * 15 }}>
            <View style={{ alignItems: 'flex-start', flex: 1 }}>
              <View style={styles.joinIcon}
                onTouchEnd={() => Alert.alert('Todo :', '자리 정하기 기능')}>
                <Text style={{ color: '#000', fontSize: 22, fontWeight: '600' }} >+</Text>
              </View>
              <View
                style={styles.joinText}>
                <Text></Text>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'column' }} >
              <View style={styles.countBox} >
                <Text style={styles.countBoxText} > 00:00:00 </Text>
              </View>
              <View style={styles.restart}>
                <IconAntDesign2
                  name="play"
                  size={heightScale * 22}
                  color="#FCFF72"
                  style={styles.playIcon}
                />
                <Text style={styles.countBoxText} >Restart</Text>
              </View>
            </View>
            <View style={{ alignItems: 'flex-end', flex: 1 }}>
              <View
                style={styles.dealer}>
                <Text style={{ color: '#56FFA7' }} onPress={sitout}>딜러</Text>
              </View>
            </View>
          </View>

          <View
            style={{ flex: 1, flexDirection: 'row', paddingHorizontal: heightScale * 15 }}>
            <View style={{ alignItems: 'flex-start', flex: 1 }}>
              <View style={styles.joinIcon}
                onTouchEnd={() => Alert.alert('Todo :', '자리 정하기 기능')}>
                <Text style={{ color: '#000', fontSize: 22, fontWeight: '600' }} >+</Text>
              </View>
              <View
                style={styles.joinText}>
                <Text></Text>
              </View>
            </View>
            <View style={{ alignItems: 'flex-end', flex: 1 }}>
              <View style={styles.joinIcon}
                onTouchEnd={() => Alert.alert('Todo :', '자리 정하기 기능')}>
                <Text style={{ color: '#000', fontSize: 22, fontWeight: '600' }} >+</Text>
              </View>
              <View
                style={styles.joinText}>
                <Text></Text>
              </View>
            </View>
          </View>
          <View
            style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ alignItems: 'flex-end', flex: 1 }}>
              <View style={{ position: 'absolute', top: -25 * heightScale }} >
                <View style={styles.joinIcon}
                  onTouchEnd={() => Alert.alert('Todo :', '자리 정하기 기능')}>
                  <Text style={{ color: '#000', fontSize: 22, fontWeight: '600' }} >+</Text>
                </View>
                <View
                  style={styles.joinText}>
                  <Text></Text>
                </View>
              </View>
            </View>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <View style={styles.joinIcon}
                onTouchEnd={() => Alert.alert('Todo :', '자리 정하기 기능')}>
                <Text style={{ color: '#000', fontSize: 22, fontWeight: '600' }} >+</Text>
              </View>
              <View
                style={styles.joinText}>
                <Text></Text>
              </View>
            </View>
            <View style={{ alignItems: 'flex-start', flex: 1 }}>
              <View style={{ position: 'absolute', top: -25 * heightScale }} >
                <View style={styles.joinIcon}
                  onTouchEnd={() => Alert.alert('Todo :', '자리 정하기 기능')}>
                  <Text style={{ color: '#000', fontSize: 22, fontWeight: '600' }} >+</Text>
                </View>
                <View
                  style={styles.joinText}>
                  <Text></Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {isAdmin ? <TouchableOpacity onPress={() => finishGame()} activeOpacity={1} style={{ alignItems: 'center',  }} >
          <View style={styles.gameOutButton} >
            <Image style={styles.endButtonImg} source={require('../../assets/Power.png')} />
            <Text  style={styles.endButtonText} >게임 종료</Text>
          </View>
        </TouchableOpacity> : <></>}
      </View>

      <Modal isVisible={modalStatus} style={{flex: 1}}>
        <PayTicketForJoinGame setModalStatus={setModalStatus} item={currentGameData!} />
      </Modal>

    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'black',
  },
  fontStyle: { fontSize: heightScale * 18, fontWeight: 'bold', color: 'white' },
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
  contents: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 45 * heightScale,
  },
  contentsBox: {
    width: width,
    height: heightData * 630,
  },
  mainLogo: {
    position: 'absolute',
    width: width,
    height: heightData * 630,
  },
  joinIcon: {
    width: heightScale * 62,
    height: heightScale * 62,
    borderRadius: 100,
    backgroundColor: '#D2D2D2',
    opacity: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  joinText: {
    width: heightScale * 66,
    height: heightScale * 23,
    backgroundColor: '#D2D2D2',
    opacity: 0.8,
    bottom: heightScale * 10,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  dealer: {
    width: 62,
    height: 62,
    borderRadius: 100,
    backgroundColor: '#224E38',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#56FFA7',
  },
  countBox: {
    width: 153 * heightScale,
    height: 42 * heightScale,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countBoxText: {
    fontSize: 18 * heightScale,
    color: '#FCFF72'
  },
  restart: {
    width: 149 * heightScale,
    height: 42 * heightScale,
    backgroundColor: '#000',
    borderRadius: 50,
    marginTop: 18 * heightScale,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    marginRight: 10 * heightScale,
  },
  gameOutButton: {
    width: 133 * heightScale,
    height: 40 * heightScale,
    backgroundColor: '#242424',
    borderRadius: 20,
    borderColor:'white',
    borderWidth:1,
    marginTop : 30 * heightScale,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  endButtonImg:{
    width: 20 * heightScale,
    height: 20 *heightScale,
    marginRight: 10 *heightScale
  },
  endButtonText:{
    fontSize: 16 *heightScale,
    color:'#fff',
  },

});

export default GamePage;
