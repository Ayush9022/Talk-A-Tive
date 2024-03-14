import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "userlogin",
  initialState: {
    userInfo: {},
  },
  reducers: {
    changeUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export default loginSlice.reducer;
export const { changeUserInfo } = loginSlice.actions;
