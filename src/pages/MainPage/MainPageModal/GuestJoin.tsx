import { Text, View, Image, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { heightData } from '../../../modules/globalStyles';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { HomeRootStackParamList } from '../../../../AppInner';
import Icon from 'react-native-vector-icons/AntDesign';
import { Shadow } from 'react-native-shadow-2';
import React, { useState } from 'react';
const { width, height } = Dimensions.get('window');
const heightScale = heightData;

interface propsType {
    setModalStatus(id: boolean): void
}

function GuestJoin(props: propsType) {
  const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();
  const [check, setcheck] = useState(false);

    const onClickCheckBox = () => {
      setcheck(!check);
    };

    const guJoinButton = () => {
      if (!check) {
        return;
      }
      props.setModalStatus(false)
      navigation.navigate('GamePage');
    }

    return (
        <View style={styles.modalbox} >
        <View style={{ flex: 1, alignItems: 'flex-end' }} >
          <Icon onPress={() => props.setModalStatus(false)} name="close" size={30} color="#000" style={styles.closeButton} ></Icon>
        </View>
        <View style={{ flex: 7, alignItems: 'center' }} >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}>

            <View style={[styles.cardBox, styles.cardBox2]} >
              <View style={{ flexDirection: 'row' }} >
                <Text style={styles.cardText} >Black Card</Text>
                <Text style={styles.cardText2}>  | 보유 8 개</Text>
              </View>
              <Shadow distance={6} startColor={'#0003'} offset={[0, 11]} >
                <View style={styles.card} >
                  <View style={styles.cardColor}></View>
                </View>
              </Shadow>
              <Text style={styles.useText} >소모 1장</Text>
            </View>


            <View style={[styles.cardBox]}    >
              <View style={{ flexDirection: 'row' }} >
                <Text style={styles.cardText} >Red Card</Text>
                <Text style={styles.cardText2}>  | 보유 8 개</Text>
              </View>
              <Shadow distance={6} startColor={'#0003'} offset={[0, 11]} >
                <View style={styles.card} >
                  <View style={styles.cardColor2}></View>
                </View>
              </Shadow>
              <Text style={styles.useText} >소모 5장</Text>
            </View>

            <View style={[styles.cardBox, styles.cardBox3]} >
              <View style={{ flexDirection: 'row' }} >
                <Text style={styles.cardText} >Gold Card</Text>
                <Text style={styles.cardText2}>  | 보유 8 개</Text>
              </View>
              <Shadow distance={6} startColor={'#0003'} offset={[0, 11]} >
                <View style={styles.card} >
                  <View style={styles.cardColor3}></View>
                </View>
              </Shadow>
              <Text style={styles.useText} >소모 1장</Text>
            </View>

          </ScrollView>
          <TouchableOpacity onPress={onClickCheckBox} activeOpacity={1} style={{ flex: 1, flexDirection: 'row' }} >
            <Icon
              name="checksquareo"
              size={30}
              color={check ? '#000' : '#848484'}
            />
            <Text style={styles.checkText} >For Guest Player</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 2.5, alignItems: 'center' }} >
          <TouchableOpacity onPress={guJoinButton} activeOpacity={1} style={check ? styles.gujoinButton2 : styles.gujoinButton} >
            <Text style={styles.gujoinButtonText} > 참가하기 </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
    modalbox: {
        height: heightScale * 680,
        backgroundColor: '#C5C5C5',
        borderTopRightRadius: heightScale * 30,
        borderTopLeftRadius: heightScale * 30,
        width: width,
        position: 'absolute',
        bottom: -20,
        left: -20,
      },
      closeButton: {
        marginTop: heightScale * 15,
        marginRight: heightScale * 15,
      },

      cardText: {
        color: '#000',
        textAlign: 'center',
        fontSize: heightScale * 18,
        fontWeight: '600',
        marginBottom: heightScale * 5,
      },
      cardText2: {
        color: '#888',
        textAlign: 'center',
        fontSize: heightScale * 17,
        fontWeight: '400',
        marginBottom: heightScale * 5,
      },
      card: {
        width: heightScale * 210,
        height: heightScale * 260,
        backgroundColor: 'white',
        marginTop: heightScale * 10,
        borderRadius: 10,
        alignItems: 'center',
    
      },
      cardBox: {
        flex: 3.6,
        width: heightScale * 240,
        marginRight: 20,
        alignItems: 'center',
      },
      cardBox2: {
        marginLeft: heightScale * 90
      },
      cardBox3: {
        marginRight: heightScale * 90
      },
      cardColor: {
        width: heightScale * 200,
        backgroundColor: 'black',
        height: heightScale * 250,
        marginTop: heightScale * 5,
        borderRadius: 10,
      },
      cardColor2: {
        width: heightScale * 200,
        backgroundColor: 'red',
        height: heightScale * 250,
        marginTop: heightScale * 5,
        borderRadius: 10,
      },
      cardColor3: {
        width: heightScale * 200,
        backgroundColor: 'yellow',
        height: heightScale * 250,
        marginTop: heightScale * 5,
        borderRadius: 10,
      },
      checkText: {
        marginLeft: 10,
        color: '#000',
        fontSize: 17 * heightScale,
        marginTop: 5,
      },
      useText: {
        marginTop: 20 * heightScale,
        color: '#000',
        width: 100 * heightScale,
        height: 30 * heightScale,
        lineHeight: 30 * heightScale,
        backgroundColor: '#D9D9D9',
        textAlign: 'center',
        borderRadius: 20,
      },
      gujoinButton: {
        width: heightScale * 250,
        height: heightScale * 60,
        backgroundColor: '#656565',
        borderRadius: 6,
        marginTop: heightScale * 50,
      },
      gujoinButton2: {
        width: heightScale * 250,
        height: heightScale * 60,
        backgroundColor: '#2C2A2A',
        borderRadius: 6,
        marginTop: heightScale * 50,
      },
      gujoinButtonText: {
        textAlign: 'center',
        lineHeight: heightScale * 60,
        color: 'white',
        fontSize: heightScale * 20,
      },
});


export default GuestJoin