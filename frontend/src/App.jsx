// import { useState } from 'react'
// import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
// import ChatBox from './components/ChatBox'
// import Abc from './components/abc'
// import Header from './components/header'

import Home from './components/Home/Home'
import TicketForm from './components/TicketForm'

function App() {
  // const [count, setCount] = useState(0)

  return <>

    <TicketForm/>
    <Home/>
    {/* <ChatBox/> */}
  </>
}

export default App
