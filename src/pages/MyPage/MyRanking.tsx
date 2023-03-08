import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconAntDesign2 from 'react-native-vector-icons/Entypo';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  HomeRootStackParamList,
  MyPageRootStackParamList,
} from '../../../AppInner';
import {heightData} from '../../modules/globalStyles';
const {width, height} = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import {Icon} from 'react-native-vector-icons/Icon';
import MyRankingModal from './MyPageCompoents/MyRankingModal';
const heightScale = heightData;

function MyRanking() {
  const navigation = useNavigation<NavigationProp<MyPageRootStackParamList>>();
  const [status, setStatus] = useState('month');
  const [modalStatus, setModalStatus] = useState(false);
  const [rankingData, setRankingData] = useState([
    {ranking: 1, name: '한나피쉬', point: 25, status: 'up'},
    {ranking: 2, name: '한나피쉬', point: 24, status: ''},
    {ranking: 3, name: '한나피쉬', point: 23, status: 'up'},
    {ranking: 4, name: '한나피쉬', point: 22, status: 'down'},
    {ranking: 5, name: '한나피쉬', point: 21, status: ''},
    {ranking: 6, name: '한나피쉬', point: 20, status: 'down'},
    {ranking: 7, name: '한나피쉬', point: 19, status: 'up'},
    {ranking: 8, name: '한나피쉬', point: 18, status: 'down'},
    {ranking: 9, name: '한나피쉬', point: 17, status: 'down'},
    {ranking: 10, name: '한나피쉬', point: 16, status: ''},
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.headerStyle}>
          <Text style={styles.fontStyle}>마이 랭킹</Text>
        </View>
        <IconAntDesign
          name="left"
          size={heightScale * 28}
          color="white"
          style={styles.beforeIcon}
          onPress={() => navigation.goBack()}
        />
      </View>

      <View style={{flex: 1, alignItems: 'center'}}>
        <Image
          style={styles.bannerBoxPostion}
          source={require('../../assets/bannerImg.png')}
        />

        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1}}></View>
          <View
            style={{
              flex: 1,
              marginTop: heightScale * 36,
              marginRight: heightScale * 28,
            }}>
            <Text style={styles.bannerText}> 킹스리그 2월 예상 프라이즈 </Text>
            <Text style={styles.bannerText2}> 월간 랭킹 | 블랙티켓 10장</Text>
          </View>
        </View>
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
            size={heightScale * 30}
            color="white"
            style={styles.scoreIcon}
            onPress={() => navigation.navigate('MyRankingScore')}
          />
        </LinearGradient>
      </View>
      <View style={{flex: 3, alignItems: 'center'}}>
        <View style={styles.rankingBox}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setStatus('month')}>
              <Text
                style={
                  status == 'month' ? styles.monthText : styles.monthText2
                }>
                월간
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setStatus('week')}>
              <Text
                style={status == 'week' ? styles.weekText : styles.weekText2}>
                주간
              </Text>
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
            <ScrollView
              // horizontal
              showsHorizontalScrollIndicator={false}>
              <View style={styles.RankingTop}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text style={styles.menuText}>순위</Text>
                  <Text style={styles.menuText}>유저</Text>
                </View>
                <View style={{flex: 5, alignItems: 'flex-end'}}>
                  <Text style={[styles.menuText, styles.marginRight]}>Pts</Text>
                </View>
              </View>

              {rankingData.map((v: any, key) => (
                <View style={styles.rankingLineOne} key={key}>
                  <View style={styles.lineRankingImg}></View>
                  <View style={styles.RankingTextBox}>
                    <Text style={styles.lineText}>{v.ranking}</Text>
                  </View>
                  <View style={styles.imgBox}>
                    <Image
                      style={styles.userIcon}
                      source={require('../../assets/UserIcon.png')}
                    />
                  </View>
                  <View style={{marginLeft: 20 * heightScale}}>
                    <Text style={styles.lineText}>{v.name}</Text>
                  </View>
                  <View style={{flex: 1, alignItems: 'flex-end'}}>
                    <Text
                      style={[
                        styles.menuText,
                        styles.marginRight,
                        styles.lineText,
                      ]}>
                      {v.point}
                    </Text>
                  </View>
                </View>
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
  beforeIcon: {
    position: 'absolute',
    marginTop: (heightScale * (61 - 28)) / 2,
    marginLeft: heightScale * 15,
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
    width: 389 * heightScale,
    height: 105 * heightScale,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#000',
    flexDirection: 'row',
    marginTop: 5 * heightScale,
  },
  scoreIcon: {
    position: 'absolute',
    right: 10 * heightScale,
    marginTop: (heightScale * (105 - 30)) / 2,
  },
  scoreText: {
    color: '#fff',
    fontSize: 19 * heightScale,
    marginTop: 15 * heightScale,
    marginLeft: 10 * heightScale,
  },
  scoreText2: {
    color: '#fff',
    fontSize: 29 * heightScale,
    fontWeight: '600',
    marginLeft: 55 * heightScale,
  },
  monthText: {
    color: 'white',
    marginLeft: 10 * heightScale,
    fontSize: 20 * heightScale,
  },
  monthText2: {
    color: '#797979',
    marginLeft: 10 * heightScale,
    fontSize: 20 * heightScale,
  },
  weekText: {
    color: 'white',
    marginLeft: 35 * heightScale,
    fontSize: 20 * heightScale,
  },
  weekText2: {
    color: '#797979',
    marginLeft: 35 * heightScale,
    fontSize: 20 * heightScale,
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
  lineText: {
    color: 'white',
    fontSize: 18 * heightScale,
    lineHeight: 50 * heightScale,
    marginLeft: 3 * heightScale,
    textAlign: 'center',
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
