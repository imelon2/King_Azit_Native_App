import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  HomeRootStackParamList,
  MyPageRootStackParamList,
} from '../../../AppInner';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import Modal from "react-native-modal";
import {heightData} from '../../modules/globalStyles';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import TicketsPayModal from './Components/TicketsPayModal';
const heightScale = heightData;

type AdminScreenProps = NativeStackScreenProps<
  HomeRootStackParamList,
  'TicketPay'
>;

function TicketPay({route}: AdminScreenProps) {
  const [isOver, setIsOver] = useState(false);
  const [count, setCount] = useState('');
  const [popUpState, setPopUpState] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const state = !!count && !isOver;

  const {id} = route.params;
  const card = 'Black';
  const maxTicket = 10;
  const navigation =
    useNavigation<
      NavigationProp<MyPageRootStackParamList & HomeRootStackParamList>
    >();

  const onChange = useCallback((text: any) => {
    if (text > maxTicket) {
      setIsOver(true);
    } else {
      setIsOver(false);
    }
    setCount(text.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1'));
  }, []);

  // todo : 티켓 차감 API 연동
  const useTickets = useCallback(() => {
    try {
      Alert.alert('todo:', '티켓 차감 연동');
    } catch (error) {}
  }, [state]);

  const onPopUp = useCallback(() => {
    if (!state) {
      return;
    }
      Keyboard.dismiss();
      setPopUpState(true)
  }, [state]);

  const ticketType = () => {
    if (card == 'Black') {
      return (
        <Image
          style={styles.ticketBox}
          source={require(`../../assets/BlackCard.png`)}
        />
      );
    } else if (card == 'Red') {
      return (
        <Image
          style={styles.ticketBox}
          source={require(`../../assets/RedTiket.png`)}
        />
      );
    } else if (card == 'Gold') {
      return (
        <Image
          style={styles.ticketBox}
          source={require(`../../assets/GoldTiket.png`)}
        />
      );
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <View>
        <View style={styles.headerStyle}>
          <Text style={styles.fontStyle}>티켓결제</Text>
        </View>
        <IconAntDesign
          name="close"
          size={heightScale * 32}
          color="white"
          style={{
            position: 'absolute',
            right: 12,
            top: heightScale * 12,
          }}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={{marginHorizontal: heightScale * 51}}>
        {/* info content */}
        <View style={{flexDirection: 'row', marginTop: heightScale * 50}}>
          {ticketType()}
          <View
            style={{marginTop: heightScale * 35, marginLeft: heightScale * 32}}>
            <Text style={styles.fontStyle2}>한나피쉬님의</Text>
            <Text style={styles.fontStyle2}>블랙티켓을 차감합니다.</Text>
          </View>
        </View>
        {/* textinput */}
        <View style={{flexDirection: 'row', marginTop: heightScale * 50}}>
          <Text style={styles.fontStyle3}>차감 갯수 :</Text>
          <KeyboardAvoidingView style={styles.textInputWrapper}>
            <TextInput
              textAlign="right"
              keyboardType="decimal-pad"
              style={styles.textInputStyle}
              value={count}
              onChangeText={onChange}
              onFocus={() =>setCount('')}
            />
            <Text style={[styles.fontStyle3]}>장</Text>
          </KeyboardAvoidingView>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text
            style={
              isOver ? [styles.fontStyle4, {color: 'red'}] : styles.fontStyle4
            }>
            현재 보유중인 티켓 : {maxTicket}
          </Text>
        </View>
      </View>
    {/* Button */}
      <View style={styles.buttonWrapper}>
        <Pressable
          style={
            state
              ? [styles.buttonStyle, {backgroundColor: '#F5FF82'}]
              : styles.buttonStyle
          }
          onPress={onPopUp}>
          <Text
            style={
              state ? [styles.buttonText, {color: '#000'}] : styles.buttonText
            }>
            차감하기
          </Text>
        </Pressable>
      </View>
      {/* popup page */}
      {popUpState ? (
        <View style={styles.popUpContainer}>
          <View style={styles.popUpComponent}>
            <Text
              style={[styles.fontStyle3, {paddingBottom: heightScale * 22}]}>
              한나피쉬님의
            </Text>
            <Text style={styles.fontStyle3}>
              {count}장의 블랙티켓을 차감하시겠습니까?
            </Text>
            <View
              style={{flexDirection: 'row', flex: 1, alignItems: 'flex-end'}}>
              <Pressable
                onPress={() => setPopUpState(false)}
                style={[styles.popUpButtonStyle,{
                  backgroundColor: '#8A8A8A',
                  marginRight: heightScale * 30,
                }]}>
                <Text style={{color:'#fff',fontSize:heightScale*20}}>아니오</Text>
              </Pressable>
              <Pressable
                style={[styles.popUpButtonStyle,{
                  backgroundColor: '#F5FF82',
                }]} 
                onPress={useTickets}>
                <Text style={{color:'#000',fontSize:heightScale*20}}>네</Text>
              </Pressable>
            </View>
          </View>
        </View>
      ) : (
        <></>
      )}
      {/* Success Pay Modal */}
      <Modal isVisible={modalVisible}>
        <TicketsPayModal/>
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'black',
  },
  fontStyle: {fontSize: heightScale * 18, fontWeight: 'bold', color: 'white'},
  fontStyle2: {
    fontSize: heightScale * 24,
    fontWeight: '400',
    color: 'white',
    paddingBottom: heightScale * 6,
  },
  fontStyle3: {
    fontSize: heightScale * 20,
    fontWeight: '400',
    color: 'white',
  },
  fontStyle4: {
    bottom: heightScale * 3,
    fontSize: heightScale * 12,
    paddingRight: heightScale * 30,
    fontWeight: '400',
    color: '#7B7B7B',
  },
  headerStyle: {
    height: heightScale * 61,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#999999',
  },
  ticketBox: {
    width: 76 * heightScale,
    height: 110 * heightScale,
    borderColor: '#9E9E9E',
    borderWidth: 1,
    overflow: 'hidden',
    borderRadius: 5,
  },
  textInputWrapper: {
    bottom: heightScale * 7,
    flexDirection: 'row',
    width: heightScale * 180,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    justifyContent: 'flex-end',
    marginLeft: heightScale * 64,
    alignItems: 'center',
  },
  textInputStyle: {
    width: heightScale * 150,
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: heightScale * 12,
    fontSize: heightScale * 26,
    color: '#fff',
  },
  buttonWrapper: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: heightScale * 12,
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: heightScale * 390,
    height: heightScale * 64,
    backgroundColor: '#454545',
    borderRadius: 4,
  },
  buttonText: {
    fontSize: heightScale * 20,
    fontWeight: '400',
    color: '#7B7B7B',
  },
  popUpContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(12, 12, 12, 0.8)',
    alignItems: 'center',
  },
  popUpComponent: {
    width: heightScale * 360,
    height: heightScale * 250,
    padding: heightScale * 24,
    backgroundColor: '#353535',
    top: heightScale * 210,
    borderRadius: 20,
    alignItems: 'center',
  },
  popUpButtonStyle : {
    width: heightScale * 145,
    height: heightScale * 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  }
});
export default TicketPay;
