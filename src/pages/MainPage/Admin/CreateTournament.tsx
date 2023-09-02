import {useNavigation, NavigationProp} from '@react-navigation/native';
import React, {useCallback, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  MyPageRootStackParamList,
  HomeRootStackParamList,
} from '../../../../AppInner';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {Calendar} from 'react-native-calendars';
import {
  FontStyle,
  GlobalStyles,
  headerIconSize,
  heightData,
  widthData,
} from '../../../modules/globalStyles';
import Header from '../../../components/Header';
import TournamentInfoBox, {
  TournamentInfoBoxDemo,
} from '../../../components/TournamentInfoBox';
import {MarkedDates} from 'react-native-calendars/src/types';
import {getFormatDate, MONTH, WEEK} from '../../../modules/CallendarStyles';

function CreateRoom() {
  const today = new Date();
  const [current, setCurrent] = useState(getFormatDate());
  const [markedDates, setMarkedDates] = useState<MarkedDates>({
    [getFormatDate()]: {
      marked: true,
      selected: true,
      dots: [{color: '#5C5C5C'}],
    },
    ['2023-08-09']: {
      marked: true,
      selected: false,
      dots: [{color: '#5C5C5C'}, {color: '#F5FF82'}, {color: '#C9A978'}],
    }
  });

  const navigation =
    useNavigation<
      NavigationProp<MyPageRootStackParamList & HomeRootStackParamList>
    >();

  const onChangeDate = useCallback(
    (day: string) => {
        setMarkedDates(prev => {
          // selected 초기화
          Object.keys(prev).map(key => (prev[key].selected = false));

          if (!!markedDates[day]) {
            // 이미 존재하는 day면, 해당 object의 selected = true
            return {...prev, [day]: {...prev[day], selected: true}};
          } else {
            // 존재하는 않은 day면, 해당 object에 값 추가 후, selected = true
            prev[day] = {selected: true};
            return {...prev};
          }
        });

    },
    [markedDates],
  );

  return (
    <SafeAreaView style={[GlobalStyles.container, {flex: 1}]}>
      {/* header */}
      <Header
        title="토너먼트 생성"
        leftIcon={() => (
          <AntDesignIcon
            name="left"
            size={headerIconSize}
            color="white"
            onPress={() => navigation.navigate('Home')}
          />
        )}
      />
      <ScrollView bounces={false}>
        <Calendar
          markingType="multi-dot"
          current={current}
          onDayPress={day => onChangeDate(day.dateString)} // 날짜 변경 시 event
          onMonthChange={month => console.log(month)} // 월 변경 시 event
          theme={{
            calendarBackground: '#000',
            todayTextColor: '#5CCEFF', // 오늘 날짜 색상
            textMonthFontSize: 22, // 헤더 글씨 크기
            monthTextColor: '#fff', // 달력 헤더 색상
            textMonthFontWeight: '500', // 달력 헤더 굵기
            dayTextColor: '#fff', // '일' 색상
            textDisabledColor: '#5C5C5C', // 비활성화된 '일' 색상
            selectedDayBackgroundColor: 'gray', // 선택된 날짜 배경
          }}
          markedDates={markedDates}
        />
        {/* 방 만들기 */}
        <View style={[styles.gameContainer, styles.headerMarginTop]}>
          {/* Header */}
          <Text
            style={[
              FontStyle.fs18,
              FontStyle.fwBold,
              {paddingBottom: heightData * 28},
            ]}>
            토너먼트 생성
          </Text>
          <View style={GlobalStyles.flexCenter}>
            <Pressable
              onPress={() => navigation.navigate('RoomMake')}
              style={[styles.createRoomBtnWrapper, GlobalStyles.flexCenter]}>
              <AntDesignIcon
                name="plus"
                size={heightData * 32}
                color="#F5FF82"
              />
            </Pressable>
          </View>
        </View>
        {/* 요일/월/일 */}
        <View style={styles.headerMarginTop}>
          {/* Header */}
          <Text
            style={[
              FontStyle.fs18,
              FontStyle.fwBold,
              {paddingBottom: heightData * 28},
            ]}>
            {WEEK[today.getDay()]}요일 {MONTH[today.getMonth()]} 15
          </Text>
        </View>
        <View style={GlobalStyles.flexCenter}>
          <TournamentInfoBox Info={TournamentInfoBoxDemo} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerMarginTop: {marginTop: heightData * 15},
  gameContainer: {
    paddingBottom: heightData * 40,
    borderBottomWidth: 2,
    borderBottomColor: '#323232',
  },
  createRoomBtnWrapper: {
    backgroundColor: '#222222',
    width: widthData * 320,
    height: heightData * 150,
    borderWidth: 1,
    borderColor: '#F5FF82',
    borderRadius: 5,
  },
});
export default CreateRoom;
