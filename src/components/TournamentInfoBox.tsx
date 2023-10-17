import {Pressable, StyleSheet, Text, View} from 'react-native';
import {FontStyle, heightData, widthData} from '../modules/globalStyles';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {HomeRootStackParamList, MyPageRootStackParamList} from 'AppInner';
import { TicketTypeKR } from '@/config/tickets';

// 토너먼트 박스 관련 데이터
type ITournamentInfo = {
  roomId:string;
  date: string;
  title: string;
  startDate: string;
  regDate: string;
  bind: {
    ticketType: TicketTypeKR;
    count: number;
  };
};

/**
 * 토너먼트 더미데이터
 * 나중에 API 연동 시, 데이터 연동
 */
export const TournamentInfoBoxDemo: ITournamentInfo = {
  roomId:'room:1234',
  date: '2023. 05. 21(일)',
  title: 'NFT Holder Main Event',
  startDate: '2022.05.21 (일) 19:00',
  regDate: '2022.05.21 (일) 21:00',
  bind: {
    ticketType: '블랙티켓',
    count: 5,
  },
};

export const TournamentInfoBox: React.FC<{
  Info: ITournamentInfo;
}> = ({Info}) => {
  const navigation = useNavigation<NavigationProp<HomeRootStackParamList & MyPageRootStackParamList>>();

  return (
    <View style={styles.container}>
      {/* 왼쪽 UI */}
      <View style={{top: heightData * 16}}>
        <Text style={FontStyle.fs12}>{Info.date}</Text>
        <Text style={[FontStyle.fs16, FontStyle.fw600, {color: '#F5FF82', marginBottom: heightData * 16}]}>
          [{Info.title}]
        </Text>
        <Text style={FontStyle.fs14}>게임시작: {Info.startDate}</Text>
        <Text style={[FontStyle.fs14, {paddingVertical: 3}]}>레지마감: {Info.regDate}</Text>
        <Text style={FontStyle.fs14}>
          바이인: {Info.bind.ticketType} {TournamentInfoBoxDemo.bind.count}장
        </Text>
      </View>
      {/* 오른쪽 UI : Late Reg, 상세버튼 */}
      <View style={{flex: 1, alignItems: 'center'}}>
        {/* Late Reg */}
        <View style={[styles.table, {marginTop: heightData * 32}]}>
          <Text style={[FontStyle.fs10]}>Late Reg.</Text>
        </View>
        <View style={[styles.table, {borderTopWidth: 0}]}>
          <Text style={FontStyle.fs10}>Ends in</Text>
          <Text style={[FontStyle.fs12, FontStyle.fwBold]}>1hr 15m</Text>
        </View>
        {/* 상세버튼 */}
        <Pressable
          onPress={() => navigation.navigate('TournamentInfo',{roomId:Info.roomId})}
          style={[styles.buttonContainer, {marginTop: heightData * 24}]}>
          <Text style={[FontStyle.fs12, {color: '#000'}]}>상세</Text>
          <AntDesignIcon name="right" size={heightData * 12} color="#000" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: widthData * 320,
    height: heightData * 150,
    backgroundColor: '#3D3D3D',
    borderLeftWidth: 4,
    borderLeftColor: '#F5FF82',
    paddingLeft: widthData * 16,
    flexDirection: 'row',
  },
  table: {
    width: widthData * 56,
    alignItems: 'center',
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#F5FF82',
  },
  buttonContainer: {
    bottom: 0,
    flexDirection: 'row',
    backgroundColor: '#F5FF82',
    width: widthData * 62,
    height: heightData * 22,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
