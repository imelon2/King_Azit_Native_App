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
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HomeRootStackParamList } from '../../../AppInner';
import React, { useEffect, useState } from 'react';
import Modal from 'react-native-modal';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconAntDesign2 from 'react-native-vector-icons/Feather';
import { widthData, heightData } from '../../modules/globalStyles';
const heightScale = heightData;
const { width, height } = Dimensions.get('window');

function GamePage() {
  const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();
  const [modalStatus, setModalStatus] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.headerStyle}>
          <Text style={styles.fontStyle}>게임</Text>
        </View>
        <IconAntDesign
          name="left"
          size={heightScale * 28}
          color="white"
          style={styles.headerIcon}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.contents}>
        <View style={styles.contentsBox}>
          <Image
            source={require('../../assets/table.png')}
            style={styles.mainLogo}
          />

          <View
            style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ alignItems: 'flex-end', flex: 1 }}>
              <View style={{ position: 'absolute',alignItems:'center', top: 25 * heightScale }} >
                <View style={styles.joinIcon}
                  onTouchEnd={() => Alert.alert('Todo :', '자리 정하기 기능')}>
                  <Text style={{ color: '#000', fontSize: 22, fontWeight: '600' }} >+</Text>
                </View>
                <View
                  style={styles.joinText}>
                  <Text></Text>
                </View>
              </View>
            </View>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <View style={styles.joinIcon}
                onTouchEnd={() => Alert.alert('Todo :', '자리 정하기 기능')}>
                <Text style={{ color: '#000', fontSize: 22, fontWeight: '600' }} >+</Text>
              </View>
              <View
                style={styles.joinText}>
                <Text></Text>
              </View>
            </View>
            <View style={{ alignItems: 'flex-start', flex: 1 }}>
              <View style={{ position: 'absolute', top: 25 * heightScale,alignItems:'center' }} >
                <View style={styles.joinIcon}
                  onTouchEnd={() => Alert.alert('Todo :', '자리 정하기 기능')}>
                  <Text style={{ color: '#000', fontSize: 22, fontWeight: '600' }} >+</Text>
                </View>
                <View
                  style={styles.joinText}>
                  <Text></Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{ flex: 1, flexDirection: 'row', paddingHorizontal: heightScale * 35 }}>
            <View style={{ alignItems: 'flex-start', flex: 1 }}>
              <View style={styles.joinIcon}
                onTouchEnd={() => Alert.alert('Todo :', '자리 정하기 기능')}>
                <Text style={{ color: '#000', fontSize: 22, fontWeight: '600' }} >+</Text>
              </View>
              <View
                style={styles.joinText}>
                <Text></Text>
              </View>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ color: '#000', fontWeight: '600' }}>Blinds : Level 2</Text>
              <Text style={{ color: '#000', fontWeight: '600' }}>200/400 Ante: 0</Text>
            </View>
            <View style={{ alignItems: 'flex-end', flex: 1 }}>
              <View style={styles.joinIcon}
                onTouchEnd={() => Alert.alert('Todo :', '자리 정하기 기능')}>
                <Text style={{ color: '#000', fontSize: 22, fontWeight: '600' }} >+</Text>
              </View>
              <View
                style={styles.joinText}>
                <Text></Text>
              </View>
            </View>
          </View>


          <View
            style={{ flex: 1, flexDirection: 'row', paddingHorizontal: heightScale * 15 }}>
            <View style={{ alignItems: 'flex-start', flex: 1 }}>
              <View style={styles.joinIcon}
                onTouchEnd={() => Alert.alert('Todo :', '자리 정하기 기능')}>
                <Text style={{ color: '#000', fontSize: 22, fontWeight: '600' }} >+</Text>
              </View>
              <View
                style={styles.joinText}>
                <Text></Text>
              </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'column' }} >
              <View style={styles.countBox} >
                <Text style={styles.countBoxText} > 00:00:00 </Text>
              </View>
              <View style={styles.restart}>
                <IconAntDesign2
                  name="play"
                  size={heightScale * 22}
                  color="#FCFF72"
                  style={styles.playIcon}
                />
                <Text style={styles.countBoxText} >Restart</Text>
              </View>
            </View>
            <View style={{ alignItems: 'flex-end', flex: 1 }}>
              <View
                style={styles.dealer}>
                <Text style={{ color: '#56FFA7' }}>딜러</Text>
              </View>
            </View>
          </View>

          <View
            style={{ flex: 1, flexDirection: 'row', paddingHorizontal: heightScale * 15 }}>
            <View style={{ alignItems: 'flex-start', flex: 1 }}>
              <View style={styles.joinIcon}
                onTouchEnd={() => Alert.alert('Todo :', '자리 정하기 기능')}>
                <Text style={{ color: '#000', fontSize: 22, fontWeight: '600' }} >+</Text>
              </View>
              <View
                style={styles.joinText}>
                <Text></Text>
              </View>
            </View>
            <View style={{ alignItems: 'flex-end', flex: 1 }}>
              <View style={styles.joinIcon}
                onTouchEnd={() => Alert.alert('Todo :', '자리 정하기 기능')}>
                <Text style={{ color: '#000', fontSize: 22, fontWeight: '600' }} >+</Text>
              </View>
              <View
                style={styles.joinText}>
                <Text></Text>
              </View>
            </View>
          </View>
          <View
            style={{ flex: 1, flexDirection: 'row' }}>
            <View style={{ alignItems: 'flex-end', flex: 1 }}>
              <View style={{ position: 'absolute', top: -25 * heightScale }} >
                <View style={styles.joinIcon}
                  onTouchEnd={() => Alert.alert('Todo :', '자리 정하기 기능')}>
                  <Text style={{ color: '#000', fontSize: 22, fontWeight: '600' }} >+</Text>
                </View>
                <View
                  style={styles.joinText}>
                  <Text></Text>
                </View>
              </View>
            </View>
            <View style={{ alignItems: 'center', flex: 1 }}>
              <View style={styles.joinIcon}
                onTouchEnd={() => Alert.alert('Todo :', '자리 정하기 기능')}>
                <Text style={{ color: '#000', fontSize: 22, fontWeight: '600' }} >+</Text>
              </View>
              <View
                style={styles.joinText}>
                <Text></Text>
              </View>
            </View>
            <View style={{ alignItems: 'flex-start', flex: 1 }}>
              <View style={{ position: 'absolute', top: -25 * heightScale }} >
                <View style={styles.joinIcon}
                  onTouchEnd={() => Alert.alert('Todo :', '자리 정하기 기능')}>
                  <Text style={{ color: '#000', fontSize: 22, fontWeight: '600' }} >+</Text>
                </View>
                <View
                  style={styles.joinText}>
                  <Text></Text>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View style={{ alignItems: 'center',  }} >
          <View style={styles.gameOutButton} >
            <Image style={styles.endButtonImg} source={require('../../assets/Power.png')} />
            <Text  style={styles.endButtonText} >게임 종료</Text>
          </View>
        </View>
      </View>

      <View style={{ alignItems: 'center', flexDirection: 'row' }}>
        <Modal isVisible={modalStatus}>
          <View style={styles.modalBox}>
            <Text style={styles.mainText}>임시 닉네임 설정</Text>
            <TextInput style={styles.textInput} placeholder="입력" />
            <Text style={styles.textsub}>
              설정할 닉네임을 입력해 주세요. (한글, 숫자, 영문2~8자)
            </Text>

            <View style={{ alignItems: 'center' }}>
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
  fontStyle: { fontSize: heightScale * 18, fontWeight: 'bold', color: 'white' },
  headerStyle: {
    height: heightScale * 61,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#484848',
  },
  headerIcon: {
    position: 'absolute',
    marginTop: (heightScale * (61 - 28)) / 2,
    marginLeft: heightScale * 15,
  },
  contents: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: 45 * heightScale,
  },
  contentsBox: {
    width: width,
    height: heightData * 630,
  },
  mainLogo: {
    position: 'absolute',
    width: width,
    height: heightData * 630,
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
    // lineHeight: heightData * 40,
    paddingLeft: 8,
    borderRadius: 3,
    paddingBottom:0,
    paddingTop:0
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
  joinIcon: {
    width: heightScale * 62,
    height: heightScale * 62,
    borderRadius: 100,
    backgroundColor: '#D2D2D2',
    opacity: 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  joinText: {
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
  },
  dealer: {
    width: 62,
    height: 62,
    borderRadius: 100,
    backgroundColor: '#224E38',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#56FFA7',
  },
  countBox: {
    width: 153 * heightScale,
    height: 42 * heightScale,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  countBoxText: {
    fontSize: 18 * heightScale,
    color: '#FCFF72'
  },
  restart: {
    width: 149 * heightScale,
    height: 42 * heightScale,
    backgroundColor: '#000',
    borderRadius: 50,
    marginTop: 18 * heightScale,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    marginRight: 10 * heightScale,
  },
  gameOutButton: {
    width: 133 * heightScale,
    height: 40 * heightScale,
    backgroundColor: '#242424',
    borderRadius: 20,
    borderColor:'white',
    borderWidth:1,
    marginTop : 30 * heightScale,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
  },
  endButtonImg:{
    width: 20 * heightScale,
    height: 20 *heightScale,
    marginRight: 10 *heightScale
  },
  endButtonText:{
    fontSize: 16 *heightScale,
    color:'#fff',
  },

});

export default GamePage;
