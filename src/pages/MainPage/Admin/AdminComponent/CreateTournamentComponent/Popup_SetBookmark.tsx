import {FontStyle, GlobalStyles, heightData, widthData} from '@/modules';
import { Dispatch, SetStateAction, useState } from 'react';
import {View, Text, StyleSheet, TextInput, Pressable, Alert} from 'react-native';

type IProps = {
    setShowPopup:Dispatch<SetStateAction<boolean>>;
    saveBookmark:(title:string) => Promise<void>;
}

export const Popup_SetBookmark = (props:IProps) => {
    const {setShowPopup, saveBookmark} = props
    const [bookmarkTitle,setBookmarkTitle] = useState('')

    /**
     * @title Bookmark의 Title 변경 함수
     * @description TextInput onChangeText 이벤트 호출 시 title 변경하는 함수
     * @param _title 새롭게 등록될 Bookmark의 Title
     */
    const onChangeTitle = (_title:string) => {
        if(_title.length == 10) return; // Title 최대 10자
        setBookmarkTitle(_title)
    }

    const handleClosePopup = () => {
        setBookmarkTitle('')
        setShowPopup(false);
    }

    const handleSaveBookmark = () => {
        if(!bookmarkTitle) {
            Alert.alert('알림','즐겨찾기의 제목을 입력해주세요.');
            return;
        }
        saveBookmark(bookmarkTitle)
        setShowPopup(false)
    }

  return (
    <View style={style.container}>
      <Text style={[FontStyle.fs18, FontStyle.fw600, style.titleStyle]}>즐겨찾기에 추가하기</Text>
      <TextInput
        style={style.textInputStyle}
        onChangeText={onChangeTitle}
        placeholder="제목을 입력해주세요 (최대 10자)"
        placeholderTextColor={'#929292'}
        value={bookmarkTitle}
        multiline={true}
      />
      <Text style={[FontStyle.fs12, style.infoMsgStyle]}>*현재 입력된 내용으로 즐겨찾기에 추가 됩니다.</Text>
      <View style={{flexDirection:'row',marginTop:30 * heightData}}>
        <Pressable onPress={handleClosePopup} style={[GlobalStyles.flexCenter,style.buttonWrapper]}>
            <Text style={[style.buttonTextstyle,{color:'#F5FF82'}]}>취소</Text>
        </Pressable>
        <Pressable onPress={handleSaveBookmark} style={[GlobalStyles.flexCenter,style.buttonWrapper,{backgroundColor:'#F5FF82'}]}>
            <Text style={style.buttonTextstyle}>추가</Text>
        </Pressable>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: 320 * widthData,
    height: 250 * heightData,
    backgroundColor: '#353535',
    borderRadius: 16,
    alignItems: 'center',
  },
  titleStyle: {
    marginTop: 17 * heightData,
  },
  textInputStyle: {
    marginTop: heightData * 18,
    width: 280 * widthData,
    height: 65 * heightData,
    backgroundColor: '#222222',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#F5FF82',
    paddingLeft: 8,
    paddingTop: 10,
    fontSize: 15,
    color:'#fff'
  },
  infoMsgStyle: {color: '#F5FF82', width: 280 * widthData, marginTop: 5},
  buttonWrapper : {
    width: 125 * widthData,
    height: 50 * heightData,
    borderRadius:6,
    borderWidth:1,
    borderColor:'#F5FF82',
    marginHorizontal:12 * widthData
  },
  buttonTextstyle : {
    fontSize:15,
    fontWeight:'500'
  }
});
