import { createSlice } from "@reduxjs/toolkit";

// store -> root reudce(=state) -> user slice
// state.user.id

// action : state를 바꾸는 행위/동작
// dispatch : action을 실제로 실행시키는 함수
// reducer : action이 실행되면 state를 바꾸는 로직

const initialState = new Object();


const gamesSlice = createSlice({
    name:'games',
    initialState,
    reducers: {
        setGameData(state,action) {
            state.constructor = action.payload.gameData;
        }
    },
    extraReducers : builder => {

    }
})

export default gamesSlice