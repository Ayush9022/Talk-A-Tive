import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Button } from "@chakra-ui/react";
// import { ChatState } from "../Context/ChatProvider";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addChats } from "../utils/chatsSlice";
import { addSelectedChat } from "../utils/selectedChatSlice";

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  // const user = useSelector((store) => {
  //   // console.log(store);
  //   return store?.login?.userInfo;
  // });
  const user = JSON.parse(localStorage.getItem("userInfo"));
  // console.log(user);
  const toast = useToast();
  const dispatch = useDispatch();
  const { chats } = useSelector((store) => store.chats);
  const { selectedChats } = useSelector((store) => store.selectedChat);
  // console.log(selectedChats);
  // console.log(chats);

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        "http://localhost:5000/api/chat",
        config
      );
      // console.log(data);
      dispatch(addChats(data));
      // setChats(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    // eslint-disable-next-line
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      display={{ base: selectedChats ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {/* <Stack> */}
            {chats.map((chat) => (
              <Box
                // onClick={() => setSelectedChat(chat)}
                onClick={() => dispatch(addSelectedChat(chat))}
                cursor="pointer"
                bg={selectedChats === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChats === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
    // <div>my box</div>
  );
};

export default MyChats;
