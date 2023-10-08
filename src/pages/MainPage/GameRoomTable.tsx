import {Header} from '@/components/Header';
import ProfileImg from '@/components/ProfileImg';
import Rectangle from '@/components/Rectangle';
import {IBlindInfo, IProfileInfo} from '@/config/tournament';
import {FontStyle, GlobalStyles, headerIconSize, heightData, width, widthData} from '@/modules/globalStyles';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeRootStackParamList} from 'AppInner';
import {Text, View, StyleSheet, Image, Dimensions} from 'react-native';
import Config from 'react-native-config';
import {SafeAreaView} from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

type ScreenProps = NativeStackScreenProps<HomeRootStackParamList, 'GameRoomTable'>;

// 더미 데이터
const _demoProfiles: IProfileInfo[] = new Array(11).fill(1).map((_, i) => {
  return {
    uuid: 'c121308f-579d-446d-876d-0f652f39ace4',
    nickName: '유저' + i,
  };
});
const demoProfiles: IProfileInfo[][] = [_demoProfiles, _demoProfiles];

function GameRoomTable({route}: ScreenProps) {
  const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();

  const TableNumber: React.FC<{number: number}> = ({number}) => {
    return (
      <View style={[GlobalStyles.flexCenter, {top: heightData * 16, flexDirection: 'row'}]}>
        <Rectangle type="big" scale={5} color="#C9BEA2" />
        <View style={{width: widthData * 25, height: 2, backgroundColor: '#C9BEA2'}} />
        <Text style={[FontStyle.fs16, FontStyle.fwBold, {color: '#C9BEA2', paddingHorizontal: widthData * 11}]}>
          Table {number}
        </Text>
        <View style={{width: widthData * 25, height: 2, backgroundColor: '#C9BEA2'}} />
        <Rectangle type="big" scale={5} color="#C9BEA2" />
      </View>
    );
  };

  const UserIcon: React.FC<{
    uuid: string;
    nickName: string;
    space?: number;
  }> = ({uuid, nickName, space = 0}) => {
    return (
      <View style={[GlobalStyles.flexCenter, {marginHorizontal: space}]}>
        <ProfileImg style={ParticipantStyle.playerImg} source={Config.IMG_URL! + uuid} />
        <View style={ParticipantStyle.userNicknameStyle}>
          <Text style={[FontStyle.fs12, FontStyle.fwBold, {color: '#000'}]}>{nickName}</Text>
        </View>
      </View>
    );
  };

  const Dealer: React.FC<{
    space?: number;
  }> = ({space = 0}) => {
    return (
      <View style={[GlobalStyles.flexCenter, {marginHorizontal: space}]}>
        <View style={[GlobalStyles.flexCenter, ParticipantStyle.dealerStyle]}>
          <Text style={{color: '#C9BEA2', fontSize: heightData * 11, fontWeight: 'bold'}}>DEALER</Text>
        </View>
      </View>
    );
  };

  const BlindInfo: React.FC<{
    blindInfo: IBlindInfo;
  }> = ({blindInfo}) => {
    const {level,ante,blinds} = blindInfo;
    return (
      <View style={{backgroundColor:'red'}}>
        <Text>Blinds : Level {level}</Text>
        <Text>{blinds} Ante: {ante}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView edges={['top']} style={[GlobalStyles.container, {flex: 1}]}>
      {/* header */}
      <Header
        title={'GAME ROOM ID: ' + route.params.gameId}
        leftIcon={() => (
          <IconAntDesign name="left" size={headerIconSize} color="white" onPress={() => navigation.goBack()} />
        )}
      />
      <Swiper
        loop={false}
        horizontal={true}
        activeDot={<View style={BannerStyle.activeDot} />}
        dot={<View style={BannerStyle.dot} />}>
        {demoProfiles.map((data, index) => (
          <View key={index} style={{flex: 1}}>
            <Image source={require('../../assets/table_wide.png')} style={ParticipantStyle.tableStyle} />
            <BlindInfo blindInfo={{level:2,ante:0,blinds:'200/400'}}/>
            <View style={{position: 'absolute', width: '100%'}}>
              <TableNumber number={index + 1} />
              <View style={[{top: heightData * 60}, ParticipantStyle.profileWrapper]}>
                <UserIcon uuid={data[2].uuid} nickName={data[2].nickName} />
              </View>
              <View style={[{top: heightData * 30}, ParticipantStyle.profileWrapper]}>
                <UserIcon uuid={data[3].uuid} nickName={data[3].nickName} space={widthData * 70} />
                <UserIcon uuid={data[1].uuid} nickName={data[1].nickName} space={widthData * 70} />
              </View>
              <View style={[{top: heightData * 55}, ParticipantStyle.profileWrapper]}>
                <UserIcon uuid={data[4].uuid} nickName={data[4].nickName} space={widthData * 90} />
                <UserIcon uuid={data[0].uuid} nickName={data[0].nickName} space={widthData * 90} />
              </View>
              <View style={[{top: heightData * 85}, ParticipantStyle.profileWrapper]}>
                <UserIcon uuid={data[5].uuid} nickName={data[5].nickName} space={widthData * 100} />
                <Dealer space={widthData * 100} />
              </View>
              <View style={[{top: heightData * 115}, ParticipantStyle.profileWrapper]}>
                <UserIcon uuid={data[6].uuid} nickName={data[6].nickName} space={widthData * 90} />
                <UserIcon uuid={data[10].uuid} nickName={data[10].nickName} space={widthData * 90} />
              </View>
              <View style={[{top: heightData * 140}, ParticipantStyle.profileWrapper]}>
                <UserIcon uuid={data[7].uuid} nickName={data[7].nickName} space={widthData * 70} />
                <UserIcon uuid={data[9].uuid} nickName={data[9].nickName} space={widthData * 70} />
              </View>
              <View style={[{top: heightData * 125}, ParticipantStyle.profileWrapper]}>
                <UserIcon uuid={data[8].uuid} nickName={data[8].nickName} />
              </View>
            </View>
          </View>
        ))}
      </Swiper>
    </SafeAreaView>
  );
}

const ParticipantStyle = StyleSheet.create({
  tableStyle: {
    flex: 1,
    width: width,
    resizeMode: 'cover',
  },
  playerImg: {
    width: widthData * 45,
    height: heightData * 45,
    borderRadius: 25,
  },
  userNicknameStyle: {
    top: -5 * heightData,
    width: widthData * 60,
    height: heightData * 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#35312A',
    backgroundColor: 'rgba(210, 210, 210, 0.8)',
  },
  profileWrapper: {flexDirection: 'row', justifyContent: 'center'},
  dealerStyle: {
    width: widthData * 50,
    height: heightData * 50,
    borderRadius: 25,
    backgroundColor: '#35312A',
    borderWidth: 1,
    borderColor: '#C9BEA2',
  },
});

const BannerStyle = StyleSheet.create({
  activeDot: {
    backgroundColor: '#6E5E48',
    width: widthData * 20,
    height: heightData * 5,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  dot: {
    backgroundColor: '#C6C6C680',
    opacity: 0.5,
    width: widthData * 5,
    height: heightData * 5,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
});
export default GameRoomTable;
