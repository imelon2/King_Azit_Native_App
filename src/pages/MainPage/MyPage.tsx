import React, { useCallback } from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import IconSimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import {heightData} from '../../modules/globalStyles';
const heightScale = heightData;

function MyPage() {
  const onChangeFile = useCallback(() => {
    return ImagePicker.openPicker({
      includeExif: true,
      includeBase64: true,
      mediaType: 'photo',
    })
      .then((data) => console.log(data)
      )
      .catch(console.log);
  }, []);

  return (
    <SafeAreaView>
    <ScrollView style={styles.container}>
      <View style={styles.headerStyle}>
        <Text style={styles.fontStyle}>마이 페이지</Text>
      </View>
      <View style={styles.myInfoStyle} >
        <Pressable onPress={onChangeFile}>
        <Image
          source={require('../../assets/UserIcon.png')}
          style={styles.userIcon}
          />
          </Pressable>
        <View style={styles.userInfoWrapper}>
          <Text style={styles.fontStyle}>한나피쉬</Text>
          <IconSimpleLineIcons
            name="pencil"
            size={heightScale * 13}
            style={styles.pencilIcon}
            color="black"
          />
        </View>
      </View>
      <View style={styles.contentStyle}>
        <Text style={styles.contentTitleText}>마이티켓</Text>
        <View
          style={[styles.contentWrapper,{marginTop: heightScale * 13}]}>
          <View style={{flex: 1}}>
            <Text style={styles.contentText}>보유 티켓</Text>
          </View>
          <View>
            <IconAntDesign name="right" size={heightScale * 28} color='#000000'/>
          </View>
        </View>
        <View style={styles.contentWrapper}>
          <View style={{flex: 1}}>
            <Text style={styles.contentText}>티켓 사용 내역</Text>
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
    height: heightScale * 108,
    width: heightScale * 108,
    marginTop: heightScale * 42,
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
