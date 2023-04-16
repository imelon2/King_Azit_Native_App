import React, {useCallback, useState} from 'react';
import {
  Alert,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {MyPageRootStackParamList} from '../../../AppInner';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {heightData} from '../../modules/globalStyles';
import {useAppDispatch} from '../../store';
import EncryptedStorage from 'react-native-encrypted-storage';
import userSlice from '../../slices/user';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/reducer';
import Config from 'react-native-config';
import axios, {AxiosError} from 'axios';
import ProfileImg from '../../components/ProfileImg';

const heightScale = heightData;

function MyPage() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<MyPageRootStackParamList>>();
  const {nickName, name, uuid, access_token, roles} = useSelector(
    (state: RootState) => state.user,
  );
  const isAdmin = roles.find((e: string) => e == 'ROLE_ADMIN');
  const [cache, setCache] = useState<number>();

  const onChangeFile = useCallback(async () => {
    try {
      const response = await ImagePicker.openPicker({
        includeExif: true,
        includeBase64: true,
        mediaType: 'photo',
        cropping: true,
      });
      // console.log(response.width, response.height, response.exif);
      // setPreview({uri: `data:${response.mime};base64,${response.data}`});

      // exif Orientation 걸릴 경우
      // const orientation = (response.exif as any)?.Orientation; // exif Orientation
      // console.log('orientation', orientation);
      const r = await ImageResizer.createResizedImage(
        response.path,
        600, // width
        600, // height
        response.mime.includes('jpeg') ? 'JPEG' : 'PNG', // format
        100, // quality
        0, // rotation
      );

      const image = {
        uri: r.uri,
        name: r.name,
        type: response.mime,
      };

      const formData = new FormData();
      formData.append('file', image);

      await setProfileImageHttps(formData);
      setCache(Date.now());
    } catch (error) {
      // [Error MSG : User cancelled image selection] :  ImagePicker.openPicker ERROR
      console.log(error as AxiosError);
    }
  }, [dispatch]);

  const setProfileImageHttps = async (formData: FormData) => {
    try {
      await axios.post(`${Config.API_URL}/member/image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          authorization: `Bearer ${access_token}`,
        },
      });
      return true;
    } catch (error) {
      if ((error as AxiosError).response?.status === 400) {
        console.log('전송된 이미지 없음');
      } else {
        console.log((error as AxiosError).response?.data);
      }
    }
  };

  const logout = async () => {
    await EncryptedStorage.removeItem('refreshToken');
    dispatch(userSlice.actions.setUser({access_token: ''}));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.headerStyle}>
          <Text style={styles.fontStyle}>마이 페이지</Text>
        </View>
        <View style={styles.myInfoStyle}>
          {/* icon */}
          <Pressable onPress={onChangeFile}>
            <ProfileImg
              cache={cache}
              style={styles.userIcon}
              source={Config.IMG_URL + uuid}
            />
          </Pressable>
          {/* info */}
          <View style={styles.infoWrapper}>
            <Pressable
              style={styles.userInfoWrapper}
              onPress={() => navigation.navigate('SetNickNameScreen')}>
              <Text style={styles.fontStyle}>{nickName}</Text>
              <IconSimpleLineIcons
                name="pencil"
                size={heightScale * 13}
                style={styles.pencilIcon}
                color="white"
              />
            </Pressable>
            <Text
              style={[
                styles.fontStyle,
                {fontWeight: 'normal', fontSize: heightScale * 16},
              ]}>
              {name}
            </Text>
          </View>
        </View>

        <View style={styles.contentStyle}>
          {isAdmin ? (
            <>
              <View
                style={{
                  borderBottomWidth: heightScale * 1,
                  borderBottomColor: '#484848',
                }}>
                <Text style={[styles.contentTitleText, {}]}>게임</Text>
              </View>
              <Pressable
                style={[styles.contentWrapper, {marginTop: heightScale * 13}]}
                onPress={() =>
                  Alert.alert('todo :', 'Admin 게임 기록 구현 예정')
                }>
                <View style={{flex: 1}}>
                  <Text style={styles.contentText}>게임기록</Text>
                </View>
                <View>
                  <IconAntDesign
                    name="right"
                    size={heightScale * 28}
                    color="white"
                  />
                </View>
              </Pressable>
            </>
          ) : (
            <>
              <View
                style={{
                  borderBottomWidth: heightScale * 1,
                  borderBottomColor: '#484848',
                }}>
                <Text style={[styles.contentTitleText, {}]}>티켓</Text>
              </View>
              <Pressable
                style={[styles.contentWrapper, {marginTop: heightScale * 13}]}
                onPress={() => navigation.navigate('MyTicket')}>
                <View style={{flex: 1}}>
                  <Text style={styles.contentText}>마이티켓</Text>
                </View>
                <View>
                  <IconAntDesign
                    name="right"
                    size={heightScale * 28}
                    color="white"
                  />
                </View>
              </Pressable>

              <View
                style={{
                  borderBottomWidth: heightScale * 1,
                  borderBottomColor: '#484848',
                }}>
              <Text style={[styles.contentTitleText, {marginTop: 28}]}>
                게임
              </Text>
              </View>
              <Pressable
                style={[styles.contentWrapper, {marginTop: heightScale * 13}]}
                onPress={() => navigation.navigate('GameHostory')}>
                <View style={{flex: 1}}>
                  <Text style={styles.contentText}>게임 참여 기록</Text>
                </View>
                <View>
                  <IconAntDesign
                    name="right"
                    size={heightScale * 28}
                    color="white"
                  />
                </View>
              </Pressable>
              <View
                style={{
                  borderBottomWidth: heightScale * 1,
                  borderBottomColor: '#484848',
                }}>
              <Text style={[styles.contentTitleText, {marginTop: 28}]}>
                랭킹
              </Text>
              </View>
              <Pressable
                onPress={() => navigation.navigate('MyRanking')}
                style={[styles.contentWrapper, {marginTop: heightScale * 13}]}>
                <View style={{flex: 1}}>
                  <Text style={styles.contentText}>마이 랭킹</Text>
                </View>
                <View>
                  <IconAntDesign
                    name="right"
                    size={heightScale * 28}
                    color="white"
                  />
                </View>
              </Pressable>
            </>
          )}
        </View>
          <Pressable style={{borderTopColor:'#909090',borderTopWidth:heightScale*4,marginTop:heightScale*20}} onPress={logout}>
            <Text style={[styles.contentTitleText,{paddingHorizontal: heightScale * 29,paddingVertical: heightScale * 22}]}>
              로그아웃
            </Text>
          </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'black',
  },
  headerStyle: {
    height: heightScale * 63,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#323232',
  },
  contentStyle: {paddingHorizontal: 24},
  myInfoStyle: {
    flexDirection: 'row',
    paddingHorizontal: heightScale * 25,
    marginVertical: heightScale * 42,
  },
  infoWrapper: {
    justifyContent: 'center',
    paddingHorizontal: heightScale * 29,
  },
  userInfoWrapper: {
    flexDirection: 'row',
  },
  pencilIcon: {bottom: heightScale * 5, padding: heightScale * 4},
  userIcon: {
    height: heightScale * 115,
    width: heightScale * 115,
    borderRadius: 100,
    // resizeMode:'center',
    // aspectRatio: 1.5
  },
  fontStyle: {
    fontSize: heightScale * 17,
    fontWeight: 'bold',
    color: 'white',
    paddingVertical: heightScale * 4.5,
  },
  contentTitleText: {
    fontWeight:'bold',
    fontSize: heightScale * 20,
    color: 'white',
    paddingVertical: heightScale * 8,
  },
  contentTitleWrapper : {
    borderBottomWidth: heightScale * 1,
    borderBottomColor: '#484848',
    backgroundColor: 'red',
  },
  contentText: {
    fontSize: heightScale * 16,
    fontWeight:'bold',
    color: 'white',
  },
  contentWrapper: {
    paddingVertical: heightScale * 13,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
export default MyPage;
