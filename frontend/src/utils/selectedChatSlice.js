import { createSlice } from "@reduxjs/toolkit";

const selectedChat = createSlice({
  name: "selectedChat",
  initialState: {
    selectedChats: "",
  },
  reducers: {
    addSelectedChat: (state, action) => {
      state.selectedChats = action.payload;
    },
  },
});

export default selectedChat.reducer;
export const { addSelectedChat } = selectedChat.actions;
