import React from 'react';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import {Shadow} from 'react-native-shadow-2';
import {heightScale, MainStyles} from '../../../modules/MainStyles';

export type roomType = {
    game_id: string;
    table_no: number;
    game_name: string;
    blind: string;
    ante: number | string;
    ticket_type: string;
    status: string;
    playing_users: string[];
    sitout_users: string[];
    dealer_id: string;
    entry: string;
  };

const GameBox = ({item}:{item:roomType}) => {
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
                  <Text style={MainStyles.gameStateText}>{item.status}</Text>
                </View>
                <Text style={MainStyles.gameStateText}>Entry: 16/25</Text>
              </View>
            </View>
          </View>
          {/* contents 2 */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: heightScale * 25,
            }}>
            <View>
              <Text style={MainStyles.gameText}>1 {item.ticket_type}</Text>
              <Text style={MainStyles.gameText}>Blind {item.blind} Ante:{item.ante}</Text>
            </View>
            <View style={MainStyles.gamePlayersContainer}>
              <View style={[MainStyles.gamePlayerIcon, {left: 10}]}></View>
              <View style={[MainStyles.gamePlayerIcon, {left: 5}]}></View>
              <View
                style={[
                  MainStyles.gamePlayerIcon,
                  {
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}>
                <Text style={{color: '#fff', fontWeight: 'bold'}}>+6</Text>
              </View>
            </View>
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
                // onPress={onClickJoinButton}
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
