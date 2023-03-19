import React, { useState } from 'react';
import {View, Image, Text, TouchableOpacity, Pressable, Modal} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {heightScale, MainStyles} from '../../../modules/MainStyles';
import { TicketType } from '../../../modules/ticketsList';

type playerType = {
  id : string;
  uuid : string;
  profile:string;
}

export type roomType = {
  game_id: string;
  table_no: number;
  game_name: string;
  blind: string;
  ante: number | string;
  ticket_type: TicketType;
  ticket_amount: number;
  status: string;
  playing_users: playerType[];
  sitout_users: playerType[];
  dealer_id: string;
  entry_limit: number;
  entry: string;
};

interface propsType {
  item: roomType;
  onClickJoinButton(item: roomType): void;
  onClickMember():void;
}

const GameBox = ({item,onClickJoinButton,onClickMember}: propsType) => {
  return (
    <>
      <View style={{marginBottom: heightScale * 30}}>
        <View>
          <Image
            style={MainStyles.gameBoxImg}
            source={require('../../../assets/Game_bg.png')}
          />
        </View>
        <View style={MainStyles.gameContainer}>
          {/* contents 1 */}
          <View style={{flexDirection: 'row'}}>
            <View>
              <Text style={MainStyles.gameText}>Table No. {item.table_no}</Text>
              <Text style={[MainStyles.gameText, {fontSize: heightScale * 20}]}>
                {item.game_name} Game
              </Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-end'}}>
              <View style={MainStyles.gameStateContainer}>
                <View style={MainStyles.gameStateStyle}>
                  <Text style={MainStyles.gameStateText}>{item.status}</Text>
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
            }}>
            <View>
              <Text style={MainStyles.gameText}>
                {item.ticket_amount} {item.ticket_type} Ticket
              </Text>
              <Text style={MainStyles.gameText}>
                Blind {item.blind} Ante:{item.ante}
              </Text>
            </View>
            {/* 플레이어 아이콘 */}
            <Pressable style={MainStyles.gamePlayersContainer} onPress={() => onClickMember()}>
              <View style={{width:heightScale*75,alignItems:'center'}}>
                {item.playing_users.length != 0 ? (
                  <>
                    <View
                      style={[
                        MainStyles.gamePlayerIcon,
                        {left: 10},
                        item.playing_users[1] ? {} : {display: 'none'},
                      ]}>
                      {/* <Image /> // item.playing_users[1] */}
                    </View>
                    <View style={[MainStyles.gamePlayerIcon, {left: 5}]}>
                      {/* <Image /> // item.playing_users[0] */}
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
                    +{item.playing_users.length}
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
                onPress={() => onClickJoinButton(item)}
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
