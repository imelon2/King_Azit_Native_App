import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import {FlatList, Image, Pressable, StyleSheet} from 'react-native';
import {View, Text, Alert, TextInput, Keyboard} from 'react-native';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {Shadow} from 'react-native-shadow-2';

import {heightData} from '../../../modules/globalStyles';
const heightScale = heightData;

const LIST = [
  {id: '1', nickname: '최원혁'},
  {id: '2', nickname: '안징깅'},
  {id: '3', nickname: '차원'},
  {id: '4', nickname: '윤지'},
  {id: '5', nickname: '김태우'},
  {id: '6', nickname: 'choiwonhyeok'},
  {id: '7', nickname: 'anjingi'},
  {id: '8', nickname: 'chawon'},
  {id: '9', nickname: 'yun'},
  {id: '9', nickname: 'kim'},
];

const GiftModal = ({...props}) => {
  const [counts, setCount] = useState(0);
  const [onKeyboard, setOnKeyboard] = useState(false);
  const [keyword, setKeyword] = useState<string>('');
  const [keyItems, setKeyItems] = useState([]);
  const canAdd = counts === 0 ? true : false;
  const canMius = counts === props.selectCard.count ? true : false;
  const canGift = counts !== 0 &&  keyword ? true : false

  useEffect(() => {
    const didShow = Keyboard.addListener('keyboardDidShow', () => {
      setOnKeyboard(true)
    });
    return () => {
      didShow.remove();
    };
  },[])


  const onChangeNicknane = useCallback((text: string) => {
    setKeyword(text);
  }, []);


  // Todo : 선물하기 API 연동
  const transferTicket = useCallback(() => {
    Alert.alert('Todo:', '선물하기 기능 구현');
  }, []);

  // todo : 회원 닉네임 & 프로필사진 요청 API
  const callData = () => {
    try {
    } catch (error) {}
  };


  // 자동 검색 데이터 생성
  const updateData = async () => {
    // const res = await callData();
    const res = LIST;
    let searchResult: any = res.filter(
      list => list.nickname.includes(keyword) === true,
    ).slice(0, 10); // 10개만 보여지기

    setKeyItems(searchResult);
  };

  //키워드가 변경되면 api를 호출
  useEffect(() => {
    const debounce = setTimeout(() => {
      if (keyword) {updateData()}
      else {setKeyItems([])}
    }, 200);
    return () => {
      clearTimeout(debounce);
    };
  }, [keyword]);

  const replaceStringWithJSX = (str:string, find:string, replace:ReactElement) => {
    const parts = str.split(find);
    const result = [];
    for (let i = 0; i < parts.length; i++) {
      result.push(parts[i]);
      if (i < parts.length - 1) result.push(replace);
    }
    return result;
  }

  const renderText = (nickname: string) => {
    return (
      <Text style={{ fontSize: 16,fontWeight:'300', color: '#fff', paddingLeft: 10 }}>
        {replaceStringWithJSX(
          nickname,
          keyword,
          <Text style={{ color: '#F5FF82',fontSize: 16,fontWeight:'500', paddingLeft: 10 }}>{keyword}</Text>
        )}
      </Text>
    );
  };
  
  return (
    <View style={styles.giftModalContainer}>
      <View style={styles.giftModalComponent}>
        {/* Header */}
        <>
          <Text style={styles.figtModalFontStyle}>선물하기</Text>
          <IconEvilIcons
            style={{position: 'absolute', right: 0, padding: heightScale * 24}}
            name="close"
            color={'white'}
            size={heightScale * 35}
            suppressHighlighting={true}
            onPress={() => props.setGiftModalState(false)}
          />
        </>
        {/* Center */}
        <View
          style={{
            alignItems: 'center',
            position: 'absolute',
            zIndex: 1,
            top: heightScale * 123,
          }}>
          {/* 검색창 */}
          <View style={styles.giftModalTextInput}>
            <IconIonicons
              name="search"
              color={'#929292'}
              size={heightScale * 24}
            />
            <TextInput
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="always"
              onChangeText={onChangeNicknane}
              placeholderTextColor={'#929292'}
              style={styles.textInput}
              placeholder="닉네임 검색"
              value={keyword}
            />
          </View>
          {/* 검색 리스트 */}
          <FlatList
            style={{
              marginTop: 5,
              width: heightScale * 324,
              flexGrow: 0,
              backgroundColor: '#414141',
              paddingHorizontal: 24,
              maxHeight: heightScale * 142,
              borderRadius: 4,
              display:
                keyItems.length > 0 && keyword && onKeyboard? 'flex' : 'none',
            }}
            keyExtractor={item => item.id}
            data={keyItems}
            disableScrollViewPanResponder={true} //onPress 클릭 시, 선택 안되는 이슈 해결
            renderItem={({item}: {item: any}) => {
              return (
                <Pressable
                  style={{
                    flexDirection: 'row',
                    paddingVertical: heightScale * 10,
                    alignItems: 'center',
                    paddingHorizontal: 5,
                    borderBottomColor: '#5A5A5A',
                    borderBottomWidth: 1,
                  }}
                  onPress={() => {
                    setKeyword(item.nickname);
                    Keyboard.dismiss();
                    setOnKeyboard(false)
                  }}
                  key={item.id}
                  >
                  <Image
                    source={require('../../../assets/UserIcon.png')}
                    style={styles.userIcon}
                  />
                    {renderText(item.nickname)}
                </Pressable>
              );
            }}
          />
        </View>
        {/* Footer */}
        <View
          style={{
            position: 'absolute',
            alignItems: 'center',
            bottom: heightScale * 28,
          }}>
          {/* 숫자 추가 빼기 */}
          <View
            style={{
              height: heightScale * 48,
              width: heightScale * 324,
              flexDirection: 'row',
              borderWidth: 1,
              borderColor: '#787878',
              borderRadius: 4,
              marginBottom: heightScale * 105,
            }}>
            {/* minus */}
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
            {/* count */}
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
            {/* plus */}
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
          <View style={{alignItems: 'center',}}>
          <Shadow distance={5} startColor={canGift ? '#FCFF72' : "#414141"}>
            <Pressable
              style={[styles.giftButtonStyle,{backgroundColor: canGift ? '#F5FF82' : "#414141"}]}
              onPress={() => transferTicket()}
              disabled={canGift?  false: true}
              >
              <Text style={styles.giftFontStyle}>선물하기</Text>
            </Pressable>
          </Shadow>
          </View>
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
    top: heightScale * 128,
    borderRadius: 20,
    alignItems: 'center',
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
    width: heightScale * 324,
    height: heightScale * 50,
    paddingHorizontal: 24,
    backgroundColor: '#414141',
    borderRadius: 5,
  },
  textInput: {
    color: '#ffffff',
    fontSize: heightScale * 18,
    width: heightScale * 250,
    backgroundColor: '#414141',
    paddingHorizontal: 5,
  },
  countButtonStyle: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  giftButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    height: heightScale * 46 - 5,
    width: heightScale * 200 - 5,
    borderRadius: 30,
  },
  giftFontStyle: {
    fontSize: heightScale * 17,
    fontWeight: 'bold',
    color: 'black',
  },
  userIcon: {
    height: heightScale * 24,
    width: heightScale * 24,
    borderRadius: 100,
  },
});

export default GiftModal;
