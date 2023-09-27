import {IBlind, IBlindBookmarks, IBlindTitle} from '@/config/blind';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 더미데이터
const list: IBlindBookmarks = {
  bookmarkTitle1: [
    {
      SB: '100',
      BB: '200',
      Ante: '0',
    },
    {
      SB: '200',
      BB: '400',
      Ante: '0',
    },
    {
      SB: '200',
      BB: '400',
      Ante: '0',
    },
    {
      SB: '200',
      BB: '400',
      Ante: '0',
    },
    {
      SB: '200',
      BB: '400',
      Ante: '0',
    },
    {
      SB: '200',
      BB: '400',
      Ante: '0',
    },
  ],
  bookmarkTitle2: [
    {
      SB: '100',
      BB: '200',
      Ante: '0',
    },
  ],
};

/**
 * @description Local에 저장된 Blind Bookmarks 읽기(READ) 함수
 * @returns Local에 저장된 Blind Bookmarks
 */
export const getBlindBookmarks = async () => {
  const data: IBlindBookmarks | null =
    ((await AsyncStorage.getItem('blindBookmarks')) as unknown as IBlindBookmarks) || list
  return data;
};

/**
 * 
 * @param blind 블라인드(SB/BB/Ante)
 * @description 블라인드 구조의 SB/BB/Ante가 모두 입력되었는지 검사 기능
 * @returns SB/BB/Ante가 모두 입력되었경우 true, 아닌 경우 false
 */
export const checkBlind = (blind:IBlind) => {
  return Object.keys(blind).every((val) => blind[val as IBlindTitle]);
};
