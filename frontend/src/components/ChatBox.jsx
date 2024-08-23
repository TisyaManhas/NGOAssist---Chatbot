import { useEffect, useRef, useState } from "react";
const ChatBox = () => {
  const inputRef = useRef();
  let uID = "";
  const [messages, setMessages] = useState([]);
  // useEffect(() => {
  //   const getUID = async () => {
  //     const response = await fetch("http://localhost:5000/generateUID");
  //     const data = await response.json();
  //     uID = data.uID;
  //   };
  //   getUID();
  // }, []);

  const sendMessage = async () => {
    const message = inputRef.current.value;
    if (message === "") {
      return;
    }
    const data = { text: message, uID };
    inputRef.current.value = "";
    setMessages([...messages, { message, sender: "user" }]);
    const response = await fetch("http://localhost:5000/chat", {
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

  return (
    <div className="w-full h-screen items-center flex justify-center">
      <div className="md:w-[45%] w-[70%] h-[70%] shadow-2xl rounded-3xl border-black border-2 overflow-hidden flex flex-col items-center">
        <div className="w-full border-black border-b-2 h-[13%] bg-pink-600  "></div>
        
        <div className="w-full h-[74%] mt-2 flex  flex-col bg-white overflow-scroll overflow-x-hidden">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`w-full  mb-2  flex gap-2 items-center px-5 ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={` m-2 ${
                  msg.sender === "user"
                    ? "bg-pink-600 text-white rounded-tl-3xl rounded-b-3xl"
                    : "bg-gray-300 text-black rounded-tr-3xl rounded-b-3xl"
                } p-2`}
              >
                {msg.message}
              </div>
            </div>
          ))}
        </div>
        <div className="w-full h-[13%] flex  items-center justify-between px-5 border-black border-t-2 bg-pink-600 ">
          <input
            ref={inputRef}
            className="w-[80%] rounded-xl  p-2"
            placeholder="Enter your query"
          ></input>
          <button
            className="w-[15%] h-[80%] bg-pink-400 rounded-xl"
            onClick={sendMessage}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
