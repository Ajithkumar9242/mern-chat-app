import { AddIcon } from '@chakra-ui/icons'
import { Box, Button, Stack, useToast } from '@chakra-ui/react'
import axios from 'axios'
import  { React, useEffect, useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import { getSender } from '../config/ChatLogics'
import ChatLoading from './ChatLoading'
import GroupChatModel from './GroupChatModel'

const MyChats = () => {
  const toast = useToast()
  const [loggedUser, setLoggedUser] = useState()
  const { user,selectedChat, setSelectedChat,chats, setChats } = ChatState()
 const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
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
    fetchChats();
  }, []);
  return (
    <Box
    d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
    >
      <Box
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center">
          MyChats
      <GroupChatModel>
  
          <Button
            d="flex"
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
       
      </GroupChatModel>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden">
          { chats ? (
          <Stack overflowY={"scroll"}>
            {chats.map((chat) => (
              <Box
              onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
                >
                  <Text>
                    {!chat.isGroupChat ? (getSender(loggedUser, chat.users)) : chat.chatName}
                  </Text>
              </Box>
              
            ))}
          </Stack>
          ) :
           ( <ChatLoading /> )
          }
      </Box>
    </Box>
  )
}

export default MyChats