import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

const ChatContext = createContext()

const ChatProvider = ({ children })=>{

    const [user, setuser] = useState()
    const [selectedChat, setetSelectedChat] = useState()
    const [chats, setChats] = useState([])
    const navigateTo = useNavigate()

    useEffect(() => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"))

      setuser(userInfo)

      if(!userInfo){
        navigateTo("/")
      }
    }
      , [navigateTo])
    

    return  <ChatContext.Provider value={{ user, setuser, selectedChat, setetSelectedChat, chats, setChats}}>
        { children }
        </ChatContext.Provider>
     
}

export const ChatState = () =>{
    return useContext(ChatContext)
}

export default ChatProvider