import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Config from 'react-native-config';
import ProfileImg from '../../../components/ProfileImg';
import useSocket from '../../../hooks/useSocket';
import {heightScale} from '../../../modules/MainStyles';

interface propsType {
  sitOutInfo: ISitoutInfo;
  setIsSeatOut(id: boolean): void;
}
export interface ISitoutInfo {
  nickname: string;
  uuid: string;
  seatNum: number;
}

const SitoutPopup = (porps: propsType) => {
  const [socket, disconnect] = useSocket();

  const sitout = () => {
    if (socket) {
      socket.emit('sitout', porps.sitOutInfo.seatNum);
      porps.setIsSeatOut(false)
    }
  };
  return (
    <View style={styles.container}>
      <View
        style={styles.content}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <ProfileImg
            style={styles.profileStyle}
            source={Config.IMG_URL! + porps.sitOutInfo.uuid}
          />
          <Text style={styles.nickFontStyle}>
            {porps.sitOutInfo.nickname}
          </Text>
        </View>
        <View style={{marginTop:heightScale*20}}>
            <Text style={styles.infoFontStyle}>위 플레이어를 싯아웃 하겠습니까?</Text>
        </View>

<View style={{flex:1,alignItems:'center',justifyContent:'flex-end',marginBottom:heightScale*8}}>
        <Pressable
          style={[styles.buttonStyle,{backgroundColor: '#F5FF82'}]}
          onPress={() => sitout()}>
          <Text style={{fontSize: 20,fontWeight:"500"}}>seat-out</Text>
        </Pressable>
        <Pressable
          style={[styles.buttonStyle,{
            backgroundColor: 'transparent',
          }]}
          onPress={() => porps.setIsSeatOut(false)}>
          <Text style={{fontSize: heightScale*20,color:'#F5FF82',fontWeight:"500"}}>취소</Text>
        </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(18, 18, 18, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content:{
    width: heightScale * 358,
    height: heightScale * 277,
    backgroundColor: '#353535',
    borderRadius: 20,
    alignItems: 'center',
    paddingTop:heightScale*30
  },
  profileStyle: {width: heightScale*38, height: heightScale*38, borderRadius: 30},
  nickFontStyle: {fontSize: heightScale*20, paddingLeft: heightScale*10,color:'#fff',fontWeight:"500"},
  infoFontStyle: {fontSize: heightScale*18, paddingLeft: heightScale*10,color:'#fff',fontWeight:"500"},
  buttonStyle: {
    width: heightScale*288,
    height: heightScale*60,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:6
  }
});
export default SitoutPopup;
