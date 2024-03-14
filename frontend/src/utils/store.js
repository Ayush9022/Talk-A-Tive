import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "./loginSlice";
import selectedChat from "./selectedChatSlice";
import chats from "./chatsSlice";

const store = configureStore({
  reducer: {
    login: loginSlice,
    selectedChat: selectedChat,
    chats: chats,
  },
});

export default store;
