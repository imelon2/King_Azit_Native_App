import React from 'react';
import {Text, View} from 'react-native';
import {heightData} from '../../../modules/globalStyles'
const heightScale = heightData;

const TicketHistoryView = ({...props}) => {
    // const a = props.data
  return (
    <View
      style={{
        height: heightScale * 60,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#6B6B6B',
        borderBottomWidth: 1,
      }}>
      <View
        style={{
          height: heightScale * 43,
          justifyContent: 'center',
          paddingHorizontal: heightScale * 14,
          borderLeftWidth: 6,
          borderLeftColor: '#6B6B6B',
        }}>
        <Text style={{color: 'white', fontSize: heightScale * 16}}>
          Main Game
        </Text>
        <Text style={{color: 'white', fontSize: heightScale * 12}}>
          2022.02.15
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-end',
          marginRight: heightScale * 10,
        }}>
        <Text style={{color: 'white'}}>3개</Text>
      </View>
    </View>
  );
};

export default TicketHistoryView;
