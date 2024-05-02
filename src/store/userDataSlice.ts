import { createSlice } from "@reduxjs/toolkit";

const userDataSlice = createSlice({
  name: "userData",
  initialState: {},
  reducers: {
    updateUserData: (_, action) => {
      return action.payload;
    },
  },
});

export const { updateUserData } = userDataSlice.actions;

export default userDataSlice.reducer;
