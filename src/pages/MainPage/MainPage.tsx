import React, {useState, useEffect} from 'react';
import getTickets from '../../hooks/getTickets';
import MainPageAdmin from './Admin/MainPageAdmin';
import {useSelector} from 'react-redux';
import {RootState} from '../../store/reducer';
import MainPageUser from './User/MainPageUser';

function MainPage() {
  // Only ROLE_ADMIN
  const {roles} = useSelector((state: RootState) => state.user);
  const isAdmin = roles.find((e: string) => e == 'ROLE_ADMIN');

  // 현재 유저 보유 티켓 가져오기
  const [refreshTickets] = getTickets();
  refreshTickets();
  
  return (
    <>
      {!isAdmin && <MainPageAdmin />}
      {!isAdmin && (<MainPageUser />)}
    </>
  );
}

export default MainPage;
