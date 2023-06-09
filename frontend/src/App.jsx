import React from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import "./App.css"

const App = () => {
  return (
    <div className='App'>
      <Routes>
      <Route path="/" element={<HomePage />}/>
      <Route path="/chats" element={<ChatPage />}/>
      </Routes>

    </div>
  )
}

export default App