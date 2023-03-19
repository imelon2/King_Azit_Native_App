import {combineReducers} from 'redux';
import ticketSlice from '../slices/ticket';
import userSlice from '../slices/user';
import gamesSlice from '../slices/games';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  ticket: ticketSlice.reducer,
  games: gamesSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;