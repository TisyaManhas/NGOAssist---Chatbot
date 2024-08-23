import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ChatBox from "./components/ChatBox";
import { motion } from "framer-motion";

function App() {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);

  return (
    <ChatBox/>
  )
}

export default App;
