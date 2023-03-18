import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {heightData} from '../../../modules/globalStyles';

const heightScale = heightData;

const TicketHistoryViewDetail = ({...props}) => {
  const {id , count, content, date} = props.data;

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
          source={require('../../..//assets/black_ticket.png')}
        />
      </View>
      <View style={{marginLeft:heightScale*30 , justifyContent:'center'}}>
        <Text style={styles.fontStyle}>Admin: {id}</Text>
        <Text style={[styles.fontStyle,{fontSize:14, fontWeight:'400'}]}>{date}</Text>
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
        paddingBottom:heightScale*5,
        fontWeight:'500'
    }
})
export default TicketHistoryViewDetail;
