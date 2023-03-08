import {
  Text,
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  TextInput,
  Alert,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HomeRootStackParamList} from '../../../AppInner';
import React, {useEffect, useState} from 'react';
import Modal from 'react-native-modal';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {widthData, heightData} from '../../modules/globalStyles';
const heightScale = heightData;
const {width, height} = Dimensions.get('window');

function GamePage() {
  const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();
  const [modalStatus, setModalStatus] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
        {/* header */}
      <View>
        <View style={styles.headerStyle}>
          <Text style={styles.fontStyle}>게임</Text>
        </View>
        <IconAntDesign
          name="left"
          size={heightScale * 28}
          color="white"
          style={{
            position: 'absolute',
            marginTop: (heightScale * (61 - 28)) / 2,
            marginLeft: heightScale * 15,
          }}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.contents}>
        {/* table */}
        <View style={{justifyContent: 'center', position: 'absolute'}}>
          <Image
            source={require('../../assets/table.png')}
            style={styles.mainLogo}
          />
        </View>
        {/* center */}
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#fff'}}>Blinds : Level 2</Text>
          <Text style={{color: '#fff'}}>200/400 Ante: 0</Text>
        </View>
        {/* 플레이어 */}
          <View
            style={{flexDirection: 'row', paddingHorizontal: heightScale * 10}}>
            <View style={{alignItems: 'flex-start', flex: 1}}>
              <View style={{alignItems: 'center'}}>
                <View
                  style={{
                    width: heightScale * 62,
                    height: heightScale * 62,
                    borderRadius: 100,
                    backgroundColor: '#D2D2D2',
                    opacity: 0.6,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#000',
                  }}
                  onTouchEnd={() => Alert.alert('Todo :','자리 정하기 기능')}
                  >
                  <Text>+</Text>
                </View>
                <View
                  style={{
                    width: heightScale * 66,
                    height: heightScale * 23,
                    backgroundColor: '#D2D2D2',
                    opacity: 0.8,
                    bottom: heightScale * 10,
                    borderRadius: 23,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#000',
                  }}>
                  <Text>최원혁이</Text>
                </View>
              </View>
            </View>
            <View style={{alignItems: 'flex-end', flex: 1}}>
              <View
                style={{
                  width: 62,
                  height: 62,
                  borderRadius: 100,
                  backgroundColor: '#224E38',
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: '#56FFA7',
                }}>
                <Text style={{color: '#56FFA7'}}>딜러</Text>
              </View>
            </View>
          </View>
        </View>

      <View style={{alignItems: 'center', flexDirection: 'row'}}>
        <Modal isVisible={modalStatus}>
          <View style={styles.modalBox}>
            <Text style={styles.mainText}>임시 닉네임 설정</Text>
            <TextInput style={styles.textInput} placeholder="입력" />
            <Text style={styles.textsub}>
              {' '}
              설정할 닉네임을 입력해 주세요. (한글, 숫자, 영문2~8자){' '}
            </Text>

            <View style={{alignItems: 'center'}}>
              <View style={styles.buttonBox}>
                <TouchableOpacity activeOpacity={1} style={styles.button}>
                  <Text style={styles.buttonText}> 중복확인 </Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={styles.button}>
                  <Text style={styles.buttonText}> 확인 </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'black',
  },
  fontStyle: {fontSize: heightScale * 18, fontWeight: 'bold', color: 'white'},
  headerStyle: {
    height: heightScale * 61,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#484848',
  },
  contents: {
    flex: 1,
    //   backgroundColor:'orange',
    justifyContent: 'center',
  },
  mainLogo: {
    // backgroundColor:'gray',
    width: width,
    height: heightData * 650,
  },
  modalBox: {
    width: width - 80,
    height: heightData * 220,
    backgroundColor: '#C5C5C5',
    borderRadius: 15,
    position: 'absolute',
    top: 160,
    left: 20,
    alignItems: 'center',
  },
  mainText: {
    color: '#000',
    fontWeight: '600',
    fontSize: heightData * 18,
    textAlign: 'center',
    marginTop: heightData * 12,
    marginBottom: heightData * 18,
  },
  textInput: {
    width: heightData * 280,
    height: heightData * 40,
    backgroundColor: '#D9D9D9',
    lineHeight: heightData * 40,
    paddingLeft: 8,
    borderRadius: 3,
  },
  textsub: {
    color: '#000',
    fontSize: heightData * 11,
    marginTop: heightData * 9,
  },
  buttonBox: {
    width: heightData * 280,
    flexDirection: 'row',
    marginTop: heightData * 40,
    alignItems: 'center',
  },
  button: {
    width: heightData * 120,
    height: heightData * 45,
    backgroundColor: '#2C2A2A',
    borderRadius: 4,
    marginLeft: heightData * 13,
  },
  buttonText: {
    lineHeight: heightData * 45,
    color: 'white',
    textAlign: 'center',
    fontSize: heightData * 15,
  },
});

export default GamePage;
