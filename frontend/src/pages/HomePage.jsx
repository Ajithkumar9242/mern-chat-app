import  { React, useEffect, useState } from 'react'
import { Container , Box, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from '../components/authentication/login'
import SignUp from '../components/authentication/signup'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const navigateTo = useNavigate()
    const [user, setuser] = useState()


    useEffect(() => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"))

      setuser(userInfo)

      if(!userInfo){
        navigateTo("/chats")
      }
    }
      , [navigateTo])
  return (
    <Container maxW="xl" centerContent>
        <Box d="flex" justifyContent={"center"} alignItems={"center"} p={3} bg={"white"} w="100%" m="40px 0 15px 0" borderRadius={"lg"} borderWidth="1px">
          <Text fontSize="4xl" textAlign={"center"} color={"black"}>Chat App</Text>
        </Box>
        <Box bg={"white"} w="100%" p={4} borderRadius="lg" borderWidth={"1px"}>
          <Tabs variant='soft-rounded' colorScheme='green'>
  <TabList mb={"1em"}>
    <Tab width={"50%"}>Login</Tab>
    <Tab width={"50%"}>Sign Up!</Tab>
  </TabList>
  <TabPanels>
    <TabPanel>
      <Login />
    </TabPanel>
    <TabPanel>
      <SignUp />
    </TabPanel>
  </TabPanels>
</Tabs>
        </Box>
    </Container>
  )
}

export default HomePage