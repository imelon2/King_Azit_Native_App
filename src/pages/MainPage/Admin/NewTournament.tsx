import {SafeAreaView} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {HomeRootStackParamList} from '../../../../AppInner';
import React, {useState, useCallback} from 'react';
import {GlobalStyles} from '../../../modules/globalStyles';
import useSocket from '../../../hooks/useSocket';
import {useSelector} from 'react-redux';
import {RootState} from '../../../store/reducer';
import NewTournamentSetInfo from './AdminComponent/NewTournamentSetInfo';

function NewTournament() {
  const initDate = 'YYY.DD.MM';
  const initTime = '00:00 AM';

  const navigation = useNavigation<NavigationProp<HomeRootStackParamList>>();
  const {nickName} = useSelector((state: RootState) => state.user);
  const [setBlind, setSetBlind] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [place, setPlace] = useState<string>('');
  const [ticket, setTicket] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const [gameStart, setGameStart] = useState({
    date: initDate,
    time: initTime,
  });
  const [deadline, setDeadline] = useState({
    date: initDate,
    time: initTime,
  });

  return (
    <SafeAreaView style={[GlobalStyles.container, {flex: 1}]}>
      {setBlind ? (
        <></>
      ) : (
        <NewTournamentSetInfo
          setGameStart={setGameStart}
          setDeadline={setDeadline}
          setTitle={setTitle}
          setTicket={setTicket}
          setPlace={setPlace}
          gameStart={gameStart}
          deadline={deadline}
          title={title}
          ticket={ticket}
          place={place}
        />
      )}
    </SafeAreaView>
  );
}
export default NewTournament;
