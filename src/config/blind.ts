import { Item } from "react-native-picker-select";
import { TicketType } from "./tickets";

export type IBlindTitle = 'SB' | 'BB' | 'Ante';
export type IBlind = {
  [key in IBlindTitle]: number | string;
};
export type IBlindBookmarks = {
  [key: string]: {
    time:string;
    structs:IBlind[];
  }
};

export type IGradeTitle = "ticket" | "count" |"point"
export type IGrade = {
  ticket : TicketType,
  count : string,
  point : string
}


export const INIT_DATE = 'YYY.DD.MM';
export const INIT_TIME = '00:00 AM';
export const NEW_INIT_BLIND = ():IBlind => {
  return {
    "SB":"",
    "BB":"",
    "Ante":""
  }
}

export const NEW_INIT_GRADE = ():IGrade => {
  return {
    "ticket":"",
    "count":"",
    "point":""
  }
}

export const TicketPickerItems: Item[] = [
  {
    key: 1,
    label: '블랙티켓',
    value: 'black' as TicketType,
  },
  {
    key: 2,
    label: '레드티켓',
    value: 'red' as TicketType,
  },
  {
    key: 3,
    label: '골드 NFT',
    value: 'gold' as TicketType,
  },
];