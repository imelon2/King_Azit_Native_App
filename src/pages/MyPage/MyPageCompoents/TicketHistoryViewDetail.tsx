import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {heightData} from '../../../modules/globalStyles';
import {
  RedCardImg,
  BlackCardImg,
  GoldCardImg,
} from '../../../modules/ticketsList';

const heightScale = heightData;

const TicketHistoryViewDetail = ({...props}) => {
  const {type, count, content, date} = props.data;

  const img = () => {
    if(type === 'red') {
        return RedCardImg
    } else if (type === 'black') {
        return BlackCardImg
    } else if (type === 'gold') {
        return GoldCardImg
    }
  }
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
          style={{height: heightScale*70, width: heightScale*50, resizeMode: 'contain'}}
          source={img()}
        />
      </View>
      <View style={{marginLeft:heightScale*30}}>
        <Text style={styles.fontStyle}>{content}</Text>
        <Text style={[styles.fontStyle,{fontSize:14}]}>{date}</Text>
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'flex-end',
        }}>
        <Text style={styles.fontStyle}>{count} 개</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    fontStyle: {
        fontSize:16,
        color : '#fff',
        paddingBottom:heightScale*7
    }
})
export default TicketHistoryViewDetail;
