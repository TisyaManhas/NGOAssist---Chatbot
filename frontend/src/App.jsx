import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import ChatBox from './components/ChatBox'
// import Abc from './components/abc'
// import Header from './components/header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ChatBox/>
  )
}

export default App
