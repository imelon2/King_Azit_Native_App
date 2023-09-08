import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Pressable,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HomeRootStackParamList} from '../../../../AppInner';
import React, {useState, useCallback, useEffect} from 'react';
import {
  FontStyle,
  GlobalStyles,
  headerIconSize,
  heightData,
  widthData,
} from '../../../modules/globalStyles';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import RNPickerSelect, {Item} from 'react-native-picker-select';
import useSocket from '../../../hooks/useSocket';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/reducer';
import Header from '../../../components/Header';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {TimeFormat, DateFromat, convert12H} from '../../../modules/TimeFormat';

type type = 'GameStartDate' | 'GameStartTime' | 'DeadlineDate' | 'DeadlineTime';

function RoomMake() {
  const initDate = 'YYY.DD.MM';
  const initTime = '00:00 AM';

  const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();
  const {nickName} = useSelector((state: RootState) => state.user);
  const [socket] = useSocket();
  const [title, setTitle] = useState<string>('');
  const [ticket, setTicket] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [isGameStartDateVisible, setIsGameStartDateVisible] = useState(false);
  const [isGameStartTimeVisible, setIsGameStartTimeVisible] = useState(false);
  const [isDeadlineDateVisible, setIsDeadlineDateVisible] = useState(false);
  const [isDeadlineTimeVisible, setIsDeadlineTimeVisible] = useState(false);

  const [gameStart, setGameStart] = useState({
    date: initDate,
    time: initTime,
  });
  const [deadline, setDeadline] = useState({
    date: initDate,
    time: initTime,
  });

  const TicketPickerItems: Item[] = [
    {
      key: 1,
      label: '블랙티켓',
      value: 'Black',
    },
    {
      key: 2,
      label: '레드티켓',
      value: 'Red',
    },
    {
      key: 3,
      label: '골드 NFT',
      value: 'Gold',
    },
  ];

  const onChangeTitle = useCallback((text: string) => {
    setTitle(text);
  }, []);

  const onChangeTicket = useCallback((text: string) => {
    setTicket(text);
  }, []);

  const handleConfirm = (type: type, date: any) => {
    if (type == 'GameStartDate')
      setGameStart(prev => {
        return {...prev, date: DateFromat(date)};
      });
    if (type == 'GameStartTime')
      setGameStart(prev => {
        return {...prev, time: TimeFormat(date)};
      });
    if (type == 'DeadlineDate')
      setDeadline(prev => {
        return {...prev, date: DateFromat(date)};
      });
    if (type == 'DeadlineTime')
      setDeadline(prev => {
        return {...prev, time: TimeFormat(date)};
      });

    hideDatePicker(type);
  };

  const showDatePicker = (type: type) => {
    if (type == 'GameStartDate') return setIsGameStartDateVisible(true);
    if (type == 'GameStartTime') return setIsGameStartTimeVisible(true);
    if (type == 'DeadlineDate') {
      if (gameStart.date != initDate && gameStart.time != initTime) {
        return setIsDeadlineDateVisible(true);
      }
    }
    if (type == 'DeadlineTime') {
      if (gameStart.date != initDate && gameStart.time != initTime) {
        return setIsDeadlineTimeVisible(true);
      }
    }
  };

  const hideDatePicker = (type: type) => {
    if (type == 'GameStartDate') return setIsGameStartDateVisible(false);
    if (type == 'GameStartTime') return setIsGameStartTimeVisible(false);
    if (type == 'DeadlineDate') return setIsDeadlineDateVisible(false);
    if (type == 'DeadlineTime') return setIsDeadlineTimeVisible(false);
  };

  return (
    <SafeAreaView style={[GlobalStyles.container, {flex: 1}]}>
      {/* header */}
      <Header
        title="토너먼트 생성"
        leftIcon={() => (
          <IconAntDesign
            name="left"
            size={headerIconSize}
            color="white"
            onPress={() => navigation.goBack()}
          />
        )}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'handled'}
        bounces={false}
        scrollEnabled={true}
        style={{
          paddingHorizontal: 20 * heightData,
          height:'100%'
        }}>
        {/* 토너먼트 제목 */}
        <View>
          <Text style={[FontStyle.fs16, FontStyle.fwBold,{marginTop: 20 * widthData}]}>토너먼트 제목</Text>
          <TextInput
            onChangeText={onChangeTitle}
            placeholderTextColor={'#929292'}
            style={[styles.textInput, FontStyle.fs16]}
            placeholder="닉네임 검색"
            value={title}
          />
        </View>
        {/* 토너먼트 날자 */}
        <View style={{marginTop: widthData * 31}}>
          <Text style={[FontStyle.fs16, FontStyle.fwBold]}>토너먼트 제목</Text>
          <Text
            style={[
              FontStyle.fs16,
              FontStyle.fwBold,
              {marginTop: widthData * 18},
            ]}>
            게임시작
          </Text>
          {/* 게임시작 DATE */}
          <Pressable
            style={styles.textInput}
            onPress={() => showDatePicker('GameStartDate')}>
            <Text
              style={[
                FontStyle.fs16,
                {color: gameStart.date == initDate ? '#929292' : '#fff'},
              ]}>
              {gameStart.date}
            </Text>
            <DateTimePickerModal
              isVisible={isGameStartDateVisible}
              mode="date"
              // minimumDate={new Date()}
              onConfirm={data => handleConfirm('GameStartDate', data)}
              onCancel={() => hideDatePicker('GameStartDate')}
            />
          </Pressable>
          {/* 게임시작 TIME */}
          <Pressable
            style={styles.textInput}
            onPress={() => showDatePicker('GameStartTime')}>
            <Text
              style={[
                FontStyle.fs16,
                {color: gameStart.time == initTime ? '#929292' : '#fff'},
              ]}>
              {gameStart.time == initTime
                ? initTime
                : convert12H(gameStart.time)}
            </Text>
            <DateTimePickerModal
              isVisible={isGameStartTimeVisible}
              mode="time"
              minimumDate={new Date()}
              onConfirm={data => handleConfirm('GameStartTime', data)}
              onCancel={() => hideDatePicker('GameStartTime')}
            />
          </Pressable>
          <Text
            style={[
              FontStyle.fs16,
              FontStyle.fwBold,
              {marginTop: widthData * 18},
            ]}>
            레지마감
          </Text>
          {/* 레지마감 DATE */}
          <Pressable
            style={styles.textInput}
            onPress={() => showDatePicker('DeadlineDate')}>
            <Text
              style={[
                FontStyle.fs16,
                {color: deadline.date == initDate ? '#929292' : '#fff'},
              ]}>
              {deadline.date}
            </Text>
            <DateTimePickerModal
              isVisible={isDeadlineDateVisible}
              mode="date"
              minimumDate={new Date(gameStart.date)}
              onConfirm={data => handleConfirm('DeadlineDate', data)}
              onCancel={() => hideDatePicker('DeadlineDate')}
            />
          </Pressable>
          {/* 레지마감 TIME */}
          <Pressable
            style={styles.textInput}
            onPress={() => showDatePicker('DeadlineTime')}>
            <Text
              style={[
                FontStyle.fs16,
                {color: deadline.time == initTime ? '#929292' : '#fff'},
              ]}>
              {deadline.time == initTime ? initTime : convert12H(deadline.time)}
            </Text>
            <DateTimePickerModal
              isVisible={isDeadlineTimeVisible}
              mode="time"
              minimumDate={new Date(gameStart.date + ' ' + gameStart.time)}
              onConfirm={data => handleConfirm('DeadlineTime', data)}
              onCancel={() => hideDatePicker('DeadlineTime')}
            />
          </Pressable>
          <Text
            style={[
              FontStyle.fs16,
              FontStyle.fwBold,
              {marginTop: widthData * 18},
            ]}>
            Buy-In
          </Text>
          <View style={{flexDirection: 'row'}}>
            {/* Buy In Ticket */}
            <View style={styles.tableSelect}>
              <View style={styles.downIcon}>
                <IconAntDesign
                  name="down"
                  size={heightData * 26}
                  color="#F5FF82"
                />
              </View>
              <RNPickerSelect
                onValueChange={() => console.log('hi')}
                placeholder={{
                  key: 1,
                  label: '# Ticket',
                  value: null,
                  color: '#929292',
                }}
                items={TicketPickerItems}
                style={{
                  viewContainer: {
                    justifyContent: 'center',
                    paddingLeft: widthData * 10,
                  },
                  inputIOS: {color: '#fff', fontSize: heightData * 16},
                  inputAndroid: {color: '#fff', fontSize: heightData * 16},
                }}
              />
            </View>
            {/* 티켓 수량 */}
            <TextInput
              onChangeText={onChangeTicket}
              placeholderTextColor={'#929292'}
              keyboardType="number-pad"
              style={[
                styles.tableSelect,
                FontStyle.fs16,
                {marginLeft: widthData * 10, paddingLeft: widthData * 10},
              ]}
              placeholder="티켓 수량"
              value={ticket}
            />
          </View>
          <Text
            style={[
              FontStyle.fs16,
              FontStyle.fwBold,
              {marginTop: widthData * 18},
            ]}>
            Entry
          </Text>
          <TextInput
            onChangeText={onChangeTicket}
            placeholderTextColor={'#929292'}
            keyboardType="number-pad"
            style={[
              styles.tableSelect,
              FontStyle.fs16,
              {paddingLeft: widthData * 10},
            ]}
            placeholder="입력"
            value={ticket}
          />
          <Text
            style={[
              FontStyle.fs16,
              FontStyle.fwBold,
              {marginTop: widthData * 18},
            ]}>
            블라인드 설정
          </Text>
          <View style={{}}>
            <Text style={FontStyle.fs18}>설정하기</Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textInput: {
    color: '#ffffff',
    backgroundColor: '#222222',
    width: widthData * 320,
    height: heightData * 40,
    borderWidth: 1,
    borderColor: '#F5FF82',
    paddingVertical: 11,
    paddingLeft: 10,
    borderRadius: 4,
    marginTop: heightData * 12,
  },
  tableSelect: {
    backgroundColor: '#222',
    width: 130 * widthData,
    height: 40 * heightData,
    borderColor: '#F5FF82',
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 20 * heightData,
    justifyContent: 'center',
  },
  downIcon: {
    position: 'absolute',
    alignItems: 'center',
    right: widthData * 10,
  },
});

export default RoomMake;
