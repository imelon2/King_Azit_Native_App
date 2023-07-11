import React, {useEffect, useState, useCallback, ReactElement} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Keyboard,
  ActivityIndicator,
} from 'react-native';
import {HomeRootStackParamList} from '../../../AppInner';
import {HeaderStyle, heightData} from '../../modules/globalStyles';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/reducer';
import TimeFormat from '../../modules/TimeFormat';
import ProfileImg from '../../components/ProfileImg';
import { UserInformationType } from './UserInformation';
const {width, height} = Dimensions.get('window');
const heightScale = heightData;

type AdminScreenProps = NativeStackScreenProps<
  HomeRootStackParamList,
  'MemberManagement'
>;
export type userInfoType = {
  memberId: string;
  name: string;
  nickname: string;
  phone: string;
  registerDate: string;
  uuid: string;
};

function MemberManagement({route, navigation}: AdminScreenProps) {
  // let {status} = route.params;
  const access_token = useSelector(
    (state: RootState) => state.user.access_token,
  );
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(route.params.status);
  const [userList, setUserList] = useState<userInfoType[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const onChangeKeyword = useCallback((text: string) => {
    setKeyword(text.trim());
  }, []);

  useEffect(() => {
    const getNewUserList = async () => {
      try {
        setLoading(true);
        const newUserList = await axios.get(
          `${Config.API_URL}/admin/waiting?nickname=${keyword}`,
          {
            headers: {
              authorization: `Bearer ${access_token}`,
            },
          },
        );
        setUserList(newUserList.data);
      } catch (error) {
        console.log(
          (error as AxiosError).response?.status,
          'error from Admin/Components/MemberManagement.tsx',
        );
      } finally {
        setLoading(false);
      }
    };

    const getUserList = async () => {
      try {
        setLoading(true);
        const userList = await axios.get(
          `${Config.API_URL}/admin/members?nickname=${keyword}`,
          {
            headers: {
              authorization: `Bearer ${access_token}`,
            },
          },
        );
        setUserList(userList.data);
      } catch (error) {
        console.log(
          (error as AxiosError).response?.status,
          'error from Admin/Components/MemberManagement.tsx',
        );
      } finally {
        setLoading(false);
      }
    };

    const getAdminList = async () => {
      try {
        setLoading(true);
        const adminList = await axios.get(
          `${Config.API_URL}/admin/list?nickname=${keyword}`,
          {
            headers: {
              authorization: `Bearer ${access_token}`,
            },
          },
        );
        setUserList(adminList.data);
      } catch (error) {
        console.log(
          (error as AxiosError).response?.status,
          'error from Admin/Components/MemberManagement.tsx',
        );
      } finally {
        setLoading(false);
      }
    };

    if (status == 'new') {
      const debounce = setTimeout(async () => {
        getNewUserList();
      }, 200);
      return () => {
        clearTimeout(debounce);
      };
    } else if (status == 'exist' || status == 'newAdmin') {
      const debounce = setTimeout(async () => {
        getUserList();
      }, 200);
      return () => {
        clearTimeout(debounce);
      };
    } else if (status == 'admin') {
      const debounce = setTimeout(async () => {
        getAdminList();
      }, 200);
      return () => {
        clearTimeout(debounce);
      };
    }
  }, [keyword, status]);

  const onClickUser = (item:userInfoType) => {
    const userInfo:UserInformationType = Object.assign(item,{status})
    // 기존 맴버 관리 :
    if(status === "exist") return navigation.navigate('UserDetail',userInfo);

    // 그 외 :
    navigation.navigate('UserInformation',userInfo)
  };

  const replaceStringWithJSX = (
    str: string,
    find: string,
    replace: ReactElement,
  ) => {
    if(find =="") return str;
    const parts = str.split(find);
    const result = [];
    for (let i = 0; i < parts.length; i++) {
      result.push(parts[i]);
      if (i < parts.length - 1) result.push(replace);
    }
    return result;
  };

  const renderText = (nickname: string,index:number) => {
    return (
      <Text style={styles.fontStyle2}>
        {replaceStringWithJSX(
          nickname,
          keyword,
          <Text style={[styles.fontStyle2, {color: '#F5FF82'}]} key={index}>
            {keyword}
          </Text>,
        )}
      </Text>
    );
  };

  const nevigationFunc = useCallback(() => {
    if (status == 'newAdmin') {
      setLoading(true)
      setStatus('admin');
      return;
    }
    navigation.goBack();
  }, [status]);

  return (
    <SafeAreaView style={HeaderStyle.container}>
      <View>
        <View style={HeaderStyle.headerStyle}>
          <Text style={HeaderStyle.headerFontStyle}>
            {status == 'exist' && '기존 멤버 관리'}
            {status == 'new' && '신규 멤버 관리'}
            {status == 'admin' && '어드민 관리'}
            {status == 'newAdmin' && '어드민 추가'}
          </Text>
        </View>
        <IconAntDesign
          name="left"
          size={heightScale * 28}
          color="white"
          style={HeaderStyle.headerLeftIcon}
          onPress={() => nevigationFunc()}
        />
        {status == 'admin' && (
          <IconAntDesign
            name="plus"
            size={heightScale * 28}
            color="white"
            style={HeaderStyle.headerRightIcon}
            onPress={() => {
              setLoading(true)
              setStatus('newAdmin')
            }}
          />
        )}
      </View>
      <View style={{alignItems: 'center'}}>
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
            onChangeText={onChangeKeyword}
            placeholderTextColor={'#929292'}
            style={styles.textInput}
            placeholder="닉네임 검색"
            value={keyword}
          />
        </View>
        {loading ? (
          <View
            style={{
              marginTop: heightScale * 25,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator color={'#fff'} />
          </View>
        ) : (
          <FlatList
            keyExtractor={item => item.memberId}
            data={userList}
            style={{
              marginBottom: 50 * heightScale,
              marginTop: 30 * heightScale,
            }}
            disableScrollViewPanResponder={true}
            ListEmptyComponent={() => (
              <Text style={{color: '#fff', display: loading ? 'none' : 'flex'}}>
                신규가입 유저가 없습니다.
              </Text>
            )}
            renderItem={items => {
              const {item} = items;
              return (
                <TouchableOpacity
                  onPressIn={() => Keyboard.dismiss()}
                  onPress={() => onClickUser(item)}
                  activeOpacity={1}
                  style={styles.applicationBox}
                  key={items.index}>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <ProfileImg style={styles.playerIcon} source={Config.IMG_URL! + item.uuid} />
                  </View>
                  <View
                    style={{
                      flex: 4,
                      paddingLeft: 20 * heightScale,
                      justifyContent: 'center',
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      {renderText(item?.nickname,items.index)}
                    </View>
                    <Text style={styles.fontStyle3}> 
                      신청일: {TimeFormat(item?.registerDate)}
                    </Text>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <IconAntDesign
                      name="right"
                      size={heightScale * 25}
                      color="white"
                      style={{marginRight: 10 * heightScale}}
                    />
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container2: {
    width: width,
    height: height - 20,
    left: -heightScale * 22,
    backgroundColor: '#121212',
  },
  fontStyle2: {
    fontSize: 18 * heightScale,
    color: 'white',
    fontWeight: '600',
  },
  fontStyle3: {
    fontSize: 14 * heightScale,
    color: 'white',
    marginTop: 6 * heightScale,
    // fontWeight:'600',
  },
  fontStyle4: {
    fontSize: 10 * heightScale,
    color: 'black',
    fontWeight: '500',
  },
  fontStyle5: {
    color: 'white',
    fontSize: 18 * heightScale,
    marginLeft: 10 * heightScale,
  },
  fontStyle6: {
    color: 'white',
    fontSize: 16 * heightScale,
    marginLeft: 8 * heightScale,
  },
  giftModalTextInput: {
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
    height: 85 * heightScale,
    borderBottomColor: '#3D3D3D',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  playerIcon: {
    width: 44 * heightScale,
    height: 44 * heightScale,
    borderRadius: 50,
    backgroundColor: '#D9D9D9',
  },
  Approved: {
    width: 63 * heightScale,
    height: 19 * heightScale,
    backgroundColor: '#F9F36B',
    borderRadius: 86,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 19 * heightScale,
  },
  Deniend: {
    width: 52 * heightScale,
    height: 19 * heightScale,
    backgroundColor: '#48E0EA',
    borderRadius: 86,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 19 * heightScale,
  },
  buttonStyle: {
    width: 166 * heightScale,
    height: 60 * heightScale,
    backgroundColor: '#222',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#F5FF82',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonStyle2: {
    width: 166 * heightScale,
    height: 60 * heightScale,
    backgroundColor: '#F5FF82',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    // marginLeft: 40 * heightScale,
  },
});
export default MemberManagement;
