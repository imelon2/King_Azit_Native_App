import React, { useCallback, useState } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {HomeRootStackParamList} from '../../../AppInner'
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
// import * as ImagePicker from 'expo-image-picker';
import ImageResizer from 'react-native-image-resizer';
import {heightData} from '../../modules/globalStyles';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const heightScale = heightData;

function MyPage() {
    const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();
    const [preview, setPreview] = useState<{uri: string|null}>();
  
    const onResponse = useCallback(async (response:any) => {
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

        const image= {
            uri: r.uri,
            name: r.name,
            type: response.mime,
        }

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
      cropping:true
    }).then(onResponse)
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

  return (
    <SafeAreaView>
        <ScrollView style={styles.container}>
        <View style={styles.headerStyle}>
            <Text style={styles.fontStyle}>마이 페이지</Text>
        </View>
        <View style={styles.myInfoStyle} >
            <Pressable onPress={onChangeFile}>
            <Image
            source={preview ? preview : require('../../assets/UserIcon.png')}
            style={styles.userIcon}
            />
            </Pressable>
            <Pressable style={styles.userInfoWrapper} onPress={() => navigation.navigate('SetNickNameScreen')}>
                <Text style={styles.fontStyle}>한나피쉬</Text>
                <IconSimpleLineIcons
                    name="pencil"
                    size={heightScale * 13}
                    style={styles.pencilIcon}
                    color="black"
                />
            </Pressable>
        </View>
        <View style={styles.contentStyle}>
            <View
            style={[styles.contentWrapper,{marginTop: heightScale * 13}]}>
            <View style={{flex: 1}}>
                <Text style={styles.contentTitleText}>마이티켓</Text>
            </View>
            <View>
                <IconAntDesign name="right" size={heightScale * 28} color='#000000'/>
            </View>
            </View>

            <Text style={[styles.contentTitleText, {marginTop: 28}]}>마이게임</Text>
            <View style={[styles.contentWrapper,{marginTop: heightScale * 13}]}>
            <View style={{flex: 1}}>
                <Text style={styles.contentText}>게임 참여 기록</Text>
            </View>
            <View>
                <IconAntDesign name="right" size={heightScale * 28} color='#000000'/>
            </View>
            </View>
            <Text style={[styles.contentTitleText, {marginTop: 28}]}>랭킹</Text>
            <View style={[styles.contentWrapper,{marginTop: heightScale * 13}]}>
            <View style={{flex: 1}}>
                <Text style={styles.contentText}>마이 랭킹</Text>
            </View>
            <View>
                <IconAntDesign name="right" size={heightScale * 28} color='#000000'/>
            </View>
            </View>
            <Text style={[styles.contentTitleText, {marginVertical: 28}]}>
            로그아웃
            </Text>
        </View>
        </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'white',
  },
  headerStyle: {
    height: heightScale * 61,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: '#D9D9D9',
  },
  contentStyle: {paddingHorizontal: 24},
  myInfoStyle: {
    // backgroundColor: '#D5E3F2',
    height: heightScale * 256,
    alignItems: 'center',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    left: (heightScale * (13 + 2)) / 2,
    marginTop: heightScale * 15,
  },
  pencilIcon: {bottom: heightScale * 9, padding: heightScale * 2},
  userIcon: {
    backgroundColor:'white',
    height: heightScale * 108,
    width: heightScale * 108,
    marginTop: heightScale * 42,
    borderRadius:100,
    resizeMode:'center'
  },
  fontStyle: {fontSize: heightScale * 18, fontWeight: 'bold', color: 'black'},
  contentTitleText: {
    fontSize: heightScale * 20,
    color: '#000000',
  },
  contentText:{
    fontSize: heightScale * 16,
    color: '#000000',
  },
  contentWrapper: {
    borderBottomWidth: heightScale*1,
    borderBottomColor:'#D9D9D9',
    paddingVertical: heightScale * 19,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
export default MyPage;
