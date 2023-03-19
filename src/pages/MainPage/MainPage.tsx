import React, {useState, useEffect} from 'react';
import getProfileImage from '../../hooks/getProfileImage';
import getTickets from '../../hooks/getTickets';
import MainPageAdmin from './Compoents/MainPageAdmin';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/reducer';
import MainPageUser from './Compoents/MainPageUser';

function MainPage() {
  // Only ROLE_ADMIN
  const {roles} = useSelector((state: RootState) => state.user);
  const isAdmin = roles.find((e: string) => e == 'ROLE_ADMIN');

  // 현재 유저 보유 티켓 가져오기
  getTickets();
  // 현재 유저 프로필 이미지 가져오기
  getProfileImage();

  return (
    <>
      {isAdmin && <MainPageAdmin />}
      {!isAdmin && (<MainPageUser />)}
    </>
  );
}

export default MainPage;
