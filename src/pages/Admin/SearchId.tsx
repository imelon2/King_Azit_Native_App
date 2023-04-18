import React, { ReactElement, useCallback, useEffect, useState } from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Text, TextInput, View,Keyboard, FlatList, Image, TouchableOpacity, ActivityIndicator} from 'react-native';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {heightData} from '../../modules/globalStyles';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import axios, { AxiosError } from 'axios';
import Config from 'react-native-config';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';
const {width, height} = Dimensions.get('window');
const heightScale = heightData;

interface propsType {
  setSearchModalStatus(bool: boolean): void;
  setUserInfo({nickname,uuid}:{nickname : string,uuid:string}):void;
}

function SearchId(props: propsType) {
  const access_token = useSelector(
    (state: RootState) => state.user.access_token,
  );
  const [loading,setLoading ] = useState(false);
  const [keyItems, setKeyItems] = useState<{nickname:string,uuid:string}[]>([]);
  const [keyword, setKeyword] = useState<string>('');

  const onChangeKeyword = useCallback((text: string) => {
    setKeyword(text.trim());
  }, []);

  
    //키워드가 변경되면 api를 호출
    useEffect(() => {
      const getNewUserList = async () => {

        try {
          setLoading(true)
          const newUserList = await axios.get(`${Config.API_URL}/member/search?nickname=${keyword}`, {
            headers: {
              authorization: `Bearer ${access_token}`,
            },
          })

          let searchResult: any = newUserList.data.slice(0, 10); // 10개만 보여지기
          setKeyItems(searchResult);
        } catch (error) {
          console.log(
            (error as AxiosError).response?.status,
            'error from Admin/Components/MemberManagement.tsx',
          );
        } finally {
          setLoading(false)
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
        <Text style={styles.fontStyle2}>
          {replaceStringWithJSX(
            nickname,
            keyword,
            <Text style={[styles.fontStyle2,{color: '#F5FF82'}]}>{keyword}</Text>
          )}
        </Text>
      );
    };

  const _setUserInfo = (index:number) => {
    const {nickname,uuid} = keyItems[index];
    props.setUserInfo({nickname,uuid});

    props.setSearchModalStatus(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.headerStyle}>
          <Text style={styles.fontStyle}>아이디 검색</Text>
        </View>
        <IconAntDesign
          name="left"
          size={heightScale * 28}
          color="white"
          style={styles.beforeIcon}
          onPressIn={() => Keyboard.dismiss()}
          onPress={() => props.setSearchModalStatus(false)}
        />
      </View>
      <View style={{alignItems: 'center'}}>
        <View style={styles.searchTextInput}>
          <IconIonicons
            name="search"
            color={'#929292'}
            size={heightScale * 24}
          />
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="always"
            onChangeText={onChangeKeyword}
            placeholderTextColor={'#929292'}
            style={styles.textInput}
            placeholder="닉네임 검색"
            value={keyword}
          />
        </View>
        {loading ?<View style={{marginTop:heightScale*25, justifyContent:'center',alignItems:'center'}}><ActivityIndicator color={'#fff'}/></View> :        
        <FlatList
          keyExtractor={item => item.uuid}
          data={keyItems}
          style={{marginBottom: 50 * heightScale, marginTop: 30 * heightScale}}
          disableScrollViewPanResponder={true}
          renderItem={items => {
            const {item} = items;
            return (
              <TouchableOpacity
                onPressIn={() => Keyboard.dismiss()}
                onPress={() => _setUserInfo(items.index)}
                activeOpacity={1}
                style={styles.applicationBox}
                key={items.index}>
                  <Image style={styles.userIconImg} defaultSource={require('../../assets/UserIcon.png')} source={{uri:Config.IMG_URL!+item.uuid}}/>
                  <View style={{paddingHorizontal:15,alignItems:'center'}}>
                  {renderText(item.nickname)}
                  </View>
              </TouchableOpacity>
            );
          }}
        />}

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    left: -heightScale * 22,
    backgroundColor: '#121212',
  },
  fontStyle: {
    fontSize: heightScale * 18,
    fontWeight: 'bold',
    color: 'white',
  },
  fontStyle2: {
    fontSize: 18 * heightScale,
    color: 'white',
    fontWeight: '600',
  },
  headerStyle: {
    height: heightScale * 61,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#999999',
  },
  beforeIcon: {
    position: 'absolute',
    marginTop: (heightScale * (61 - 28)) / 2,
    marginLeft: heightScale * 15,
  },
    searchTextInput: {
    flexDirection: 'row',
    alignItems: 'center',
    width: heightScale * 379,
    height: heightScale * 40,
    lineHeight: heightScale * 40,
    paddingHorizontal: 14 * heightScale,
    backgroundColor: '#414141',
    marginTop: 15 * heightScale,
  },
  textInput: {
    color: '#ffffff',
    fontSize: heightScale * 16,
    width: heightScale * 330,
    marginLeft: 8 * heightScale,
    paddingHorizontal: heightScale * 7,
    paddingVertical:0
  },
  applicationBox: {
    width: 390 * heightScale,
    height: 62 * heightScale,
    borderBottomColor: '#3D3D3D',
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems:'center',
    paddingHorizontal:heightScale*15
  },
  userIconImg : {
    width:heightScale*40,
    height:heightScale*40,
    borderRadius:50
  }
});

export default SearchId;
