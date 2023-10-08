import {TicketPickerItems} from '@/config';
import {heightData, widthData, FontStyle} from '@/modules';
import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {styles as comStyle} from '../../AdminStyles/NewTournamentStyles';
import RNPickerSelect from 'react-native-picker-select';
import IconAntDesign from 'react-native-vector-icons/AntDesign';

const GradeStructure = ({...props}) => {
  const {onChangeGrade, removeGradeStruct} = props;
  const {index, grade} = props;
  
  return (
    <View style={style.containter}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Text style={FontStyle.fs15}>{index + 1}등</Text>
        <View style={{flex: 1, alignItems: 'flex-end', marginRight: 14 * widthData}}>
          <IconAntDesign name="close" size={25 * heightData} color="white" onPress={() => removeGradeStruct(index)}/>
        </View>
      </View>
      <Text style={[FontStyle.fs14, {marginTop: 10}]}> 티켓 종류</Text>
      <View
        style={[
            style.tableSelect,
          {marginTop: 10 * heightData},
          grade.ticket ? comStyle.textInputOn : comStyle.textInputOff,
        ]}
        >
        <View style={comStyle.downIcon}>
          <IconAntDesign name="down" size={heightData * 22} color={grade.ticket ? '#F5FF82' : '#77777777'} />
        </View>
        <RNPickerSelect
          onValueChange={data => onChangeGrade(data, index, 'ticket')}
          placeholder={{
            key: 1,
            label: '티켓',
            value: '',
            color: '#777777',
          }}
          items={TicketPickerItems}
          style={{
            viewContainer: {
              justifyContent: 'center',
              paddingLeft: widthData * 13,
            },
            inputIOS: {color: '#fff', fontSize: heightData * 16},
            inputAndroid: {color: '#fff', fontSize: heightData * 16},
          }}
        />
      </View>
      <View style={{flexDirection: 'row', marginTop: 23 * heightData}}>
        <View style={[style.countWrapper, {marginRight: 20}]}>
          <Text style={FontStyle.fs14}>개수</Text>
          <TextInput
            keyboardType="number-pad"
            value={grade.count}
            onChangeText={data => onChangeGrade(data, index, 'count')}
            placeholder="장"
            placeholderTextColor={'#777777'}
            style={[
              style.countTextinputStyle,
              grade.count ? comStyle.textInputOn : comStyle.textInputOff,
              grade.count ? comStyle.textFontOn : comStyle.textFontOff,
            ]}
          />
        </View>
        <View style={[style.countWrapper, {marginLeft: 20}]}>
          <Text style={FontStyle.fs14}>승점</Text>
          <TextInput
            keyboardType="number-pad"
            value={grade.point}
            onChangeText={data => onChangeGrade(data, index, 'point')}
            placeholder="pt"
            placeholderTextColor={'#777777'}
            style={[
              style.countTextinputStyle,
              grade.point ? comStyle.textInputOn : comStyle.textInputOff,
              grade.point ? comStyle.textFontOn : comStyle.textFontOff,
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  containter: {
    paddingTop: 30 * heightData,
    paddingHorizontal: 20 * widthData,
    paddingBottom: 27,
    borderBottomWidth: 2,
    borderBottomColor: '#222222',
  },
  tableSelect: {
    backgroundColor: '#222',
    height: 46 * heightData,
    borderWidth: 1,
    borderRadius: 4,
    marginTop: 20 * heightData,
    justifyContent: 'center',
  },
  countWrapper: {
    flex: 1,
  },
  countTextinputStyle: {
    height: 50 * heightData,
    marginTop: 10 * heightData,
    borderWidth: 1,
    borderColor: '#777777',
    backgroundColor: '#222222',
    borderRadius: 4,
    paddingLeft: 14,
  },
});

export default GradeStructure;
