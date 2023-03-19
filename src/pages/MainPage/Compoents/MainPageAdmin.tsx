import React from 'react';
import { Text, View, Image , TouchableOpacity, SafeAreaView } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HomeRootStackParamList, MyPageRootStackParamList } from '../../../../AppInner';
import Swiper from 'react-native-swiper';
import { heightScale, MainStyles } from '../../../modules/MainStyles';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import usePermissions from '../../../hooks/usePermissions';



function MainPageAdmin() {
  const navigation = useNavigation< NavigationProp<HomeRootStackParamList & MyPageRootStackParamList>>();
  const images = [require('../../../assets/swiper_bg.png'), require('../../../assets/swiper_bg.png')];

  usePermissions();
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121212' }} >
      <View style={{ flex: 1 }} >
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Image style={MainStyles.azitTextImg} source={require('../../../assets/Kings_Azit.png')} />
          <Image style={MainStyles.azitTextImg2} source={require('../../../assets/Rules.png')} />
        </View>
        <View style={{ flex: 2.1, alignItems: 'center' }}>
          <IconAntDesign
            style={{ position: 'absolute', top: 10, zIndex: 3 }}
            name="pluscircleo"
            size={heightScale * 30}
            color="white"
          />
          <Swiper
            horizontal={true}
            paginationStyle={{ bottom: heightScale * 5 }}
            activeDot={<View style={MainStyles.activeDot} />}
            dot={<View style={MainStyles.dot} />}>
            {images.map((uri, index) => (
              <Image key={index} style={MainStyles.imgSlideBox3} source={uri} />
            ))}
          </Swiper>
        </View>
      </View>
      <View style={{ flex: 1.5, backgroundColor: '#121212', paddingHorizontal: 14 * heightScale, paddingVertical: 14 * heightScale }}>
        <View style={{ flex: 2.9, flexDirection: 'row' }} >
          <View style={{ flex: 1 }} >
            <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('CreateRoom')} style={MainStyles.contentsBox} >
              <Text style={MainStyles.contentsText} >Game 방 만들기</Text>
              <Text style={MainStyles.contentsText2}>새로운 게임 시작하기</Text>
              <View style={{ alignItems: 'center' }} >
                <Image style={MainStyles.contentImg} source={require('../../../assets/room_make_img.png')} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }} >
            <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('TicketCharge')} style={MainStyles.contentsBox2}  >
              <Text style={MainStyles.contentsText} >Ticket 충전</Text>
              <Text style={MainStyles.contentsText2}>유저에게 티켓 넣어주기</Text>
              <Image style={MainStyles.contentImg2} source={require('../../../assets/contents_img.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('QRCodeScanner')} style={[{ marginTop: 10 * heightScale }, MainStyles.contentsBox2]} >
              <Text style={MainStyles.contentsText} >Ticket 결제</Text>
              <Text style={MainStyles.contentsText2}>QR 스캔으로 티켓 소모</Text>
              <Image style={MainStyles.contentImg3} source={require('../../../assets/contents_img2.png')} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row' }} >
          <View style={{ flex: 1.9 }} >
            <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('MemberManagePage')}  style={MainStyles.contentsBox3} >
              <View>
                <Text style={MainStyles.contentsText} >멤버 관리</Text>
                <Text style={MainStyles.contentsText2}>가입신청 승인/거절/탈퇴</Text>
              </View>
              <Image style={MainStyles.contentImg4} source={require('../../../assets/contents_img3.png')} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1 }} >
            <View style={MainStyles.contentsBox4} >
              <Text style={MainStyles.contentsText} >티켓 관리</Text>
              <Text style={MainStyles.contentsText2}>티켓 기록 </Text>
              <Image style={MainStyles.contentImg5} source={require('../../../assets/contents_img4.png')} />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default MainPageAdmin;
