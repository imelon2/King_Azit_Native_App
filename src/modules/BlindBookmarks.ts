import {IBlind, IBlindBookmarks, IBlindTitle, IGrade, IGradeTitle} from '@/config/blind';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 더미데이터
const list: IBlindBookmarks = {
  bookmarkTitle2: {
    time: '1',
    structs: [
      {
        SB: '100',
        BB: '200',
        Ante: '0',
      },
    ],
  },
};

export let CUSTOM: IBlind[] = [
  {
    SB: '',
    BB: '',
    Ante: '',
  },
];

export const RESET_CUSTOM = () => {
  CUSTOM = [
    {
      SB: '',
      BB: '',
      Ante: '',
    },
  ];
};

/**
 * @description Local에 저장된 Blind Bookmarks 읽기(READ) 함수
 * @returns Local에 저장된 Blind Bookmarks
 */
export const getBlindBookmarks = async () => {
  let data: IBlindBookmarks | null;
  const _data: string | null = await AsyncStorage.getItem('blindBookmarks');
  if (_data) {
    data = JSON.parse(_data);
  } else {
    data = null;
  }
  return data;
};

/**
 * @description Local에 저장된 Blind Bookmarks 추가 및 업데이트(Update & Merge) 함수
 */
export const mergeBlindBookmarks = async (newBlind: IBlindBookmarks) => {
  await AsyncStorage.mergeItem('blindBookmarks', JSON.stringify(newBlind));
};

/**
 * @param blind 블라인드(SB/BB/Ante)
 * @description 블라인드 구조의 SB/BB/Ante가 모두 입력되었는지 검사 기능
 * @returns SB/BB/Ante가 모두 입력되었경우 true, 아닌 경우 false
 */
export const checkBlind = (blind: IBlind) => {
  return Object.keys(blind).every(val => blind[val as IBlindTitle]);
};

/**
 * @param grade 등수(Ticket Type/count/point)
 * @description 등수 구조의 Ticket Type/count/point가 모두 입력되었는지 검사 기능
 * @returns Ticket Type/count/point가 모두 입력되었경우 true, 아닌 경우 false
 */
export const checkGrade = (grade: IGrade) => {
  return Object.keys(grade).every(val => grade[val as IGradeTitle]);
};

/**
 * @description 토너먼트 생성 시, Antes false인 경우, 전부 0으로 수정
 * @param blinds
 */
export const setAntesZero = (blinds: IBlind[]): IBlind[] => {
  return blinds.map(blind => {
    return {...blind, Ante: '0'};
  });
};
