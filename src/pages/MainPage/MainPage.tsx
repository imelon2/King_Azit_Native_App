import {createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useRef, useState} from 'react';
import {  Text , View , Image , StyleSheet} from 'react-native';
import {widthData, heightData} from '../../modules/globalStyles';
const heightScale = heightData;


function MainPage() {
  return (
    <View style={styles.container} > 
        <View style={{ flex : 1 }} >
          <View style={styles.mainTextBox}>
            <Text style={styles.mainText}>Kings Azit</Text>
          </View>
            {/* <Image
              source={require('../../assets/KingsAzit.png')}
              style={styles.azitText}
            /> */}
          <View style={styles.imgSlideBoxContainer} >
            <View style={styles.imgSlideBox} ></View>
          </View>
        </View>

        <View style={{ flex : 1 }}>
          <View style={styles.mainTextBox2}>
              <Text style={styles.mainText}>My Tikets</Text>
          </View>
          <View style={styles.tiketContainer} >
            <View style={[styles.tiketBox]} >
            {/* style={[styles.tiketBox ,styles.tiketBoxColor ]} */}
              <Text style={styles.tiketText}>블랙티켓</Text>
            </View>

            <View style={[styles.tiketBox,styles.tiketBoxColor]} >
            {/* style={[styles.tiketBox ,styles.tiketBoxColor ]} */}
              <Text style={styles.tiketText}>레드티켓</Text>
            </View>

            <View style={[styles.tiketBox,styles.tiketBoxColor2]} >
              <Text style={styles.tiketText}>블랙티켓</Text>
            </View>

          </View>
        </View>

        <View style={{ flex : 1.6 , backgroundColor: "yellow"}}>
        </View>
    </View>
  );
}


const styles = StyleSheet.create({
  azitText: {
    flex: 1,
    aspectRatio: 1.5,
    resizeMode: 'contain',
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  mainTextBox: {
    flex: 1,
    marginTop: heightScale * 20,
    marginLeft: heightScale * 18,
  },
  mainTextBox2: {
    flex:1,
    marginLeft: heightScale * 18,
  },
  mainText: {
    fontWeight: 'bold',
    fontSize: heightScale * 15
  },
  imgSlideBoxContainer: {
    flex:4,
    paddingHorizontal: heightScale * 18,
  },
  imgSlideBox: {
    width:'100%',
    height: heightScale *120,
    backgroundColor: '#C4C4C4',
    borderRadius:heightScale * 20,
  },
  tiketContainer: {
    flex:10,
    paddingTop: heightScale * 14, // 12나와야함
    paddingHorizontal: heightScale * 18,
  },
  tiketBox:{
    width:'100%',
    height: heightScale * 46,
    backgroundColor:'#484848',
    // borderWidth: 1 ,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  tiketBoxColor:{
    backgroundColor:'#656565'
  },
  tiketBoxColor2:{
    backgroundColor:'#9A9A9A'
  },
  tiketText: {
    fontSize: heightScale * 13,
    color:'white',
    lineHeight:heightScale * 46,
    marginLeft: heightScale*14,
  }

})

export default MainPage;
