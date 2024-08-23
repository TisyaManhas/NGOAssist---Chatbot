<<<<<<< HEAD
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
=======
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ChatBox from "./components/ChatBox";
import { motion } from "framer-motion";

function App() {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);
  useEffect(() => {
    addEventListener("click", (e) => {
      if (e.target.className !== "absolute bottom-20 right-20") {
        setChatBoxOpen(false);
      }
    });
    return () => {
      removeEventListener("click", (e) => {
        if (e.target.className !== "absolute bottom-20 right-20") {
          setChatBoxOpen(false);
        }
      });
    };
  }, []);
  return (
    <div className="w-full h-screen items-center flex justify-center manrope">
      <div onClick={(e) => e.stopPropagation()}>
        {chatBoxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="absolute bottom-20 right-20"
          >
            <ChatBox />
          </motion.div>
        )}
        {!chatBoxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            onClick={() => {
              setChatBoxOpen(!chatBoxOpen);
            }}
            className="absolute bottom-10 right-10 z-10 rounded-full bg-red-400 w-fit p-2"
          >
            Chatbot
          </motion.div>
        )}
      </div>
    </div>
  );
>>>>>>> c0894c2f9607a5408549f3f1ee5fc095220e6912
}

export default App;
