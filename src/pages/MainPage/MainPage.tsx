import {  NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import {  heightData } from '../../modules/globalStyles';
import { Shadow } from 'react-native-shadow-2';
import Modal from "react-native-modal";
const { width } = Dimensions.get('window');
import Icon from 'react-native-vector-icons/AntDesign';
import ImageSlider from 'react-native-image-slider';
import { RootStackParamList } from '../../../AppInner';
import MyTickets from '../../components/MyTickets';
import MemberModal from './MemberModal';
import LinearGradient from 'react-native-linear-gradient';

const heightScale = heightData;
type MainScreenProps = NativeStackScreenProps< RootStackParamList , 'MainPage' >;



function MainPage({navigation}: MainScreenProps) {
  const [check, setcheck] = useState(false);
  const [gameTap, setGameTap] = useState('main');
  const [gameBox, setGameBox] = useState([1, 2, 3, , 4]);
  const [modalStatus, setModalStatus] = useState(false);
  const [tiketModalStatus , setTiketModalStatus] = useState(false);
  const [playMemberStatus , setPlayMemberStatus] = useState(false);
  
  const onClickMember = () => {
    setPlayMemberStatus(true);;
  }

  const onClickCheckBox = () => {
    setcheck(!check);
  };

  const guJoinButton = () => {
    if (!check) {
      return;
    } 
    navigation.navigate('GamePage');
  }

  const onClickJoinButton = () => {
    if(gameTap == 'guest' ) {
      setModalStatus(true);
    }
  }

  return (
    <SafeAreaView style={styles.container} >
      <View style={{ flex: 1 }} >
        <View style={styles.mainTextBox}>
          <Text style={styles.mainText}>Kings Azit</Text>
        </View>

        <View style={styles.imgSlideBoxContainer} >
          <View style={styles.imgSlideBox} >
            <ImageSlider
              autoplay
              circleLoop
              resizeMethod={'resize'}
              resizeMode={'cover'}
              images={[
                "https://source.unsplash.com/1024x768/?nature",
                "https://source.unsplash.com/1024x768/?water",
                "https://source.unsplash.com/1024x768/?girl",
                "https://source.unsplash.com/1024x768/?tree",
              ]}
            />
          </View>
        </View>

      </View>

      <View style={{ flex: 1 }}>
        <View style={styles.mainTextBox2}>
          <Text style={styles.mainText}>My Tikets</Text>
        </View>
        <View style={styles.tiketContainer} >
          <LinearGradient   locations={[0.04, 0.4, 0.84]} colors={[ "rgba(79, 0, 0, 0.33)", "rgba(67, 19, 19, 0)", "rgba(0, 0, 0, 0.33)",]} >
            <TouchableOpacity activeOpacity={1} onPress={() => setTiketModalStatus(true)} style={[styles.tiketBox]} >
              <Text style={styles.tiketText}>블랙티켓   보유 8</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient colors={[ '#431313', '#4F0000',  '#000000']} >
            <TouchableOpacity activeOpacity={1} onPress={() => setTiketModalStatus(true)} style={[styles.tiketBox]} >
              <Text style={styles.tiketText}>레드티켓   보유 8</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient colors={['#795200', '#372500', '#000000']} >
            <TouchableOpacity activeOpacity={1} onPress={() => setTiketModalStatus(true)} style={[styles.tiketBox]} >
              <Text style={styles.tiketText}>블랙티켓   보유 8</Text>
            </TouchableOpacity>
          </LinearGradient>

        </View>
      </View>

      <Modal isVisible={tiketModalStatus} >
        <MyTickets setTiketModalStatus={setTiketModalStatus} />
      </Modal>

      <Modal isVisible={playMemberStatus} >
        <MemberModal setPlayMemberStatus={setPlayMemberStatus} />
      </Modal>

      <View style={{ flex: 1.6 }}>
        <View style={styles.mainTextBox2}>
          <TouchableOpacity activeOpacity={1} onPress={() => setGameTap('main')} >
            <Text style={gameTap == 'main' ? styles.mainText2 : [styles.mainText ,styles.mainText3 ]}>Game</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={1}  onPress={() => setGameTap('guest')} >
            <Text style={gameTap == 'guest' ? styles.mainText2 : [styles.mainText ,styles.mainText3 ]}>Guest</Text>
          </TouchableOpacity>
        </View>

        <Modal isVisible={modalStatus} style={{ flex: 1 }} >
          <View style={styles.modalbox} >
            <View style={{ flex: 1, alignItems: 'flex-end' }} >
              <Icon onPress={() => setModalStatus(false)} name="close" size={30} color="#000" style={styles.closeButton} ></Icon>
            </View>
            <View style={{ flex: 7, alignItems: 'center'  }} >
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}>
                
                  <View  style={[styles.cardBox, styles.cardBox2]} >
                    <View style={{ flexDirection: 'row' }} >
                      <Text style={styles.cardText} >Black Card</Text>
                      <Text style={styles.cardText2}>  | 보유 8 개</Text>
                    </View>
                    <Shadow distance={6} startColor={'#0003'} offset={[0, 11]} >
                      <View style={styles.card} >
                        <View style={styles.cardColor}></View>
                      </View>
                    </Shadow>
                    <Text style={styles.useText} >소모 1장</Text> 
                  </View>
                

                <View style={[styles.cardBox]}    >
                  <View style={{ flexDirection: 'row' }} >
                    <Text style={styles.cardText} >Red Card</Text>
                    <Text style={styles.cardText2}>  | 보유 8 개</Text>
                  </View>
                  <Shadow distance={6} startColor={'#0003'} offset={[0, 11]} >
                    <View style={styles.card} >
                      <View style={styles.cardColor2}></View>
                    </View>
                  </Shadow>
                  <Text style={styles.useText} >소모 5장</Text> 
                </View>

                <View style={[styles.cardBox, styles.cardBox3]} >
                  <View style={{ flexDirection: 'row' }} >
                    <Text style={styles.cardText} >Gold Card</Text>
                    <Text style={styles.cardText2}>  | 보유 8 개</Text>
                  </View>
                  <Shadow distance={6} startColor={'#0003'} offset={[0, 11]} >
                    <View style={styles.card} >
                      <View style={styles.cardColor3}></View>
                    </View>
                  </Shadow>
                  <Text style={styles.useText} >소모 1장</Text> 
                </View>

              </ScrollView>
              <TouchableOpacity onPress={onClickCheckBox} activeOpacity={1} style={{ flex: 1 , flexDirection: 'row' }} >
                <Icon
                  name="checksquareo"
                  size={30}
                  color={check ? '#000' : '#848484'}
                />
                <Text style={styles.checkText} >For Guest Player</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flex: 2.5 , alignItems: 'center'  }} >
              <TouchableOpacity onPress={guJoinButton} activeOpacity={1} style={ check ? styles.gujoinButton2 : styles.gujoinButton } >
                <Text style={styles.gujoinButtonText} > 참가하기 </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={styles.gameBox} >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false} >
            {gameBox.map((v, key) => (
              <View style={styles.gameContainer} key={key}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }} >
                  <View style={{ flex: 5 }} >
                    <Text style={styles.tableNumText} >Table NO. 1</Text>
                    <Text style={styles.mainGameText} >Main Game</Text>
                  </View>

                  <View style={{ flex: 2 }}  >
                    <View style={styles.gameStatusBox} ><Text style={styles.gameStatus} >진행중</Text></View>
                    <View><Text style={styles.entryText}>Entry: 16/26</Text></View>
                  </View>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={styles.tiketBuy} >1 Black Ticket</Text>
                  <Text style={styles.Blind}>Blind 100/200 Ante: 0</Text>
                </View>


                  <TouchableOpacity style={{flex: 1, flexDirection: 'row', alignItems: 'flex-end'}} onPress={() => setPlayMemberStatus(true)} activeOpacity={1} >
                    <Image
                      source={require('../../assets/Group_img.png')}
                      style={styles.group_icon}
                    />
                  </TouchableOpacity >


                <View style={{ flex: 2, flexDirection: 'row', alignItems: 'flex-end' }}>
                  <Shadow distance={6} startColor={'#FCFF72'} >
                    <TouchableOpacity onPress={onClickJoinButton} activeOpacity={1} style={styles.joinButton} >
                      <Text style={styles.joinButtonText}>참가하기</Text>
                    </TouchableOpacity>
                  </Shadow>
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
    backgroundColor: '#191919',
    flex: 1,
  },
  mainTextBox: {
    flex: 1,
    marginTop: heightScale * 20,
    marginLeft: heightScale * 18,
  },
  mainTextBox2: {
    flex: 1,
    marginLeft: heightScale * 18,
    flexDirection: 'row',
  },
  mainText: {
    fontWeight: 'bold',
    fontSize: heightScale * 15,
    marginRight: 20,
    color: 'white',
  },
  mainText2: {
    fontWeight: 'bold',
    fontSize: heightScale * 15,
    marginRight: 20,
    color: 'white',
    textDecorationLine: 'underline'
  },
  mainText3: {
    color:'#aaa',
  },
  textBorder: {
    position: 'absolute',
    bottom: 0,
    borderBottomWidth: 2,
    borderColor: '#C4C4C4',
  },
  imgSlideBoxContainer: {
    flex: 4,
    paddingHorizontal: heightScale * 18,
  },
  imgSlideBox: {
    width: '100%',
    height: heightScale * 120,
    backgroundColor: '#C4C4C4',
    borderRadius: heightScale * 20,
  },
  tiketContainer: {
    flex: 10,
    paddingTop: heightScale * 14, // 12나와야함
    paddingHorizontal: heightScale * 18,
  },
  tiketBox: {
    width: '100%',
    height: heightScale * 46,
    // backgroundColor: '#484848',
    marginTop: 2,
    // borderWidth: 1 ,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2,
  },
  tiketBoxColor: {
    backgroundColor: '#656565'
  },
  tiketBoxColor2: {
    backgroundColor: '#9A9A9A'
  },
  tiketText: {
    fontSize: heightScale * 13,
    color: 'white',
    lineHeight: heightScale * 46,
    marginLeft: heightScale * 14,
  },
  gameBox: {
    flex: 7,
  },
  gameContainer: {
    width: heightScale * 230,
    height: heightScale * 254,
    borderRadius: 6,
    backgroundColor: '#3A3A3A',
    marginLeft: heightScale * 20,
    paddingHorizontal: heightScale * 16,
  },
  tableNumText: {
    color: 'white',
    fontSize: heightScale * 10
  },
  mainGameText: {
    fontSize: heightScale * 20,
    color: 'white',
  },
  gameStatus: {
    textAlign: 'center',
    fontSize: heightScale * 10,
    color: 'white'
  },
  entryText: {
    fontSize: heightScale * 10,
    color: 'white'
  },
  gameStatusBox: {
    backgroundColor: 'green',
    borderRadius: 18,
    textAlign: 'center',
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginBottom: 3,
    marginLeft: 3,
  },
  tiketBuy: {
    color: 'white',
    fontSize: heightScale * 15,
    marginTop: heightScale * 12,
    fontWeight: '500',
  },
  Blind: {
    color: 'white',
    fontSize: heightScale * 13,
    fontWeight: '300',
  },
  group_icon: {
    height: heightScale * 30,
    resizeMode: 'contain',
    position: 'absolute',
    left: -10,
  },
  joinButtonText: {
    textAlign: 'center',
    lineHeight: heightScale * 40,
    fontWeight: '500',
    color: '#000',
  },
  joinButton: {
    width: heightScale * 200,
    height: heightScale * 40,
    backgroundColor: '#F5FF82',
    borderRadius: 4,
    marginBottom: heightScale * 16,
    // backgroundColor: "#ffffff",
    shadowColor: "#FFB800",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalbox: {
    height: heightScale * 680,
    backgroundColor: '#C5C5C5',
    borderTopRightRadius: heightScale * 30,
    borderTopLeftRadius: heightScale * 30,
    width: width,
    position: 'absolute',
    bottom: -20,
    left: -20,
  },
  closeButton: {
    marginTop: heightScale * 15,
    marginRight: heightScale * 15,
  },
  cardText: {
    color: '#000',
    textAlign: 'center',
    fontSize: heightScale * 18,
    fontWeight: '600',
    marginBottom: heightScale * 5,
  },
  cardText2: {
    color: '#888',
    textAlign: 'center',
    fontSize: heightScale * 17,
    fontWeight: '400',
    marginBottom: heightScale * 5,
  },
  card: {
    width: heightScale * 210,
    height: heightScale * 260,
    backgroundColor: 'white',
    marginTop: heightScale * 10,
    borderRadius: 10,
    alignItems: 'center',

  },
  cardBox: {
    flex: 3.6,
    width: heightScale * 240,
    marginRight: 20,
    alignItems: 'center',
  },
  cardBox2: {
    marginLeft: heightScale * 90
  },
  cardBox3: {
    marginRight: heightScale * 90
  },
  cardColor: {
    width: heightScale * 200,
    backgroundColor: 'black',
    height: heightScale * 250,
    marginTop: heightScale * 5,
    borderRadius: 10,
  },
  cardColor2: {
    width: heightScale * 200,
    backgroundColor: 'red',
    height: heightScale * 250,
    marginTop: heightScale * 5,
    borderRadius: 10,
  },
  cardColor3: {
    width: heightScale * 200,
    backgroundColor: 'yellow',
    height: heightScale * 250,
    marginTop: heightScale * 5,
    borderRadius: 10,
  },
  checkText: {
    marginLeft:10,
    color:'#000',
    fontSize: 17 * heightScale,
    marginTop: 5,
  },
  useText: {
    marginTop: 20 * heightScale,
    color:'#000',
    width: 100 * heightScale,
    height: 30 * heightScale,
    lineHeight: 30 * heightScale,
    backgroundColor: '#D9D9D9',
    textAlign:'center',
    borderRadius: 20,
  },
  gujoinButton: {
    width: heightScale * 250,
    height: heightScale * 60,
    backgroundColor: '#656565',
    borderRadius: 6,
    marginTop: heightScale * 50,
  },
  gujoinButton2: {
    width: heightScale * 250,
    height: heightScale * 60,
    backgroundColor: '#2C2A2A',
    borderRadius: 6,
    marginTop: heightScale * 50,
  },
  gujoinButtonText: {
    textAlign:'center',
    lineHeight: heightScale * 60,
    color:'white',
    fontSize: heightScale * 20,
  },


  groupChildPosition1: {
    // top: 394,
    shadowOpacity: 1,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTopRightRadius: 6,
    borderTopLeftRadius: 6,
    // height: 42,
    // width: 390,
    // left: 39,
    // position: "absolute",
  },
  groupChildShadowBox: {
    elevation: 4,
    shadowRadius: 4,
    shadowColor: "rgba(0, 0, 0, 0.25)",
    backgroundColor: "transparent",
  },

})

export default MainPage;
