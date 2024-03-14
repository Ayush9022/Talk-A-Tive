import { createSlice } from "@reduxjs/toolkit";

const chatsSlice = createSlice({
  name: "chats",
  initialState: {
    chats: [],
  },
  reducers: {
    addChats: (state, action) => {
      state.chats = action.payload;
    },
    addsingleChat: (state, action) => {
      state.chats = [action.payload, ...state.chats];
    },
  },
});

export default chatsSlice.reducer;
export const { addChats, addsingleChat } = chatsSlice.actions;
