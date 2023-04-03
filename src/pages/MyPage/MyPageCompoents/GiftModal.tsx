import React, {ReactElement, useCallback, useEffect, useState} from 'react';
import {View, Text, Alert, TextInput, Keyboard,ActivityIndicator,FlatList, Pressable, StyleSheet} from 'react-native';
import IconEvilIcons from 'react-native-vector-icons/EvilIcons';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {Shadow} from 'react-native-shadow-2';

import {heightData} from '../../../modules/globalStyles';
import axios, { AxiosError } from 'axios';
import Config from 'react-native-config';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import ProfileImg from '../../../components/ProfileImg';
import getTickets from '../../../hooks/getTickets';
const heightScale = heightData;



const GiftModal = ({...props}) => {
  const {access_token,uuid} = useSelector((state: RootState) => state.user);
  const [loading,setLoading ] = useState(false);
  const [counts, setCount] = useState(0);
  const [onKeyboard, setOnKeyboard] = useState(false);
  const [keyword, setKeyword] = useState<string>('');
  const [keyItems, setKeyItems] = useState<{nickname : string,uuid:string}[]>([]);
  const [userInfo, setUserInfo] = useState({
    nickname:'닉네임 검색',
    uuid:'',
  });
  // 현재 유저 보유 티켓 새로고침
  const [refreshTickets] = getTickets();
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
    setKeyword(text.trim());
  }, []);


  // 선물하기 API 연동
  const giftTicket = useCallback(async() => {
    try {
      if(loading) return;
      setLoading(true)
      console.log(userInfo.uuid);
      
      await axios.put(
        `${Config.API_URL}/member/ticket/gift`,
        {
            "to":userInfo.uuid,
            "type": props.selectCard.type,
            "amount": counts,
          },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );
      refreshTickets();
      
      let preData = props.selectCard;
      preData.count -= counts;
      props.setSelectCard(preData)
      props.setGiftModalState(false)
    } catch (error) {
      Alert.alert('Error', '내부 문제로 티켓 선물이 취소됬습니다.\n' + error);
    } finally {
      setLoading(false)
    }
  }, [userInfo,counts,loading]);



    //키워드가 변경되면 api를 호출
    useEffect(() => {
      const getNewUserList = async () => {
        try {
          const newUserList = await axios.get(`${Config.API_URL}/member/search?nickname=${keyword}`, {
            headers: {
              authorization: `Bearer ${access_token}`,
            },
          })

          let _ketItems:{nickname : string,uuid:string}[] = [];
          newUserList.data.map((value:{nickname : string,uuid:string}) => {
            if(value.uuid !== uuid) _ketItems.push(value);
            if(_ketItems.length == 10) return;
          });
           // 10개만 보여지기
          setKeyItems(_ketItems);
        } catch (error) {
          console.log(
            (error as AxiosError).response?.status,
            'error from Mypage/Components/GiftMOdal.tsx',
          );
        } 
      };

      const debounce = setTimeout(() => {
        if (keyword) {getNewUserList()}
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
          <Text key={nickname} style={{ color: '#F5FF82',fontSize: 16,fontWeight:'500', paddingLeft: 10 }}>{keyword}</Text>
        )}
      </Text>
    );
  };
  
  const _setUserInfo = (index:number) => {
    const {nickname,uuid} = keyItems[index];
    setUserInfo({nickname,uuid});
  }

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
            keyExtractor={(_,index) => String(index)}
            data={keyItems}
            disableScrollViewPanResponder={true} //onPress 클릭 시, 선택 안되는 이슈 해결
            renderItem={(items) => {
              const {item} = items;
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
                    _setUserInfo(items.index)
                    Keyboard.dismiss();
                    setOnKeyboard(false)
                  }}
                  >
                    <ProfileImg style={styles.userIcon} source={Config.IMG_URL!+item.uuid}  />
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
              onPress={() => giftTicket()}
              disabled={!canGift }
              >
                {loading ? <ActivityIndicator/> : <Text style={styles.giftFontStyle}>선물하기</Text> }
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
