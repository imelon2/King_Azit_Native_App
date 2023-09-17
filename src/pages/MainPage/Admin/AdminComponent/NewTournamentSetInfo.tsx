import {
  headerIconSize,
  heightData,
  FontStyle,
  widthData,
  convert12H,
  GlobalStyles,
  DateFromat,
  TimeFormat,
} from '@/modules';
import React, {useState} from 'react';
import {Text, View, TextInput, Pressable, StyleSheet} from 'react-native';
import RNPickerSelect, {Item} from 'react-native-picker-select';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {HomeRootStackParamList} from 'AppInner';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {BottomMaxButton} from '@/components/Button';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Header from '@/components/Header';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';

type type = 'GameStartDate' | 'GameStartTime' | 'DeadlineDate' | 'DeadlineTime';

const NewTournamentSetInfo = ({...props}) => {
  const {setGameStart, setDeadline, setTitle, setTicket, setPlace, setEntryCondition } =props;
  const {gameStart, deadline, title, ticket, place, entryCondition} = props

  const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();
  const [isGameStartDateVisible, setIsGameStartDateVisible] = useState(false);
  const [isGameStartTimeVisible, setIsGameStartTimeVisible] = useState(false);
  const [isDeadlineDateVisible, setIsDeadlineDateVisible] = useState(false);
  const [isDeadlineTimeVisible, setIsDeadlineTimeVisible] = useState(false);

  const initDate = 'YYY.DD.MM';
  const initTime = '00:00 AM';
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

  const handleConfirm = (type: type, date: any) => {
    if (type == 'GameStartDate')
      props.setGameStart((prev: any) => {
        return {...prev, date: DateFromat(date)};
      });
    if (type == 'GameStartTime')
      setGameStart((prev: any) => {
        return {...prev, time: TimeFormat(date)};
      });
    if (type == 'DeadlineDate')
      setDeadline((prev: any) => {
        return {...prev, date: DateFromat(date)};
      });
    if (type == 'DeadlineTime')
      setDeadline((prev: any) => {
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
    <>
      {/* header */}
      <Header
        title="상세정보"
        leftIcon={() => (
          <IconAntDesign name="left" size={headerIconSize} color="white" onPress={() => navigation.goBack()} />
        )}
      />
      <KeyboardAwareScrollView
        bounces={false}
        style={{
          paddingHorizontal: 20 * heightData,
        }}
        >
        {/* 토너먼트 제목 */}
        <View style={{marginTop: 20 * widthData}}>
          <Text style={[FontStyle.fs16, FontStyle.fwBold, styles.titleStyle]}>토너먼트 제목</Text>
          <TextInput
            onChangeText={setTitle}
            placeholderTextColor={'#929292'}
            style={[styles.textInput, FontStyle.fs16, title ? styles.textInputOn : styles.textInputOff]}
            placeholder="닉네임 검색"
            value={title}
          />
        </View>
        {/* 토너먼트 날자 */}
        <View style={{marginTop: widthData * 31}}>
          <View style={styles.titleWrapper}>
            <IconAntDesign name="clockcircleo" size={heightData * 24} color="white" style={styles.iconStyle}/>
            <Text style={[FontStyle.fs16, FontStyle.fwBold, styles.titleStyle]}>토너먼트 날짜</Text>
          </View>
          <Text style={[FontStyle.fs16, FontStyle.fwBold, {marginTop: widthData * 18}]}>게임시작</Text>
          {/* 게임시작 DATE */}
          <Pressable
            style={[styles.textInput, gameStart.date != initDate ? styles.textInputOn : styles.textInputOff]}
            onPress={() => showDatePicker('GameStartDate')}>
            <Text style={[FontStyle.fs16, {color: gameStart.date == initDate ? '#929292' : '#fff'}]}>
              {gameStart.date}
            </Text>
            <DateTimePickerModal
              isVisible={isGameStartDateVisible}
              mode="date"
              onConfirm={data => handleConfirm('GameStartDate', data)}
              onCancel={() => hideDatePicker('GameStartDate')}
            />
          </Pressable>
          {/* 게임시작 TIME */}
          <Pressable style={[styles.textInput, gameStart.time != initTime ? styles.textInputOn : styles.textInputOff]} onPress={() => showDatePicker('GameStartTime')}>
            <Text style={[FontStyle.fs16, {color: gameStart.time == initTime ? '#929292' : '#fff'}]}>
              {gameStart.time == initTime ? initTime : convert12H(gameStart.time)}
            </Text>
            <DateTimePickerModal
              isVisible={isGameStartTimeVisible}
              mode="time"
              minimumDate={new Date()}
              onConfirm={data => handleConfirm('GameStartTime', data)}
              onCancel={() => hideDatePicker('GameStartTime')}
            />
          </Pressable>
          <Text style={[FontStyle.fs16, FontStyle.fwBold, {marginTop: widthData * 18}]}>레지마감</Text>
          {/* 레지마감 DATE */}
          <Pressable style={[styles.textInput, deadline.date != initDate ? styles.textInputOn : styles.textInputOff]} onPress={() => showDatePicker('DeadlineDate')}>
            <Text style={[FontStyle.fs16, {color: deadline.date == initDate ? '#929292' : '#fff'}]}>
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
          <Pressable style={[styles.textInput, deadline.time != initTime ? styles.textInputOn : styles.textInputOff]} onPress={() => showDatePicker('DeadlineTime')}>
            <Text style={[FontStyle.fs16, {color: deadline.time == initTime ? '#929292' : '#fff'}]}>
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
        </View>
        {/* 토너먼트 위치 */}
        <View style={{marginTop:heightData * 27}}>
          <View style={styles.titleWrapper}>
            <IconFeather name="map-pin" size={heightData * 24} color="white" style={styles.iconStyle}/>
            <Text style={[FontStyle.fs16, FontStyle.fwBold, styles.titleStyle]}>토너먼트 위치</Text>
          </View>
          <TextInput
            autoCapitalize="none" // 첫글자 대문자
            onChangeText={setPlace}
            placeholderTextColor={'#929292'}
            style={[styles.textInput, FontStyle.fs16, title ? styles.textInputOn : styles.textInputOff]}
            placeholder="서초구 서래로 28, 전빌딩 2층"
            value={place}
          />
        </View>
        {/* 바이 인 */}
        <View style={{marginTop: widthData * 18}}>
          <Text style={[FontStyle.fs16, FontStyle.fwBold, styles.titleStyle]}>바이인</Text>
          <View style={{flexDirection: 'row'}}>
            {/* Buy In Ticket */}
            <View style={styles.tableSelect}>
              <View style={styles.downIcon}>
                <IconAntDesign name="down" size={heightData * 26} color="#F5FF82" />
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
              onChangeText={setTicket}
              placeholderTextColor={'#929292'}
              keyboardType="number-pad"
              style={[styles.tableSelect, FontStyle.fs16, {marginLeft: widthData * 10, paddingLeft: widthData * 10}]}
              placeholder="티켓 수량"
              value={ticket}
            />
          </View>
        </View>
        {/* 엔트리 */}
        <View style={{marginTop: widthData * 18}}>
          <Text style={[FontStyle.fs16, FontStyle.fwBold]}>Entry</Text>
          <TextInput
            onChangeText={setTicket}
            placeholderTextColor={'#929292'}
            keyboardType="number-pad"
            style={[styles.tableSelect, FontStyle.fs16, {paddingLeft: widthData * 10}]}
            placeholder="입력"
            value={ticket}
          />
        </View>
        {/* 블라인드 설정 */}
        <View style={{marginTop: widthData * 18}}>
          <Text style={[FontStyle.fs16, FontStyle.fwBold]}>블라인드 설정</Text>
          <Pressable style={[styles.blindContainer, GlobalStyles.flexCenter]}>
            <Text style={[FontStyle.fs16]}>설정하기</Text>
          </Pressable>
        </View>
        <View style={styles.buttonContainer}>
          <BottomMaxButton
            title="다음"
            backgroundColor="#F5FF82"
            color="#000"
            componentStyle={{position: 'absolute', bottom: 0}}
          />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  titleStyle: {
    color: '#F5FF82',
  },
  titleWrapper: {flexDirection:'row',alignItems:'center'},
  iconStyle: {
    marginRight:widthData* 8
  },
  textInput: {
    width: widthData * 320,
    height: heightData * 40,
    paddingVertical: heightData * 11,
    paddingLeft: widthData * 10,
    borderRadius: 4,
    marginTop: heightData * 12,
    backgroundColor: '#222222',
    borderWidth: 1,
  },
  textInputOn: {borderColor: '#F5FF82'},
  textInputOff: {borderColor: '#777777'},
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
  blindContainer: {
    marginTop: 14 * heightData,
    backgroundColor: '#222222',
    borderWidth: 1,
    borderColor: '#F5FF82',
    width: 320 * widthData,
    height: 40 * heightData,
  },
  buttonContainer: {
    marginTop: 200 * heightData,
  },
});
export default NewTournamentSetInfo;
