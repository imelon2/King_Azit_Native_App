import {styles} from '@/pages/Ranking/RankingStyle';
import {Text, View, Image} from 'react-native';
import {heightData} from '@/modules/globalStyles';

export const RankingBanner = () => {
  return (
    <>
      <Image style={styles.bannerBoxPostion} source={require('@/assets/bannerImg.png')} />

      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1}}></View>
        <View style={{flex: 1, marginTop: heightData * 35, marginRight: heightData * 28}}>
          <Text style={styles.bannerText}> 킹스리그 2월 예상 프라이즈 </Text>
          <Text style={styles.bannerText2}> 월간 랭킹 | 블랙티켓 10장</Text>
        </View>
      </View>
    </>
  );
};
