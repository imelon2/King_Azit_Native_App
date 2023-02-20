import {combineReducers} from 'redux';
import ticketSlice from '../slices/ticket';

import userSlice from '../slices/user';

const rootReducer = combineReducers({
  user: userSlice.reducer,
  ticket: ticketSlice.reducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;