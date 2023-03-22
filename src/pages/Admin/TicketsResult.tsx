import { CommonActions } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import {
    Image,
    StyleSheet,
    Text,
    View,
    Pressable
  } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HomeRootStackParamList } from '../../../AppInner';
import {heightData} from '../../modules/globalStyles';
const heightScale = heightData;

type TicketsResultScreenProps = NativeStackScreenProps<
  HomeRootStackParamList,
  'TicketsResult'
>;
export type ticketsResultType = "pay" | "charge" ;

function TicketsResult({route,navigation}:TicketsResultScreenProps) {
  const {name,tickets,type} = route.params

  // Android 뒤로가기 버튼 컨트롤
  useEffect(() => {
    navigation.addListener('beforeRemove',(e) => {
      e.preventDefault();
      if(e.data.action.type === 'GO_BACK') {
        return
      } else {
        navigation.dispatch(e.data.action)
      }
    })
    return () => {
      navigation.removeListener('beforeRemove',() => {})
    }
  },[navigation])

  const ticketsType = (type:string) => {
    if(type == 'Black') {
      return '블랙티켓'
    } else if (type === 'Red') {
      return '레드카드'
    } else if (type === 'Gold') {
      return '골드카드'
    }
  }

  const resultText = () => {
    if(type === 'pay') {
      return "차감"
    } else if (type === 'charge') {
      return "충전"
    }
  }
    return (
        <SafeAreaView style={styles.container}>
          <View style={{alignItems:'center'}}>
            <Image style={{width:heightScale*335,height:heightScale*250,marginTop:heightScale*122}} source={require('../../assets/OpenCards.png')}/>
          </View>
          <View style={{alignItems:'center'}}>
            <Text style={[styles.fontStyle,{marginBottom:heightScale*40}]}>{name}님의</Text>
            {tickets.map((data,i) => <Text key={i} style={styles.fontStyle}>[{ticketsType(data.type)} {data.counts}장]</Text> )}
            <Text style={styles.fontStyle}>{resultText()} 되었습니다.</Text>
          </View>
          {/* Button */}
          <View style={styles.buttonWrapper}>
          <Pressable
            style={styles.buttonStyle}
            onPress={() => navigation.navigate('Home')}
            >
            <Text
              style={styles.buttonText}>
              확인
            </Text>
          </Pressable>
        </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
      height: '100%',
      backgroundColor: 'black',
    },
    fontStyle: {fontSize: heightScale * 24, fontWeight: 'bold', color: 'white'},
    buttonWrapper: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginBottom: heightScale * 38,
    },
    buttonStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      width: heightScale * 390,
      height: heightScale * 64,
      backgroundColor: '#F5FF82',
      borderRadius: 4,
    },
    buttonText: {
      fontSize: heightScale * 20,
      fontWeight: '400',
      color: '#000',
    },
})
export default TicketsResult;