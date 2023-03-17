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
} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HomeRootStackParamList} from '../../../AppInner';
import React, {useEffect, useState, useCallback} from 'react';
import {RootStackParamList} from '../../../AppInner';
import Modal from 'react-native-modal';
import {widthData, heightData} from '../../modules/globalStyles';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import useSocket from '../../hooks/useSocket';
import { request } from 'react-native-permissions';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';
const heightScale = heightData;

const {width, height} = Dimensions.get('window');

function RoomMake() {
  const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();
  const {name,nickName} = useSelector((state: RootState) => state.user);
  const [socket, disconnect] = useSocket();

  const [selectDrop, setSelectDrop] = useState(false);
  const [ticketSelectDrop, setTicketSelectDrop] = useState(false);

  const [table, setTable] = useState(1);
  const [gameType, setGameType] = useState('main');
  const [buyin, setBuyin] = useState('0');
  const [ticket, setTicket] = useState('Ticket');
  const [entey, setEntry] = useState();
  const [blind, setBlind] = useState("100/200");
  const [status, setStatus] = useState('progress');

  const table_Num = [1, 2, 3, 4];

  const onChangeBuyin = useCallback((text: any) => {
    setBuyin(text.trim());
  }, []);

  const onClickTicket = useCallback((text: any) => {
    setTicket(text.trim());
    setTicketSelectDrop(false);
  }, []);

  const onChangeEntry = useCallback((text: any) => {
    setEntry(text.trim());
  }, []);

  const onChnageGameType = useCallback((text: any) => {
    setGameType(text.trim());
    setTicketSelectDrop(false);
  }, []);

  const createRoom = () => {
    const callback = (data: any) => {
      console.log(data);
    };
    if (socket) {
      socket.emit('createGameRoom', {
        table_no: table,
        // game_id: gameId,
        dealer_id: nickName,
        game_name: gameType+" Game",
        entry: entey,
        ticket_amount: buyin,
        ticket_type: ticket,
        blind: blind,
        ante: 0,
        // playing_users: [],
        // sitout_users: [],
        // status: 'playing', // default 삭제 필요
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
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
          <View style={{flex: 1}}>
            <Text style={styles.mainText}>Game Type</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => onChnageGameType('main')}
                style={[
                  styles.touchBox,
                  gameType == 'main' && styles.touchBox2,
                ]}>
                <Text
                  style={[
                    styles.tableSelectText2,
                    gameType == 'main' && styles.tableSelectText3,
                  ]}>
                  Main Game
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onChnageGameType('nft')}
                style={[
                  styles.touchBox,
                  styles.marginLeft,
                  gameType == 'nft' && styles.touchBox2,
                ]}>
                <Text
                  style={[
                    styles.tableSelectText2,
                    gameType == 'nft' && styles.tableSelectText3,
                  ]}>
                  NFT Game
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onChnageGameType('custom')}
                style={[
                  styles.touchBox,
                  styles.marginLeft,
                  gameType == 'custom' && styles.touchBox2,
                ]}>
                <Text
                  style={[
                    styles.tableSelectText2,
                    gameType == 'custom' && styles.tableSelectText3,
                  ]}>
                  Custom
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.mainText}>Buy-in</Text>
            <View style={{flexDirection: 'row'}}>
              {gameType == 'main' ? (
                <View style={[styles.touchBox3]}>
                  <Text
                    style={[styles.tableSelectText2, styles.tableSelectText3]}>
                    1 Black Ticket
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
                      // returnKeyType="next" // next key로 변환
                      // onSubmitEditing={() => birthDateRef.current?.focus()} // Submit Key 클릭 시, 이벤트
                      placeholderTextColor="#6F6F6F"
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => setTicketSelectDrop(!selectDrop)}
                    activeOpacity={1}
                    style={styles.tableSelect2}>
                    <Text style={styles.tableSelectText}>{ticket}</Text>
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
          {ticketSelectDrop && (
            <View style={styles.selectBox2}>
              <TouchableOpacity
                onPress={() => onClickTicket('Black Ticket')}
                activeOpacity={1}
                style={{flex: 1, zIndex: 2}}>
                <Text style={styles.tableSelectText}>Black Ticket</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onClickTicket('Red Ticket')}
                activeOpacity={1}
                style={{flex: 1, zIndex: 2}}>
                <Text style={styles.tableSelectText}>Red Ticket</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onClickTicket('Gold Ticket')}
                activeOpacity={1}
                style={{flex: 1, zIndex: 2}}>
                <Text style={styles.tableSelectText}>Gold Ticket</Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={{flex: 1}}>
            <Text style={styles.mainText}>Entry</Text>
            <View>
              <TextInput
                style={styles.TextInput}
                placeholder="Enter"
                onChangeText={onChangeEntry}
                value={entey}
                keyboardType={'number-pad'}
                // returnKeyType="next" // next key로 변환
                // onSubmitEditing={() => birthDateRef.current?.focus()} // Submit Key 클릭 시, 이벤트
                placeholderTextColor="#6F6F6F"
              />
            </View>
          </View>
          <View style={{flex: 1}}>
            <Text style={styles.mainText}>Blind Duration</Text>
            <View>
              <TouchableOpacity style={[styles.touchBox, styles.touchBox2]}>
                <Text
                  style={[styles.tableSelectText2, styles.tableSelectText3]}>
                  8 mins
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{flex: 1}}>
            <Text style={styles.mainText}>Status</Text>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => setStatus('progress')}
                style={[
                  styles.touchBox,
                  status == 'progress' && styles.touchBox2,
                ]}>
                <Text
                  style={[
                    styles.tableSelectText2,
                    status == 'progress' && styles.tableSelectText3,
                  ]}>
                  진행중
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setStatus('loading')}
                style={[
                  styles.touchBox,
                  styles.marginLeft,
                  status == 'loading' && styles.touchBox2,
                ]}>
                <Text
                  style={[
                    styles.tableSelectText2,
                    status == 'loading' && styles.tableSelectText3,
                  ]}>
                  대기중
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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
  marginLeft: {
    marginLeft: 20 * heightScale,
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
