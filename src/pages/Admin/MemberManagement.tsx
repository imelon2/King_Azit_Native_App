import {useEffect, useState, useCallback, ReactElement} from 'react';
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
} from 'react-native';
import {HomeRootStackParamList} from '../../../AppInner';
import {heightData} from '../../modules/globalStyles';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import Modal from 'react-native-modal';
import UserInformation from './Components/UserInformation';
import axios, {AxiosError} from 'axios';
import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/reducer';
import TimeFormat from '../../modules/TimeFormat';
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
  uuid:string;
};
function MemberManagement({route,navigation}: AdminScreenProps) {
  const {status} = route.params;

  const access_token = useSelector(
    (state: RootState) => state.user.access_token,
  );
  const [userList, setUserList] = useState<userInfoType[]>([]);
  const [keyword, setKeyword] = useState<string>('');
  const [modalStatus, setModalStatus] = useState(false);
  const [refresh,setRefresh] = useState();
  const [selectIndex, setSelectIndex] = useState<number>(0);
  const onChangeKeyword = useCallback((text: string) => {
    setKeyword(text.trim());
  }, []);

  useEffect(() => {
    const getNewUserList = async () => {
      try {
        const newUserList = await axios.get(`${Config.API_URL}/admin/waiting?nickname=${keyword}`, {
          headers: {
            authorization: `Bearer ${access_token}`,
          },
        })
        setUserList(newUserList.data);
      } catch (error) {
        console.log(
          (error as AxiosError).response?.status,
          'error from Admin/Components/MemberManagement.tsx',
        );
      }
    };

    if (status == 'new') {
        const debounce = setTimeout(async() => {
          getNewUserList();
        }, 200);
        return () => {
          clearTimeout(debounce);
        };
    }
  }, [keyword,refresh]);

  const onClickUser = (key: number) => {
    setSelectIndex(key);
    setModalStatus(true);
  };

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
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.headerStyle}>
          <Text style={styles.fontStyle}>
            {status == 'exist' && '기존 멤버 관리'}
            {status == 'new' && '신규 멤버 관리'}
            {status == 'admin' && '어드민 관리'}
          </Text>
        </View>
        <IconAntDesign
          name="left"
          size={heightScale * 28}
          color="white"
          style={styles.beforeIcon}
          onPress={() => navigation.goBack()}
        />
        {status == 'admin' && (
          <IconAntDesign
            name="plus"
            size={heightScale * 28}
            color="white"
            style={styles.plusIcon}
            // onPress={() => navigation.goBack()}
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
        <FlatList
          keyExtractor={item => item.memberId}
          data={userList}
          style={{marginBottom: 50 * heightScale, marginTop: 30 * heightScale}}
          disableScrollViewPanResponder={true}
          renderItem={items => {
            const {item} = items;
            return (
              <TouchableOpacity
                onPressIn={() => Keyboard.dismiss()}
                onPress={() => onClickUser(items.index)}
                activeOpacity={1}
                style={styles.applicationBox}
                key={items.index}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                  <Image
                    style={styles.playerIcon}
                    source={require('../../assets/UserIcon.png')}
                  />
                </View>
                <View style={{flex: 4, paddingLeft: 20 * heightScale,justifyContent:'center'}}>
                  <View style={{flexDirection: 'row'}}>
                    {renderText(item.nickname)}
                  </View>
                    <Text style={styles.fontStyle3}>
                      신청일: {TimeFormat(item.registerDate)}
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
      </View>

      <Modal isVisible={modalStatus}>
        <UserInformation
          data={userList[selectIndex]}
          setModalStatus={setModalStatus}
          setRefresh={setRefresh}
          state="new"
        />
      </Modal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#121212',
    paddingBottom: heightScale * 40,
  },
  fontStyle: {
    fontSize: heightScale * 18,
    fontWeight: 'bold',
    color: 'white',
  },
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
  plusIcon: {
    position: 'absolute',
    right: 0,
    marginTop: (heightScale * (61 - 28)) / 2,
    marginRight: heightScale * 15,
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
