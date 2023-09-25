import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconAntDesign2 from 'react-native-vector-icons/Entypo';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {MyPageRootStackParamList} from 'AppInner';
import {heightData} from '@/modules/globalStyles';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import MyRankingModal from './MyPageCompoents/MyRankingModal';
import {Header} from '@/components';
import {RankingBanner, RankingLineOne} from '@/components/Ranking';
const heightScale = heightData;

function MyRanking() {
  const navigation = useNavigation<NavigationProp<MyPageRootStackParamList>>();
  const [status, setStatus] = useState('month');
  const [modalStatus, setModalStatus] = useState(false);
  const [myNum, setMyNum] = useState(3);
  const [rankingData, setRankingData] = useState([
    {ranking: 1, nickname: '한나피쉬', points: 25, status: 'up'},
    {ranking: 2, nickname: '한나피쉬', points: 24, status: ''},
    {ranking: 3, nickname: '한나피쉬', points: 23, status: 'up'},
    {ranking: 4, nickname: '한나피쉬', points: 22, status: 'down'},
    {ranking: 5, nickname: '한나피쉬', points: 21, status: ''},
    {ranking: 6, nickname: '한나피쉬', points: 20, status: 'down'},
    {ranking: 7, nickname: '한나피쉬', points: 19, status: 'up'},
    {ranking: 8, nickname: '한나피쉬', points: 18, status: 'down'},
    {ranking: 9, nickname: '한나피쉬', points: 17, status: 'down'},
    {ranking: 10, nickname: '한나피쉬', points: 16, status: ''},
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="마이 랭킹"
        leftIcon={() => (
          <IconAntDesign
            name="left"
            size={heightScale * 28}
            color="white"
            suppressHighlighting={false}
            onPress={() => navigation.goBack()}
          />
        )}
      />

      <View style={{flex: 1, alignItems: 'center'}}>
        <RankingBanner />
      </View>
      <View style={{flex: 1, alignItems: 'center'}}>
        <LinearGradient
          style={styles.scoreBox}
          locations={[0, 1]}
          colors={['rgba(49, 49, 49, 1)', 'rgba(49, 49, 49, 0)']}>
          <View style={{flex: 1}}>
            <Text style={styles.scoreText}> 총 누적 승점: </Text>
          </View>
          <View style={{flex: 1, alignItems: 'center', flexDirection: 'row'}}>
            <Text style={styles.scoreText2}> 24점</Text>
          </View>

          <IconAntDesign
            name="right"
            size={heightScale * 26}
            color="white"
            style={styles.scoreIcon}
            onPress={() => navigation.navigate('MyRankingScore')}
          />
        </LinearGradient>
      </View>
      <View style={{flex: 3, alignItems: 'center'}}>
        <View style={styles.rankingBox}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity activeOpacity={1} onPress={() => setStatus('month')}>
              <Text style={status == 'month' ? styles.monthText : styles.monthText2}>월간</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress={() => setStatus('week')}>
              <Text style={status == 'week' ? styles.weekText : styles.weekText2}>주간</Text>
            </TouchableOpacity>

            <IconAntDesign2
              name="calendar"
              size={heightScale * 26}
              color="white"
              style={styles.calendarStyle}
              onPress={() => setModalStatus(true)}
            />
          </View>
          <View style={{flex: 10}}>
            <ScrollView bounces={false} showsHorizontalScrollIndicator={false}>
              <View style={styles.RankingTop}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.menuText, {marginLeft: 51 * heightScale}]}>순위</Text>
                  <Text style={styles.menuText}>유저</Text>
                </View>
                <View style={{marginLeft: 'auto'}}>
                  <Text style={[styles.menuText, styles.marginRight]}>Pts</Text>
                </View>
              </View>

              {rankingData.map((v: any, key) => (
                <RankingLineOne v={v} nickName="한나" />
              ))}
            </ScrollView>
          </View>
        </View>
      </View>

      <Modal isVisible={modalStatus}>
        <MyRankingModal setModalStatus={setModalStatus} />
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#121212',
    paddingBottom: heightScale * 40,
  },
  fontStyle: {fontSize: heightScale * 18, fontWeight: 'bold', color: 'white'},
  headerStyle: {
    height: heightScale * 61,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#999999',
  },
  bannerBoxPostion: {
    position: 'absolute',
    width: 390 * heightScale,
    height: 94 * heightScale,
    borderRadius: 10,
    marginTop: 15 * heightScale,
  },
  bannerText: {
    color: 'white',
    fontSize: 16 * heightScale,
    textAlign: 'center',
    fontWeight: '800',
  },
  bannerText2: {
    color: 'white',
    fontSize: 14 * heightScale,
    textAlign: 'center',
    marginTop: 3 * heightScale,
  },
  scoreBox: {
    width: 320 * heightScale,
    height: 86 * heightScale,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
    flexDirection: 'row',
    marginTop: 5 * heightScale,
  },
  scoreIcon: {
    position: 'absolute',
    right: 10 * heightScale,
    marginTop: (heightScale * (86 - 25)) / 2,
  },
  scoreText: {
    color: '#fff',
    fontSize: 18 * heightScale,
    marginTop: 12 * heightScale,
    marginLeft: 9 * heightScale,
  },
  scoreText2: {
    color: '#fff',
    fontSize: 24 * heightScale,
    fontWeight: '600',
    marginLeft: 40 * heightScale,
  },
  monthText: {
    color: 'white',
    marginLeft: 24 * heightScale,
    fontSize: 16 * heightScale,
  },
  monthText2: {
    color: '#797979',
    marginLeft: 24 * heightScale,
    fontSize: 16 * heightScale,
  },
  weekText: {
    color: 'white',
    marginLeft: 35 * heightScale,
    fontSize: 16 * heightScale,
  },
  weekText2: {
    color: '#797979',
    marginLeft: 35 * heightScale,
    fontSize: 16 * heightScale,
  },
  calendarStyle: {
    position: 'absolute',
    right: 50 * heightScale,
  },
  menuText: {
    color: 'white',
    marginLeft: 20 * heightScale,
    fontSize: 14 * heightScale,
  },
  rankingBox: {
    width: 389 * heightScale,
    height: '100%',
  },
  marginRight: {
    marginRight: 53 * heightScale,
  },
  rankingLineOne: {
    width: '100%',
    height: 50 * heightScale,
    borderColor: '#3D3D3D',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  rankingLineOne2: {
    width: '100%',
    height: 50 * heightScale,
    borderColor: '#3D3D3D',
    borderBottomWidth: 1,
    flexDirection: 'row',
    backgroundColor: '#F5FF82',
  },
  lineText: {
    color: 'white',
    fontSize: 18 * heightScale,
    lineHeight: 50 * heightScale,
    marginLeft: 3 * heightScale,
    textAlign: 'center',
  },
  lineText2: {
    color: 'black',
  },
  lineRankingImg: {
    width: 20 * heightScale,
    height: '100%',
  },
  userIcon: {
    height: heightScale * 30,
    width: heightScale * 30,
    borderRadius: 100,
    // marginLeft: heightScale * 20,
    marginTop: (heightScale * (50 - 30)) / 2,
    // resizeMode: 'center',
  },
  RankingTextBox: {
    width: 25 * heightScale,
  },
  imgBox: {
    width: 25 * heightScale,
    alignItems: 'center',
    marginLeft: 20 * heightScale,
  },
  RankingTop: {
    borderColor: '#3D3D3D',
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingTop: 15 * heightScale,
    paddingBottom: 10 * heightScale,
  },
});
export default MyRanking;
