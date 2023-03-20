import React, {useEffect, useState} from 'react';
import useSocket from '../../../hooks/useSocket';
import {heightScale, MainStyles} from '../../../modules/MainStyles';
import GameBox, {roomType} from './GameBox';
import {View, Text, Pressable} from 'react-native';
import Modal from 'react-native-modal';
import GuestJoin from '../MainPageModal/GuestJoin';
import MemberModal from '../MainPageModal/MemberModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import { useAppDispatch } from '../../../store';
import gamesSlice from '../../../slices/games';
import getGameList, { getGameListArr } from '../../../hooks/getGameList';


const GameList = () => {
  const [socket, disconnect] = useSocket();
  const [gameBox, setGameBox] = useState<roomType[]>([]);
  const [menu, setMenu] = useState([
    {name: 'playing', state: true},
    {name: 'waiting', state: false},
    {name: 'end', state: false},
  ]);
  const dispatch = useAppDispatch();
  const gameData:any = useSelector((state: RootState) => state.games);
  const [selectGameItems, setSelectGameItems] = useState<roomType>();
  const [playMemberStatus, setPlayMemberStatus] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  
  // Socket
  getGameList();

  useEffect(() => {
    // console.log(gameData['constructor']);
    const arr = getGameListArr(gameData);
    setGameBox([...arr]);
  },[gameData])

  // Game List 분류작업
  const setGameBoxArr = () => {
    const curr = menu.find(i => i.state);
    const sort = gameBox!.filter(i => i.status == curr?.name);
    if (sort.length == 0) {
      let _name;
      if (curr?.name == 'playing') _name = '진행중인';
      else if (curr?.name == 'waiting') _name = '대기중인';
      else if (curr?.name == 'end') _name = '마감된';
      return (
        <View style={MainStyles.noGameBoxContainer}>
          <Text style={{color: '#A1A1A1', fontSize: heightScale * 18}}>
            현재 {_name} 게임이 없습니다.
          </Text>
        </View>
      );
    }
    return sort.map(item => (
      <GameBox
        key={item.game_id}
        item={item}
        onClickJoinButton={onClickJoinButton}
        onClickMember={onClickMember}
      />
    ));
  };

  const onMemu = (text: string) => {
    const currentMunu = [...menu];
    currentMunu.map(item => {
      if (item.name === text) {
        item.state = true;
      } else {
        item.state = false;
      }
    });
    setMenu(currentMunu);
  };

  const onClickMember = () => {
    setPlayMemberStatus(true);
  };

  const onClickJoinButton = (items: roomType) => {
    setSelectGameItems(items);
    setModalStatus(true);
  };

  return (
    <View>
      {/* 게임 메뉴 Header */}
      <View style={MainStyles.gameMenuWrapper}>
        {menu.map(text => {
          let _name;
          if (text.name == 'playing') _name = '진행중';
          else if (text.name == 'waiting') _name = '대기중';
          else if (text.name == 'end') _name = '마감';
          return (
            <Pressable
              style={MainStyles.gameMenuComponent}
              key={text.name}
              onPress={() => onMemu(text.name)}>
              <Text style={MainStyles.gameMenuText}>{_name}</Text>
              <View
                style={text.state ? MainStyles.onGameMenu : {display: 'none'}}>
                <View style={MainStyles.onGameMenuEdge}></View>
                <View style={MainStyles.onGameMenuBody}></View>
                <View style={MainStyles.onGameMenuEdge}></View>
              </View>
            </Pressable>
          );
        })}
      </View>
      {/* Game List */}
      <View style={{alignItems: 'center'}}>
        {/* game room component */}
        {setGameBoxArr()}
      </View>

      <Modal isVisible={modalStatus} style={{flex: 1}}>
        <GuestJoin setModalStatus={setModalStatus} item={selectGameItems!} />
      </Modal>

      <Modal isVisible={playMemberStatus}>
        <MemberModal setPlayMemberStatus={setPlayMemberStatus} />
      </Modal>
    </View>
  );
};

export default GameList;
