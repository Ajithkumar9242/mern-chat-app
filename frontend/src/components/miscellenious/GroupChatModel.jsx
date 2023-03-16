import { Box, Button, FormControl, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { ChatState } from '../../Context/ChatProvider'
import UserBadgeItem from '../Avatars/UserBadgeItem'
import UserlistItems from '../Avatars/UserlistItems'

const GroupChatModel = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [groupChatName, setGroupChatName] = useState()
    const [selectedUsers, setSelectedUsers] = useState([])
    const [search, setSearch] = useState("")
    const [searchResult, setSearchResult] = useState()
    const [loading, setLoading] = useState(false)
    const toast = useToast()

    const { user, chats, setChats } = ChatState()

    const handleSearch = async (query) =>{
        setSearch(query)
        if(!query){
            return
        }
        try {
            setLoading(true)
            const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(`/api/user?search=${search}`, config)
      console.log(data);
      setLoading(false)
      setSearchResult(data)

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
    }

    const handleSubmit = async() =>{
      if(!groupChatName || !selectedUsers){
        toast({
        title: "Fill all fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      }

      try {
        const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const {data} = await axios.post("/api/chat/group" , {
        name: groupChatName,
        users: JSON.stringify(selectedUsers.map((u) => u._id))
      }, config)
      setChats([data, ...chats])
      onClose()
      toast({
        title: "New group Created",
        status: "sucess",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      } catch (error) {
        toast({
        title: "Failed to Create",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      }
    }
    
    const handleDelete = (deleteUser) =>{
        setSelectedUsers(selectedUsers.filter((sel) => sel._id !== deleteUser._id))
    }

    const handleGroup = (userToAdd) =>{{
      if(selectedUsers.includes(userToAdd)){
        toast({
        title: "User Exists",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      return
      }
    }
      setSelectedUsers([...selectedUsers, userToAdd])
    }

  return (
    <>
        <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create Group Chats</ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex" flexDirection={"column"} alignItems="center">
                <FormControl>
                    <Input placeholder='Chat Name' mb={"3"} onChange={(e) => setGroupChatName(e.target.value)} /> 
                </FormControl>
                <FormControl>
                    <Input placeholder='Add users' mb={"3"} onChange={(e) => handleSearch(e.target.value)} /> 
                </FormControl>
                 <Box w="100%" d="flex" flexWrap="wrap">
                {selectedUsers.map(u => (
                  <UserBadgeItem key={user._id} user={u} handleFunction={() => handleDelete(u)}/>
                  ))}
                  </Box>

                { loading ? (
                  <div>
                    <Spinner
                      thickness='4px'
                      speed='0.65s'
                      emptyColor='gray.200'
                      color='blue.500'
                      size='xl'
                      />
                  </div>
                ) : (
                  searchResult?.slice(0,4).map(user =>(
                    <UserlistItems key={user._id} user={user} handleFunction={() => handleGroup(user)} />
                  )
                ))}
          </ModalBody>


          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default GroupChatModel