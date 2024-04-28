
import { createSlice, isAction } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user:{},
    },
    reducers: {
        login:(state,action)=>{
            state.user=action.payload
        },
        logout:(state,action)=>{
            state.user={};
        }
        
    }
})

export const { login ,logout} = authSlice.actions;
export default authSlice.reducer