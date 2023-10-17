import {Header} from '@/components/Header';
import {FontStyle, headerIconSize, heightData, widthData} from '@/modules';
import {View, Text, StyleSheet, Alert} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import IconAntDesign from 'react-native-vector-icons/AntDesign';
import {IGradeTitle, NEW_INIT_GRADE} from '@/config/blind';
import {TicketType} from '@/config/tickets';
import GradeStructure from './GradeStructure';
import {BottomMaxButton} from '@/components/Button';


const NewTournamentSetPrize = ({...props}) => {
  const {onChangeTitle, setGrades, checkInputNull,createRoom} = props;
  const {grades} = props;

  const onChangeGrade = (data: string | TicketType, index: number, key: IGradeTitle) => {
    if (data == '0') return;
    let prev = [...grades];
    prev[index][key] = data;
    setGrades(prev);
  };

  const addGradeStruct = () => {
    let prev = [...grades];
    prev.push(NEW_INIT_GRADE());
    setGrades(prev);
  };

  const removeGradeStruct = (index: number) => {
    let prev = [...grades];
    if (prev.length == 1) return; // 무조건 한줄은 있어야함
    prev.splice(index, 1);
    setGrades(prev);
  };

  return (
    <>
      {/* header */}
      <Header
        title="Prize"
        leftIcon={() => (
          <IconAntDesign name="left" size={headerIconSize} color="white" onPress={() => onChangeTitle('상세정보')} />
        )}
      />
      <KeyboardAwareScrollView
        keyboardShouldPersistTaps={'handled'}
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}
        >
        {/* 승점 부여 인원 */}
        <View style={style.grandeLengthWrapper}>
          <Text style={FontStyle.fs15}>승점 부여 인원</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', marginTop: heightData * 12}}>
            <View style={style.grandeLengthStyle}>
              <Text style={FontStyle.fs15}>{grades.length}</Text>
            </View>
            <IconAntDesign name="pluscircleo" size={32} color="#F5FF82" onPress={addGradeStruct} />
          </View>
        </View>
        {/* 등수 리스트 */}
        {grades.map((_grade: any, i: number) => (
          <GradeStructure
            key={i}
            index={i}
            grade={_grade}
            onChangeGrade={onChangeGrade}
            removeGradeStruct={removeGradeStruct}
          />
        ))}
        <View style={{flex: 1}}>
          <BottomMaxButton
            title="확인"
            backgroundColor={checkInputNull("Prize") ? '#F5FF82' : '#808080'}
            color="#000"
            onPress={() => createRoom()}
          />
        </View>
      </KeyboardAwareScrollView>
      {/* 다음 버튼 */}
    </>
  );
};

const style = StyleSheet.create({
  grandeLengthWrapper: {
    marginTop: 22 * heightData,
    paddingBottom: 32 * heightData,
    borderBottomWidth: 4,
    borderBottomColor: '#222222',
    paddingHorizontal: 20 * heightData,
  },
  grandeLengthStyle: {
    justifyContent: 'center',
    backgroundColor: '#222222',
    paddingHorizontal: 10,
    marginRight: widthData * 15,
    width: widthData * 155,
    height: heightData * 40,
    borderWidth: 1,
    borderColor: '#F5FF82',
    borderRadius: 4,
  },
});

export default NewTournamentSetPrize;
