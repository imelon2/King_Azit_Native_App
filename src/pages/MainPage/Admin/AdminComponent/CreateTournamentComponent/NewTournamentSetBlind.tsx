import {FontStyle, GlobalStyles, headerIconSize, heightData, widthData} from '@/modules/globalStyles';
import {Pressable, Text, TextInput, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import RNPickerSelect, {Item} from 'react-native-picker-select';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';
import {styles} from '../../AdminStyles/NewTournamentStyles';
import {BottomMaxButton} from '@/components/Button';
import {IBlindBookmarks, IBlindTitle, NEW_INIT_BLIND} from '@/config/blind';
import {CUSTOM, checkBlind, getBlindBookmarks, mergeBlindBookmarks} from '@/modules/BlindBookmarks';
import BlindStructure from './BlindStructure';
import {Header} from '@/components/Header';
import {useCallback, useEffect, useState} from 'react';
import {PopupWrapper} from '@/components';
import {Popup_SetBookmark} from './Popup_SetBookmark';

const NewTournamentSetBlind = ({...props}) => {
  const BlindTitle: IBlindTitle[] = ['SB', 'BB', 'Ante'];
  const {
    getBookmarks,
    onChangeTitle,
    onChangeBlindBookmarks,
    setIsAntes,
    setBlind,
    setBlindTime,
  } = props;

  const {blindBookmarksPickerItems, selectedBookmark, blind, isAntes, blindTime} = props;
  const [showPopup, setShowPopup] = useState(false);
  const onChangeBlindTime = (time: any) => {
    if (time == '0') return;
    setBlindTime(time);
  };

  const onChangeBlind = (data: string, index: number, key: IBlindTitle) => {
    if (data.length == 2 && data[0] == '0') return;
    
    let prev = [...blind];
    prev[index][key] = data;
    setBlind(prev);

    // Caching Custom Data
    if(!selectedBookmark) CUSTOM[index][key]=data
  };

  const addBlindStruct = () => {
    let prev = [...blind]
    prev.push(NEW_INIT_BLIND());
    setBlind(prev);

     // Caching Custom Data
    if(!selectedBookmark) CUSTOM.push(NEW_INIT_BLIND())
  };

  const removeBlindStruct = (index: number) => {
    let prev = [...blind];
    if (prev.length == 1) return; // 무조건 한줄은 있어야함
    prev.splice(index, 1);
    setBlind(prev);

     // Caching Custom Data
    if(!selectedBookmark) CUSTOM.splice(index,1)
  };

  const saveBookmark = async (title: string) => {
    let newBookmark: IBlindBookmarks = {
      [title]: {
        time: blindTime,
        structs: blind,
      },
    };
    await mergeBlindBookmarks(newBookmark);
    console.log('Success Save Bookmark');
  };

  return (
    <>
      {/* header */}
      <Header
        title="블라인드"
        leftIcon={() => (
          <IconAntDesign name="close" size={headerIconSize} color="white" onPress={() => onChangeTitle('상세정보')} />
        )}
        rightIcon={() => (
          <IconFeather name="bookmark" size={headerIconSize} color="white" onPress={() => setShowPopup(true)} />
        )}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'handled'}
        bounces={false}
        style={{
          paddingHorizontal: 20 * heightData,
        }}>
        {/* 즐겨찾기에서 방 설정 블러오기 */}
        <View style={{marginTop: 18 * widthData}}>
          <Text style={[FontStyle.fs16, FontStyle.fwBold, styles.titleStyle]}>즐겨찾기에서 방 설정 블러오기</Text>
          {/* 즐겨찾기 DropDown Component */}
          <View
            style={[
              styles.tableSelect,
              {marginTop: 10 * heightData},
              checkBlind(blind[0]) ? styles.textInputOn : styles.textInputOff,
            ]}>
            <View style={styles.downIcon}>
              <IconAntDesign
                name="down"
                size={heightData * 22}
                color={checkBlind(blind[0]) ? '#F5FF82' : '#77777777'}
              />
            </View>
            <RNPickerSelect
              onOpen={getBookmarks}
              onValueChange={onChangeBlindBookmarks}
              value={selectedBookmark}
              placeholder={{
                key: 1,
                label: 'Custom',
                value: '',
                color: '#777777',
              }}
              items={blindBookmarksPickerItems}
              style={{
                viewContainer: {
                  justifyContent: 'center',
                  paddingLeft: widthData * 10,
                },
                placeholder: {fontWeight: '300', color: '#fff', fontSize: 16},
                inputIOS: {color: '#fff', fontSize: heightData * 16},
                inputAndroid: {color: '#fff', fontSize: heightData * 16},
              }}
            />
          </View>
        </View>
        {/* 블라인드 길이 */}
        <View style={{marginTop: 30 * widthData}}>
          <Text style={[FontStyle.fs16, FontStyle.fwBold, styles.titleStyle]}>블라인드 길이</Text>
          {/* Antes */}
          <Text style={[FontStyle.fs16, FontStyle.fwBold, {marginTop: widthData * 12}]}>Antes</Text>
          <View style={{flexDirection: 'row', marginTop: heightData * 8}}>
            <Pressable
              onPress={() => setIsAntes(true)}
              style={[
                styles.isAntesButtonWrapper,
                GlobalStyles.flexCenter,
                isAntes ? styles.isAntesTrue : styles.isAntesFalse,
              ]}>
              <Text style={isAntes ? {color: '#121212'} : styles.textFontOff}>Yes</Text>
            </Pressable>
            <Pressable
              onPress={() => setIsAntes(false)}
              style={[
                {marginLeft: widthData * 24},
                styles.isAntesButtonWrapper,
                GlobalStyles.flexCenter,
                !isAntes ? styles.isAntesTrue : styles.isAntesFalse,
              ]}>
              <Text style={!isAntes ? {color: '#121212'} : styles.textFontOff}>No</Text>
            </Pressable>
          </View>
          {/* Blind 길이 고정값 */}
          <Text style={[FontStyle.fs16, FontStyle.fwBold, {marginTop: widthData * 24}]}>Blind 길이 고정값 (Min.)</Text>
          <TextInput
            onChangeText={onChangeBlindTime}
            keyboardType="number-pad"
            style={[
              styles.textInput,
              FontStyle.fs16,
              {width: widthData * 130},
              blindTime ? styles.textInputOn : styles.textInputOff,
            ]}
            placeholderTextColor={'#929292'}
            placeholder="Min."
            value={blindTime}
          />
        </View>
        <View style={{marginTop: heightData * 30}}>
          <View style={{flexDirection: 'row', marginLeft: widthData * 22, marginBottom: 5}}>
            {BlindTitle.map((title, i) => (
              <Text key={i} style={[FontStyle.fs16, styles.blindStructTitle]}>
                {title}
              </Text>
            ))}
          </View>
          {blind.map((_blind: any, i: number) => (
            <BlindStructure
              key={i}
              index={i}
              blind={_blind}
              onChangeBlind={onChangeBlind}
              removeBlindStruct={removeBlindStruct}
              isAntes={isAntes}
            />
          ))}
          <Pressable onPress={addBlindStruct} style={styles.blindAddLevelBtn}>
            <Text style={FontStyle.fs18}>Level 추가</Text>
          </Pressable>
        </View>

        {/* 다음 버튼 */}
        <View style={{marginTop: 200 * heightData}}>
          <BottomMaxButton
            title="확인"
            backgroundColor="#F5FF82"
            color="#000"
            componentStyle={{position: 'absolute', bottom: 0}}
            onPress={() => onChangeTitle('상세정보')}
          />
        </View>
      </KeyboardAwareScrollView>
      {showPopup ? (
        <PopupWrapper PopupComponent={<Popup_SetBookmark setShowPopup={setShowPopup} saveBookmark={saveBookmark} />} />
      ) : (
        <></>
      )}
    </>
  );
};

export default NewTournamentSetBlind;
