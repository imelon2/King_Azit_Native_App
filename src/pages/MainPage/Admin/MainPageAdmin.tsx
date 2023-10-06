import React from 'react';
import {
  Text,
  View,
  Image,
  SafeAreaView,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {
  HomeRootStackParamList,
  MyPageRootStackParamList,
} from '../../../../AppInner';
import usePermissions from '../../../hooks/usePermissions';
import {
  FontStyle,
  GlobalStyles,
  heightData,
  widthData,
} from '../../../modules/globalStyles';
import {Banner} from '@/components/Banner';

function MainPageAdmin() {
  const navigation =
    useNavigation<
      NavigationProp<HomeRootStackParamList & MyPageRootStackParamList>
    >();

  usePermissions();
  return (
    <SafeAreaView style={[GlobalStyles.container]}>
      <ScrollView bounces={false}>
        {/* 배너 */}
        <Banner />
        <View
          style={{
            marginTop: 20 * heightData,
            alignItems: 'center',
          }}>
            {/* 상단 버튼 : 생성, 충전, 결제 */}
          <View style={{flexDirection: 'row'}}>
            {/* 토너먼트 생성 및 참여하기 */}
            <Pressable
              onPress={() => navigation.navigate('CreateRoom')}
              style={styles.contentsBox}>
              <Text style={[FontStyle.fs20, FontStyle.fwBold]}>
                토너먼트 생성 및 참여하기
              </Text>
              <Text style={[FontStyle.fs12, styles.textPaddingTop]}>
                새로운 토너먼트 일정 만들기
              </Text>
              {/* <View style={{ alignItems: 'center' }} >
                <Image style={MainStyles.contentImg} source={require('../../../assets/room_make_img.png')} />
              </View> */}
            </Pressable>

            <View>
              {/* Ticket 충전 */}
              <Pressable
                onPress={() => navigation.navigate('TicketCharge')}
                style={styles.contentsBox2}>
                <Text style={[FontStyle.fs20, FontStyle.fwBold]}>
                  Ticket 충전
                </Text>
                <Text style={[FontStyle.fs12, styles.textPaddingTop]}>
                  유저에게 티켓 넣어주기
                </Text>
                {/* <Image
                style={MainStyles.contentImg2}
                source={require('../../../assets/contents_img.png')}
              /> */}
              </Pressable>

              {/* Ticket 결제 */}
              <Pressable
                onPress={() => navigation.navigate('QRCodeScanner')}
                style={[{marginTop: 10 * heightData}, styles.contentsBox2]}>
                <Text style={[FontStyle.fs20, FontStyle.fwBold]}>
                  Ticket 결제
                </Text>
                <Text style={[FontStyle.fs12, styles.textPaddingTop]}>
                  QR 스캔으로 티켓 소모
                </Text>
                {/* <Image
                style={MainStyles.contentImg3}
                source={require('../../../assets/contents_img2.png')}
              /> */}
              </Pressable>
            </View>
          </View>

          {/* 하단 버튼 : 멤버관리, 정산관리 */}
          <View style={{flexDirection: 'row', marginTop: heightData * 6,marginBottom:heightData*20}}>
          {/* 멤버 관리 */}
            <Pressable
              onPress={() => navigation.navigate('MemberManagePage')}
              style={styles.contentsBox3}>
              <View>
                <Text style={[FontStyle.fs20, FontStyle.fwBold]}>
                  멤버 관리
                </Text>
                <Text style={[FontStyle.fs12, styles.textPaddingTop]}>
                  가입신청 승인/거절/탈퇴
                </Text>
              </View>
              {/* <Image
              style={MainStyles.contentImg4}
              source={require('../../../assets/contents_img3.png')}
            /> */}
            </Pressable>
            {/* 정산관리 */}
            <Pressable
              onPress={() => navigation.navigate('CalculatePage')}
              style={styles.contentsBox4}>
              <Text style={[FontStyle.fs20, FontStyle.fwBold]}>정산 관리</Text>
              <Text style={[FontStyle.fs12, styles.textPaddingTop]}>
                티켓 기록{' '}
              </Text>
              {/* <Image
            style={MainStyles.contentImg5}
            source={require('../../../assets/contents_img4.png')}
            /> */}
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  contentsBox: {
    width: 164 * widthData,
    height: 316 * heightData,
    borderRadius: 12,
    backgroundColor: '#272727',
    paddingHorizontal: 10 * heightData,
    paddingTop: 12 * heightData,
    marginHorizontal: 4 * widthData,
  },
  contentsBox2: {
    width: 150 * widthData,
    height: 153 * heightData,
    borderRadius: 12,
    backgroundColor: '#272727',
    paddingHorizontal: 10 * heightData,
    paddingTop: 12 * heightData,
    marginHorizontal: 4 * widthData,
  },
  contentsBox3: {
    width: 200 * widthData,
    height: 100 * heightData,
    borderRadius: 12,
    backgroundColor: '#272727',
    paddingHorizontal: 10 * heightData,
    paddingTop: 12 * heightData,
    marginHorizontal: 4 * widthData,
  },
  contentsBox4: {
    width: 110 * widthData,
    height: 100 * heightData,
    borderRadius: 12,
    backgroundColor: '#272727',
    paddingHorizontal: 10 * heightData,
    paddingTop: 12 * heightData,
    marginHorizontal: 4 * widthData,
  },
  textPaddingTop: {
    paddingTop : heightData * 5
  }
});

export default MainPageAdmin;
