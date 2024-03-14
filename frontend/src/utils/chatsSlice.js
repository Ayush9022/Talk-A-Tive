import { createSlice } from "@reduxjs/toolkit";

const chatsSlice = createSlice({
  name: "chats",
  initialState: {
    chats: [],
  },
  reducers: {
    addChats: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export default chatsSlice.reducer;
export const { addChats } = chatsSlice.actions;
