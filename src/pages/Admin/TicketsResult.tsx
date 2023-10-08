import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import {Image, StyleSheet, Text, View, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {HomeRootStackParamList} from 'AppInner';
import {heightData, widthData} from '@/modules';
import {TicketType} from '@/config';
const heightScale = heightData;

type TicketsResultScreenProps = NativeStackScreenProps<HomeRootStackParamList, 'TicketsResult'>;
export type ticketsResultType = 'pay' | 'charge' | 'gift';

function TicketsResult({route, navigation}: TicketsResultScreenProps) {
  const {name, tickets, type} = route.params;

  // Android 뒤로가기 버튼 컨트롤
  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();
      if (e.data.action.type === 'GO_BACK') {
        return;
      } else {
        navigation.dispatch(e.data.action);
      }
    });
    return () => {
      navigation.removeListener('beforeRemove', () => {});
    };
  }, [navigation]);

  const ticketsType = (type: TicketType) => {
    if (type == 'black') {
      return '블랙티켓';
    } else if (type === 'red') {
      return '레드티켓';
    } else if (type === 'gold') {
      return '골드티켓';
    }
  };

  const resultText = () => {
    if (type === 'pay') {
      return (
        <>
          <Text style={[styles.fontStyle, {marginBottom: heightScale * 40}]}>{name}님의</Text>
          {tickets.map((data, i) => (
            <Text key={i} style={styles.fontStyle}>
              [{ticketsType(data.type)} {data.counts}장]
            </Text>
          ))}
          <Text style={styles.fontStyle}>차감 되었습니다.</Text>
        </>
      );
    } else if (type === 'charge') {
      return (
        <>
          <Text style={[styles.fontStyle, {marginBottom: heightScale * 40}]}>{name}님에게</Text>
          {tickets.map((data, i) => (
            <Text key={i} style={styles.fontStyle}>
              [{ticketsType(data.type)} {data.counts}장]
            </Text>
          ))}
          <Text style={styles.fontStyle}>충전 되었습니다.</Text>
        </>
      );
    } else if (type === 'gift') {
      return (
        <>
          <Text style={[styles.fontStyle, {marginBottom: heightScale * 40}]}>{name}님에게</Text>
          {tickets.map((data, i) => (
            <Text key={i} style={styles.fontStyle2}>
              [{ticketsType(data.type)} {data.counts}장]
            </Text>
          ))}
          <Text style={styles.fontStyle2}>선물 하였습니다.</Text>
        </>
      );
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{alignItems: 'center', marginTop: heightScale * 330}}>
        <Text style={[styles.fontStyle, {marginBottom: heightScale * 12}]}>선물하기 완료!</Text>
        {resultText()}
      </View>
      {/* Button */}
      <View style={styles.buttonWrapper}>
        <Pressable style={styles.buttonStyle} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.buttonText}>확인</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'black',
  },
  fontStyle: {fontSize: heightScale * 22, fontWeight: 'bold', color: 'white'},
  fontStyle2: {
    fontSize: heightScale * 20,
    color: 'white',
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: widthData * 360,
    height: heightScale * 70,
    backgroundColor: '#F5FF82',
    borderRadius: 4,
  },
  buttonText: {
    fontSize: heightScale * 20,
    fontWeight: '400',
    color: '#000',
  },
});
export default TicketsResult;
