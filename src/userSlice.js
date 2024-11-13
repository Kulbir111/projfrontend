import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIN: false,
    uinfo: null
};
const userSl=createSlice(
    {
        name:"userSlice",
        initialState,
        reducers:{
            login(state,action)
            {
                state.isLoggedIN=true;
                state.uinfo=action.payload;
            },
            logout(state,action)
            {
                state.isLoggedIN=false;
                state.uinfo=null;
            }
        }
    }
)
export const { login, logout } = userSl.actions;
export default userSl.reducer;