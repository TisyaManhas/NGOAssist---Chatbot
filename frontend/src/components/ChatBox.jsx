import React from 'react'
import RecieveBox from './RecieveBox'
import SendBox from './SendBox'

const ChatBox = () => {
  return (
    <div className="w-full h-screen items-center flex justify-center">
        <div className="md:w-[45%] w-[70%] h-[70%] shadow-2xl rounded-3xl border-black border-2 overflow-hidden flex flex-col items-center">
            <div className="w-full border-black border-b-2 h-[13%] bg-pink-600  "></div>
            <div className="w-full h-[74%] flex flex-col gap-2 bg-white py-4 px-4 overflow-y-scroll "  >
                <RecieveBox/>
                <SendBox/>
            </div>
            <div className="w-full h-[13%] flex  items-center justify-between px-5 border-black border-t-2 bg-pink-600 " >
                <input className="w-[200%] h-[70%] px-3 border-black border-2 rounded-xl text-sm md:text-lg mx-10" type="text" placeholder="type a message"  />
                {/* <button className="border-black ml-2 border-2 bg-white rounded-xl h-[70%] md:px-2 px-1 text-sm md:text-lg ">Send!</button> */}
                <img src="./src/images/message.png" height="35" width="35" alt="Send"/>
            </div>
        </div>
    </div>

  )
}

export default ChatBox
