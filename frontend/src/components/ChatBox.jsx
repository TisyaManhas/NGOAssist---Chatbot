import { useEffect, useRef, useState } from "react";
import { SendHorizonal, Send, X } from "lucide-react";
const ChatBox = () => {
  const inputRef = useRef();
  let uID = "";
  const [messages, setMessages] = useState([
    { message: "Hello! How can I help you?", sender: "bot" },
  ]);
  useEffect(() => {
    const generateUID = () => {
      const response = fetch("http://localhost:5000/user/create");
      response.then((res) => {
        res.json().then((data) => {
          uID = data.userID;
        });
      });
    };
    
    generateUID();
  }, []);
  useEffect(() => {
    const scrollToBottom = () => {
      const messagesDiv = document.getElementById("messages");
      messagesDiv.scrollTop = messagesDiv.scrollHeight;
    };
    scrollToBottom();
  }, [messages]);
 
  

  const sendMessage = async () => {
    const message = inputRef.current.value;
    if (message === "") {
      return;
    }
    const data = { text: message, uID };
    inputRef.current.value = "";
    setMessages([...messages, { message, sender: "user" }]);
    const response = await fetch("http://localhost:5000/chatbot/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await response.json();

    setMessages([
      ...messages,
      { message, sender: "user" },
      { message: responseData.response, sender: "bot" },
    ]);
  };

  useEffect(()=>{
    document.getElementById('inp').addEventListener("keypress", function(event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
          // Cancel the default action, if needed
          event.preventDefault();
          // Trigger the button element with a click
          document.getElementById("btn").click();
        }
      });
  },[])

  return (
    
      <div className="md:w-96 min-h-80  shadow-2xl rounded-3xl border-black border-2 overflow-hidden flex flex-col justify-between items-center">
        <div className="w-full h-full">
          <div className="w-full border-black border-b-2 p-2 bg-pink-600">
            <div className="flex direction-row-reverse w-full h-full gap-80">Bot
            <X size={32} />
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
        <div className="w-full flex p-2 items-center justify-between px-3 border-black border-t-2 bg-pink-600 ">
          <input
            id="inp"
            ref={inputRef}
            className="w-[80%] rounded-xl border-[#EEF0FF] bg-[#EEF0FF] p-2"
            placeholder="Enter your query"
            
          ></input>
          <button
            id="btn"
            className=" flex items-center justify-center bg-pink-400 rounded-xl"
            onClick={sendMessage}
          >
            <Send className="m-2" />
          </button>
        </div>
      </div>
    
  );
};

export default ChatBox;
