import { FormControl } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box, Text, Flex } from "@chakra-ui/layout";
import { IconButton, Spinner, useToast, Spacer } from "@chakra-ui/react";
import { getSender, getSenderFull } from "../config/ChatLogics";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowBackIcon } from "@chakra-ui/icons";
import ProfileModal from "./miscellaneous/ProfileModal";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addSelectedChat } from "../utils/selectedChatSlice";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const toast = useToast();

  const { selectedChats } = useSelector((store) => store.selectedChat);
  //   console.log(selectedChats);
  const user = useSelector((store) => store.login).userInfo;
  //   console.log(user);
  const dispatch = useDispatch();
  return (
    <>
      {selectedChats ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w="100%"
            fontFamily="Work sans"
            d="flex"
            justifyContent={{ base: "space-between" }}
            alignItems="center"
          >
            <IconButton
              display={{ base: "flex", md: "none" }}
              icon={<ArrowBackIcon />}
              onClick={() => dispatch(addSelectedChat(""))}
            />
            {!selectedChats.isGroupChat ? (
              <>
                {selectedChats && selectedChats.users && user && (
                  <>
                    <Flex>
                      {getSender(user, selectedChats.users)}
                      <Spacer />
                      <ProfileModal
                        user={getSenderFull(user, selectedChats.users)}
                      />
                    </Flex>
                  </>
                )}
              </>
            ) : (
              <>
                <Flex>
                  {selectedChats.chatName.toUpperCase()}
                  <Spacer />
                  <UpdateGroupChatModal
                    // fetchMessages={fetchMessages}
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                  />
                </Flex>
              </>
            )}
          </Text>
        </>
      ) : (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          h="100%"
        >
          <Text fontSize="3xl" pb={3} fontFamily="Work sans">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
