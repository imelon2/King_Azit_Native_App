import {BottomButton} from '@/components';
import {ConvertTicketTypeENtoKR} from '@/modules';
import {FontStyle, GlobalStyles, headerIconSize, heightData, width, widthData} from '@/modules/globalStyles';
import ticketsList, {ticketsListType} from '@/modules/ticketsList';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HomeRootStackParamList} from 'AppInner';
import React, {useRef, useState} from 'react';
import {View, FlatList, Text, Image, Alert, StyleSheet} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

/**
 * @todo Buy-In에 필요한 티켓 정보에 따라 Props 정의 필요
 * @todo 방 참여 기능 구현 필요
 * @param param0
 * @returns
 */
export const TournametInfoPayTicketModal = ({...props}) => {
  const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();
  const {setOnEnterModal} = props;
  const {payInfo} = props;

  let _gap = heightData * 40;
  let _offset = heightData * 60;
  let _width = width - (_gap + _offset) * 2;
  const CARDS = ticketsList('basic').filter(keys => keys.type == payInfo.type);
  const onNFTGuide = () => {
    navigation.navigate('MyTickets', {card: 'gold', count: 0});
    setOnEnterModal(false);
  };

  /**
   * @description Buy-In이 가능한 티켓을 보유중인지 확인하는 함수
   * @returns true/false
   */
  const checkEnoughTicket = () => {
    return CARDS[0].count >= payInfo.amount;
  };
  // Flatlist Focus된 page index 리턴
  // const onViewableItemsChanged = (viewableItems:any) => {
  //   console.log(JSON.stringify(viewableItems));
  // };

  // const viewabilityConfig = {
  //   itemVisiblePercentThreshold: 50, // View에 50% 이상 노출될 경우 실행
  // };

  // const viewabilityConfigCallbackPairs = useRef([
  //   {viewabilityConfig, onViewableItemsChanged},
  // ]);

  return (
    <View style={{flex: 1, justifyContent: 'flex-end'}}>
      <View style={{height: 614 * heightData, backgroundColor: '#353535'}}>
        <View style={{alignItems: 'flex-end'}}>
          <IconAntDesign
            name="close"
            size={headerIconSize}
            color="white"
            style={modalStyle.closeIconStyle}
            onPress={() => setOnEnterModal(false)}
          />
        </View>
        {/* 티켓 스크롤 */}
        <View>
          <FlatList
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            automaticallyAdjustContentInsets={false}
            snapToInterval={_width + _gap}
            snapToAlignment="start"
            decelerationRate="fast"
            bounces={false}
            style={{marginBottom: 9 * heightData}}
            data={CARDS}
            // viewabilityConfigCallbackPairs={
            //   viewabilityConfigCallbackPairs.current
            // }
            contentContainerStyle={{
              paddingHorizontal: _offset + _gap / 2,
            }}
            renderItem={({item}: {item: ticketsListType}) => (
              <View style={{marginHorizontal: _gap / 2, paddingVertical: heightData * 5}}>
                <View style={GlobalStyles.flexCenter}>
                  <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: heightData * 10}}>
                    <Text style={[FontStyle.fs15, FontStyle.fw600]}>{ConvertTicketTypeENtoKR(item.type)} 티켓</Text>
                    <Text style={FontStyle.fs12}> | 보유 {item.count} 개</Text>
                  </View>
                  <Shadow distance={6} startColor={'#616161'} endColor={'rgba(61, 61, 61, 0.6)'}>
                    <Image
                      style={{
                        resizeMode: 'cover',
                        width: _width,
                        height: heightData * 240,
                        borderWidth: 1,
                        borderColor: '#A1A1A1',
                        borderRadius: 7,
                      }}
                      source={item.image}
                    />
                  </Shadow>
                </View>
              </View>
            )}
          />
        </View>
        <View style={{alignItems: 'center', marginTop: 9 * heightData,display: payInfo.isNFT ? 'flex' : 'none'}}>
          <Text style={[FontStyle.fs14, {paddingVertical: 1}]}>Kings Azit` NFT 소지자만</Text>
          <Text style={[FontStyle.fs14, {paddingVertical: 1}]}>참여할 수 있는 토너먼트 입니다.</Text>
          <Text onPress={() => onNFTGuide()} style={[FontStyle.fs14, {paddingVertical: 1, color: '#F5FF82'}]}>
            NFT 획득 가이드 {'>'}
          </Text>
        </View>
        {/* 소모 티켓 수량 */}
        <View style={{alignItems: 'center', marginTop: heightData * 8}}>
          <View style={[modalStyle.useTextWrapper, GlobalStyles.flexCenter]}>
            <Text style={FontStyle.fs12}>소모 : {payInfo.amount}장</Text>
          </View>
        </View>

        {/* 버튼 & 티켓 부족 경고문 */}
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'flex-end', marginBottom: 56 * heightData}}>
          <Text style={[modalStyle.warningText,{ display : checkEnoughTicket() ? 'none' : 'flex'}]}>
            * 보유티켓이 부족합니다. 티켓 충전 후 시도해주세요.
          </Text>
          <BottomButton
            title="참여하기"
            backgroundColor="#808080"
            color="#000"
            onPress={() => Alert.alert('Todo:', '게임 참여 기능 구현')}
          />
        </View>
      </View>
    </View>
  );
};

const modalStyle = StyleSheet.create({
  useTextWrapper: {
    width: 80 * widthData,
    height: 25 * heightData,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F5FF82',
  },
  closeIconStyle: {paddingHorizontal: 20 * heightData, paddingVertical: 20 * heightData},
  warningText:{fontSize: 14, fontWeight: '400', color: 'red', marginBottom: 14 * heightData}
});
