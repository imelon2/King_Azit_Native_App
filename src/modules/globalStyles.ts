import {Dimensions, StyleSheet} from 'react-native';
export const {height, width} = Dimensions.get('window');
export const basicDimensions = {
  // 디자이너가 작업하고 있는 XD파일 스크린의 세로,가로
  height: 800,
  width: 360,
};

export const heightData = Number(
  // 높이 변환 작업
  (Dimensions.get('screen').height * (1 / basicDimensions.height)).toFixed(2),
);

export const widthData: number = Number(
  // 가로 변환 작업
  (Dimensions.get('screen').width * (1 / basicDimensions.width)).toFixed(2),
);


export const HeaderStyle = StyleSheet.create({
  container: {
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
    marginTop: (heightData * (61 - 28)) / 2,
    marginLeft: heightData * 15,
  },
  headerRightIcon: {
    position: 'absolute',
    right: heightData * 15,
    top: (heightData * (61 - 28)) / 2,
  },
});

export const FontStyle = StyleSheet.create({
  fs10: {
    fontSize: heightData * 10,
    color: 'white',
  },
  fs12: {
    fontSize: heightData * 12,
    color: 'white',
  },
  fs14: {
    fontSize: heightData * 14,
    color: 'white',
  },
  fs15: {
    fontSize: heightData * 15,
    color: 'white',
  },
  fs16: {
    fontSize: heightData * 16,
    color: 'white',
  },
  fs18: {
    fontSize: heightData * 18,
    color: 'white',
  },
  fs20: {
    fontSize: heightData * 20,
    color: 'white',
  },
  fs22: {
    fontSize: heightData * 22,
    color: 'white',
  },
  fwBold: {
    fontWeight: 'bold',
  },
  fw600: {
    fontWeight: '600',
  },
  fw400: {
    fontWeight: '400',
  },
});

export const GlobalStyles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
  },
  flexCenter: {alignItems: 'center', justifyContent: 'center'},
});

export const headerIconSize = heightData * 26;
