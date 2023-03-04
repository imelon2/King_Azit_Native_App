import { createSlice } from "@reduxjs/toolkit";

// store -> root reudce(=state) -> user slice
// state.user.id

// action : state를 바꾸는 행위/동작
// dispatch : action을 실제로 실행시키는 함수
// reducer : action이 실행되면 state를 바꾸는 로직

const initialState = {
    black: 5,
    red: 0,
    gold: 0
}

const ticketSlice = createSlice({
    name:'ticket',
    initialState,
    reducers: {
        setTickets(state,action) {
            state.black = action.payload.black;
            state.red = action.payload.red;
            state.gold = action.payload.gold;
        }
    },
    extraReducers : builder => {

    }
})

export default ticketSlice