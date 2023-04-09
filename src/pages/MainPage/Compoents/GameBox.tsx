import { NavigationProp, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {View, Image, Text, TouchableOpacity, Pressable, Modal} from 'react-native';
import Config from 'react-native-config';
import {Shadow} from 'react-native-shadow-2';
import { HomeRootStackParamList } from '../../../../AppInner';
import { roomType } from '../../../hooks/getGameList';
import { StringUpperCase } from '../../../modules/globalStyles';
import {heightScale, MainStyles} from '../../../modules/MainStyles';
import { TicketType } from '../../../modules/ticketsList';


interface propsType {
  item: roomType;
  onClickMember(gameId:string):void;
}

const GameBox = ({item,onClickMember}: propsType) => {
  const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();


  const statusText = () => {
    if(item.status == 'playing') return "진행중"
    if(item.status == 'waiting' || item.status == 'break') return "대기중"
    if(item.status == 'closed') return "마감"
  }
  
  return (
    <>
      <View style={{marginBottom: heightScale * 30}}>
        <View>
          <Image
            style={MainStyles.gameBoxImg}
            source={require('../../../assets/game_bg.png')}
          />
        </View>
        <View style={MainStyles.gameContainer}>
          {/* contents 1 */}
          <View style={{flexDirection: 'row'}}>
            <View>
              <Text style={MainStyles.gameText}>Table No. {item.table_no}</Text>
              <Text style={[MainStyles.gameText, {fontSize: heightScale * 20}]}>
                {item.game_name}
              </Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <View style={MainStyles.gameStateContainer}>
                <View style={MainStyles.gameStateStyle}>
                  <Text style={MainStyles.gameStateText}>{statusText()}</Text>
                </View>
                <Text style={MainStyles.gameStateText}>
                  Entry: {item.entry}/{item.entry_limit}
                </Text>
              </View>
            </View>
          </View>
          {/* contents 2 참가자 아이콘 */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: heightScale * 25,
              flex:1
            }}>
            <View style={{flex:1}}>
              <Text style={MainStyles.gameText}>
                {item.ticket_amount} {StringUpperCase(item.ticket_type)} Ticket
              </Text>
              <Text style={MainStyles.gameText}>
                Blind {item.blind}  Ante:{item.ante}
              </Text>
            </View>
            {/* 플레이어 아이콘 */}
            <Pressable style={MainStyles.gamePlayersContainer} onPress={() => {
              onClickMember(item.game_id)}
          }>
              <View style={{width:heightScale*75,alignItems:'center',justifyContent:'center',flexDirection:'row'}}>
                {Object.keys(item.playing_users).length !== 0 ? (
                  <>
                    <View
                      style={[
                        MainStyles.gamePlayerIcon,
                        {left: 10},
                        Object.keys(item.playing_users)[1] ? {} : {display: 'none'},
                      ]}>
                        <Image style={MainStyles.gamePlayerIconImg} defaultSource={require('../../../assets/UserIcon.png')} source={{uri:Config.IMG_URL!+item.playing_users[Object.keys(item.playing_users)[1]]}} />
                    </View>
                    <View style={[MainStyles.gamePlayerIcon,{left: 5}]}>
                      <Image style={MainStyles.gamePlayerIconImg} defaultSource={require('../../../assets/UserIcon.png')} source={{uri:Config.IMG_URL!+item.playing_users[Object.keys(item.playing_users)[0]]}} />
                    </View>
                  </>
                ) : (
                  <></>
                )}
                <View
                  style={[
                    MainStyles.gamePlayerIcon,
                    {
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                  ]}>
                  <Text style={{color: '#fff', fontWeight: 'bold'}}>
                    +{Object.keys(item.playing_users).length}
                  </Text>
                </View>
              </View>
            </Pressable>
          </View>
          {/* contents 3 참가하기 버튼 */}
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}>
            <Shadow distance={5} offset={[0, 1]} startColor={'#FCFF72'}>
              <TouchableOpacity
                onPress={() => navigation.navigate('GamePage',{gameId:item.game_id})}
                activeOpacity={1}
                style={MainStyles.joinButton}>
                <Text style={MainStyles.joinButtonText}>참가하기</Text>
              </TouchableOpacity>
            </Shadow>
          </View>
        </View>
      </View>
    </>
  );
};

export default GameBox;
