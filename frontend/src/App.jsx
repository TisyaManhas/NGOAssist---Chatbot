import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ChatBox from "./components/ChatBox";
import { motion } from "framer-motion";

function App() {
  const [chatBoxOpen, setChatBoxOpen] = useState(false);

  return (
    <div className="w-full h-screen items-center flex justify-center manrope">
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
      {
      !chatBoxOpen &&
        <div
        onClick={() => {
          setChatBoxOpen(!chatBoxOpen);
        }}
        className="absolute bottom-10 right-10 z-10 rounded-full bg-red-400 w-fit p-2"
        >
        Chatbot
      </div>
      }
    </div>
  );
}

export default App;
