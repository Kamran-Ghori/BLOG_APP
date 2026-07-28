import { configureStore } from "@reduxjs/toolkit";
import auth_reducer from './auth'
const store = configureStore({
    reducer:{
        Auth:auth_reducer,
    }
})



export default store;