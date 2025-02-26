import { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import Loader from "./Loader";

const ChatBox = () => {
  const inputRef = useRef();
  const [uID, setUID] = useState("");
  const [userInfo, setUserInfo] = useState({});
  const [messages, setMessages] = useState([
    { message: "Hi, I am a bot. How can I help you?", sender: "bot" }
  ]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Clear previous messages to start fresh
    localStorage.removeItem("messages");

    const generateUID = async () => {
      try {
        const response = await fetch("http://localhost:5000/user/create");
        const responseData = await response.json();
        setUID(responseData.userID);
      } catch (error) {
        console.error("Error fetching user ID:", error);
      }
    };
    generateUID();
  }, []);

  useEffect(() => {
    if (showForm === 1) {
      setMessages((prev) => [
        ...prev,
        { message: "Please Enter your Name", sender: "bot" }
      ]);
    } else if (showForm === 2) {
      setMessages((prev) => [
        ...prev,
        { message: userInfo.name, sender: "user" },
        { message: "Please Enter your Email", sender: "bot" }
      ]);
    } else if (showForm === 3) {
      const ticketForm = async () => {
        try {
          const data = { user: uID, name: userInfo.name, email: userInfo.email };
          await fetch("http://localhost:5000/chatbot/ticket", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
          });
          setMessages((prev) => [
            ...prev,
            { message: userInfo.email, sender: "user" },
            { message: "Ticket Created Successfully", sender: "bot" }
          ]);
        } catch (error) {
          console.error("Error creating ticket:", error);
        }
      };
      ticketForm();
    }
  }, [showForm, userInfo, uID]);

  useEffect(() => {
    const messagesDiv = document.getElementById("messages");
    if (messagesDiv) messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }, [messages]);

  const sendMessage = async () => {
    const message = inputRef.current.value.trim();
    inputRef.current.value = "";
    if (!message) return;

    if (showForm === 1) {
      setUserInfo({ name: message });
      setShowForm(2);
      return;
    } else if (showForm === 2) {
      setUserInfo((prev) => ({ ...prev, email: message }));
      setShowForm(3);
      return;
    }

    setMessages((prev) => [...prev, { message, sender: "user" }]);

    try {
      const response = await fetch("http://localhost:5000/chatbot/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: message, user: uID })
      });
      const responseData = await response.json();

      if (responseData.response[0] === "1") {
        setShowForm(1);
      } else {
        setMessages((prev) => [
          ...prev,
          { message: responseData.response, sender: "bot" }
        ]);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    const inputElement = document.getElementById("inp");
    if (inputElement) {
      const handleKeyPress = (event) => {
        if (event.key === "Enter") {
          event.preventDefault();
          document.getElementById("btn").click();
        }
      };
      inputElement.addEventListener("keypress", handleKeyPress);
      return () => inputElement.removeEventListener("keypress", handleKeyPress);
    }
  }, []);

  return (
    <div className="fixed bottom-5 right-5">
      <div className="relative">
        {/* Chat Button */}
        <button
          className="w-14 h-14 bg-pink-600 rounded-full flex items-center justify-center text-white shadow-lg"
          onClick={() => setShowForm(!showForm)}
        >
          💬
        </button>

        {/* Chat Window */}
        {showForm && (
          <div className="absolute bottom-16 right-0 md:w-96 min-h-80 shadow-2xl rounded-3xl border-black border-2 overflow-hidden flex flex-col justify-between items-center bg-white">
            <div className="w-full h-full">
              <div className="w-full border-black border-b-2 p-2 bg-pink-600">
                <div className="flex justify-between items-center w-full h-full font-semibold text-white text-xl">
                  <span>Katalyst ChatBot</span>
                  <button className="text-white" onClick={() => setShowForm(false)}>✖</button>
                </div>
              </div>

              <div
                id="messages"
                className="mt-2 flex h-full scroll-smooth max-h-[500px] flex-col gap-2 bg-white overflow-y-scroll overflow-x-hidden"
              >
                {messages.map((msg, index) => (
                  <div
                    key={index}
                    className={`w-full flex gap-2 items-center p-2 ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`p-2 min-w-16 max-w-60 ${
                        msg.sender === "user"
                          ? "bg-pink-600 text-white rounded-tl-3xl rounded-b-3xl"
                          : "bg-gray-300 text-black rounded-tr-3xl rounded-b-3xl"
                      }`}
                    >
                      {msg.message}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {messages[messages.length - 1].sender === "user" && (
              <div className="w-full flex gap-2 items-center p-2 justify-start">
                <div className="p-2 min-w-16 max-w-60 bg-gray-300 text-black rounded-tr-3xl">
                  <Loader />
                </div>
              </div>
            )}

            <div className="w-full flex p-2 items-center justify-between px-3 border-black border-t-2 bg-pink-600">
              <input
                id="inp"
                ref={inputRef}
                className="w-[80%] rounded-xl border-[#EEF0FF] bg-[#EEF0FF] p-2"
                placeholder="Enter your query"
              />
              <button
                id="btn"
                className="flex items-center justify-center bg-pink-400 rounded-full"
                onClick={sendMessage}
              >
                <Send className="m-2" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatBox;
