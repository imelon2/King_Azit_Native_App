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
  Keyboard,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  HomeRootStackParamList,
  MyPageRootStackParamList,
} from '../../../AppInner';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {heightData} from '../../modules/globalStyles';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {useHeaderHeight} from '@react-navigation/elements';
import { img } from '../../modules/ticketsList';
import axios from 'axios';
import Config from 'react-native-config';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';
const heightScale = heightData;
type AdminScreenProps = NativeStackScreenProps<
  HomeRootStackParamList,
  'TicketPay'
>;

function TicketPay({route}: AdminScreenProps) {
  const {access_token} = useSelector((state: RootState) => state.user);
  const [loading,setLoading ] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [count, setCount] = useState("");
  const [ticketName, setTicketName] = useState('');
  const [ticketImgUrl, setTicketImgUrl] = useState<any>();
  const [popUpState, setPopUpState] = useState(false);
  const headerHeight = useHeaderHeight();
  const {uuid,memberId,type,max} = route.params;
  const state = !!count && !isOver;


  const navigation =
    useNavigation<
      NavigationProp<MyPageRootStackParamList & HomeRootStackParamList>
    >();

  useEffect(() => {
    if (type == 'black') {
      setTicketName('블랙티켓')
      setTicketImgUrl(img['basic'].BlackCardImg)
    } else if (type == 'red') {
      setTicketName('레드티켓')
      setTicketImgUrl(img['basic'].RedCardImg)
    } else if (type == 'gold') {
      setTicketName('골드티켓')
      setTicketImgUrl(img['basic'].GoldCardImg)
    }
  },[])

  const onChange = useCallback((text: any) => {
    if (text > max) {
      setIsOver(true);
    } else {
      setIsOver(false);
    }
    setCount(text.replace(/[^0-9]/g, '').replace(/(\..*)\./g, '$1'));
  }, []);

  const useTickets = useCallback(async() => {
    try {
      setLoading(true)
      await axios.put(
        `${Config.API_URL}/admin/usetickets`,
        {
            "uuid": uuid,
            "type": type,
            "amount": count,
            "usage":"qr"
          },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );
      navigation.navigate('TicketsResult',{name:memberId,type:'pay',tickets:[{type:type,counts:Number(count)}]})
    } catch (error) {
      Alert.alert('Error', '내부 문제로 티켓 충전이 취소됬습니다.\n' + error);
    } finally {
        setLoading(false);
    }
  }, [state]);

  const onPopUp = useCallback(() => {
    if (!state) {
      return;
    }
    Keyboard.dismiss();
    setPopUpState(true);
  }, [state]);


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
      <KeyboardAvoidingView
        style={{marginHorizontal: heightScale * 51, flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={headerHeight}>
        {/* info content */}
        <View style={{flexDirection: 'row', marginTop: heightScale * 50}}>
          <Image
            style={styles.ticketBox}
            source={ticketImgUrl}
          />
          <View
            style={{marginTop: heightScale * 35, marginLeft: heightScale * 32}}>
            <Text style={styles.fontStyle2}>{memberId}님의</Text>
            <Text style={styles.fontStyle2}>{ticketName}을 차감합니다.</Text>
          </View>
        </View>
        {/* textinput */}
        <View
          style={{
            flexDirection: 'row',
            marginTop: heightScale * 50,
            paddingHorizontal: heightScale * 15,
          }}>
          <Text style={styles.fontStyle3}>차감 갯수 :</Text>
          <View style={{flex: 1, alignItems: 'flex-end'}}>
            <View style={styles.textInputWrapper}>
              <TextInput
                textAlign="right"
                keyboardType="numeric"
                style={styles.textInputStyle}
                value={count}
                onChangeText={onChange}
                onFocus={() => setCount('')}
                returnKeyType={'done'}
              />
              <Text style={[styles.fontStyle3]}>장</Text>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Text
                style={
                  isOver
                    ? [styles.fontStyle4, {color: 'red'}]
                    : styles.fontStyle4
                }>
                현재 보유중인 티켓 : {max}
              </Text>
            </View>
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
      </KeyboardAvoidingView>
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
                style={[
                  styles.popUpButtonStyle,
                  {
                    backgroundColor: '#8A8A8A',
                    marginRight: heightScale * 30,
                  },
                ]}>
                <Text style={{color: '#fff', fontSize: heightScale * 20}}>
                  아니오
                </Text>
              </Pressable>
              <Pressable
                style={[
                  styles.popUpButtonStyle,
                  {
                    backgroundColor: '#F5FF82',
                  },
                ]}
                onPress={useTickets}
                disabled={loading}
                >
                  {loading ? <ActivityIndicator /> : <Text style={{color: '#000', fontSize: heightScale * 20}}>
                  네
                </Text>}
              </Pressable>
            </View>
          </View>
        </View>
      ) : (<></>)}
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
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
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
  popUpButtonStyle: {
    width: heightScale * 145,
    height: heightScale * 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
});
export default TicketPay;
