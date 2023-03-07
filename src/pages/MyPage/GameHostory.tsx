import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HomeRootStackParamList, MyPageRootStackParamList } from '../../../AppInner';
import { heightData } from '../../modules/globalStyles';
const { width, height } = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import Modal from "react-native-modal";

import { Icon } from 'react-native-vector-icons/Icon';
const heightScale = heightData;

interface ButtonInterface {
  [key: number]: any,

}

function GameHostory() {

  const GameData: ButtonInterface = {
    1: [],
    2: [{ type: "Main", time: "2023-02-09 08:10" }, { type: "Main", time: "2023-02-09 09:10" }, { type: "Main", time: "2023-02-09 10:10" }, { type: "Side", time: "2023-02-09 10:12" }, { type: "NFT", time: "2023-02-09 10:12" }],
    3: [{ type: "Main", time: "2023-02-09 08:10" }, { type: "Main", time: "2023-02-09 09:10" }, { type: "Main", time: "2023-03-09 10:10" }, { type: "Side", time: "2023-03-09 10:12" }, { type: "NFT", time: "2023-03-09 10:12" }],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
    10: [],
    11: [],
    12: [],
  }


  const navigation = useNavigation<NavigationProp<MyPageRootStackParamList & HomeRootStackParamList>>();
  const [month, setMonth] = useState(1);
  const [gameHistory, setGameHistory] = useState([]);
  const [historyDataStatus, setHistoryDataStatus] = useState([false]);
  const [modalStatus, setModalStatus] = useState(false);
  const [viewType, setViewType] = useState('');

  useEffect(() => {
    let date = new Date();
    let month = date.getMonth() + 1;
    setMonth(month);
    settingGameData(month);

  }, []);

  const settingGameData = (month: any) => {
    let history = GameData[month];
    setGameHistory(history);

    let result = [];
    for (let i = 0; i < history.length; i++) {
      result.push(false);
    }
    setHistoryDataStatus(result);
  }

  const onClickMonthChange = (text: any) => {
    if (text == 'down') {
      if (month == 1)
        return;

      let val = month - 1;
      setMonth(val);
      settingGameData(val);
    }

    if (text == 'up') {
      if (month == 12)
        return;

      let val = month + 1;
      setMonth(val);
      settingGameData(val);
    }

  }

  const onClickDetailHistory = (key: any) => {
    let result = [];
    for (let i = 0; i < historyDataStatus.length; i++) {
      let value = historyDataStatus[i];
      if (key == i) {
        value = !value;
      }
      result.push(value);
    }
    setHistoryDataStatus(result);

  }

  const onClickGameType = (text: any) => {
    if (viewType == text)
      return;

    setViewType(text);
    setModalStatus(false);
  }


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <View style={styles.headerStyle}>
            <Text style={styles.fontStyle}>게임 참여 기록</Text>
          </View>
          <IconAntDesign
            name="left"
            size={heightScale * 28}
            color="white"
            style={styles.beforeIcon}
            onPress={() => navigation.goBack()}
          />
        </View>
        <TouchableOpacity style={styles.FadersBox} activeOpacity={1} onPress={() => setModalStatus(true)}>
          <Image
            source={require('../../assets/FadersHorizontal.png')}
            style={styles.Faders}
          />
        </TouchableOpacity>

        <View style={styles.monthSelectBox} >
          <View style={styles.monthSelect} >
            <IconAntDesign
              name="left"
              size={heightScale * 20}
              color="white"
              style={styles.LeftIcon}
              onPress={() => onClickMonthChange('down')}
            />
            <Text style={styles.monthText} >{month} 월</Text>
            <IconAntDesign
              name="right"
              size={heightScale * 20}
              color="white"
              style={styles.RightIcon}
              onPress={() => onClickMonthChange('up')}
            />
          </View>
        </View>

        <View style={{ alignItems: 'center' }} >
          {gameHistory.map((v: any, key) => (v.type.indexOf(viewType) > -1) && (
            <View key={key}>
              <LinearGradient style={styles.historyBox} locations={[0, 1]} colors={["rgba(57, 57, 57, 1)", 'rgba(57, 57, 57, 0)',]}>
                <View style={{ flex: 1, flexDirection: 'row' }}  >
                  <View style={{ flex: 1 }} >
                    <Text style={styles.gameText} >{v.type} Game</Text>
                  </View>
                  <View style={{ flex: 3, flexDirection: 'row' }} >
                    <View style={styles.placeBox} >
                      <Text style={styles.placeBoxText}>1st place</Text>
                    </View>

                    <View style={styles.moneyBox}>
                      <Text style={styles.moneyBoxText}>Money-in</Text>
                    </View>
                  </View>
                </View>



                <View style={{ flex: 1, flexDirection: 'row', paddingTop: 7 }}  >
                  <View style={{ flex: 1 }}>
                    <Text style={styles.cardPayText} >6 Black Cards</Text>
                  </View>
                  <View style={{ flex: 3, paddingTop: 2 }}>
                    <Text style={styles.timeText}>     |    {v.time}</Text>
                  </View>
                </View>


                <IconAntDesign
                  name={historyDataStatus[key] ? "up" : "down"}
                  size={heightScale * 22}
                  color="white"
                  style={styles.historyOpen}
                  onPress={() => onClickDetailHistory(key)}
                />


              </LinearGradient>
              {historyDataStatus[key] && (
                <View style={styles.historyDetailBox} >
                  <View style={{ flex: 1, flexDirection: 'row' }} >
                    <View style={{ flex: 1 }} >
                      <Text style={styles.DetailText} >Buy-in: 2 </Text>
                    </View>
                    <View style={{ flex: 3 }} >
                      <Text style={styles.DetailText} >|     Entry: 25</Text>
                    </View>
                  </View>
                  <View style={{ flex: 4, flexDirection: 'column' }} >
                    <View style={{ flex: 1, paddingTop: 4 }}>
                      <Text style={styles.DetailText}>Players: +11</Text>
                    </View>
                    <View style={{ flex: 4, paddingTop: 7 }}>
                      <Text style={styles.DetailText2}>한나치쉬, 한나치쉬, 한나치쉬, 한나치쉬, 한나치쉬, 한나치쉬, 한나치쉬, 한나치쉬, 한나치쉬, 한나치쉬</Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
          ))}
        </View>

        <Modal isVisible={modalStatus} style={styles.modalstyle}  >
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={styles.joinText} >참여한 게임</Text>
          </View>
          <View style={{ flex: 4, marginTop: 20 }}>
            <TouchableOpacity onPress={() => onClickGameType('')} activeOpacity={1} style={{ flexDirection: 'column', alignItems: 'center' }} >
              <Text style={styles.typeText} >최근순</Text>
              {viewType == '' && (
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  style={styles.textSelectBorder} locations={[0, 0.5, 1]} colors={["rgba(250, 255, 178, 0)", 'rgba(244, 255, 117, 0.85)', 'rgba(254, 255, 241, 0)']} />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onClickGameType('Main')} activeOpacity={1} style={{ flexDirection: 'column', alignItems: 'center' }} >
              <Text style={styles.typeText} >Main</Text>
              {viewType == 'Main' && (
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  style={styles.textSelectBorder} locations={[0, 0.5, 1]} colors={["rgba(250, 255, 178, 0)", 'rgba(244, 255, 117, 0.85)', 'rgba(254, 255, 241, 0)']} />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onClickGameType('Side')} activeOpacity={1} style={{ flexDirection: 'column', alignItems: 'center' }} >
              <Text style={styles.typeText} >Side</Text>
              {viewType == 'Side' && (
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  style={styles.textSelectBorder} locations={[0, 0.5, 1]} colors={["rgba(250, 255, 178, 0)", 'rgba(244, 255, 117, 0.85)', 'rgba(254, 255, 241, 0)']} />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => onClickGameType('NFT')} activeOpacity={1} style={{ flexDirection: 'column', alignItems: 'center' }} >
              <Text style={styles.typeText} >NFT</Text>
              {viewType == 'NFT' && (
                <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                  style={styles.textSelectBorder} locations={[0, 0.5, 1]} colors={["rgba(250, 255, 178, 0)", 'rgba(244, 255, 117, 0.85)', 'rgba(254, 255, 241, 0)']} />
              )}
            </TouchableOpacity>
          </View>
        </Modal>

      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'black',
    paddingBottom: heightScale * 40
  },
  fontStyle: { fontSize: heightScale * 18, fontWeight: 'bold', color: 'white' },
  headerStyle: {
    height: heightScale * 61,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#999999',
  },
  beforeIcon: {
    position: 'absolute',
    marginTop: (heightScale * (61 - 28)) / 2,
    marginLeft: heightScale * 15,
  },
  LeftIcon: {
    position: 'absolute',
    left: 0,
    zIndex: 3,
  },
  RightIcon: {
    position: 'absolute',
    right: 0,
    // top:-18,
    zIndex: 3,
  },
  monthSelect: {
    width: heightScale * 180,
    height: heightScale * 20,
    marginTop: heightScale * 15,
  },
  monthText: {
    textAlign: 'center',
    color: 'white',
  },
  monthSelectBox: {
    flexDirection: 'column',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#939393',
    paddingBottom: heightScale * 15,
  },
  historyBox: {
    width: heightScale * 400,
    height: heightScale * 70,
    marginTop: heightScale * 10,
    borderColor: 'rgba(57, 57, 57, 0.7)',
    borderWidth: 1,
    borderTopRightRadius: 8,
    borderTopLeftRadius: 8,
    // borderBottomLeftRadius: 2,
    // borderBottomRightRadius: 2,
    flexDirection: 'column',
    padding: heightScale * 7,
  },
  gameText: {
    color: 'white',
    fontSize: heightScale * 17,
    fontWeight: '600',
  },
  placeBox: {
    marginLeft: heightScale * 10,
    backgroundColor: '#F9F36B',
    borderRadius: 30,
    width: heightScale * 61,
    height: heightScale * 20,
    marginTop: heightScale * 4,
  },
  placeBoxText: {
    fontSize: heightScale * 11,
    fontWeight: '600',
    lineHeight: heightScale * 20,
    textAlign: 'center',
    color: '#000',
  },
  moneyBox: {
    marginLeft: heightScale * 9,
    backgroundColor: '#48E0EA',
    borderRadius: 30,
    width: heightScale * 61,
    height: heightScale * 20,
    marginTop: heightScale * 4,
  },
  moneyBoxText: {
    fontSize: heightScale * 11,
    fontWeight: 'bold',
    lineHeight: heightScale * 20,
    textAlign: 'center',
    color: '#000',
  },
  cardPayText: {
    color: '#fff',
    fontSize: heightScale * 15,
  },
  timeText: {
    color: '#fff',
    fontSize: heightScale * 13,
  },
  historyOpen: {
    position: 'absolute',
    top: heightScale * 23,
    right: heightScale * 15,
  },
  historyDetailBox: {
    width: heightScale * 400,
    height: heightScale * 150,
    backgroundColor: '#1E1E1E',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(146, 146, 146, 0.5)',
    padding: 10 * heightScale,
  },
  DetailText: {
    color: 'white',
    fontSize: heightScale * 15,
  },
  DetailText2: {
    color: 'white',
    fontSize: heightScale * 13,
  },
  Faders: {
    width: heightScale * 28,
    height: heightScale * 28,
  },
  FadersBox: {
    position: 'absolute',
    right: 0,
    marginTop: (heightScale * (61 - 28)) / 2,
    marginRight: heightScale * 15,
  },
  modalstyle: {
    height: heightScale * 380,
    backgroundColor: '#373737',
    borderTopRightRadius: heightScale * 30,
    borderTopLeftRadius: heightScale * 30,
    width: width,
    position: 'absolute',
    bottom: -20,
    left: -20,
    // borderTopWidth:1,
    // borderColor:'#fff',
  },
  joinText: {
    marginTop: heightScale * 40,
    color: 'white',
    fontSize: heightScale * 20,
    fontWeight: '600',
  },
  typeText: {
    color: 'white',
    fontSize: heightScale * 16,
    lineHeight: heightScale * 63,
    textAlign: 'center',
  },
  textSelectBorder: {
    width: heightScale * 120,
    height: heightScale * 3,
    position: 'absolute',
    bottom: 0,
    // borderRadius: 10,
  }

});
export default GameHostory;
