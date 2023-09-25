import {useState, useEffect} from 'react';
import {Text, View, Pressable, ScrollView, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {heightData} from '@/modules';
import {useSelector} from 'react-redux';
import {RootState} from '@/store/reducer';
import Config from 'react-native-config';
import axios from 'axios';
import ProfileImg from '@/components/ProfileImg';
import {styles} from './RankingStyle';
import {RankingBanner, RankingLineOne} from '@/components/Ranking';
const heightScale = heightData;

const Ranking = () => {
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
        <RankingBanner />
      </View>

      <View style={[{flex: 2.8}, styles.pointContainer]}>
        <View style={[{flex: 1}, styles.pointContainer_side]}>
          <Image style={styles.pointContainer_img} source={require('@/assets/Figure_bg.png')} />
          {status == 'week' && <ProfileImg style={styles.playerImg2} source={Config.IMG_URL! + weekData[1]?.uuid} />}
          {status == 'month' && <ProfileImg style={styles.playerImg2} source={Config.IMG_URL! + monthData[1]?.uuid} />}
          <View style={styles.pointContainer_textBox}>
            <Text style={styles.pointContainer_text1}>
              {status == 'week' && weekData[1]?.nickname}
              {status == 'month' && monthData[1]?.nickname}
            </Text>
            <Text style={styles.pointContainer_text}>
              {status == 'week' && weekData[1]?.points}
              {status == 'month' && monthData[1]?.points} pts
            </Text>
          </View>
        </View>
        <View style={[{flex: 1}, styles.pointContainer_center]}>
          <Image style={styles.pointContainer_img_center} source={require('@/assets/Figure_bg.png')} />
          {status == 'week' && <ProfileImg style={styles.playerImg} source={Config.IMG_URL! + weekData[0]?.uuid} />}
          {status == 'month' && <ProfileImg style={styles.playerImg} source={Config.IMG_URL! + monthData[0]?.uuid} />}
          <View style={styles.pointContainer_textBox}>
            <View>
              <Text style={[styles.pointContainer_text1, styles.textcolor]}>
                {status == 'week' && weekData[0]?.nickname}
                {status == 'month' && monthData[0]?.nickname}
              </Text>
              <Text style={[styles.pointContainer_text, styles.textcolor]}>
                {status == 'week' && weekData[0]?.points}
                {status == 'month' && monthData[0]?.points} pts
              </Text>
            </View>
          </View>
        </View>
        <View style={[{flex: 1}, styles.pointContainer_side]}>
          <Image style={styles.pointContainer_img} source={require('@/assets/Figure_bg.png')} />
          {status == 'week' && <ProfileImg style={styles.playerImg2} source={Config.IMG_URL! + weekData[2]?.uuid} />}
          {status == 'month' && <ProfileImg style={styles.playerImg2} source={Config.IMG_URL! + monthData[2]?.uuid} />}
          <View style={styles.pointContainer_textBox}>
            <Text style={styles.pointContainer_text1}>
              {status == 'week' && weekData[2]?.nickname}
              {status == 'month' && monthData[2]?.nickname}
            </Text>
            <Text style={styles.pointContainer_text}>
              {status == 'week' && weekData[2]?.points}
              {status == 'month' && monthData[2]?.points} pts
            </Text>
          </View>
        </View>
      </View>
      <View style={{flex: 4.1, alignItems: 'center'}}>
        <View style={styles.rankingBox}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Pressable onPress={() => setStatus('month')}>
              <Text style={status == 'month' ? styles.monthText : styles.monthText2}>월간</Text>
            </Pressable>
            <Pressable onPress={() => setStatus('week')}>
              <Text style={status == 'week' ? styles.weekText : styles.weekText2}>주간</Text>
            </Pressable>
          </View>
          <View style={{flex: 5}}>
            <ScrollView showsHorizontalScrollIndicator={false} bounces={false}>
              <View style={styles.RankingTop}>
                <View style={{flexDirection: 'row'}}>
                  <Text style={[styles.menuText, {marginLeft: 51 * heightScale}]}>순위</Text>
                  <Text style={styles.menuText}>유저</Text>
                </View>
                <View style={{marginLeft: 'auto'}}>
                  <Text style={[styles.menuText, styles.marginRight]}>Pts</Text>
                </View>
              </View>

              {status == 'month' &&
                monthData.map((v: any, key) => <RankingLineOne v={v} key={key} nickName={nickName} />)}

              {status == 'week' &&
                weekData.map((v: any, key) => <RankingLineOne v={v} key={key} nickName={nickName} />)}
            </ScrollView>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Ranking;
