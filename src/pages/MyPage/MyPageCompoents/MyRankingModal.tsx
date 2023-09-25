import {Text, View, Image, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import {heightData} from '../../../modules/globalStyles';
import {useState} from 'react';
const {width, height} = Dimensions.get('window');
import {DatePicker} from 'react-native-wheel-pick';
const heightScale = heightData;

const MyRankingModal = ({...props}) => {
  const [date, setDate] = useState(new Date());

  return (
    <View style={styles.container}>
      <DatePicker
        style={styles.piker}
        minimumDate={new Date('2020-01-01')}
        maximumDate={new Date('2030-12-31')}
        onDateChange={date => {
          setDate(date);
        }}
        textColor="#fff"
        order="M-Y"
        textSize={16}
        selectLineColor="#fff"
        selectLineSize={3}
      />

      <View style={{flexDirection: 'row'}}>
        <TouchableOpacity style={styles.closeButton} onPress={() => props.setModalStatus(false)}>
          <Text style={[styles.textStyle, {color: '#F5FF82'}]}>취소</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.yesButton} onPress={() => props.setModalStatus(false)}>
          <Text style={styles.textStyle}>확인</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    height: 380 * heightScale,
    position: 'absolute',
    left: -20,
    bottom: -20,
    borderRadius: 20,
    backgroundColor: '#373737',
    paddingHorizontal: 20 * heightScale,
    alignItems: 'center',
  },
  piker: {
    height: 240 * heightScale,
    width: 350 * heightScale,
    backgroundColor: '#373737',
    marginTop: 30 * heightScale,
  },
  closeButton: {
    height: 54 * heightScale,
    width: 104 * heightScale,
    // backgroundColor: '#8C8C8C',
    borderRadius: 6,
    marginTop: 20 * heightScale,
    borderColor: '#F5FF82',
    borderWidth: 1 * heightScale,
  },
  yesButton: {
    height: 54 * heightScale,
    width: 196 * heightScale,
    backgroundColor: '#F5FF82',
    borderRadius: 6,
    marginLeft: 10 * heightScale,
    marginTop: 20 * heightScale,
  },
  textStyle: {
    textAlign: 'center',
    lineHeight: 50 * heightScale,
    fontWeight: '400',
    fontSize: 16 * heightScale,
    color: '#000',
  },
});

export default MyRankingModal;
