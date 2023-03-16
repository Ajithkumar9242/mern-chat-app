import React, { useState } from 'react'
import { BellIcon, ChevronDownIcon, SearchIcon } from '@chakra-ui/icons'
import { Avatar, Box, Button, Center, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Flex, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spacer, Spinner, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react';
import { ChatState } from '../../Context/ChatProvider';
import ProfileModel from './ProfileModel';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ChatLoading from './ChatLoading';
import UserlistItems from '../Avatars/UserlistItems';

const Sidedrawer = () => {
  const [search, setSearch] = useState("")
  const [searchResult, setSearchResult] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingChat, setLoadingChat] = useState()
  const { user, setSelectedChat,chats, setChats } = ChatState()
  const navigateTo = useNavigate()
    const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()


  const logoutHandler = () =>{
    localStorage.removeItem("userInfo")
    navigateTo("/")
  }

  const handleSearch = async () =>{
    if(!search){
      toast({
        title: "Please Enter Something",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }

    try {
      setLoading(true)

      const config = {
        headers:{
          Authorization: `Bearer ${user.token}`
        }
      }


      const {data} = await axios.get(`/api/user?search=${search}`, config)

      setLoading(false)
      setSearchResult(data)
    } catch (error) {
      toast({
        title: "Something went wrong",
        status: "errror",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  }

  const accessChat = async () =>{
    try {
      setLoading(true)
      const config = {
        headers:{
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`
        }
      }

      const { data } = await axios.post("/api/chat" , { userId } , config)
      
      if(!chats.find((c) => c._id === data._id)){
        setChats([data, ...chats])
      }
      setSelectedChat(data)
      setLoadingChat(false)
      onClose()
    } catch (error) {
      toast({
        title: "Error Fetching",
        status: "errror",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  }

  return (
    <>
    <Box >
        <Flex>
        <Box>
        <Tooltip label="Search user" hasArrow placement='bottom-end'>
        <Button onClick={onOpen}>
          <SearchIcon />
          <Text d={{ base: "none" , md:"flex"}} px="4">
            Search user
          </Text>
        </Button>
      </Tooltip>
        </Box>
        <Spacer />



         <Box>
          <Text fontSize={"2xl"} fontFamily="Tilt Neon">
        Chat-App
      </Text>

      </Box>
      <Spacer />
    <Box>
      <div>
        <Menu>
          <MenuButton>
            <BellIcon  boxSize={6} />
          </MenuButton>
        </Menu>
        <Menu>
  <MenuButton as={Button} rightIcon={<ChevronDownIcon /> }>
    <Avatar src={user.pic} name={user.name} size="sm" cursor={"pointer"}/>
  </MenuButton>

  <MenuList>
    <ProfileModel user={user}>
    <MenuItem>My Profile</MenuItem>
    </ProfileModel>
    <MenuDivider />
    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
  </MenuList>

</Menu>
      </div>
    </Box>
  </Flex>

      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader>
              Search
            </DrawerHeader>

          <DrawerBody>
            <Box d="flex" pb={2}>
              <Input placeholder='Search by name or email' value={search} mr={2} onChange={(e) =>setSearch(e.target.value)} />
              <Button
               onClick={handleSearch}
              >Go</Button>
            </Box>

            {loading ? (
              <ChatLoading />
            ):
            (searchResult?.map((user) =>(
              <UserlistItems
              key={user._id}
              user={user}
              handleFunction={() => accessChat(user._id)}
              />
            )))
            }

            { loading && <Spinner ml={'auto'} d="flex" />}
          </DrawerBody>
              </DrawerContent>

        </DrawerOverlay>
      </Drawer>

      
      
    </Box>
    </>
  )
}

export default Sidedrawer