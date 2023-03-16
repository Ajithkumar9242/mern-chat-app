import React from 'react'
import ChatBox from '../components/miscellenious/ChatBox'
import MyChats from '../components/miscellenious/MyChats'
import Sidedrawer from '../components/miscellenious/Sidedrawer'
import { ChatState } from '../Context/ChatProvider'
import { Box } from '@chakra-ui/react';

const ChatPage = () => {

  const { user } = ChatState()
  return (
    <div style={{ width: "100%" }}>
      { user && <Sidedrawer />}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
      { user && <MyChats />}
      { user && <ChatBox />}

      </Box>
    </div>
  )
}

export default ChatPage