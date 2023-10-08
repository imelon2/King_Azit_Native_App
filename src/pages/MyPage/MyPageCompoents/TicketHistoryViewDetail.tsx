import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ConvertSummary, TimeFormat, heightData, widthData} from '@/modules';
import {Ticket_Img} from '@/config';

const heightScale = heightData;

const TicketHistoryViewDetail = ({...props}) => {
  const {type, amount, summary, date} = props.data;

  const _img = () => {
    if (type === 'red') {
      return Ticket_Img['basic'].RedCardImg;
    } else if (type === 'black') {
      return Ticket_Img['basic'].BlackCardImg;
    } else if (type === 'gold') {
      return Ticket_Img['basic'].GoldCardImg;
    }
  };
  return (
    <View
      style={{
        height: heightScale * 85,
        flexDirection: 'row',
        paddingVertical: heightScale * 10,
        marginHorizontal: widthData * 20,
        borderBottomColor: '#3D3D3D',
        borderBottomWidth: 1,
      }}>
      <View style={{justifyContent: 'center'}}>
        <Image
          style={{
            borderWidth: 1,
            borderColor: '#A1A1A1',
            borderRadius: 3,
            height: heightScale * 48,
            width: widthData * 32,
            resizeMode: 'contain',
          }}
          source={_img()}
        />
      </View>
      <View style={{marginLeft: heightScale * 30, paddingVertical: heightScale * 10}}>
        <Text style={[styles.fontStyle, {fontWeight: '600'}]}>{ConvertSummary(summary)}</Text>
        <Text style={[styles.fontStyle, {fontSize: 12}]}>{TimeFormat(date)}</Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'flex-end',
          paddingVertical: heightScale * 10,
        }}>
        <Text style={styles.fontStyle}>{-amount} 개</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  fontStyle: {
    fontSize: 14,
    color: '#fff',
    paddingBottom: heightScale * 7,
  },
});
export default TicketHistoryViewDetail;
