import React, {useCallback, useState} from 'react';
import {FlatList, Pressable, StyleSheet} from 'react-native';
import {View, Text, Alert, TextInput} from 'react-native';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {Shadow} from 'react-native-shadow-2';


import {heightData} from '../../../modules/globalStyles';
const heightScale = heightData;

// const LIST =
const GiftModal = ({...props}) => {
  const [counts, setCount] = useState(0);
  const [recipient, setRecipient] = useState('');
  const [selectedItem, setSelectedItem] = useState();
  const canAdd = counts === 0 ? true : false;
  const canMius = counts === props.selectCard.count ? true : false;

  const onChangeNicknane = useCallback((text: any) => {
    setRecipient(text);
  }, []);

  // Todo : 선물하기 API 연동
  const transferTicket = useCallback(() => {
    Alert.alert('Todo:', '선물하기 기능 구현');
  }, []);
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
        {/* 검색창 */}
        <View style={styles.giftModalTextInput}>
          <IconIonicons
            name="search"
            color={'#929292'}
            size={heightScale * 24}
          />
          <TextInput placeholderTextColor={'#929292'} style={styles.textInput} placeholder="닉네임 검색"/>
        </View>
        {/* <View style={{width: heightScale * 324, zIndex: 10}}>
          <AutocompleteDropdown
            clearOnFocus={false}
            closeOnBlur={false}
            closeOnSubmit={false}
            showChevron={false} // 드랍다운 활성 버튼
            inputContainerStyle={{backgroundColor: '#414141'}}
            // initialValue={{id: '0'}} // or just '2'
            // onSelectItem={setSelectedItem}
            dataSet={[
              {id: '1', title: 'Alpha'},
              {id: '2', title: 'Beta'},
              {id: '3', title: 'Gamma'},
              {id: '4', title: 'View'},
              {id: '5', title: 'Blue'},
              {id: '6', title: 'Red'},
              {id: '7', title: 'Green'},
              {id: '8', title: 'White'},
              {id: '9', title: 'Gold'},
            ]}
          />
        </View> */}
        {/* 숫자 추가 빼기 */}
        <View
          style={{
            marginTop: heightScale * 32,
            height: heightScale * 48,
            width: heightScale * 324,
            flexDirection: 'row',
            borderWidth: 1,
            borderColor: '#787878',
            borderRadius: 4,
          }}>
          <Pressable
            style={[
              styles.countButtonStyle,
              {borderRightWidth: 1, borderRightColor: '#787878'},
            ]}
            onPress={() => setCount(counts - 1)}
            disabled={canAdd}>
            <IconAntDesign
              size={heightScale * 32}
              name="minus"
              color={canAdd ? '#787878' : '#FFFFFF'}
            />
          </Pressable>
          <View
            style={{
              flex: 19,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: heightScale * 18, color: '#ffffff'}}>
              {counts}
            </Text>
          </View>
          <Pressable
            style={[
              styles.countButtonStyle,
              {borderLeftWidth: 1, borderLeftColor: '#787878'},
            ]}
            onPress={() => setCount(counts + 1)}
            disabled={canMius}>
            <IconAntDesign
              size={heightScale * 32}
              name="plus"
              color={canMius ? '#787878' : '#FFFFFF'}
            />
          </Pressable>
        </View>
        {/* 선물하기 버튼 */}
        <View style={styles.giftWrapperStyle}>
          <Shadow distance={7} startColor={'#FCFF72'}>
            <Pressable
              style={styles.giftButtonStyle}
              onPress={() => transferTicket()}>
              <Text style={styles.giftFontStyle}>선물하기</Text>
            </Pressable>
          </Shadow>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  giftModalContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(12, 12, 12, 0.8)',
    alignItems: 'center',
  },
  giftModalComponent: {
    width: heightScale * 380,
    height: heightScale * 430,
    backgroundColor: '#353535',
    top: heightScale * 120,
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
    height: heightScale * 50,
    paddingHorizontal: 24,
    backgroundColor: '#414141',
    borderRadius: 5,
    zIndex:1
  },
  textInput: {
    color: '#ffffff',
    fontSize: heightScale * 18,
    backgroundColor: '#414141',
    paddingHorizontal: 5,
  },
  countButtonStyle: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  giftWrapperStyle: {
    position: 'absolute',
    bottom: heightScale * 28,
    alignItems: 'center',
  },
  giftButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: heightScale * 46 - 5,
    width: heightScale * 200 - 5,
    backgroundColor: '#F5FF82',
    borderRadius: 30,
  },
  giftFontStyle: {
    fontSize: heightScale * 17,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default GiftModal;
