import { createSlice } from "@reduxjs/toolkit";

// store -> root reudce(=state) -> user slice
// state.user.id

// action : state를 바꾸는 행위/동작
// dispatch : action을 실제로 실행시키는 함수
// reducer : action이 실행되면 state를 바꾸는 로직

const initialState = {
    email:'',
    name:'',
    nickName:'',
    phone:'',
    phoneToken:'',
    birth:'',
    gender:'',
    password:'',
    roles:'',
    access_token:''
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers: {
        setEmail(state,action) {
            state.email = action.payload.email; 
        },
        setPassWord(state,action) {
            state.password = action.payload.password; 
        },
        setNickname(state,action) {
            state.nickName = action.payload.nickName; 
        },
        setphoneToken(state,action) {
            state.phoneToken = action.payload.phoneToken; 
        },
        setUser(state,action) {
            state.name = action.payload.name;
            state.roles = action.payload.roles;
            state.email = action.payload.email;
            state.nickName = action.payload.nickName;
            state.phone = action.payload.phone;
            state.birth = action.payload.birth;
            state.gender = action.payload.gender;
            state.password = action.payload.password;
            state.access_token = action.payload.access_token;
        }
    },
    extraReducers : builder => {

    }
})

export const { setEmail , setPassWord , setNickname  } = userSlice.actions;
// export const selectUser = state => state.user;

export default userSlice