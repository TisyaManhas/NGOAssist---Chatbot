import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Abc from './components/abc'
import Header from './components/header'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
       <Routes>
        <Route path='/' element={<Abc/>}/>
        <Route path='/about' element={<Header/>} />
       </Routes>
    </BrowserRouter>
  )
}

export default App
