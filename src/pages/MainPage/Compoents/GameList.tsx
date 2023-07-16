import React, {useEffect, useState} from 'react';
import {heightScale, MainStyles} from '../../../modules/MainStyles';
import GameBox from './GameBox';
import {View, Text, Pressable} from 'react-native';
import Modal from 'react-native-modal';
import MemberModal from '../MainPageModal/MemberModal';
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/reducer';
import getGameList, { getGameListArr, roomType } from '../../../hooks/getGameList';

/**
 * DEPRECATED
 * 게임 리스트 페이지
 */
const GameList = () => {
  const [gameBox, setGameBox] = useState<roomType[]>([]);
  const [menu, setMenu] = useState([
    {name: 'playing', state: true},
    {name: 'waiting', state: false},
    {name: 'closed', state: false},
  ]);
  const gameData:any = useSelector((state: RootState) => state.games);
  const [playMemberStatus, setPlayMemberStatus] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState<string>();
  
  // Socket
  getGameList();

  useEffect(() => {
    const arr = getGameListArr(gameData);
    setGameBox([...arr]);
  },[gameData])

  // Game List 분류작업
  const setGameBoxArr = () => {
    const curr = menu.find(i => i.state);
    const sort = gameBox!.filter(i => {
      if(curr?.name == "waiting") {
        return i.status == curr?.name || i.status == "break"
      }
       return i.status == curr?.name
    });
    if (sort.length == 0) {
      let _name;
      if (curr?.name == 'playing') _name = '진행중인';
      else if (curr?.name == 'waiting') _name = '대기중인';
      else if (curr?.name == 'closed') _name = '마감된';
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

  const onClickMember = (gameId:string) => {
    setSelectedGameId(gameId)
    setPlayMemberStatus(true);
  };

  return (
    <View>
      {/* 게임 메뉴 Header */}
      <View style={MainStyles.gameMenuWrapper}>
        {menu.map(text => {
          let _name;
          if (text.name == 'playing') _name = '진행중';
          else if (text.name == 'waiting') _name = '대기중';
          else if (text.name == 'closed') _name = '마감';
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

      <Modal isVisible={playMemberStatus}>
        <MemberModal setPlayMemberStatus={setPlayMemberStatus} selectedGameId={selectedGameId!}/>
      </Modal>
    </View>
  );
};

export default GameList;
