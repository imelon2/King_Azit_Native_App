import React, {useEffect, useState} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import MyTicketCarousel from '../../components/MyTicketCarousel';
const {width, height} = Dimensions.get('screen');
import {heightData} from '../../modules/globalStyles';
const heightScale = heightData;

const Cards = [
  require('../../assets/RedCard.png'),
  require('../../assets/KingsDaoCard.png'),
  require('../../assets/BlackCard.png'),
];
const DATA = [...Array(Cards.length).keys()].map((_, i) => {
  return {
    key: i,
    image: Cards[i],
  };
});

function MyTicket() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  return (
    <SafeAreaView style={styles.container}>
      <IconAntDesign
        name="left"
        size={heightScale * 28}
        color="#000000"
        style={{
          position: 'absolute',
          marginTop: (heightScale * (61 - 28)) / 2,
          marginLeft: heightScale * 15,
        }}
      />
      <View style={styles.headerStyle}>
        <Text style={styles.fontStyle}>마이 티켓</Text>
      </View>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Image
          style={styles.cardButtonStyle}
          source={require('../../assets/CardButton.png')}
        />
      </View>
      <View style={{marginTop: heightScale * 16}}>
        <MyTicketCarousel
          setPage={setPage}
          data={DATA}
          width={200}
          height={296}
          gap={40}
        />
      </View>
      <Text>{page}</Text>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
  fontStyle: {fontSize: heightScale * 18, fontWeight: 'bold', color: 'black'},
  headerStyle: {
    height: heightScale * 61,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#D9D9D9',
  },
  cardButtonStyle: {
    resizeMode: 'contain',
    width: heightScale * 279,
    height: heightScale * 104,
    top:heightScale*260,
    position:'absolute'
  }
});
export default MyTicket;
