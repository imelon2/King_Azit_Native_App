import React, {useCallback, useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {HeaderStyle} from '../../../modules/globalStyles';
import {heightScale} from '../../../modules/MainStyles';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {HomeRootStackParamList} from '../../../../AppInner';
import DraggableFlatList, {
  ScaleDecorator,
  RenderItemParams,
} from 'react-native-draggable-flatlist';
import {AxiosError} from 'axios';
import ImageResizer from 'react-native-image-resizer';
import ImagePicker from 'react-native-image-crop-picker';
const {width} = Dimensions.get('window');
type Item = {
  key: string;
  label: string;
};

const NUM_ITEMS = 10;

const initialData: Item[] = [...Array(NUM_ITEMS)].map((d, index) => {
  return {
    key: `item-${index}`,
    label: String(index) + '',
  };
});

function SetBanner() {
  const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();
  const [data, setData] = useState<Item[]>(initialData);
  const [preview, setPreview] = useState<{uri: string}>();
  const [details, setDetails] = useState(false);



  const onChangeFile = useCallback(async () => {
    try {
      const response = await ImagePicker.openPicker({
        includeExif: true,
        includeBase64: true,
        mediaType: 'photo',
        cropping: true,
      });
      // console.log(response.width, response.height, response.exif);
      setPreview({uri: `data:${response.mime};base64,${response.data}`});

      // exif Orientation 걸릴 경우
      // const orientation = (response.exif as any)?.Orientation; // exif Orientation
      // console.log('orientation', orientation);
      const r = await ImageResizer.createResizedImage(
        response.path,
        430, // width
        350, // height
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

      setDetails(true)
    } catch (error) {
      // [Error MSG : User cancelled image selection] :  ImagePicker.openPicker ERROR
      console.log(error as AxiosError);
    }
  }, []);

  const renderItem = ({item, drag, isActive}: RenderItemParams<Item>) => {
    return (
      <ScaleDecorator>
        <Pressable
          style={{
            flexDirection: 'row',
            opacity: isActive ? 0.5 : 1,
            marginTop: heightScale * 20,
          }}
          onLongPress={drag}
          disabled={isActive}>
          <View style={[styles.rowItem]}>
            <View
              style={{
                width: heightScale * 7,
                height: heightScale * 7,
                borderRadius: heightScale * 10,
                backgroundColor: '#C1C1C1',
                marginVertical: heightScale * 1.5,
              }}></View>
            <View
              style={{
                width: heightScale * 7,
                height: heightScale * 7,
                borderRadius: heightScale * 10,
                backgroundColor: '#C1C1C1',
                marginVertical: heightScale * 1.5,
              }}></View>
            <View
              style={{
                width: heightScale * 7,
                height: heightScale * 7,
                borderRadius: heightScale * 10,
                backgroundColor: '#C1C1C1',
                marginVertical: heightScale * 1.5,
              }}></View>
          </View>
          <View
            style={{
              height: heightScale * 120,
              width: '90%',
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 1,
              borderColor: '#ADADAD',
              borderRadius: 12,
            }}>
            <Text style={styles.text}>{item.label}</Text>
          </View>
        </Pressable>
      </ScaleDecorator>
    );
  };

  return (
    <SafeAreaView style={HeaderStyle.container}>
      {/* Header */}
      <View>
        <View style={HeaderStyle.headerStyle}>
          <Text style={HeaderStyle.headerFontStyle}>배너 설정</Text>
        </View>
        <IconAntDesign
          name="left"
          size={heightScale * 28}
          color="white"
          style={HeaderStyle.headerLeftIcon}
          onPress={() => navigation.goBack()}
        />
      </View>
      <View style={{flex: 1}}>
        {details ? (
          <>
            {/* 저장할 이미지 */}
            <KeyboardAwareScrollView bounces={false}>
            <View style={{height: heightScale * 430}}>
              {preview && (
                <Image style={styles.previewImage} source={preview} />
              )}
            </View>
            {/* Page URL 입력란 */}
            <View
              style={{
                marginTop: heightScale * 50,
                marginHorizontal: heightScale * 20,
              }}>
              <Text
                style={{
                  color: '#fff',
                  fontSize: heightScale * 16,
                  marginBottom: heightScale * 13,
                }}>
                Page URL
              </Text>
              <View style={styles.detailsTextInputWrapper}>
                <TextInput
                  style={styles.detailsTextInputStyle}
                  placeholderTextColor={'#848484'}
                  placeholder={'URL을 입력해주세요.'}
                  autoCorrect={false}
                />
              </View>
            </View>
              </KeyboardAwareScrollView>
          </>
        ) : (
          <>
            {/* Add Banner */}
            <Pressable
              onPress={() => onChangeFile()}
              style={[styles.addBannerContainer, styles.center]}>
              <View style={[styles.addBannerWrapper, styles.center]}>
                <Text style={{color: '#fff', fontSize: heightScale * 40}}>
                  +
                </Text>
              </View>
            </Pressable>
            {/* Current Banner List */}
            <View style={{flex: 1}}>
              <DraggableFlatList
                bounces={false}
                data={data}
                onDragEnd={({data}) => setData(data)}
                keyExtractor={item => item.key}
                renderItem={renderItem}
                style={{paddingHorizontal: heightScale * 20}}
              />
            </View>
          </>
        )}

        <View
          style={[
            {
              position: 'absolute',
              width,
              height: heightScale * 70,
              backgroundColor: '#F5FF82',
              bottom: 0,
            },
            styles.center,
          ]}>
          <Text style={{fontSize: heightScale * 20}}>확인</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: {alignItems: 'center', justifyContent: 'center'},
  addBannerContainer: {
    height: heightScale * 200,
    borderWidth: 1,
    borderBottomColor: '#999999',
  },
  addBannerWrapper: {
    backgroundColor: '#272727',
    width: heightScale * 380,
    height: heightScale * 140,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ADADAD',
  },
  rowItem: {
    height: heightScale * 120,
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  previewImage: {
    height: heightScale * 430,
    resizeMode: 'contain',
  },
  detailsTextInputWrapper: {
    height: heightScale * 44,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#F5FF82',
    borderRadius: 5,
  },
  detailsTextInputStyle: {
    paddingVertical: 0,
    fontSize: 16,
    paddingHorizontal: heightScale * 23,
  },
});
export default SetBanner;
