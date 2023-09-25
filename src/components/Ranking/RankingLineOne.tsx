import {styles} from '@/pages/Ranking/RankingStyle';
import {Text, View} from 'react-native';
import ProfileImg from '@/components/ProfileImg';
import {heightData} from '@/modules/globalStyles';
import Config from 'react-native-config';

export const RankingLineOne = ({nickName, v}: any) => {
  return (
    <View style={[styles.rankingLineOne, nickName == v.nickname && styles.rankingLineOne2]}>
      <View></View>
      <View style={styles.lineRankingImg}></View>
      <View style={styles.RankingTextBox}>
        <Text style={[styles.lineText, nickName == v.nickname && styles.lineText2]}>{v.ranking}</Text>
      </View>
      <View style={styles.imgBox}>
        <ProfileImg style={styles.userIcon} source={Config.IMG_URL! + v.uuid} />
      </View>
      <View style={{marginLeft: 20 * heightData}}>
        <Text style={[styles.lineText, nickName == v.nickname && styles.lineText2]}>{v.nickname}</Text>
      </View>
      <View style={{flex: 1, alignItems: 'flex-end'}}>
        <Text
          style={[styles.menuText, styles.marginRight, styles.lineText, nickName == v.nickname && styles.lineText2]}>
          {v.points}
        </Text>
      </View>
    </View>
  );
};
