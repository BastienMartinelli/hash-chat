import * as React from "react";
import Navbar from "../../components/Navbar";
import MessagesContainer from "../../components/MessagesContainer";

import "./ChatRoom.css";
import HashtagContainer from "../../components/HashtagContainer";

export const ChatRoom = () => {
  return (
    <div className="chat-room">
      <Navbar />
      <div className="chat-container">
        <HashtagContainer />
        <MessagesContainer />
      </div>
    </div>
  );
};

export default ChatRoom;
