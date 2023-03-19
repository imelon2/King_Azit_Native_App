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
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HomeRootStackParamList} from '../../../AppInner';
import React, {useState, useCallback, useEffect} from 'react';
import {heightData} from '../../modules/globalStyles';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import useSocket from '../../hooks/useSocket';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/reducer';
import { TicketType } from '../../modules/ticketsList';
import { getGameListArr } from '../../hooks/getGameList';
const heightScale = heightData;

type GameType = 'Main' | 'Nft' | 'Custom';
type StatusType = 'playing' | 'waiting';
type DurationType = '8' | '9' | null;

function RoomMake() {
  const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();
  const gameData:any = useSelector((state: RootState) => state.games);
  const {name, nickName} = useSelector((state: RootState) => state.user);
  const [socket, disconnect] = useSocket();

  const [selectDrop, setSelectDrop] = useState(false);
  const [ticketSelectDrop, setTicketSelectDrop] = useState(false);

  const [table, setTable] = useState(1);
  const [gameType, setGameType] = useState<GameType>('Main');
  const [buyin, setBuyin] = useState<any>();
  const [ticket, setTicket] = useState<TicketType>();
  const [enteyLimit, setEntryLimit] = useState();
  const [blind, setBlind] = useState('100/200');
  const [duration, setDuration] = useState<DurationType>();
  const [status, setStatus] = useState<StatusType>('playing');

  const [table_Num, setTable_Num] = useState([1, 2, 3, 4]);

  const game_type: GameType[] = ['Main', 'Nft', 'Custom'];
  const ticket_type: TicketType[] = ['Black', 'Red', 'Gold'];
  const Blind_Duration: DurationType[] = ['8', '9'];
  const statusList: StatusType[] = ['playing', 'waiting'];


  const onChangeBuyin = useCallback((text: any) => {
    setBuyin(text.trim());
  }, []);

  const onClickTicket = useCallback((text: any) => {
    setTicket(text.trim());
    setTicketSelectDrop(false);
  }, []);

  const onChangeEntryLimit = useCallback((text: any) => {
    setEntryLimit(text.trim());
  }, []);

  const onChangeDuration = useCallback((text: any) => {
    setDuration(text.trim());
  }, []);

  const onChnageGameType = useCallback((text: any) => {
    setGameType(text.trim());
    setTicketSelectDrop(false);
  }, []);

  useEffect(() => {
    const callback = (data: any) => {
      console.log(data);
    };
    if(socket) {
      socket.on('error', callback);
    }
  },[])

  useEffect(() => {
    const gameList = getGameListArr(gameData);
    gameList.find((key) => key.table_no)
    const currTableNum = table_Num.filter((key) => !gameList.map((key) => key.table_no).includes(key))
    setTable_Num([...currTableNum])
  },[gameData])

  useEffect(() => {
    if (gameType == 'Main') {
      setBuyin('1');
      setTicket('Black');
      setDuration('8');
    } else if (gameType == 'Nft') {
      setBuyin('1');
      setTicket('Black');
      setDuration('9');
    } else {
      setBuyin("");
      setTicket("");
      setDuration('8');
    }
  }, [gameType]);

  const createRoom = () => {
    const callback = (data: any) => {
      console.log(data);
    };
    console.log("table :" + table);
    console.log("dealer id :" + nickName);
    console.log("game name :" + gameType);
    console.log("entey Limit :" + (enteyLimit == ""));
    console.log("ticket amount :" + buyin);
    console.log("ticket type :" + ticket);
    console.log("blind :" + blind);
    console.log("ante :" + "0");
    console.log("status :" + status);
    
    if (socket) {
      socket.emit('createGameRoom', {
        table_no: table,
        dealer_id: nickName,
        game_name: gameType,
        entry_limit: enteyLimit,
        ticket_amount: buyin,
        ticket_type: ticket,
        blind: blind,
        ante: 0,
        // playing_users: [],
        // sitout_users: [],
        status: status, // default 삭제 필요
      });
    }
  };

  const deleteTest = () => {
    if (socket) {
      console.log("delete Room");
      
      socket.emit('finishGame', "");
    }
  }


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
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}>
        {/* Table Selects */}
        {selectDrop && (
          <View style={styles.selectBox}>
            {table_Num.map((item: any, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => {
                  setSelectDrop(false);
                  setTable(item);
                }}
                activeOpacity={1}
                style={{flex: 1, zIndex: 2}}>
                <Text style={styles.tableSelectText}>Table NO.{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        <View style={{flex: 1, paddingHorizontal: 18 * heightScale}}>
          {/* Table Title */}
          <View style={{flex: 1}}>
            <Text style={styles.mainText}>Table</Text>
            <TouchableOpacity
              onPress={() => setSelectDrop(!selectDrop)}
              activeOpacity={1}
              style={styles.tableSelect}>
              <Text style={styles.tableSelectText}>Table No. {table}</Text>
              <IconAntDesign
                name="down"
                size={heightScale * 25}
                color="#F5FF82"
                style={styles.downIcon}
              />
            </TouchableOpacity>
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
                      keyboardType={'decimal-pad'}
                      placeholderTextColor="#6F6F6F"
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => setTicketSelectDrop(!selectDrop)}
                    activeOpacity={1}
                    style={styles.tableSelect2}>
                    <Text style={styles.tableSelectText}>{ticket} Ticket</Text>
                    <IconAntDesign
                      name="down"
                      size={heightScale * 25}
                      color="#F5FF82"
                      style={styles.downIcon}
                    />
                  </TouchableOpacity>
                </>
              )}
            </View>
          </View>

          {/* Tickets Select Box */}
          {ticketSelectDrop && (
            <View style={styles.selectBox2}>
              {ticket_type.map(item => (
                <TouchableOpacity
                  key={item}
                  onPress={() => onClickTicket(item)}
                  activeOpacity={1}
                  style={{flex: 1, zIndex: 2}}>
                  <Text style={styles.tableSelectText}>{item} Ticket</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

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
                      onPress={() => onChangeDuration(item)}
                      >
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

              <Pressable style={{backgroundColor:'red'}} onPress={deleteTest}>
                <Text>delete</Text>
              </Pressable>
          {/* 방만들기 Button */}
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <TouchableOpacity style={styles.buttonStyle} onPress={createRoom}>
              <Text style={styles.buttonTextStyle}> 방만들기 </Text>
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
    // lineHeight: 44 * heightScale,
    marginTop: 20 * heightScale,
  },
  tableSelectText: {
    lineHeight: 42 * heightScale,
    color: 'white',
    paddingLeft: 14 * heightScale,
    // fontWeight:'600',
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
    right: 12 * heightScale,
    top: (44 * heightScale - 25) / 2,
  },
  selectBox: {
    position: 'absolute',
    top: 176 * heightScale,
    left: 18 * heightScale,
    width: 208 * heightScale,
    height: 177 * heightScale,
    borderColor: '#F5FF82',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#222',
    zIndex: 5,
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
  },
  selectBox2: {
    position: 'absolute',
    top: 341 * heightScale,
    left: 167 * heightScale,
    width: 154 * heightScale,
    height: 133 * heightScale,
    borderColor: '#F5FF82',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: '#222',
    zIndex: 5,
  },
  buttonStyle: {
    backgroundColor: '#F5FF82',
    width: 370 * heightScale,
    height: 64 * heightScale,
    borderColor: '#F5FF82',
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 23 * heightScale,
  },
  buttonTextStyle: {
    lineHeight: 64 * heightScale,
    fontSize: 20 * heightScale,
    fontWeight: '600',
    textAlign: 'center',
  },
});

export default RoomMake;
