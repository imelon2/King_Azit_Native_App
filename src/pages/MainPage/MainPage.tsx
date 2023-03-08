import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import { Text, View, Image, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { heightData } from '../../modules/globalStyles';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HomeRootStackParamList } from '../../../AppInner';
import { Shadow } from 'react-native-shadow-2';
import Modal from "react-native-modal";
import Icon from 'react-native-vector-icons/AntDesign';
import Config from 'react-native-config';
import ImageSlider from 'react-native-image-slider';
import MyTickets from './MainPageModal/MyTickets';
import MemberModal from './MainPageModal/MemberModal';
import GuestJoin from './MainPageModal/GuestJoin';
import LinearGradient from 'react-native-linear-gradient';
import { MainStyles } from '../../modules/MainStyles';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import getProfileImage from '../../hooks/getProfileImage';
import getTickets from '../../hooks/getTickets';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';



function MainPage() {
  const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();
  const [gameBox, setGameBox] = useState([1, 2, 3, 4]);
  const [modalStatus, setModalStatus] = useState(false);
  const [tiketModalStatus, setTiketModalStatus] = useState(false);
  const [playMemberStatus, setPlayMemberStatus] = useState(false);
  const [myCard, setMyCard] = useState('');
  const { black, red, gold } = useSelector((state: RootState) => state.ticket);

  const onClickMember = () => {
    setPlayMemberStatus(true);;
  }

  const onClickJoinButton = () => {
    setModalStatus(true);
  }
  // 현재 유저 보유 티켓 가져오기
  getTickets()

  const onOpenMyTikets = (text: any) => {
    setTiketModalStatus(true);
    setMyCard(text);
  }

  getProfileImage()

  return (
    <SafeAreaView style={MainStyles.container} >
      <View style={{ flex: 1 }} >
        {/* <View style={MainStyles.mainTextBox}>
          <Text style={MainStyles.mainText}>Kings Azit</Text>
        </View> */}

        <View style={MainStyles.imgSlideBox2} >
          <View style={MainStyles.imgSlideBox}  >
            <ImageSlider
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
        <View style={MainStyles.mainTextBox2}>
          <Text style={MainStyles.mainText}>My Tikets</Text>
        </View>
        <View style={MainStyles.tiketContainer} >

          <LinearGradient style={MainStyles.groupPosition} locations={[0, 0.38, 0.45, 1]} colors={["#404040", "rgba(10, 10, 10, 0.16)", "rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.74)",]} >
            <TouchableOpacity activeOpacity={1} onPress={() => onOpenMyTikets('Black')}  >
              <Text style={MainStyles.tiketText}>Black Tiket            보유 {black}</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient style={MainStyles.groupPosition} locations={[0.04, 0.4, 0.84]}
            colors={[
              "rgba(79, 0, 0, 0.33)",
              "rgba(67, 19, 19, 0)",
              "rgba(0, 0, 0, 0.33)",
            ]} >
            <TouchableOpacity activeOpacity={1} onPress={() => onOpenMyTikets('Red')}  >
              <Text style={MainStyles.tiketText}>Red Tiket               보유 {red}</Text>
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient style={MainStyles.groupPosition} locations={[0.02, 0.13, 0.32, 1]}
            colors={[
              "rgba(121, 82, 0, 0.2)",
              "rgba(121, 82, 0, 0.2)",
              "rgba(55, 37, 0, 0)",
              "rgba(0, 0, 0, 0.2)",
            ]} >
            <TouchableOpacity activeOpacity={1} onPress={() => onOpenMyTikets('Gold')}  >
              <Text style={MainStyles.tiketText}>Gold Tiket              보유 {gold}</Text>
            </TouchableOpacity>
          </LinearGradient>

        </View>
      </View>

      <Modal isVisible={tiketModalStatus} >
        <MyTickets setTiketModalStatus={setTiketModalStatus} card={myCard} black={black} red={red} gold={gold} />
      </Modal>

      <Modal isVisible={playMemberStatus} >
        <MemberModal setPlayMemberStatus={setPlayMemberStatus} />
      </Modal>

      <View style={{ flex: 1.6 }}>
        <View style={MainStyles.mainTextBox2}>
          <TouchableOpacity activeOpacity={1} >
            <Text style={MainStyles.mainText}>Game</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity activeOpacity={1} style={MainStyles.roomMakeBox}  onPress={() => navigation.navigate('RoomMake')}  >
          <Text style={MainStyles.roomMakeText} >+ 방 만들기</Text>
        </TouchableOpacity>

        <Modal isVisible={modalStatus} style={{ flex: 1 }} >
          <GuestJoin setModalStatus={setModalStatus} />
        </Modal>

        <View style={MainStyles.gameBox} >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false} >
            {gameBox.map((v, key) => (
              <View style={MainStyles.gameContainer} key={key}>
                <Image source={require('../../assets/game_bg.png')} style={MainStyles.gameContainer2} />
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }} >
                  <View style={{ flex: 5 }} >
                    <Text style={MainStyles.tableNumText} >Table NO. 1</Text>
                    <Text style={MainStyles.mainGameText} >Main Game</Text>
                  </View>

                  <View style={{ flex: 2 }}  >
                    <View style={MainStyles.gameStatusBox} ><Text style={MainStyles.gameStatus} >진행중</Text></View>
                    <View><Text style={MainStyles.entryText}>Entry: 16/26</Text></View>
                  </View>
                </View>

                <View style={{ flex: 1 }}>
                  <Text style={MainStyles.tiketBuy} >1 Black Ticket</Text>
                  <Text style={MainStyles.Blind}>Blind 100/200 Ante: 0</Text>
                </View>

                <TouchableOpacity style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end' }} onPress={() => setPlayMemberStatus(true)} activeOpacity={1} >
                  <Image
                    source={require('../../assets/Group_img.png')}
                    style={MainStyles.group_icon}
                  />
                </TouchableOpacity >

                <View style={{ flex: 2, flexDirection: 'row', alignItems: 'flex-end' }}>
                  <Shadow distance={5} offset={[0, 1]} startColor={'#FCFF72'} >
                    <TouchableOpacity onPress={onClickJoinButton} activeOpacity={1} style={MainStyles.joinButton} >
                      <Text style={MainStyles.joinButtonText}>참가하기</Text>
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



export default MainPage;
