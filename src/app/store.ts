import { configureStore } from "@reduxjs/toolkit";
import TaskReducer from "../features/TaskSlice/TaskSlice"

export  const store = configureStore({
    reducer:{
        task:TaskReducer,
    }
})



export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;