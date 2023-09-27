export type IBlindTitle = 'SB' | 'BB' | 'Ante';
export type IBlind = {
  [key in IBlindTitle]: number | string;
};
export type IBlindBookmarks = {
  [key: string]: IBlind[];
};

export const INIT_DATE = 'YYY.DD.MM';
export const INIT_TIME = '00:00 AM';
export const INIT_BLIND = () => {
  return {
    "SB":"",
    "BB":"",
    "Ante":""
  }
}