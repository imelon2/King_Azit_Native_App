import {SafeAreaView} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HomeRootStackParamList} from '../../../../../../AppInner';
import React, {useState, useCallback, useEffect} from 'react';
import {GlobalStyles} from '../../../../../modules/globalStyles';
import {useSelector} from 'react-redux';
import {RootState} from '../../../../../store/reducer';
import {TicketType} from '@/modules/ticketsList';
import {Item} from 'react-native-picker-select';
import NewTournamentSetBlind from './NewTournamentSetBlind';
import NewTournamentSetInfo from './NewTournamentSetInfo'
import { IBlind, INIT_BLIND, INIT_DATE, INIT_TIME } from '@/config/blind';
import { getBlindBookmarks } from '@/modules/BlindBookmarks';

type IHeaderTitle = '상세정보' | 'Prize' | '블라인드';

function NewTournament() {
  const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();
  const {nickName} = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [place, setPlace] = useState<string>('');
  const [ticket, setTicket] = useState<{type: TicketType; count: any}>({
    type: '',
    count: '',
  });
  const [detail, setDetail] = useState('');
  const [entry, setEntry] = useState('');
  const [prize, setPrize] = useState('');
  const [entryCondition, setEntryCondition] = useState<boolean>(false);
  const [gameStart, setGameStart] = useState({
    date: INIT_DATE,
    time: INIT_TIME,
  });
  const [deadline, setDeadline] = useState({
    date: INIT_DATE,
    time: INIT_TIME,
  });
  const [blindBookmarksPickerItems, setBlindBookmarksPickerItems] = useState<Item[]>([]);
  const [selectedBookmark,setSelectedBookmark] = useState('');
  const [blind, setBlind] = useState<IBlind[]>([INIT_BLIND()]);
  const [blindTime, setBlindTime] = useState();
  const [isAntes, setIsAntes] = useState<boolean>(true);
  const [currentTitle, setCurrentTitle] = useState<IHeaderTitle>('상세정보');
  
  useEffect(() => {
    getBlindBookmarks().then((_blindBookmarks) => {
      //  Local에 Bookmark가 없으면 중단
      if(!_blindBookmarks) return;
      const blindBookmarks: Item[] = Object.keys(_blindBookmarks).map((val, i) => {
        return {
          key: i,
          label: val,
          value: val,
        };
      });
      setBlindBookmarksPickerItems(blindBookmarks);
    });

  }, []);

  const onChangeTitle = (title: IHeaderTitle) => {
    setCurrentTitle(title);
  };
  

  const onChangeBlindBookmarks = useCallback(async (data:any) => {
    
    setSelectedBookmark(data)
    if(!data) return setBlind([INIT_BLIND()]);
    const _blindBookmarks = await getBlindBookmarks();
    let _blind = _blindBookmarks[data];
    setBlind(_blind);
  },[])


  
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
          blindBookmarksPickerItems={blindBookmarksPickerItems}
          selectedBookmark={selectedBookmark}
          blind={blind}
          isAntes={isAntes}
          blindTime={blindTime}
        />
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
}
export default NewTournament;
