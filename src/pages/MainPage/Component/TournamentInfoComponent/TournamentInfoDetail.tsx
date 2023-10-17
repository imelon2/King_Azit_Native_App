import Rectangle from "@/components/Rectangle";
import { ConvertTicketTypeENtoKR, FontStyle, convert12H, dayOfWeekKR, heightData, widthData } from "@/modules";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';
import IconMaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import { ITournament } from "@/config";

type IProps = {
  gameInfo:ITournament & {roomId: string}
}

/**
 * 
 * @TODO [기획] "Place" Title에 보여줘야하는 기준 미정
 * @TODO [기획] "참여조건" 없으면 어떻게 노출되야는지 기준 기획 필요
 */
export const TournamentInfoDetail = (props:IProps) => {

  const {title,gameStartDate,gameStartTime,deadlineDate,deadlineTime,place,buyinTicketCount,buyinTicketType,detail,prize} = props.gameInfo;

    return (
        <View style={DetailInfoStyle.container}>
          <Text style={[FontStyle.fs20, FontStyle.fw400]}>{title}</Text>
          {/* 시간 정보 */}
          <View style={DetailInfoStyle.componentWrapper}>
            <IconAntDesign name="clockcircleo" size={heightData * 24} color="white" />
            <View style={{marginLeft: widthData * 20}}>
              <Text style={[FontStyle.fs16, FontStyle.fw600, DetailInfoStyle.titleText]}>{dayOfWeekKR(gameStartDate)}요일, {gameStartDate}</Text>
              <Text style={[FontStyle.fs14, FontStyle.fw400, DetailInfoStyle.textPadding]}>
                게임 시작 : {gameStartDate} ({dayOfWeekKR(gameStartDate)}) {convert12H(gameStartTime)}
              </Text>
              <Text style={[FontStyle.fs14, FontStyle.fw400, DetailInfoStyle.textPadding]}>
                레지 마감 : {deadlineDate} ({dayOfWeekKR(deadlineDate)}) {convert12H(deadlineTime)}
              </Text>
            </View>
          </View>
          {/* 장소 */}
          <View style={DetailInfoStyle.componentWrapper}>
            <IconFeather name="map-pin" size={heightData * 24} color="white" />
            <View style={{marginLeft: widthData * 20}}>
              <Text style={[FontStyle.fs16, FontStyle.fw600, DetailInfoStyle.titleText]}>전빌딩 2층</Text>
              <Text style={[FontStyle.fs14, FontStyle.fw400, DetailInfoStyle.textPadding]}>
                {place}
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
              <Text style={[FontStyle.fs14, FontStyle.fw400, DetailInfoStyle.textPadding]}>{ConvertTicketTypeENtoKR(buyinTicketType)}티켓 {buyinTicketCount}장</Text>
              <View style={{marginTop: heightData * 22, flexDirection: 'row'}}>
                <Rectangle
                  type="big"
                  color="#F5FF82"
                  scale={6}
                  componentStyle={{marginRight: 6, marginTop: heightData * 5}}
                />
                <Text style={[FontStyle.fs14, FontStyle.fw400]}>
                  {detail}
                </Text>
              </View>
            </View>
          </View>
          {/* Prize */}
          <View style={DetailInfoStyle.componentWrapper}>
            <IconIonicons name="trophy-outline" size={heightData * 24} color="white" />
            <View style={{marginLeft: widthData * 20}}>
              <Text style={[FontStyle.fs16, FontStyle.fw600, DetailInfoStyle.titleText]}>Prize</Text>
              <Text style={[FontStyle.fs14, FontStyle.fw400, DetailInfoStyle.textPadding]}>{prize} GTD</Text>
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