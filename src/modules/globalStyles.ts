import { Dimensions, StyleSheet } from "react-native";
const {height} = Dimensions.get('window')
export const basicDimensions = { // 디자이너가 작업하고 있는 XD파일 스크린의 세로,가로
    height: 926,
    width: 428,
  };

export const heightData = Number(( // 높이 변환 작업
  Dimensions.get('screen').height *
  (1 / basicDimensions.height)
).toFixed(2));

export const widthData:number = Number(( // 가로 변환 작업
  Dimensions.get('screen').width *
  (1 / basicDimensions.width)
).toFixed(2));

export const StringUpperCase = (_string:string) => {
  return _string.charAt(0).toUpperCase() + _string.slice(1)
}

export const HeaderStyle = StyleSheet.create({
  container : {
    height: height,
    backgroundColor: 'black',
  },
  headerStyle: {
    height: heightData * 63,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#323232',
  },
  headerFontStyle: {
    fontSize: heightData * 17,
    fontWeight: 'bold',
    color: 'white',
    paddingVertical: heightData * 4.5,
  },
  headerLeftIcon: {
    position: 'absolute',
    left: heightData*12,
    top: heightData * 12,
  },
  headerRightIcon: {
    position: 'absolute',
    right: heightData*12,
    top: heightData * 12,
  }
});
