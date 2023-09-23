import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, ScrollView, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {heightData} from '@/modules';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/reducer';
import Config from 'react-native-config';
import axios from 'axios';
import ProfileImg from '@/components/ProfileImg';
import {styles} from './RankingStyle';
const heightScale = heightData;

function Ranking() {
  type DataType = {
    nickname: String;
    ranking: String;
    points: String;
    uuid: String;
  };
  const Data = {
    nickname: '',
    ranking: '',
    points: '',
    uuid: '',
  };

  const [status, setStatus] = useState('month');
  const [monthData, setMonthData] = useState<[DataType, DataType, DataType]>([Data, Data, Data]);
  const [weekData, setWeekData] = useState<[DataType, DataType, DataType]>([Data, Data, Data]);

  const {access_token, nickName} = useSelector((state: RootState) => state.user);

  useEffect(() => {
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    let day = year + '-' + month + '-' + date;

    // getMonth(day);
    // getWeek(day);
    getMonth('2023-3-20');
    getWeek(day);
  }, []);

  const getMonth = (day: String) => {
    const getmon = async (day: String) => {
      try {
        const getTicketsResult = await axios.get(`${Config.API_URL}/member/ranking/monthly?date=${day}`, {
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        });
        setMonthData(getTicketsResult.data);
      } catch (error) {
        console.error(error);
      }
    };
    getmon(day);
  };
  const getWeek = (day: String) => {
    const week = async (day: String) => {
      try {
        const getTicketsResult = await axios.get(`${Config.API_URL}/member/ranking/weekly?date=${day}`, {
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        });
        setWeekData(getTicketsResult.data);
      } catch (error) {
        console.error(error);
      }
    };
    week(day);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flex: 1, alignItems: 'center'}}>
        <Image style={styles.bannerBoxPostion} source={require('@/assets/bannerImg.png')} />

        <View style={{flex: 1, flexDirection: 'row'}}>
          <View style={{flex: 1}}></View>
          <View style={{flex: 1, marginTop: heightScale * 36, marginRight: heightScale * 28}}>
            <Text style={styles.bannerText}> 킹스리그 2월 예상 프라이즈 </Text>
            <Text style={styles.bannerText2}> 월간 랭킹 | 블랙티켓 10장</Text>
          </View>
        </View>
      </View>

      <View style={{flex: 2.3, alignItems: 'center', paddingVertical: 10 * heightScale, flexDirection: 'row'}}>
        <Image
          style={{position: 'absolute', width: '100%', height: '100%', resizeMode: 'stretch'}}
          source={require('@/assets/ranking_bg.png')}
        />
        <View style={{flex: 1, alignItems: 'center', marginTop: heightScale * 46}}>
          <Image style={styles.playerCrown2} source={require('../../assets/2_crown.png')} />
          <Image style={styles.playerRound2} source={require('../../assets/2_round.png')} />
          {status == 'week' && <ProfileImg style={styles.playerImg2} source={Config.IMG_URL! + weekData[1]?.uuid} />}
          {status == 'month' && <ProfileImg style={styles.playerImg2} source={Config.IMG_URL! + monthData[1]?.uuid} />}
          <View style={{flex: 1, marginTop: 16 * heightScale, alignItems: 'center', paddingBottom: 38 * heightScale}}>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 14 * heightScale}}>
              {status == 'week' && weekData[1]?.nickname}
              {status == 'month' && monthData[1]?.nickname}
            </Text>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontSize: 14 * heightScale,
                marginTop: 2 * heightScale,
                fontWeight: '600',
              }}>
              {status == 'week' && weekData[1]?.points}
              {status == 'month' && monthData[1]?.points} pts
            </Text>
          </View>
        </View>
        <View style={{flex: 1, alignItems: 'center', marginTop: heightScale * 5}}>
          <Image style={styles.playerCrown} source={require('../../assets/1_crown.png')} />
          <Image style={styles.playerRound} source={require('../../assets/1_round.png')} />
          {status == 'week' && <ProfileImg style={styles.playerImg} source={Config.IMG_URL! + weekData[0]?.uuid} />}
          {status == 'month' && <ProfileImg style={styles.playerImg} source={Config.IMG_URL! + monthData[0]?.uuid} />}
          <View
            style={{
              flex: 1,
              marginTop: 14 * heightScale,
              alignItems: 'center',
              flexDirection: 'row',
              paddingBottom: 30 * heightScale,
            }}>
            <Image style={styles.nameWing1} source={require('../../assets/nameWing1.png')} />
            <View>
              <Text style={{color: 'white', textAlign: 'center', fontSize: 14 * heightScale}}>
                {status == 'week' && weekData[0]?.nickname}
                {status == 'month' && monthData[0]?.nickname}
              </Text>
              <Text
                style={{
                  color: 'white',
                  textAlign: 'center',
                  fontSize: 14 * heightScale,
                  marginTop: 2 * heightScale,
                  fontWeight: '600',
                }}>
                {status == 'week' && weekData[0]?.points}
                {status == 'month' && monthData[0]?.points} pts
              </Text>
            </View>
            <Image style={styles.nameWing2} source={require('../../assets/nameWing2.png')} />
          </View>
        </View>
        <View style={{flex: 1, alignItems: 'center', marginTop: heightScale * 46}}>
          <Image style={styles.playerCrown2} source={require('../../assets/3_crown.png')} />
          <Image style={styles.playerRound2} source={require('../../assets/3_round.png')} />
          {status == 'week' && <ProfileImg style={styles.playerImg2} source={Config.IMG_URL! + weekData[2]?.uuid} />}
          {status == 'month' && <ProfileImg style={styles.playerImg2} source={Config.IMG_URL! + monthData[2]?.uuid} />}
          <View
            style={{
              flex: 1,
              marginTop: 16 * heightScale,
              alignItems: 'center',
              flexDirection: 'column',
              paddingBottom: 38 * heightScale,
            }}>
            <Text style={{color: 'white', textAlign: 'center', fontSize: 14 * heightScale}}>
              {status == 'week' && weekData[2]?.nickname}
              {status == 'month' && monthData[2]?.nickname}
            </Text>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontSize: 14 * heightScale,
                marginTop: 2 * heightScale,
                fontWeight: '600',
              }}>
              {status == 'week' && weekData[2]?.points}
              {status == 'month' && monthData[2]?.points} pts
            </Text>
          </View>
        </View>
      </View>
      <View style={{flex: 3.7, alignItems: 'center'}}>
        <View style={styles.rankingBox}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <TouchableOpacity activeOpacity={1} onPress={() => setStatus('month')}>
              <Text style={status == 'month' ? styles.monthText : styles.monthText2}>월간</Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={1} onPress={() => setStatus('week')}>
              <Text style={status == 'week' ? styles.weekText : styles.weekText2}>주간</Text>
            </TouchableOpacity>
          </View>
          <View style={{flex: 10}}>
            <ScrollView showsHorizontalScrollIndicator={false} bounces={false}>
              <View style={styles.RankingTop}>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <Text style={styles.menuText}>순위</Text>
                  <Text style={styles.menuText}>유저</Text>
                </View>
                <View style={{flex: 5, alignItems: 'flex-end'}}>
                  <Text style={[styles.menuText, styles.marginRight]}>Pts</Text>
                </View>
              </View>

              {status == 'month' &&
                monthData.map((v: any, key) => (
                  <View style={[styles.rankingLineOne, nickName == v.nickname && styles.rankingLineOne2]} key={key}>
                    <View style={styles.lineRankingImg}></View>
                    <View style={styles.RankingTextBox}>
                      <Text style={[styles.lineText, nickName == v.nickname && styles.lineText2]}>{v.ranking}</Text>
                    </View>
                    <View style={styles.imgBox}>
                      <ProfileImg style={styles.userIcon} source={Config.IMG_URL! + v.uuid} />
                    </View>
                    <View style={{marginLeft: 20 * heightScale}}>
                      <Text style={[styles.lineText, nickName == v.nickname && styles.lineText2]}>{v.nickname}</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                      <Text
                        style={[
                          styles.menuText,
                          styles.marginRight,
                          styles.lineText,
                          nickName == v.nickname && styles.lineText2,
                        ]}>
                        {v.points}
                      </Text>
                    </View>
                  </View>
                ))}

              {status == 'week' &&
                weekData.map((v: any, key) => (
                  <View style={[styles.rankingLineOne, nickName == v.nickname && styles.rankingLineOne2]} key={key}>
                    <View style={styles.lineRankingImg}></View>
                    <View style={styles.RankingTextBox}>
                      <Text style={[styles.lineText, nickName == v.nickname && styles.lineText2]}>{v.ranking}</Text>
                    </View>
                    <View style={styles.imgBox}>
                      <ProfileImg style={styles.userIcon} source={Config.IMG_URL! + v.uuid} />
                    </View>
                    <View style={{marginLeft: 20 * heightScale}}>
                      <Text style={[styles.lineText, nickName == v.nickname && styles.lineText2]}>{v.nickname}</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'flex-end'}}>
                      <Text
                        style={[
                          styles.menuText,
                          styles.marginRight,
                          styles.lineText,
                          nickName == v.nickname && styles.lineText2,
                        ]}>
                        {v.points}
                      </Text>
                    </View>
                  </View>
                ))}
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Ranking;
