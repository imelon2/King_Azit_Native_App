import ProfileImg from '@/components/ProfileImg';
import Rectangle from '@/components/Rectangle';
import {IProfileInfo} from '@/config/tournament';
import {GlobalStyles, heightData, widthData, FontStyle, width} from '@/modules';
import { useCallback } from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Swiper from 'react-native-swiper';

type IProps = {
  profiles: IProfileInfo[][];
};

export const TournamentInfoParticipant = (props: IProps) => {
  const TableNumber: React.FC<{number: number}> = ({number}) => {
    return (
      <View style={[GlobalStyles.flexCenter, {top: heightData * 16, flexDirection: 'row'}]}>
        <Rectangle type="big" scale={7} color="#C9BEA2" />
        <View style={{width: widthData * 25, height: 2, backgroundColor: '#C9BEA2'}} />
        <Text style={[FontStyle.fs16, FontStyle.fwBold, {color: '#C9BEA2', paddingHorizontal: widthData * 11}]}>
          Table {number}
        </Text>
        <View style={{width: widthData * 25, height: 2, backgroundColor: '#C9BEA2'}} />
        <Rectangle type="big" scale={7} color="#C9BEA2" />
      </View>
    );
  };

  const UserIcon = useCallback(({uuid = "", nickName = "", space = 0}) => {
    return (
      <View style={[GlobalStyles.flexCenter, {marginHorizontal: space}]}>
        <ProfileImg style={ParticipantStyle.playerImg} uuid={uuid}/>
        <View style={ParticipantStyle.userNicknameStyle}>
          <Text style={[FontStyle.fs12, FontStyle.fwBold, {color: '#000'}]}>{nickName}</Text>
        </View>
      </View>
    );
  },[props.profiles])
 
  const Dealer: React.FC<{
    space?: number;
  }> = ({space = 0}) => {
    return (
      <View style={[GlobalStyles.flexCenter, {marginHorizontal: space}]}>
        <View style={[GlobalStyles.flexCenter, ParticipantStyle.dealerStyle]}>
          <Text style={{color: '#C9BEA2', fontSize: 8, fontWeight: 'bold'}}>DEALER</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      <Swiper
        loop={false}
        horizontal={true}
        paginationStyle={{bottom: heightData * 5}}
        activeDot={<View style={BannerStyle.activeDot} />}
        dot={<View style={BannerStyle.dot} />}>
        {props.profiles.map((data, index) => (
          <View key={index} style={{}}>
            <Image source={require('../../../../assets/table_wide.png')} style={ParticipantStyle.tableStyle} />
            <View style={{position: 'absolute', width: '100%'}}>
              <TableNumber number={index + 1} />
              {/* 1열 자리 (Seat number : 2) */}
              <View style={[{top: heightData * 36}, ParticipantStyle.profileWrapper]}>
                <UserIcon uuid={data[2]?.uuid} nickName={data[2]?.nickName} />
              </View>
              <View style={[{top: heightData * 10}, ParticipantStyle.profileWrapper]}>
                <UserIcon uuid={data[3]?.uuid} nickName={data[3]?.nickName} space={widthData * 70} />
                <UserIcon uuid={data[1]?.uuid} nickName={data[1]?.nickName} space={widthData * 70} />
              </View>
              <View style={[{top: heightData * 40}, ParticipantStyle.profileWrapper]}>
                <UserIcon uuid={data[4]?.uuid} nickName={data[4]?.nickName} space={widthData * 90} />
                <UserIcon uuid={data[0]?.uuid} nickName={data[0]?.nickName} space={widthData * 90} />
              </View>
              <View style={[{top: heightData * 80}, ParticipantStyle.profileWrapper]}>
                <UserIcon uuid={data[5]?.uuid} nickName={data[5]?.nickName} space={widthData * 105} />
                <Dealer space={widthData * 105} />
              </View>
              <View style={[{top: heightData * 120}, ParticipantStyle.profileWrapper]}>
                <UserIcon uuid={data[6]?.uuid} nickName={data[6]?.nickName} space={widthData * 100} />
                <UserIcon uuid={data[10]?.uuid} nickName={data[10]?.nickName} space={widthData * 100} />
              </View>
              <View style={[{top: heightData * 160}, ParticipantStyle.profileWrapper]}>
                <UserIcon uuid={data[7]?.uuid} nickName={data[7]?.nickName} space={widthData * 90} />
                <UserIcon uuid={data[9]?.uuid} nickName={data[9]?.nickName} space={widthData * 90} />
              </View>
              <View style={[{top: heightData * 150}, ParticipantStyle.profileWrapper]}>
                <UserIcon uuid={data[8]?.uuid} nickName={data[8]?.nickName} />
              </View>
            </View>
          </View>
        ))}
      </Swiper>
    </View>
  );
};

const ParticipantStyle = StyleSheet.create({
  tableStyle: {
    height: 593 * heightData,
    width: width,
    resizeMode: 'cover',
  },
  playerImg: {
    width: widthData * 35,
    height: heightData * 35,
    borderRadius: 25,
  },
  userNicknameStyle: {
    top: -5,
    width: widthData * 50,
    height: heightData * 17,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#856F36',
    backgroundColor: 'rgba(210, 210, 210, 0.8)',
  },
  profileWrapper: {flexDirection: 'row', justifyContent: 'center'},
  dealerStyle: {
    width: widthData * 40,
    height: heightData * 40,
    borderRadius: 25,
    backgroundColor: '#35312A',
    borderWidth: 1,
    borderColor: '#C9BEA2',
  },
});

const BannerStyle = StyleSheet.create({
  imgSlideBox: {
    height: heightData * 265,
  },
  imgSlideBox2: {
    width: width,
    height: heightData * 265,
    resizeMode: 'cover',
  },
  activeDot: {
    backgroundColor: '#484848',
    width: widthData * 27,
    height: heightData * 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
  dot: {
    backgroundColor: '#484848',
    opacity: 0.5,
    width: widthData * 8,
    height: heightData * 8,
    borderRadius: 4,
    marginLeft: 3,
    marginRight: 3,
    marginTop: 3,
    marginBottom: 3,
  },
});
