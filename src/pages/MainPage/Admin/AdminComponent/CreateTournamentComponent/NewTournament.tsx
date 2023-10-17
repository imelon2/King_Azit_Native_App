import {SafeAreaView} from 'react-native';
import {NavigationProp, useFocusEffect, useNavigation} from '@react-navigation/native';
import {HomeRootStackParamList} from '../../../../../../AppInner';
import React, {useState, useCallback, useEffect} from 'react';
import {GlobalStyles} from '../../../../../modules/globalStyles';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../../store/reducer';
import {Item} from 'react-native-picker-select';
import NewTournamentSetBlind from './NewTournamentSetBlind';
import NewTournamentSetInfo from './NewTournamentSetInfo';
import {IBlind, IGrade, INIT_DATE, INIT_TIME, NEW_INIT_GRADE} from '@/config/blind';
import {CUSTOM, RESET_CUSTOM, checkBlind, checkGrade, getBlindBookmarks, setAntesZero} from '@/modules/BlindBookmarks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NewTournamentSetPrize from './NewTournamentSetPrize';
import {TicketType} from '@/config/tickets';
import { ITournament } from '@/config';

type IHeaderTitle = '상세정보' | 'Prize' | '블라인드';

function NewTournament() {
  const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();
  const {nickName} = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);
  const [currentTitle, setCurrentTitle] = useState<IHeaderTitle>('상세정보');
  const [title, setTitle] = useState<string>('');
  const [gameStart, setGameStart] = useState({
    date: INIT_DATE,
    time: INIT_TIME,
  });
  const [deadline, setDeadline] = useState({
    date: INIT_DATE,
    time: INIT_TIME,
  });
  const [place, setPlace] = useState<string>('');
  const [entryCondition, setEntryCondition] = useState<boolean>(false);
  const [ticket, setTicket] = useState<{type: TicketType; count: any}>({
    type: '',
    count: '',
  });
  const [detail, setDetail] = useState('');
  const [entry, setEntry] = useState('');
  const [prize, setPrize] = useState('');
  const [blindBookmarksPickerItems, setBlindBookmarksPickerItems] = useState<Item[]>([]);
  const [selectedBookmark, setSelectedBookmark] = useState('');
  const [blind, setBlind] = useState<IBlind[]>(CUSTOM);
  const [blindTime, setBlindTime] = useState<string>();
  const [isAntes, setIsAntes] = useState<boolean>(true);
  const [grades, setGrades] = useState<IGrade[]>([NEW_INIT_GRADE()]);

  useEffect(() => {
    // LOCAL STORAGE 리셋 함수
    const REMOVE = async () => {
      await AsyncStorage.removeItem('blindBookmarks');
    };
    REMOVE();

    // 페이지 나갈 시, CUSTOM DATA 초기화
    return () => {
      RESET_CUSTOM();
    };
  }, []);


  /**
   * @description Blind 필수 Input 데이터 검사 함수
   */
  const checkInputNull = (tag: 'Blind' | 'Prize') => {
    if (tag === 'Blind') {
      const is =
        !!title && // 타이틀 제목
        !!gameStart.date &&
        gameStart.date != INIT_DATE && // 게임시작(일)
        !!gameStart.time &&
        gameStart.time != INIT_DATE && // 게임시작(시간)
        !!deadline.date &&
        deadline.date != INIT_DATE && // 레지마감(일)
        !!deadline.time &&
        deadline.time != INIT_DATE && // 레지마감(시간)
        !!place && //토너먼트 위치
        // entryCondition && // 참여조건
        !!ticket.type &&
        !!ticket.count && // Buy-In
        !!detail && // 세부 정보
        // entry && // 엔트리
        !!prize && // 토너먼트 프라이즈
        !!blindTime && // 블라인드 길이
        blind.every(value => {
          return checkBlind(value);
        });
      return is;
    }
    if (tag === 'Prize') {
      return grades.every(value => {
        return checkGrade(value);
      });
    }
  };

  /**
   * @notice 게임생성 시, isAntes = false면 Ante 전부 0
   */
  const createRoom = () => {
    let newTournamentData : ITournament = {
      title,
      gameStartDate:gameStart.date,
      gameStartTime:gameStart.time,
      deadlineDate:deadline.date,
      deadlineTime:deadline.time,
      place,
      entryCondition,
      ticketType:ticket.type,
      ticketCount:ticket.count,
      detail,
      entry,
      prize,
      blindTime: blindTime as string,
      blind: isAntes ? blind :setAntesZero(blind),
      grades
    } 

      console.log(JSON.stringify(newTournamentData,null,4));
  };

  /**
   * @title Set Info/Blind/Prize UI 전환 기능
   * @description 페이지 변환시 발생하는 이벤트
   */
  const onChangeTitle = (title: IHeaderTitle) => {
    setCurrentTitle(title);
  };

  /**
   * @description Picker의 Title이 변경될 때 발생하는 이벤트
   */
  const onChangeBlindBookmarks = useCallback(async (data: any) => {
    // 선택된 Picker Title로 변경
    setSelectedBookmark(data);
    // 선택된 Picker Title이 "CUSTOM"인 경우, 빈 Blind Object로 변경
    if (!data) {
      setBlind(CUSTOM);
      setBlindTime('');
      return;
    }
    const _blindBookmarks = await getBlindBookmarks();
    const {time, structs} = _blindBookmarks![data];
    setBlindTime(time);
    setBlind(structs);
  }, []);

  /**
   * @title Picker가 활성화될때 발생하는 이벤트
   * @description Local에 Bookmark된 Blind의 Title BlindBookmarksPickerItems에 저장
   */
  const getBookmarks = async () => {
    const _blindBookmarks = await getBlindBookmarks();
    if (!_blindBookmarks) return;
    const blindBookmarks: Item[] = Object.keys(_blindBookmarks).map((val, i) => {
      return {
        key: i,
        label: val,
        value: val,
      };
    });
    setBlindBookmarksPickerItems(blindBookmarks);
  };

  return (
    <SafeAreaView style={[GlobalStyles.container, {flex: 1}]}>
      {currentTitle == '상세정보' ? (
        <NewTournamentSetInfo
          onChangeTitle={onChangeTitle}
          setGameStart={setGameStart}
          setDeadline={setDeadline}
          setTitle={setTitle}
          setTicket={setTicket}
          setPlace={setPlace}
          setEntryCondition={setEntryCondition}
          setEntry={setEntry}
          setPrize={setPrize}
          setDetail={setDetail}
          onChangeBlindBookmarks={onChangeBlindBookmarks}
          setBlindBookmarksPickerItems={setBlindBookmarksPickerItems}
          getBookmarks={getBookmarks}
          checkInputNull={checkInputNull}
          blindBookmarksPickerItems={blindBookmarksPickerItems}
          selectedBookmark={selectedBookmark}
          gameStart={gameStart}
          deadline={deadline}
          title={title}
          ticket={ticket}
          place={place}
          entryCondition={entryCondition}
          entry={entry}
          prize={prize}
          detail={detail}
          blind={blind}
        />
      ) : (
        <></>
      )}
      {currentTitle == '블라인드' ? (
        <NewTournamentSetBlind
          onChangeTitle={onChangeTitle}
          setBlind={setBlind}
          setIsAntes={setIsAntes}
          setBlindTime={setBlindTime}
          onChangeBlindBookmarks={onChangeBlindBookmarks}
          setBlindBookmarksPickerItems={setBlindBookmarksPickerItems}
          getBookmarks={getBookmarks}
          blindBookmarksPickerItems={blindBookmarksPickerItems}
          selectedBookmark={selectedBookmark}
          blind={blind}
          isAntes={isAntes}
          blindTime={blindTime}
        />
      ) : (
        <></>
      )}
      {currentTitle == 'Prize' ? (
        <NewTournamentSetPrize
          onChangeTitle={onChangeTitle}
          setGrades={setGrades}
          checkInputNull={checkInputNull}
          createRoom={createRoom}
          grades={grades}
        />
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
}
export default NewTournament;
