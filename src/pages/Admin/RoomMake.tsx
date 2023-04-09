import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HomeRootStackParamList} from '../../../AppInner';
import React, {useState, useCallback, useEffect} from 'react';
import {heightData, StringUpperCase} from '../../modules/globalStyles';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RNPickerSelect from 'react-native-picker-select';
import useSocket from '../../hooks/useSocket';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/reducer';
import {TicketType} from '../../modules/ticketsList';
import {getGameListArr} from '../../hooks/getGameList';
const heightScale = heightData;

type GameType = 'Main' | 'Nft' | 'Custom';
type StatusType = 'playing' | 'waiting';
type DurationType = '8' | '9' | null;

function RoomMake() {
  const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();
  const gameData: any = useSelector((state: RootState) => state.games);
  const {nickName} = useSelector((state: RootState) => state.user);
  const [socket, disconnect] = useSocket();

  const [loading, setLoading] = useState(false);

  const [table, setTable] = useState();
  const [gameType, setGameType] = useState<GameType>('Main');
  const [buyin, setBuyin] = useState<any>();
  const [ticket, setTicket] = useState<TicketType>();
  const [enteyLimit, setEntryLimit] = useState<string>();
  const [blind, setBlind] = useState("Level 1: 100/200");
  const [duration, setDuration] = useState<DurationType>();
  const [status, setStatus] = useState<StatusType>('playing');

  const [table_Num, setTable_Num] = useState([1, 2, 3, 4]);

  const game_type: GameType[] = ['Main', 'Nft', 'Custom'];
  const ticket_type: TicketType[] = ['black', 'red', 'gold'];
  const Blind_Duration: DurationType[] = ['8', '9'];
  const statusList: StatusType[] = ['playing', 'waiting'];
  const canCreate = !!table && !!gameType && !!ticket && !!buyin && !!enteyLimit;

  const onChangeBuyin = useCallback((text: any) => {
    if (text.trim() == 0) {
      setBuyin('');
      return;
    }
    setBuyin(text.trim());
  }, []);

  const onChangeEntryLimit = useCallback((text: any) => {
    if (text.trim() >= 25) {
      setEntryLimit('25');
      return;
    }
    if (text.trim() == 0) {
      setEntryLimit('');
      return;
    }
    setEntryLimit(text.trim());
  }, []);

  const onChangeDuration = useCallback((text: any) => {
    setDuration(text.trim());
  }, []);

  const onChnageGameType = useCallback((text: any) => {
    setGameType(text.trim());
  }, []);

  useEffect(() => {
    const createGameRoomError = (data: any) => {
      Alert.alert('알림', `Table No. ${table}은 이미 사용중입니다.`);
      setLoading(false);
    };

    const enterNewRoom = (gameId: string) => {
      navigation.navigate('GamePage', {gameId});
      setLoading(false);
    };

    if (socket) {
      socket.on('newRoom', enterNewRoom);
      socket.on('createGameRoomError', createGameRoomError);
    }

    return () => {
      if (socket) {
        socket.off('newRoom', enterNewRoom);
        socket.off('createGameRoomError', createGameRoomError);
      }
    };
  }, []);

  useEffect(() => {
    const gameList = getGameListArr(gameData);
    gameList.find(key => key.table_no);
    const currTableNum = table_Num.filter(
      key => !gameList.map(key => key.table_no).includes(key),
    );
    setTable_Num([...currTableNum]);
  }, [gameData]);

  useEffect(() => {
    if (gameType == 'Main') {
      setBuyin('1');
      setTicket('black');
      setDuration('8');
    } else if (gameType == 'Nft') {
      setBuyin('1');
      setTicket('black');
      setDuration('9');
    } else {
      setBuyin('');
      setTicket('');
      setDuration('8');
    }
  }, [gameType]);

  const createRoom = () => {
    if(!canCreate) return;
    setLoading(true);

    console.log('table :' + table);
    console.log('dealer id :' + nickName);
    console.log('game name :' + gameType);
    console.log('entey Limit :' + (enteyLimit == ''));
    console.log('ticket amount :' + buyin);
    console.log('ticket type :' + ticket);
    console.log('blind :' + blind);
    console.log('ante :' + '0');
    console.log('status :' + status);
    console.log('duration :' + duration);

    if (socket) {
      socket.emit('createGameRoom', {
        table_no: table,
        game_name: gameType + " Game",
        entry_limit: enteyLimit,
        ticket_amount: buyin,
        ticket_type: ticket,
        blind: blind,
        ante: 0,
        status: status, 
        duration:duration
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View>
        <View style={styles.headerStyle}>
          <Text style={styles.fontStyle}>방만들기</Text>
        </View>
        <IconAntDesign
          name="left"
          size={heightScale * 28}
          color="white"
          style={{
            position: 'absolute',
            marginTop: (heightScale * (61 - 28)) / 2,
            marginLeft: heightScale * 15,
          }}
          onPress={() => navigation.goBack()}
        />
      </View>
      <KeyboardAwareScrollView
        bounces={false}
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}>
        {/* Table Selects */}
        <View style={{flex: 1, paddingHorizontal: 18 * heightScale}}>
          <View style={{flex: 1}}>
            <Text style={styles.mainText}>Table No</Text>
            <View style={styles.tableSelect}>
              <View style={styles.downIcon}>
                <IconAntDesign
                  name="down"
                  size={heightScale * 25}
                  color="#F5FF82"
                />
              </View>
              <RNPickerSelect
                onValueChange={value => setTable(value)}
                placeholder={{
                  label: 'Select Table No',
                  inputLabel: 'Select Table No',
                }}
                items={table_Num.map(item => {
                  return {
                    label: `Table No. ${item}`,
                    inputLabel: `Table No. ${item}`,
                    value: item,
                  };
                })}
                style={{
                  viewContainer: {
                    justifyContent: 'center',
                    paddingLeft: heightScale * 10,
                    flex: 1,
                  },
                  inputIOS: {color: '#fff'},
                  inputAndroid:{color: '#fff'}
                }}
              />
            </View>
          </View>

          {/* Game Type Titlt */}
          <View style={{flex: 1}}>
            <Text style={styles.mainText}>Game Type</Text>
            {/* Game Type Contents */}
            <View style={{flexDirection: 'row'}}>
              {game_type.map(item => (
                <TouchableOpacity
                  key={item}
                  onPress={() => onChnageGameType(item)}
                  style={[
                    styles.touchBox,
                    gameType == item && styles.touchBox2,
                  ]}>
                  <Text
                    style={[
                      styles.tableSelectText2,
                      gameType == item && styles.tableSelectText3,
                    ]}>
                    {item} Game
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={{flex: 1}}>
            {/* Buy In Title */}
            <Text style={styles.mainText}>Buy-in</Text>
            <View style={{flexDirection: 'row'}}>
              {gameType == 'Main' || gameType == 'Nft' ? (
                <View style={[styles.touchBox3]}>
                  <Text
                    style={[styles.tableSelectText2, styles.tableSelectText3]}>
                    {buyin} {ticket} Ticket
                  </Text>
                </View>
              ) : (
                <>
                  <View>
                    <TextInput
                      style={styles.TextInput}
                      placeholder="Enter"
                      onChangeText={onChangeBuyin}
                      value={buyin}
                      keyboardType={'number-pad'}
                      placeholderTextColor="#6F6F6F"
                    />
                  </View>
                  <View style={styles.tableSelect2}>
              <View style={styles.downIcon}>
                <IconAntDesign
                  name="down"
                  size={heightScale * 25}
                  color="#F5FF82"
                />
              </View>
              <RNPickerSelect
                onValueChange={value => setTicket(value)}
                placeholder={{
                  label: 'Select Ticket',
                  inputLabel: 'Select Ticket',
                }}
                items={ticket_type.map(item => {
                  return {
                    label: `${StringUpperCase(item)} Ticket`,
                    inputLabel: `${StringUpperCase(item)} Ticket`,
                    value: item,
                  };
                })}
                style={{
                  viewContainer: {
                    justifyContent: 'center',
                    paddingLeft: heightScale * 10,
                    flex: 1,
                  },
                  inputIOS: {color: '#fff'},
                  inputAndroid:{color: '#fff'}
                }}
              />
            </View>
                </>
              )}
            </View>
          </View>

          {/* Entry Title */}
          <View style={{flex: 1}}>
            <Text style={styles.mainText}>Entry</Text>
            <View>
              <TextInput
                style={styles.TextInput}
                placeholder="Enter"
                onChangeText={onChangeEntryLimit}
                value={enteyLimit}
                keyboardType={'number-pad'}
                placeholderTextColor="#6F6F6F"
              />
            </View>
          </View>

          {/* Blind Duration Title */}
          <View style={{flex: 1}}>
            <Text style={styles.mainText}>Blind Duration</Text>
            <View style={{flexDirection: 'row'}}>
              {gameType == 'Main' || gameType == 'Nft' ? (
                <TouchableOpacity style={[styles.touchBox, styles.touchBox2]}>
                  <Text
                    style={[styles.tableSelectText2, styles.tableSelectText3]}>
                    {duration} mins
                  </Text>
                </TouchableOpacity>
              ) : (
                <>
                  {Blind_Duration.map(item => (
                    <TouchableOpacity
                      key={item}
                      style={[
                        styles.touchBox,
                        duration == item && styles.touchBox2,
                      ]}
                      onPress={() => onChangeDuration(item)}>
                      <Text
                        style={[
                          styles.tableSelectText2,
                          duration == item && styles.tableSelectText3,
                        ]}>
                        {item} mins
                      </Text>
                    </TouchableOpacity>
                  ))}
                </>
              )}
            </View>
          </View>

          {/* Status Title */}
          <View style={{flex: 1}}>
            <Text style={styles.mainText}>Status</Text>
            <View style={{flexDirection: 'row'}}>
              {statusList.map(item => {
                let _item;
                if (item == 'playing') {
                  _item = '진행중';
                } else if (item == 'waiting') {
                  _item = '대기중';
                }
                return (
                  <TouchableOpacity
                    key={item}
                    onPress={() => setStatus(item)}
                    style={[
                      styles.touchBox,
                      status == item && styles.touchBox2,
                    ]}>
                    <Text
                      style={[
                        styles.tableSelectText2,
                        status == item && styles.tableSelectText3,
                      ]}>
                      {_item}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          {/* 방만들기 Button */}
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity style={canCreate ? styles.buttonStyle : [styles.buttonStyle,{backgroundColor:'#222'}]} onPress={createRoom}>
              <Text style={canCreate ? styles.buttonTextStyle : [styles.buttonTextStyle,{color:'#8A8A8A'}]}>
                {' '}
                {loading ? <ActivityIndicator /> : '방만들기'}{' '}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
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
  mainText: {
    fontSize: 18 * heightScale,
    fontWeight: '600',
    color: 'white',
    marginTop: 25 * heightScale,
  },
  tableSelect: {
    backgroundColor: '#222',
    width: 208 * heightScale,
    height: 44 * heightScale,
    borderColor: '#F5FF82',
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 20 * heightScale,
    justifyContent: 'center',
  },
  tableSelectText2: {
    lineHeight: 42 * heightScale,
    color: 'white',
    textAlign: 'center',
    // fontWeight:'600',
  },
  tableSelectText3: {
    color: 'black',
  },
  downIcon: {
    position: 'absolute',
    alignItems: 'center',
    right: heightScale * 10,
  },
  touchBox: {
    width: 110 * heightScale,
    height: 44 * heightScale,
    borderColor: '#F5FF82',
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 20 * heightScale,
    marginRight: 20 * heightScale,
    backgroundColor: '#222',
  },
  touchBox2: {
    backgroundColor: '#F5FF82',
  },
  touchBox3: {
    width: 128 * heightScale,
    height: 44 * heightScale,
    borderColor: '#F5FF82',
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 20 * heightScale,
    backgroundColor: '#F5FF82',
  },
  TextInput: {
    borderColor: '#f5ff82',
    borderWidth: 1,
    borderRadius: 6,
    width: 128 * heightScale,
    height: 44 * heightScale,
    paddingLeft: 10 * heightScale,
    marginTop: 20 * heightScale,
    backgroundColor: '#222',
    color: 'white',
  },
  tableSelect2: {
    backgroundColor: '#222',
    width: 154 * heightScale,
    height: 44 * heightScale,
    borderColor: '#F5FF82',
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 20 * heightScale,
    marginLeft: 20 * heightScale,
    justifyContent: 'center',
  },
  buttonStyle: {
    backgroundColor: '#F5FF82',
    justifyContent: 'center',
    alignItems: 'center',
    width: 370 * heightScale,
    height: 64 * heightScale,
    borderColor: '#F5FF82',
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 23 * heightScale,
  },
  buttonTextStyle: {
    fontSize: 20 * heightScale,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default RoomMake;
