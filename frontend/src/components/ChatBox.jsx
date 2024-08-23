import { useRef } from "react";

const ChatBox = () => 
  {
    const queryElement = useRef();
    const user_id = useRef();

    const sendMessage = () => 
      {
        const query = queryElement.current.value;
        // const user = user_id.current.value;
        console.log(query);
        // console.log(user);
    }


  return (
    <div className="w-full h-screen items-center flex justify-center">
        <div className="md:w-[45%] w-[70%] h-[70%] shadow-2xl rounded-3xl border-black border-2 overflow-hidden flex flex-col items-center">
            <div className="w-full border-black border-b-2 h-[13%] bg-pink-600  "></div>
            <h2> Kat-Bot</h2>
            <div className="w-full h-[74%] bg-white"  ></div>
            <div className="w-full h-[13%] flex  items-center justify-between px-5 border-black border-t-2 bg-pink-600 " >
                <input className="w-[150%] h-[70%] px-3 border-black border-2 rounded-xl text-sm md:text-lg mx-10" type="text"
                ref = {queryElement} placeholder="type a Query"  />
                {/* <button className="border-black ml-2 border-2 bg-white rounded-xl h-[70%] md:px-2 px-1 text-sm md:text-lg ">Send!</button> */}
                <img src="./src/images/Query.png" height="35" width="35" alt="Send"/>
                <input className="w-[80%] h-[70%] px-3 border-black border-2 rounded-xl text-sm md:text-lg " type="text" placeholder="type a message"  />
                <button className="border-black ml-2 border-2 bg-white rounded-xl h-[70%] md:px-2 px-1 text-sm md:text-lg ">Send!</button>
                
            </div>
        </div>
    </div>
  )
}

export default ChatBox