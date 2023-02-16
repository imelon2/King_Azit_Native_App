import {createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useRef, useState} from 'react';
import {  Text , View , Image , StyleSheet, ScrollView , SafeAreaView} from 'react-native';
import {widthData, heightData} from '../../modules/globalStyles';
const heightScale = heightData;


function MainPage() {
  const [ gameBox , setGameBox ] = useState([ 1, 2, 3, 4]);

  return (
    <SafeAreaView style={styles.container} > 
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

        <View style={{ flex : 1.6}}>
          <View style={styles.mainTextBox2}>
              <Text style={styles.mainText}>Game</Text>
          </View>

          <View style={styles.gameBox} >
            <ScrollView horizontal={true} >
            
            {gameBox.map((v,i) => ( 
              <View key={i} style={styles.gameContainer}>
                <View style={{ flex: 1  ,  flexDirection: 'row' , alignItems:'flex-end' }} >
                  <View style={{ flex: 5  }} >
                    <Text style={styles.tableNumText} >Table NO. 1</Text>
                    <Text style={styles.mainGameText} >Main Game</Text>
                  </View>

                  <View style={{ flex: 2 }}  >   
                    <View style={styles.gameStatusBox} ><Text style={styles.gameStatus} >진행중</Text></View>
                    <View><Text style={styles.entryText}>Entry: 16/26</Text></View>
                  </View>
                </View>

                <View style={{ flex: 1  }}>
                  <Text style={styles.tiketBuy} >1 Black Ticket</Text>
                  <Text style={styles.Blind}>Blind 100/200 Ante: 0</Text>
                </View>

                <View style={{ flex: 1 ,  flexDirection: 'row' , alignItems:'flex-end' }}>
                  <Image
                    source={require('../../assets/Group_img.png')}
                    style={styles.group_icon}
                  />
                </View>

                <View style={{ flex: 2 ,  flexDirection: 'row' , alignItems:'flex-end'  }}>
                  <View style={styles.joinButton} >
                    <Text style={styles.joinButtonText}>참가하기</Text>
                  </View>
                </View>
              </View>
              ))}
            </ScrollView>
          </View>
        </View>
    </SafeAreaView>
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
    marginTop:2,
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
  },
  gameBox: {
    flex: 7,
  },
  gameContainer: {
    width:heightScale*230,
    height:heightScale*254,
    borderRadius:6,
    backgroundColor:'#3A3A3A',
    marginLeft:heightScale*20,
    paddingHorizontal:heightScale*16,
  },
  tableNumText:{
    color:'white',
    fontSize:heightScale * 10
  },
  mainGameText: {
    fontSize:heightScale * 20,
    color:'white',
  },
  gameStatus: {
    textAlign:'center',
    fontSize: heightScale * 10,
    color:'white'
  },
  entryText: {
    fontSize: heightScale * 10,
    color:'white'
  },
  gameStatusBox: {
    backgroundColor:'green',
    borderRadius: 18,
    textAlign:'center',
    paddingHorizontal:5,
    paddingVertical:2,
    marginBottom:3,
    marginLeft:3,
  },
  tiketBuy: {
    color:'white',
    fontSize: heightScale * 15,
    marginTop: heightScale * 12,
    fontWeight:'500',
  },
  Blind: {
    color:'white',
    fontSize: heightScale * 13,
    fontWeight:'300',
  },
  group_icon: {
    height: heightScale * 30,
    resizeMode:'contain',
    position:'absolute',
    left:-10,
  },
  joinButtonText: {
    textAlign:'center',
    lineHeight: heightScale*40,
    fontWeight: '700',
  },
  joinButton:{
    width: heightScale*200,
    height: heightScale*40,
    backgroundColor:'#F5FF82',
    borderRadius:4,
    marginBottom: heightScale*16,
  },
})

export default MainPage;
