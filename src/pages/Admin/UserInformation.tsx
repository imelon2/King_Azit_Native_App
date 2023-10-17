import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ActivityIndicator,
  SafeAreaView,
  Alert,
  Pressable,
} from 'react-native';
import {HeaderStyle, heightData} from '../../modules/globalStyles';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {userInfoType} from './MemberManagement';
import {useCallback, useState} from 'react';
import axios from 'axios';
import Config from 'react-native-config';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/reducer';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeRootStackParamList} from '../../../AppInner';
import {heightScale} from '../../modules/MainStyles';
import ProfileImg from '../../components/ProfileImg';
import Rectangle from '../../components/Rectangle';
import { DateFromat } from '@/modules';

// interface propsType {
//   setModalStatus(id: boolean): void;
//   data: userInfoType;
//   state: string;
//   setRefresh(data: any): void;
// }

export type UserInformationType = {
  memberId: string;
  name: string;
  nickname: string;
  phone: string;
  registerDate: string;
  uuid: string;
  status: string;
};

type UserInformationScreenProps = NativeStackScreenProps<
  HomeRootStackParamList,
  'UserInformation'
>;

function UserInformation({route, navigation}: UserInformationScreenProps) {
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);
  const {name, uuid, phone, registerDate, nickname, memberId, status} =
    route.params;
  const access_token = useSelector(
    (state: RootState) => state.user.access_token,
  );

  // 가입 승인
  const approve = useCallback(async () => {
    if (loading) return;
    try {
      setLoading(true);
      await axios.put(
        `${Config.API_URL}/admin/permit`,
        {uuid: uuid},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );

      navigation.goBack();
    } catch (error) {
      console.log((error as any).response.data.errorMessage);
      Alert.alert('Error', '내부 문제로 해당 기능이 취소됬습니다.\n' + error);
    } finally {
      setLoading(false);
    }
  }, []);

  // 가입 거절
  const unapprove = useCallback(async () => {
    if (loading) return;
    try {
      setLoading(true);
      await axios.put(
        `${Config.API_URL}/admin/reject`,
        {uuid: uuid},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', '내부 문제로 해당 기능이 취소됬습니다.\n' + error);
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteAdmin = useCallback(async () => {
    if (loading) return;
    try {
      setLoading(true);
      Alert.alert('Todo :', '어드민 권한 삭제');
      // await axios.put(
      //   `${Config.API_URL}/admin/reject`,
      //   {uuid: data.uuid},
      //   {
      //     headers: {
      //       Authorization: `Bearer ${access_token}`,
      //     },
      //   },
      // );

      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', '내부 문제로 해당 기능이 취소됬습니다.\n' + error);
    } finally {
      setLoading(false);
    }
  }, []);

  const addAdmin = useCallback(async () => {
    if (loading) return;
    try {
      setLoading(true);
      Alert.alert('Todo :', '어드민 권한 추가');
      // await axios.put(
      //   `${Config.API_URL}/admin/reject`,
      //   {uuid: data.uuid},
      //   {
      //     headers: {
      //       Authorization: `Bearer ${access_token}`,
      //     },
      //   },
      // );

      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', '내부 문제로 해당 기능이 취소됬습니다.\n' + error);
    } finally {
      setLoading(false);
    }
  }, []);

  const unregister = useCallback(async () => {
    if (loading) return;
    try {
      setLoading(true);
      Alert.alert('Todo :', '회원 탈퇴');
      // await axios.put(
      //   `${Config.API_URL}/admin/reject`,
      //   {uuid: data.uuid},
      //   {
      //     headers: {
      //       Authorization: `Bearer ${access_token}`,
      //     },
      //   },
      // );

      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', '내부 문제로 해당 기능이 취소됬습니다.\n' + error);
    } finally {
      setLoading(false);
    }
  }, []);


  return (
    <SafeAreaView style={HeaderStyle.container}>
      <View>
        <View style={HeaderStyle.headerStyle}>
          <Text style={HeaderStyle.headerFontStyle}>사용자</Text>
        </View>
        <IconAntDesign
          name="left"
          size={heightScale * 28}
          color="white"
          style={HeaderStyle.headerLeftIcon}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View
        style={{
          paddingHorizontal: 24 * heightScale,
          paddingTop: 40 * heightScale,
          flex: 1,
        }}>
        <View style={{paddingVertical: heightScale * 35, alignItems: 'center'}}>
          <ProfileImg
            style={{
              width: heightScale * 90,
              height: heightScale * 90,
              borderRadius: heightScale * 90,
            }}
            uuid={uuid}
          />
        </View>
        <View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 4 * heightScale,
            }}>
              <Rectangle type='big' scale={10} color={'#F5FF82'}/>
            <Text style={styles.fontStyle5}>닉네임</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 8 * heightScale,
            }}>

<Rectangle type='straight' scale={7} color={'#F5FF82'}/>
            <Text style={styles.fontStyle6}>{nickname}</Text>
          </View>
        </View>

        <View style={{marginTop: 28 * heightScale}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 4 * heightScale,
            }}>
            <Rectangle type='big' scale={10} color={'#F5FF82'}/>
            <Text style={styles.fontStyle5}>아이디</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 8 * heightScale,
            }}>
            <Rectangle type='straight' scale={7} color={'#F5FF82'}/>
            <Text style={styles.fontStyle6}>{memberId}</Text>
          </View>
        </View>

        <View style={{marginTop: 28 * heightScale}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 4 * heightScale,
            }}>
            <Rectangle type='big' scale={10} color={'#F5FF82'}/>
            <Text style={styles.fontStyle5}>이름</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 8 * heightScale,
            }}>
            <Rectangle type='straight' scale={7} color={'#F5FF82'}/>
            <Text style={styles.fontStyle6}>{name}</Text>
          </View>
        </View>
        <View style={{marginTop: 28 * heightScale}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 4 * heightScale,
            }}>
            <Rectangle type='big' scale={10} color={'#F5FF82'}/>
            <Text style={styles.fontStyle5}>핸드폰 번호</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 8 * heightScale,
            }}>
            <Rectangle type='straight' scale={7} color={'#F5FF82'}/>
            <Text style={styles.fontStyle6}>{phone}</Text>
          </View>
        </View>

        <View style={{marginTop: 28 * heightScale}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 4 * heightScale,
            }}>
            <Rectangle type='big' scale={10} color={'#F5FF82'}/>
            <Text style={styles.fontStyle5}>가입일</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 8 * heightScale,
            }}>
            <Rectangle type='straight' scale={7} color={'#F5FF82'}/>
            <Text style={styles.fontStyle6}>{DateFromat(registerDate)}</Text>
          </View>
        </View>

        {status == 'new' && (
          <View style={{marginTop: heightScale * 150, flexDirection: 'row'}}>
            {loading ? (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <ActivityIndicator color={'#fff'} />
              </View>
            ) : (
              <>
                <Pressable
                  onPress={() => unapprove()}
                  style={{flex: 1, alignItems: 'flex-start'}}>
                  <View style={styles.buttonStyle}>
                    <Text style={{fontSize: 20 * heightScale, color: 'white'}}>
                      거절
                    </Text>
                  </View>
                </Pressable>
                <Pressable
                  onPress={() => approve()}
                  style={{flex: 1, alignItems: 'flex-end'}}>
                  <View
                    style={[styles.buttonStyle, {backgroundColor: '#F5FF82'}]}>
                    <Text style={{fontSize: 20 * heightScale, color: 'black'}}>
                      승인
                    </Text>
                  </View>
                </Pressable>
              </>
            )}
          </View>
        )}

        {status == 'exist' && (
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              marginBottom: heightScale * 30,
            }}>
            <Pressable
              style={styles.buttonStyle2}
              onPress={() => setPopup(true)}>
              <Text style={styles.fontStyle2}>회원 탈퇴</Text>
            </Pressable>
          </View>
        )}

        {status == 'admin' && (
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              marginBottom: heightScale * 30,
            }}>
            <Pressable
              style={styles.buttonStyle2}
              onPress={() => setPopup(true)}>
              <Text style={styles.fontStyle2}>어드민 삭제</Text>
            </Pressable>
          </View>
        )}

        {status == 'newAdmin' && (
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              marginBottom: heightScale * 30,
            }}>
            <Pressable
              style={styles.buttonStyle2}
              onPress={() => setPopup(true)}>
              <Text style={styles.fontStyle2}>어드민 추가</Text>
            </Pressable>
          </View>
        )}
      </View>

      {popup && (
        <View style={styles.popupContainer}>
          {/* 회원 탈퇴 Popup */}
          {status == 'exist' && (
            <View style={styles.popupWrapper}>
              <View style={{flex: 2, justifyContent: 'center',alignItems:'center'}}>
                <Text style={{fontSize: heightScale * 20, color: 'white'}}>
                {name}({nickname})님을
                </Text>
                <Text style={{fontSize: heightScale * 20, color: 'white'}}>
                  삭제 하시겠습니까?
                </Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Pressable
                  onPress={() => setPopup(false)}
                  style={[
                    styles.popupButtonStyle,
                    {marginRight: heightScale * 30},
                  ]}>
                  <Text style={{fontSize: heightScale * 20, color: '#F5FF82'}}>
                    취소
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => unregister()}
                  style={[
                    styles.popupButtonStyle,
                    {backgroundColor: '#F5FF82'},
                  ]}>
                  <Text style={{fontSize: heightScale * 20}}>삭제</Text>
                </Pressable>
              </View>
            </View>
          )}
          {/* 어드민 권한 삭제 Popup */}
          {status == 'admin' && (
            <View style={styles.popupWrapper}>
              <View style={{flex: 2, justifyContent: 'center',alignItems:'center'}}>
                <Text style={{fontSize: heightScale * 20, color: 'white'}}>
                {name}({nickname})님에게
                </Text>
                <Text style={{fontSize: heightScale * 20, color: 'white'}}>
                  관리자 권한을 삭제 하시겠습니까?
                </Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Pressable
                  onPress={() => setPopup(false)}
                  style={[
                    styles.popupButtonStyle,
                    {marginRight: heightScale * 30},
                  ]}>
                  <Text style={{fontSize: heightScale * 20, color: '#F5FF82'}}>
                    취소
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => deleteAdmin()}
                  style={[
                    styles.popupButtonStyle,
                    {backgroundColor: '#F5FF82'},
                  ]}>
                  <Text style={{fontSize: heightScale * 20}}>삭제</Text>
                </Pressable>
              </View>
            </View>
          )}
          {/* 어드민 권한 부여 Popup */}
          {status == 'newAdmin' && (
            <View style={styles.popupWrapper}>
              <View style={{flex: 2, justifyContent: 'center',alignItems:'center'}}>
                <Text style={{fontSize: heightScale * 20, color: 'white'}}>
                  {name}({nickname})님에게
                </Text>
                <Text style={{fontSize: heightScale * 20, color: 'white'}}>
                  관리자 권한을 부여 하시겠습니까?
                </Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row'}}>
                <Pressable
                  onPress={() => setPopup(false)}
                  style={[
                    styles.popupButtonStyle,
                    {marginRight: heightScale * 30},
                  ]}>
                  <Text style={{fontSize: heightScale * 20, color: '#F5FF82'}}>
                    취소
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => addAdmin()}
                  style={[
                    styles.popupButtonStyle,
                    {backgroundColor: '#F5FF82'},
                  ]}>
                  <Text style={{fontSize: heightScale * 20}}>권한 부여</Text>
                </Pressable>
              </View>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  fontStyle2: {
    color: 'black',
    fontSize: 20 * heightScale,
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
    height: 60 * heightScale,
    backgroundColor: '#F5FF82',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    // marginLeft: 40 * heightScale,
  },
  popupContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(18, 18, 18, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: heightScale * 350,
    height: heightScale * 240,
    backgroundColor: '#353535',
    borderRadius: 25,
  },
  popupButtonStyle: {
    width: heightScale * 140,
    height: heightScale * 60,
    borderWidth: 1,
    borderColor: '#F5FF82',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
});

export default UserInformation;
