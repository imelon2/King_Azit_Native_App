import React, {useCallback, useState} from 'react';
import {
  Image,
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
// import * as ImagePicker from 'expo-image-picker';
import ImageResizer from 'react-native-image-resizer';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {heightData} from '../../modules/globalStyles';
import {useAppDispatch} from '../../store';
import EncryptedStorage from 'react-native-encrypted-storage';
import userSlice from '../../slices/user';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/reducer';

const heightScale = heightData;
 
function MyPage() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp<MyPageRootStackParamList>>();
  const [preview, setPreview] = useState<{uri: string | null}>();
  const nickname = useSelector((state: RootState) => state.user.nickName);
  const name = useSelector((state: RootState) => state.user.name);


  const onResponse = useCallback(async (response: any) => {
    // Expo 개발용
    // if(response.base64 === undefined) {
    //   return;
    // }
    // console.log(response.width, response.height, response.exif);
    setPreview({uri: `data:${response.mime};base64,${response.data}`});
    // setPreview({uri: `data:jpeg;base64,${response.base64}`}); // Expo

    // exif Orientation 걸릴 경우
    // const orientation = (response.exif as any)?.Orientation; // exif Orientation
    // console.log('orientation', orientation);
    return ImageResizer.createResizedImage(
      response.path,
      600, // width
      600, // height
      response.mime.includes('jpeg') ? 'JPEG' : 'PNG', // format
      // 'JPEG', // Expo format
      100, // quality
      0, // rotation
    ).then(r => {
      console.log(r.size); // r.uri, r.name,

      const image = {
        uri: r.uri,
        name: r.name,
        type: response.mime,
      };

      const formData = new FormData();
      formData.append('image', image);

      // ToDo : Server에 이미지 저장하기
      // try {
      //   await axios.post(`${Config.API_URL}/`, formData, {
      //     headers: {
      //       authorization: `Bearer ${accessToken}`,
      //     },
      //   });
    });
  }, []);

  const onChangeFile = useCallback(() => {
    return ImagePicker.openPicker({
      includeExif: true,
      includeBase64: true,
      mediaType: 'photo',
      cropping: true,
    })
      .then(onResponse)
      .catch(console.log);
  }, [onResponse]);

  // expo 개발용
  // const onChangeFile = useCallback(() => {
  //   return ImagePicker.launchImageLibraryAsync({
  //     exif: true,
  //     base64: true,
  //     mediaTypes:ImagePicker.MediaTypeOptions.All,
  //     allowsEditing:true
  //   })
  //     .then((data) => console.log(data)
  //     )
  //     .catch(console.log);
  // }, []);

  const logout = async () => {
    await EncryptedStorage.removeItem('refreshToken');
    dispatch(userSlice.actions.setUser({access_token: ''}));
  };
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View style={styles.headerStyle}>
          <Text style={styles.fontStyle}>마이 페이지</Text>
        </View>
        <View style={styles.myInfoStyle}>
          {/* icon */}
          <Pressable onPress={onChangeFile}>
            <Image
              source={preview ? preview : require('../../assets/UserIcon.png')}
              style={styles.userIcon}
            />
          </Pressable>
          {/* info */}
          <View style={styles.infoWrapper}>
            <Pressable
              style={styles.userInfoWrapper}
              onPress={() => navigation.navigate('SetNickNameScreen')}>
              <Text style={styles.fontStyle}>{name}</Text>
              <IconSimpleLineIcons
                name="pencil"
                size={heightScale * 13}
                style={styles.pencilIcon}
                color="white"
                />
            </Pressable>
            <Text style={[styles.fontStyle,{fontWeight:'normal',fontSize:heightScale*16}]}>{nickname}</Text>
          </View>
        </View>

        <View style={styles.contentStyle}>
          <Text style={[styles.contentTitleText, {}]}>
            티켓
          </Text>
          <Pressable style={[styles.contentWrapper, {marginTop: heightScale * 13}]}
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

          <Text style={[styles.contentTitleText, {marginTop: 28}]}>
            게임
          </Text>
          <Pressable style={[styles.contentWrapper, {marginTop: heightScale * 13}]}
          onPress={() => navigation.navigate('GameHostory')}
          >
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
          <Text style={[styles.contentTitleText, {marginTop: 28}]}>랭킹</Text>
          <View style={[styles.contentWrapper, {marginTop: heightScale * 13}]}>
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
          </View>
          <Pressable onPress={logout}>
            <Text style={[styles.contentTitleText, {marginVertical: 28}]}>
              로그아웃
            </Text>
          </Pressable>
        </View>
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
    height: heightScale * 61,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#484848',
  },
  contentStyle: {paddingHorizontal: 24},
  myInfoStyle: {
    // backgroundColor: '#D5E3F2',
    flexDirection: 'row',
    paddingHorizontal:heightScale*25,
    marginVertical:heightScale*42
  },
  infoWrapper: {
    justifyContent:'center', 
    paddingHorizontal:heightScale*29
  },
  userInfoWrapper: {
    flexDirection: 'row',
  },
  pencilIcon: {bottom: heightScale * 5, padding: heightScale * 4},
  userIcon: {
    height: heightScale * 108,
    width: heightScale * 108,
    borderRadius: 100,
    // resizeMode: 'center',
  },
  fontStyle: {fontSize: heightScale * 18, fontWeight: 'bold', color: 'white',paddingVertical:heightScale*4.5},
  contentTitleText: {
    // backgroundColor:'orange',
    fontSize: heightScale * 20,
    color: 'white',
  },
  contentText: {
    fontSize: heightScale * 16,
    color: 'white',
  },
  contentWrapper: {
    borderBottomWidth: heightScale * 1,
    borderBottomColor: '#484848',
    paddingVertical: heightScale * 13,
    alignItems: 'center',
    flexDirection: 'row',
  },  
});
export default MyPage;
