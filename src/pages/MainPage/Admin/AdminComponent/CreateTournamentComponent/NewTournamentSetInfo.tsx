import {
  headerIconSize,
  heightData,
  FontStyle,
  widthData,
  convert12H,
  GlobalStyles,
  DateFromat,
  TimeFormat,
  inputNumberFormat,
} from '@/modules';
import React, {useState} from 'react';
import {Text, View, TextInput, Pressable, Alert} from 'react-native';
import RNPickerSelect, {Item} from 'react-native-picker-select';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {HomeRootStackParamList} from 'AppInner';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {BottomMaxButton} from '@/components/Button';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {Header} from '@/components/Header';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../../AdminStyles/NewTournamentStyles';
import { INIT_DATE, INIT_TIME } from '@/config/blind';
import { checkBlind } from '@/modules/BlindBookmarks';

type type = 'GameStartDate' | 'GameStartTime' | 'DeadlineDate' | 'DeadlineTime';

const NewTournamentSetInfo = ({...props}) => {
  const {onChangeTitle,onChangeBlindBookmarks ,setGameStart, setDeadline, setTitle, setTicket, setPlace, setEntryCondition, setEntry, setDetail, setPrize} =
    props;
  const {gameStart, deadline, title, ticket, place, entryCondition, entry, detail, prize, blind,blindBookmarksPickerItems,selectedBookmark } = props;

  const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();
  const [isGameStartDateVisible, setIsGameStartDateVisible] = useState(false);
  const [isGameStartTimeVisible, setIsGameStartTimeVisible] = useState(false);
  const [isDeadlineDateVisible, setIsDeadlineDateVisible] = useState(false);
  const [isDeadlineTimeVisible, setIsDeadlineTimeVisible] = useState(false);
  
  const TicketPickerItems: Item[] = [
    {
      key: 1,
      label: '블랙티켓',
      value: 'black',
    },
    {
      key: 2,
      label: '레드티켓',
      value: 'red',
    },
    {
      key: 3,
      label: '골드 NFT',
      value: 'gold',
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
      if (gameStart.date != INIT_DATE && gameStart.time != INIT_TIME) {
        return setIsDeadlineDateVisible(true);
      }
    }
    if (type == 'DeadlineTime') {
      if (gameStart.date != INIT_DATE && gameStart.time != INIT_TIME) {
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

  const onChangeDetail = (text: any) => {
    setDetail(text);
  };

  const onChangeTicketCount = (count: any) => {
    if (count == '0') return;
    setTicket((prev: any) => {
      return {...prev, count};
    });
  };

  const onChangeEntry = (count: any) => {
    if (count == '0') return;
    setEntry(count);
  };

  const onChangePrize = (count:any) => {
    if (count == '0') return;
    let format = inputNumberFormat(count)
    setPrize(format)
  }

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
        keyboardShouldPersistTaps={'handled'}
        bounces={false}
        style={{
          paddingHorizontal: 20 * heightData,
        }}>
        {/* 토너먼트 제목 */}
        <View style={{marginTop: 20 * widthData}}>
          <Text style={[FontStyle.fs16, FontStyle.fwBold, styles.titleStyle]}>토너먼트 제목</Text>
          <TextInput
            onChangeText={setTitle}
            placeholderTextColor={'#929292'}
            style={[styles.textInput, FontStyle.fs16, title ? styles.textInputOn : styles.textInputOff]}
            placeholder="토너먼트 제목 입력"
            value={title}
          />
        </View>
        {/* 토너먼트 날자 */}
        <View style={{marginTop: widthData * 31}}>
          <View style={styles.titleWrapper}>
            <IconAntDesign name="clockcircleo" size={heightData * 24} color="white" style={styles.iconStyle} />
            <Text style={[FontStyle.fs16, FontStyle.fwBold, styles.titleStyle]}>토너먼트 날짜</Text>
          </View>
          <Text style={[FontStyle.fs16, FontStyle.fwBold, {marginTop: widthData * 18}]}>게임시작</Text>
          {/* 게임시작 DATE */}
          <Pressable
            style={[styles.textInput, gameStart.date == INIT_DATE ? styles.textInputOff : styles.textInputOn]}
            onPress={() => showDatePicker('GameStartDate')}>
            <Text style={[FontStyle.fs16, gameStart.date == INIT_DATE ? styles.textFontOff : styles.textFontOn]}>
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
          <Pressable
            style={[styles.textInput, gameStart.time == INIT_TIME ? styles.textInputOff : styles.textInputOn]}
            onPress={() => showDatePicker('GameStartTime')}>
            <Text style={[FontStyle.fs16, gameStart.time == INIT_TIME ? styles.textFontOff : styles.textFontOn]}>
              {gameStart.time == INIT_TIME ? INIT_TIME : convert12H(gameStart.time)}
            </Text>
            <DateTimePickerModal
              isVisible={isGameStartTimeVisible}
              mode="time"
              date={new Date()}
              minimumDate={new Date()}
              onConfirm={data => handleConfirm('GameStartTime', data)}
              onCancel={() => hideDatePicker('GameStartTime')}
            />
          </Pressable>
          <Text style={[FontStyle.fs16, FontStyle.fwBold, {marginTop: widthData * 18}]}>레지마감</Text>
          {/* 레지마감 DATE */}
          <Pressable
            style={[styles.textInput, deadline.date == INIT_DATE ? styles.textInputOff : styles.textInputOn]}
            onPress={() => showDatePicker('DeadlineDate')}>
            <Text style={[FontStyle.fs16, deadline.date == INIT_DATE ? styles.textFontOff : styles.textFontOn]}>
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
            style={[styles.textInput, deadline.time == INIT_TIME ? styles.textInputOff : styles.textInputOn]}
            onPress={() => showDatePicker('DeadlineTime')}>
            <Text style={[FontStyle.fs16, deadline.time == INIT_TIME ? styles.textFontOff : styles.textFontOn]}>
              {deadline.time == INIT_TIME ? INIT_TIME : convert12H(deadline.time)}
            </Text>
            <DateTimePickerModal
              isVisible={isDeadlineTimeVisible}
              mode="time"
              date={new Date()}
              onConfirm={data => handleConfirm('DeadlineTime', data)}
              onCancel={() => hideDatePicker('DeadlineTime')}
            />
          </Pressable>
        </View>
        {/* 토너먼트 위치 */}
        <View style={{marginTop: heightData * 27}}>
          <View style={styles.titleWrapper}>
            <IconFeather name="map-pin" size={heightData * 24} color="white" style={styles.iconStyle} />
            <Text style={[FontStyle.fs16, FontStyle.fwBold, styles.titleStyle]}>토너먼트 위치</Text>
          </View>
          <TextInput
            autoCapitalize="none" // 첫글자 대문자
            onChangeText={setPlace}
            placeholderTextColor={'#929292'}
            style={[styles.textInput, FontStyle.fs16, place ? styles.textInputOn : styles.textInputOff]}
            placeholder="서초구 서래로 28, 전빌딩 2층"
            value={place}
          />
        </View>
        {/* 참여 조건 */}
        <View style={{marginTop: heightData * 27}}>
          <View style={styles.titleWrapper}>
            <IconIonicons name="checkmark-done-outline" size={heightData * 26} color="white" style={styles.iconStyle} />
            <Text style={[FontStyle.fs16, FontStyle.fwBold, styles.titleStyle]}>참여 조건</Text>
          </View>
          <Pressable
            onPress={() => setEntryCondition(!entryCondition)}
            style={[
              styles.textInput,
              {paddingVertical: 0},
              entryCondition ? styles.textInputOn : styles.textInputOff,
              styles.titleWrapper,
            ]}>
            <Text style={[FontStyle.fs14, entryCondition ? styles.textFontOn : styles.textFontOff]}>
              Kings` Azit NFT Holder
            </Text>
            <View style={{alignItems: 'flex-end', flex: 1}}>
              <IconIonicons
                name="checkbox-outline"
                size={heightData * 26}
                color={entryCondition ? '#F5FF82' : '#777777'}
                style={styles.iconStyle}
              />
            </View>
          </Pressable>
        </View>
        {/* 바이 인 */}
        <View style={{marginTop: widthData * 18}}>
          <View style={styles.titleWrapper}>
            <IconMaterialCommunityIcons
              name="poker-chip"
              size={heightData * 24}
              color="white"
              style={styles.iconStyle}
            />
            <Text style={[FontStyle.fs16, FontStyle.fwBold, styles.titleStyle]}>바이인</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            {/* Buy In Ticket */}
            <View style={[styles.tableSelect, ticket.type ? styles.textInputOn : styles.textInputOff]}>
              <View style={styles.downIcon}>
                <IconAntDesign name="down" size={heightData * 22} color={ticket.type ? '#F5FF82' : '#77777777'} />
              </View>
              <RNPickerSelect
                onValueChange={selected =>
                  setTicket((prev: any) => {
                    return {...prev, type: selected};
                  })
                }
                placeholder={{
                  key: 1,
                  label: '티켓 종류',
                  value: '',
                  color: '#777777',
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
              onChangeText={count => onChangeTicketCount(count)}
              placeholderTextColor={'#929292'}
              keyboardType="number-pad"
              style={[
                styles.tableSelect,
                ticket.count == 0 ? styles.textInputOff : styles.textInputOn,
                FontStyle.fs16,
                {marginLeft: widthData * 24, paddingLeft: widthData * 10},
              ]}
              placeholder="티켓 수량"
              value={ticket.count.toString()}
            />
          </View>
          {/* 세부 정보 */}
          <View style={{marginTop: widthData * 18}}>
            <Text style={[FontStyle.fs16, FontStyle.fwBold]}>세부 정보</Text>
            <TextInput
              onChangeText={count => onChangeDetail(count)}
              placeholder='스타팅 칩: 30,000 / 리바인: 40,000 / 애드온: 10,000회'
              placeholderTextColor={'#777777'}
              style={[
                styles.tableSelect,
                {height: heightData * 80,paddingLeft:widthData * 20,paddingTop:heightData * 11},
                !detail ? styles.textInputOff : styles.textInputOn,
                FontStyle.fs14,
              ]}
              multiline={true}
            />
          </View>
        </View>
        {/* 엔트리 */}
        <View style={{marginTop: widthData * 30}}>
          <View style={styles.titleWrapper}>
            <IconFontAwesome name="users" size={heightData * 20} color="white" style={styles.iconStyle} />
            <Text style={[FontStyle.fs16, FontStyle.fwBold, styles.titleStyle]}>엔트리</Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <TextInput
              onChangeText={count => onChangeEntry(count)}
              placeholderTextColor={'#929292'}
              keyboardType="number-pad"
              style={[
                styles.tableSelect,
                entry ? styles.textInputOn : styles.textInputOff,
                FontStyle.fs16,
                {textAlign: 'center'},
              ]}
              placeholder="입력"
              value={entry.toString()}
            />
            <Pressable
              onPress={() => onChangeEntry('')}
              style={[
                styles.tableSelect,
                !entry ? styles.textInputOn : styles.textInputOff,
                {marginLeft: widthData * 24},
              ]}>
              <Text style={[FontStyle.fs14, !entry ? styles.textFontOn : styles.textFontOff, {textAlign: 'center'}]}>
                제한 없음
              </Text>
            </Pressable>
          </View>
        </View>
        {/* 토너먼트 프라이즈 */}
        <View style={{marginTop: widthData * 30}}>
          <View style={styles.titleWrapper}>
            <IconIonicons name="trophy-outline" size={heightData * 24} color="white" style={styles.iconStyle} />
            <Text style={[FontStyle.fs16, FontStyle.fwBold, styles.titleStyle]}>토너먼트 프라이즈 (GTD)</Text>
          </View>
          <TextInput
            onChangeText={(count) => onChangePrize(count)}
            placeholderTextColor={'#929292'}
            keyboardType='number-pad'
            style={[styles.tableSelect, prize ? styles.textInputOn : styles.textInputOff, FontStyle.fs16, {paddingLeft:5}]}
            placeholder="150,000,000 GTD"
            value={prize}
          />
        </View>
        {/* 블라인드 설정 */}
        <View style={{marginTop: widthData * 18}}>
          <Text style={[FontStyle.fs16, FontStyle.fwBold]}>블라인드 설정</Text>
          <View style={[styles.tableSelect, checkBlind(blind[0]) ? styles.textInputOn : styles.textInputOff]}>
              <View style={styles.downIcon}>
                <IconAntDesign name="down" size={heightData * 22} color={checkBlind(blind[0]) ? '#F5FF82' : '#77777777'} />
              </View>
              <RNPickerSelect
                disabled={blindBookmarksPickerItems.length == 0}
                onValueChange={onChangeBlindBookmarks}
                value={selectedBookmark}
                placeholder={{
                  key: 1,
                  label: 'Custom',
                  value: '',
                  color: '#777777',
                }}
                items={blindBookmarksPickerItems}
                style={{
                  viewContainer: {
                    justifyContent: 'center',
                    paddingLeft: widthData * 10,
                  },
                  placeholder: {fontWeight: '300',color:'#fff',fontSize:16},
                  inputIOS: {color: '#fff', fontSize: heightData * 16},
                  inputAndroid: {color: '#fff', fontSize: heightData * 16},
                }}
              />
            </View>
          <Pressable onPress={() => onChangeTitle('블라인드')} style={[styles.blindContainer, GlobalStyles.flexCenter]}>
            <Text style={[FontStyle.fs16]}> + 새로 만들기</Text>
          </Pressable>
        </View>
        {/* 다음 버튼 */}
        <View style={{marginTop: 200 * heightData}}>
          <BottomMaxButton
            title="다음"
            backgroundColor="#F5FF82"
            color="#000"
            componentStyle={{position: 'absolute', bottom: 0}}
            onPress={() => Alert.alert('Todo : ',"Prize Page로 넘어가기 + 다 입력됬는지 검사")}
          />
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};

export default NewTournamentSetInfo;
