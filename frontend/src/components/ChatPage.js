import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { changeUserInfo } from "../utils/loginSlice";
import SideDrawer from "./miscellaneous/SideDrawer";
import Chatbox from "./ChatBox";
import MyChats from "./MyChats";
import { Box, Flex } from "@chakra-ui/react";

const ChatPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.login.userInfo);
  const [fetchAgain, setFetchAgain] = useState(false);
  // console.log(user);

  useEffect(() => {
    const userinfo = JSON.parse(localStorage.getItem("userInfo"));
    dispatch(changeUserInfo(userinfo));
    if (!userinfo) {
      navigate("/");
    }
  }, []);

  return (
    <div style={{ width: "100%" }} display>
      {user && <SideDrawer />}
      <Flex
        d="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        p="10px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Flex>
    </div>
  );
};

export default ChatPage;
