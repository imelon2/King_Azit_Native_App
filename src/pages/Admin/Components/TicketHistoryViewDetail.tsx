import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {heightData} from '../../../modules/globalStyles';
import { ConvertSummary, img } from '../../../modules/ticketsList';
import TimeFormat from '../../../modules/TimeFormat'
const heightScale = heightData;

const TicketHistoryViewDetail = ({...props}) => {
  const {type , amount, summary, date} = props.data;

  const _img = () => {
    if (type === 'red') {
      return img['basic'].RedCardImg;
    } else if (type === 'black') {
      return img['basic'].BlackCardImg;
    } else if (type === 'gold') {
      return img['basic'].GoldCardImg;
    }
  };
  
  return (
    <View
      style={{
        height: heightScale * 102,
        flexDirection: 'row',
        paddingVertical: heightScale * 15,
        marginHorizontal:heightScale * 24,
        borderBottomColor:'#3D3D3D',
        borderBottomWidth:1,
      }}>
      <View style ={{justifyContent:'center'}}>
        <Image
          style={{height: heightScale*62, width: heightScale*43, resizeMode: 'contain'}}
          source={_img()}
        />
      </View>
      <View style={{marginLeft:heightScale*30 , justifyContent:'center'}}>
        <Text style={styles.fontStyle}>{ConvertSummary(summary)}</Text>
        <Text style={[styles.fontStyle,{fontSize:14, fontWeight:'400'}]}>{TimeFormat(date)}</Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'flex-end',
          justifyContent:'center'
        }}>
        <Text style={styles.fontStyle}>{amount} 개</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    fontStyle: {
        fontSize:16,
        color : '#fff',
        paddingBottom:heightScale*5,
        fontWeight:'500'
    }
})
export default TicketHistoryViewDetail;
