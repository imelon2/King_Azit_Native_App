import React from 'react';
import {Text, View} from 'react-native';
import {heightData} from '../../../modules/globalStyles'
const heightScale = heightData;

const TicketHistoryView = ({...props}) => {
  const {type, count, content, date} = props.data;

  const typeColor = () => {
    if(type === 'red') {
        return "#DA3C3C"
    } else if (type === 'black') {
        return "#6B6B6B"
    } else if (type === 'gold') {
        return "#F5FF82"
    }
  }

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
          borderLeftColor: typeColor(),
        }}>
        <Text style={{color: 'white', fontSize: heightScale * 16}}>
          {content}
        </Text>
        <Text style={{color: 'white', fontSize: heightScale * 12}}>
          {date}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-end',
          marginRight: heightScale * 10,
        }}>
        <Text style={{color: 'white'}}>{count}개</Text>
      </View>
    </View>
  );
};

export default TicketHistoryView;
