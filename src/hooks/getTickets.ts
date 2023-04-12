import axios, {AxiosError} from 'axios';
import {useEffect} from 'react';
import Config from 'react-native-config';
import {useAppDispatch} from '../store';
import { useSelector } from 'react-redux';
import { RootState } from '../store/reducer';
import ticketSlice from '../slices/ticket';

const getTickets =() => {
    const dispatch = useAppDispatch();
    const access_token = useSelector((state: RootState) => state.user.access_token);
    const refreshTickets = async () => {
      try {
        console.log('refresh ticket');
        
        const getTicketsResult = await axios.get(
          `${Config.API_URL}/member/tickets`,
          {
            headers: {
              authorization: `Bearer ${access_token}`,
            },
          },
        );
        const{black,red,gold} = getTicketsResult.data

        dispatch(
          ticketSlice.actions.setTickets({
            black,
            red,
            gold
          })
        );
      } catch (error) {

          console.log((error as AxiosError).response?.status,'error from hooks/getTickets.ts');
          console.log((error as any).response.data.errorMessage);
      }
    };

    return [refreshTickets]
}

export default getTickets