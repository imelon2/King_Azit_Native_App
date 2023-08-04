import {useNavigation, NavigationProp} from '@react-navigation/native';
import React, { useState } from 'react';
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
import TournamentInfoBox, { TournamentInfoBoxDemo } from '../../../components/TournamentInfoBox';
import { MarkedDates } from 'react-native-calendars/src/types';
import getFormatDate from '../../../modules/CallendarStyles';

function CreateRoom() {
  const week = new Array('일', '월', '화', '수', '목', '금', '토');
  const month = new Array("January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
  );
  const today = new Date();
  const [current,setCurrent] = useState(getFormatDate(new Date()))

  
  const navigation =
    useNavigation<
      NavigationProp<MyPageRootStackParamList & HomeRootStackParamList>
    >();

    const markedDates:MarkedDates = {
      '2023-07-30':{marked:true,dots:[{color:'red'},{color:'green'}]},
      '2023-07-31':{marked:true,dots:[{color:'red',key:'0',selectedDotColor:'green'}]},
    }
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
        markingType='multi-dot'
        current={current}
        theme={{
          calendarBackground: '#000',
          // todayTextColor:'red',
          textMonthFontSize:22,
          monthTextColor:'#fff',// 달력 헤더 색상
          textMonthFontWeight:'500',
          dayTextColor:'#fff', // '일' 색상
          textDisabledColor:'#5C5C5C' // 비활성화된 '일' 색상
      }}
        markedDates={markedDates}
         />
        {/* 방 만들기 */}
        <View style={[styles.gameContainer,styles.headerMarginTop]}>
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
            {week[today.getDay()]}요일 {month[today.getMonth()]} 15
          </Text>
        </View>
        <View style={GlobalStyles.flexCenter}>
          <TournamentInfoBox Info={TournamentInfoBoxDemo}/>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  headerMarginTop : {marginTop: heightData * 15},
  gameContainer : {
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
