import {useCallback, useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Pressable,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {StringUpperCase} from '../../../modules/globalStyles';
import Modal from 'react-native-modal';
import {RootState} from '../../../store/reducer';
import {useSelector} from 'react-redux';
import {heightScale} from '../../../modules/MainStyles';
import {UserInformationType} from '../UserInformation';
const {width, height} = Dimensions.get('window');

function TicketManagement({userInfo}: {userInfo: UserInformationType}) {
  const {red, black, gold} = useSelector((state: RootState) => state.ticket);
  const [modalStatus, setModalStatus] = useState(false);
  const [alretModalStatus, setAlretModalStatus] = useState(false);
  const [step, setStep] = useState(0);
  const [selectTicket, setSelectTicket] = useState('');
  const [count, setCount] = useState(0);
  const [select, setSelect] = useState('');
  const [selectCount, setSelectCount] = useState(0);
  const canAdd = count === 0 ? true : false;
  const canMius = count === selectCount ? true : false;

  useEffect(() => {
    // Todo : 사용자 티켓 가져오기
  }, []);

  // Todo : 사용자 티켓 차감
  const minusUserTicket = useCallback(() => {}, [selectTicket, count]);

  const onClickButton = (text: string) => {
    if (text == 'black') setSelectCount(black);
    if (text == 'gold') setSelectCount(gold);
    if (text == 'red') setSelectCount(red);

    setSelectTicket(text);
    setModalStatus(true);
  };

  const nextStep = () => {
    setStep(2);
    setAlretModalStatus(true);
  };

  const onClickClose = () => {
    setAlretModalStatus(false);
    setModalStatus(false);
    setCount(0);
    setStep(0);
  };

  return (
    <View style={{marginTop: 70 * heightScale}}>
      <View style={{flexDirection: 'row', marginBottom: 64 * heightScale}}>
        <Image
          style={styles.ticketImg}
          source={require('../../../assets/BlackTicket.png')}
        />
        <View
          style={{
            width: 160 * heightScale,
            height: 76 * heightScale,
            justifyContent: 'center',
            marginLeft: 20 * heightScale,
          }}>
          <Text style={styles.fontStyle}>{black} Black Ticket</Text>
        </View>
        <View style={{height: 76 * heightScale, justifyContent: 'center'}}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.buttonStyle}
            onPress={() => onClickButton('black')}>
            <Text style={styles.fontStyle2}>차감</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flexDirection: 'row', marginBottom: 64 * heightScale}}>
        <Image
          style={styles.ticketImg}
          source={require('../../../assets/RedTicket.png')}
        />
        <View
          style={{
            width: 160 * heightScale,
            height: 76 * heightScale,
            justifyContent: 'center',
            marginLeft: 20 * heightScale,
          }}>
          <Text style={styles.fontStyle}>{red} Red Ticket</Text>
        </View>
        <View style={{height: 76 * heightScale, justifyContent: 'center'}}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.buttonStyle}
            onPress={() => onClickButton('red')}>
            <Text style={styles.fontStyle2}>차감</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Image
          style={styles.ticketImg}
          source={require('../../../assets/GoldTicket.png')}
        />
        <View
          style={{
            width: 160 * heightScale,
            height: 76 * heightScale,
            justifyContent: 'center',
            marginLeft: 20 * heightScale,
          }}>
          <Text style={styles.fontStyle}>{gold} Gold Ticket</Text>
        </View>
        <View style={{height: 76 * heightScale, justifyContent: 'center'}}>
          <TouchableOpacity
            activeOpacity={1}
            style={styles.buttonStyle}
            onPress={() => onClickButton('gold')}>
            <Text style={styles.fontStyle2}>차감</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal isVisible={modalStatus} onBackdropPress={() => onClickClose()}>
        <View style={styles.container}>
          {step == 0 && (
            <>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'flex-end',
                  paddingLeft: 40 * heightScale,
                }}>
                <Text style={styles.fontStyle3}>
                  {StringUpperCase(selectTicket)} Ticket
                </Text>
                <Text style={styles.fontStyle4}>몇장을 차감 하시겠습니까?</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <View style={styles.countBox}>
                  {/* minus */}
                  <Pressable
                    style={[
                      styles.countButtonStyle,
                      {borderRightWidth: 1, borderRightColor: '#F5FF82'},
                    ]}
                    onPress={() => setCount(count - 1)}
                    disabled={canAdd}>
                    <IconAntDesign
                      size={heightScale * 24}
                      name="minus"
                      color={canAdd ? '#787878' : '#FFFFFF'}
                    />
                  </Pressable>
                  {/* count */}
                  <View
                    style={{
                      flex: 1.4,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{fontSize: heightScale * 18, color: '#ffffff'}}>
                      {count}
                    </Text>
                  </View>
                  {/* plus */}
                  <Pressable
                    style={[
                      styles.countButtonStyle,
                      {borderLeftWidth: 1, borderLeftColor: '#F5FF82'},
                    ]}
                    disabled={canMius}
                    onPress={() => setCount(count + 1)}>
                    <IconAntDesign
                      size={heightScale * 24}
                      name="plus"
                      color={canMius ? '#787878' : '#FFFFFF'}
                    />
                  </Pressable>
                </View>
              </View>
            </>
          )}

          {step == 1 && (
            <View
              style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
              <Text style={styles.fontStyle5}>{userInfo.nickname}님의</Text>
              <Text style={[{marginTop: 8 * heightScale}, styles.fontStyle5]}>
                {count}장의 {StringUpperCase(selectTicket)} Ticket을 차감
                하시겠습니까?
              </Text>
            </View>
          )}

          {step == 0 && (
            <TouchableOpacity
              activeOpacity={1}
              onPress={() => setStep(1)}
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <View
                style={[styles.buttonStyle2, count > 0 && styles.buttonStyle3]}>
                <Text
                  style={[styles.buttonText, count > 0 && styles.buttonText2]}>
                  차감하기
                </Text>
              </View>
            </TouchableOpacity>
          )}

          {step == 1 && (
            <View
              style={{
                flex: 1,
                width: 390 * heightScale,
                flexDirection: 'row',
                paddingHorizontal: 24 * heightScale,
              }}>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => onClickClose()}
                style={styles.buttonStyle4}>
                <Text style={styles.fontStyle5}>아니요</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => nextStep()}
                style={styles.buttonStyle5}>
                <Text style={styles.fontStyle6}>네</Text>
              </TouchableOpacity>
            </View>
          )}

          {step == 2 && (
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
              <Text
                style={[styles.fontStyle5, {paddingBottom: heightScale * 15}]}>
                한나피쉬님의
              </Text>
              <Text style={styles.fontStyle5}>
                {count}장의 블랙티켓을 차감되었습니다
              </Text>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => onClickClose()}
                style={styles.buttonStyle6}>
                <Text style={styles.fontStyle6}>확인</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: width,
    height: 454 * heightScale,
    left: -heightScale * 22,
    bottom: -20 * heightScale,
    position: 'absolute',
    backgroundColor: '#373737',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  ticketImg: {
    width: 54 * heightScale,
    height: 76 * heightScale,
    borderRadius: 4,
    borderWidth: 0.3,
    borderColor: '#D9D9D9',
    marginLeft: 23 * heightScale,
  },
  fontStyle: {
    color: 'white',
    fontSize: 16 * heightScale,
  },
  fontStyle2: {
    color: 'black',
    fontSize: 18 * heightScale,
  },
  fontStyle3: {
    color: 'white',
    fontSize: 24 * heightScale,
    fontWeight: '600',
  },
  fontStyle4: {
    color: 'white',
    fontSize: 24 * heightScale,
    marginTop: 5 * heightScale,
  },
  fontStyle5: {
    color: 'white',
    fontSize: 20 * heightScale,
  },
  fontStyle6: {
    color: 'black',
    fontSize: 20 * heightScale,
  },
  buttonStyle: {
    marginLeft: 40 * heightScale,
    width: 100 * heightScale,
    height: 46 * heightScale,
    backgroundColor: '#F5FF82',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle2: {
    width: 390 * heightScale,
    height: 64 * heightScale,
    backgroundColor: '#454545',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle3: {
    backgroundColor: '#F5FF82',
  },
  buttonStyle4: {
    width: 172 * heightScale,
    height: 64 * heightScale,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8A8A8A',
    marginRight: 36 * heightScale,
  },
  buttonStyle5: {
    width: 172 * heightScale,
    height: 64 * heightScale,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5ff82',
  },
  buttonStyle6: {
    width: 320 * heightScale,
    height: 60 * heightScale,
    backgroundColor: '#F5FF82',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 60 * heightScale,
  },
  buttonText: {
    color: '#7B7B7B',
    fontSize: 20 * heightScale,
    fontWeight: '500',
  },
  buttonText2: {
    color: 'black',
    fontSize: 20 * heightScale,
    fontWeight: '500',
  },
  countButtonStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countBox: {
    height: heightScale * 56,
    width: heightScale * 300,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#F5FF82',
    borderRadius: 4,
  },
  popupContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(18, 18, 18, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default TicketManagement;
