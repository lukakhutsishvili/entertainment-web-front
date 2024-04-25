import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";
import userDataSlice from "./userDataSlice";

const store = configureStore({
  reducer: {
    data: dataReducer,
    userData: userDataSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
