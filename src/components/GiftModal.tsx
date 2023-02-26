import React from "react";
import { StyleSheet } from "react-native";
import { View, Text, Alert, TextInput } from "react-native";
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import IconIonicons from 'react-native-vector-icons/Ionicons';


import {heightData} from '../modules/globalStyles';
const heightScale = heightData;

const GiftModal = ({...props}) => {
    return (
        <View style={styles.giftModalContainer}>
        <View style={styles.giftModalComponent}>
          <Text style={styles.figtModalFontStyle}>선물하기</Text>
          <IconEvilIcons
            style={{position: 'absolute', right: 0, padding: heightScale * 24}}
            name="close"
            color={'white'}
            size={heightScale * 35}
            suppressHighlighting={true}
            onPress={() => props.setGiftModalState(false)}
          />
          <View style={styles.giftModalTextInput}>
            <IconIonicons
              name="search"
              color={'#929292'}
              size={heightScale * 24}
            />
            <TextInput
              style={styles.textInput}
              // ref={passwordRef}
              textAlignVertical={'top'}
              placeholder="닉네임 입력"
              placeholderTextColor={'#929292'}
              // onChangeText={onChangePassword}
              // onSubmitEditing={loginBtn} // Submit Key 클릭 시, 이벤트
              // blurOnSubmit={false}
              // secureTextEntry={!showPW ? true : false}
              // value={password}
            />
          </View>
          <View
            style={{
              height: heightScale * 48,
              width: heightScale * 324,
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: '#787878',
              borderRadius: 4,
            }}>
            <View
              style={{
                flex: 4,
                borderRightWidth: 1,
                borderRightColor: '#787878',
              }}>
              <Text>마이너스</Text>
            </View>
            <View
              style={{
                flex: 19,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>4</Text>
            </View>
            <View
              style={{flex: 4, borderLeftWidth: 1, borderLeftColor: '#787878'}}>
              <Text>플러스</Text>
            </View>
          </View>
        </View>
      </View>
    )
}

const styles = StyleSheet.create({
      giftModalContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(12, 12, 12, 0.8)',
        alignItems: 'center',
      },
      giftModalComponent: {
        position: 'absolute',
        width: heightScale * 380,
        height: heightScale * 430,
        backgroundColor: '#353535',
        top: heightScale * 182,
        alignItems: 'center',
        borderRadius: 20,
      },
      figtModalFontStyle: {
        fontSize: heightScale * 18,
        fontWeight: 'bold',
        color: 'white',
        paddingVertical: heightScale * 24,
      },
      giftModalTextInput: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: heightScale * 54,
        width: heightScale * 324,
        paddingHorizontal: 24,
        backgroundColor: '#414141',
        borderRadius: 5,
      },
      textInput: {
        color: '#929292',
        fontSize: heightScale * 18,
        height: heightScale * 48,
        paddingHorizontal: 10,
        paddingBottom: 5,
      },
})

export default GiftModal;