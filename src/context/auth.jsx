import{ createSlice} from '@reduxjs/toolkit'
import { act } from 'react';

const initialState={
    status:false,
    user_data:null
}

const authSlicer= createSlice({
    name:"Auth",
    initialState,
    reducers:{
        login:(state, action)=>{

    console.log("Reducer payload:", action.payload);
    
            state.status=true;
            state.user_data=action.payload;

    console.log("Stored user:", state.user_data);
    console.log("Stored id:", state.user_data.$id);
        },
        logout:(state)=>{
           state. status=false;
            state.user_data=null;
            
        }
    }
})

export default  authSlicer.reducer;

export const {login, logout} = authSlicer.actions;