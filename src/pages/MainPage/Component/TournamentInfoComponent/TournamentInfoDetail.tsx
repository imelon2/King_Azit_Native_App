import Rectangle from "@/components/Rectangle";
import { FontStyle, heightData, widthData } from "@/modules";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIonicons from 'react-native-vector-icons/Ionicons';

/**
 * @Todo Props로 토너먼트 Detail 정보 가져오기
 */
export const TournamentInfoDetail = () => {
    return (
        <View style={DetailInfoStyle.container}>
          <Text style={[FontStyle.fs20, FontStyle.fw400]}>[NFT Holder Main Event]</Text>
          {/* 시간 정보 */}
          <View style={DetailInfoStyle.componentWrapper}>
            <IconAntDesign name="clockcircleo" size={heightData * 24} color="white" />
            <View style={{marginLeft: widthData * 20}}>
              <Text style={[FontStyle.fs16, FontStyle.fw600, DetailInfoStyle.titleText]}>일요일, 2023. 05. 21</Text>
              <Text style={[FontStyle.fs14, FontStyle.fw400, DetailInfoStyle.textPadding]}>
                게임 시작 : 2023. 05. 21 (일) 7:00 PM
              </Text>
              <Text style={[FontStyle.fs14, FontStyle.fw400, DetailInfoStyle.textPadding]}>
                레지 마감 : 2023. 05. 21 (일) 9:00 PM
              </Text>
            </View>
          </View>
          {/* 장소 */}
          <View style={DetailInfoStyle.componentWrapper}>
            <IconFeather name="map-pin" size={heightData * 24} color="white" />
            <View style={{marginLeft: widthData * 20}}>
              <Text style={[FontStyle.fs16, FontStyle.fw600, DetailInfoStyle.titleText]}>전빌딩 2층</Text>
              <Text style={[FontStyle.fs14, FontStyle.fw400, DetailInfoStyle.textPadding]}>
                서울시 서초구 서래마을 서래로 28 전빌딩 2층
              </Text>
            </View>
          </View>
          {/* 참여조건 */}
          <View style={DetailInfoStyle.componentWrapper}>
            <IconMaterialCommunityIcons name="poker-chip" size={heightData * 24} color="white" />
            <View style={{marginLeft: widthData * 20}}>
              <Text style={[FontStyle.fs16, FontStyle.fw600, DetailInfoStyle.titleText]}>참여 조건</Text>
              <Text style={[FontStyle.fs14, FontStyle.fw400, DetailInfoStyle.textPadding]}>Kings’ Azit NFT Holder </Text>
              <Text style={[FontStyle.fs16, FontStyle.fw600, DetailInfoStyle.titleText, {marginTop: heightData * 22}]}>
                바이인
              </Text>
              <Text style={[FontStyle.fs14, FontStyle.fw400, DetailInfoStyle.textPadding]}>블랙티켓 2장</Text>
              <View style={{marginTop: heightData * 22, flexDirection: 'row'}}>
                <Rectangle
                  type="big"
                  color="#F5FF82"
                  scale={6}
                  componentStyle={{marginRight: 6, marginTop: heightData * 5}}
                />
                <Text style={[FontStyle.fs14, FontStyle.fw400]}>
                  {'스타팅 칩: 30,000 / 리바인: 40,000 /\n애드온: 10,000'}
                </Text>
              </View>
            </View>
          </View>
          {/* Prize */}
          <View style={DetailInfoStyle.componentWrapper}>
            <IconIonicons name="trophy-outline" size={heightData * 24} color="white" />
            <View style={{marginLeft: widthData * 20}}>
              <Text style={[FontStyle.fs16, FontStyle.fw600, DetailInfoStyle.titleText]}>Prize</Text>
              <Text style={[FontStyle.fs14, FontStyle.fw400, DetailInfoStyle.textPadding]}>150,000,000 GTD</Text>
            </View>
          </View>
        </View>
      ); 
}

const DetailInfoStyle = StyleSheet.create({
    container: {
      paddingLeft: widthData * 20,
      marginTop: heightData * 28,
      flex: 1,
    },
    componentWrapper: {
      flexDirection: 'row',
      marginTop: heightData * 22,
    },
    titleText: {
      color: '#F5FF82',
    },
    textPadding: {
      paddingTop: 4,
    },
  });