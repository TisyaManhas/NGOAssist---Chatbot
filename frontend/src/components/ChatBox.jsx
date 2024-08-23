import { useEffect, useRef, useState } from "react";
import {  Send, X, Minus } from "lucide-react";
import Loader from "./Loader";

const ChatBox = () => {
  const inputRef = useRef();
  const [uID, setUID] = useState("");
  const [userInfo, setUserInfo] = useState({});

  const [messages, setMessages] = useState(
    JSON.parse(localStorage.getItem("messages")) || [
      { message: "Hi, I am a bot. How can I help you?", sender: "bot" },
    ]
  );
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    const generateUID = async () => {
      const response = await fetch("http://localhost:5000/user/create");
      const responseData = await response.json();
      setUID(responseData.userID);
    };

    generateUID();
  }, []);

  useEffect(() => {
    if (showForm === 1) {
      setMessages([
        ...messages,
        { message: "Please Enter your Name", sender: "bot" },
      ]);
    } else if (showForm === 2) {
      setMessages([
        ...messages,
        { message: userInfo.name, sender: "user" },
        { message: "Please Enter your Email", sender: "bot" },
      ]);
    } else if (showForm === 3) {
      const ticketForm = async () => {
        const data = { user: uID, name: userInfo.name, email: userInfo.email };
        const response = await fetch("http://localhost:5000/chatbot/ticket", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        const responseData = await response.json();
        console.log(responseData);
        setMessages([
          ...messages,
          { message: userInfo.email, sender: "user" },
          { message: "Ticket Created Successfully", sender: "bot" },
        ]);
      };
      ticketForm();
    }
  }, [showForm]);
  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    const scrollToBottom = () => {
      const messagesDiv = document.getElementById("messages");
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    };
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    const message = inputRef.current.value;
    inputRef.current.value = "";
    if (message === "") {
      return;
    }
    if (showForm === 1) {
      setUserInfo({ name: message });
      setShowForm(2);
      return;
    } else if (showForm === 2) {
      setUserInfo({ ...userInfo, email: message });
      setShowForm(3);
      return;
    }
    const data = { question: message, user: uID };

    setMessages([...messages, { message, sender: "user" }]);
    const response = await fetch("http://localhost:5000/chatbot/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    console.log(responseData);
    if (responseData.response[0] == "1") {
      console.log("here");
      setShowForm(1);
    } else {
      setMessages([
        ...messages,
        { message, sender: "user" },
        { message: responseData.response, sender: "bot" },
      ]);
    }
  };

  useEffect(() => {
    document
      .getElementById("inp")
      .addEventListener("keypress", function (event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          document.getElementById("btn").click();
        }
      });
  }, []);

  return (
    <div className="md:w-96 min-h-80  shadow-2xl rounded-3xl border-black border-2 overflow-hidden flex flex-col justify-between items-center">
      <div className="w-full h-full">
        {/* <div className="w-full border-black border-b-2 p-2 bg-pink-600">
            <div className="flex direction-row-reverse w-full h-full gap-80">Bot
            <Minus size={32} />
            <X size={32} />
            </div>
          </div> */}
        <div className="w-full border-black border-b-2 p-2 bg-pink-600">
          <div className="flex justify-between items-center w-full h-full font-semibold text-white text-xl">
            <span>Katalyst ChatBot</span>
            <div className="flex gap-2">
              {/* <Minus size={32} />
              <X size={32} /> */}
            </div>
          </div>
        </div>

        <div
          id="messages"
          className=" mt-2 flex h-full scroll-smooth max-h-[500px] flex-col gap-2 bg-white overflow-scroll overflow-x-hidden"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`w-full    flex gap-2 items-center p-2 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={` p-2 min-w-16 max-w-60 ${
                  msg.sender === "user"
                    ? "bg-pink-600 text-white rounded-tl-3xl rounded-b-3xl "
                    : "bg-gray-300 text-black rounded-tr-3xl rounded-b-3xl"
                } p-2`}
              >
                {msg.message}
              </div>
            </div>
          ))}
        </div>
      </div>
      {messages[messages.length - 1].sender === "user" && (
        <>
          <div
            className={`w-full flex gap-2 items-center p-2 ${"justify-start"}`}
          >
            <div
              className={` p-2 min-w-16 max-w-60 ${"bg-gray-300 text-black rounded-tr-3xl rounded-b-3xl"} p-2`}
            >
              <Loader />
            </div>
          </div>
        </>
      )}
      <div className="w-full flex p-2 items-center justify-between px-3 border-black border-t-2 bg-pink-600 ">
        <input
          id="inp"
          ref={inputRef}
          className="w-[80%] rounded-xl border-[#EEF0FF] bg-[#EEF0FF] p-2"
          placeholder="Enter your query"
        ></input>
        <button
          id="btn"
          className="flex items-center justify-center bg-pink-400 rounded-full"
          onClick={sendMessage}
        >
          <Send className="m-2" />
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
