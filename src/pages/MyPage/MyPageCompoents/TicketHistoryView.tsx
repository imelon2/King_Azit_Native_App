import React from 'react';
import {Text, View} from 'react-native';
import {TimeFormat, ConvertSummary, heightData} from '@/modules';
const heightScale = heightData;

const TicketHistoryView = ({...props}) => {
  const {type, amount, summary, date} = props.data;

  const typeColor = () => {
    if (type === 'red') {
      return '#DA3C3C';
    } else if (type === 'black') {
      return '#6B6B6B';
    } else if (type === 'gold') {
      return '#F5FF82';
    }
  };

  return (
    <View
      style={{
        height: heightScale * 46,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomColor: '#6B6B6B',
        borderBottomWidth: 1,
      }}>
      <View
        style={{
          height: heightScale * 36,
          justifyContent: 'center',
          paddingHorizontal: heightScale * 14,
          borderLeftWidth: 6,
          borderLeftColor: typeColor(),
          borderRadius: 1.5,
        }}>
        <Text style={{color: 'white', fontSize: heightScale * 14}}>{ConvertSummary(summary)}</Text>
        <Text style={{color: '#777777', fontSize: heightScale * 11}}>{TimeFormat(date)}</Text>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-end',
          marginRight: heightScale * 10,
        }}>
        <Text style={{color: 'white', fontSize: heightScale * 12}}>{-amount}개</Text>
      </View>
    </View>
  );
};

export default TicketHistoryView;
