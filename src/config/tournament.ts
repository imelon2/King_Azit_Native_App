export type IHeaderTitle = '상세정보' | '프라이즈' | '블라인드' | '참가자 현황';
export type IPrizeInfo = {
  rank: string | number;
  prize: string;
  point: string | number;
};
export type IBlindInfo = {
  level: string | number;
  blinds: string;
  ante: string | number;
};
export type IProfileInfo = {
  uuid: string;
  nickName: string;
};
