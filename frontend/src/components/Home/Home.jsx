import { useState } from "react";
import ChatBox from "../ChatBox";
import "../Home/Home.css"

const Home = () => {
  const [tab, setTab] = useState('Home');

  const handleBtn = (newTab) => {
    setTab(newTab);
  };

  return (
    <div>
      <button className="btn" onClick={() => handleBtn("ChatBox")}>Submit
      </button>
      {tab === "ChatBox" && <ChatBox />}
    </div>
  );
};

export default Home;