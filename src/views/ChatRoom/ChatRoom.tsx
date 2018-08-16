import * as React from "react";
import Navbar from "../../components/Navbar";
import MessagesContainer from "../../components/MessagesContainer";

import "./ChatRoom.css";
import HashtagContainer from "../../components/HashtagContainer";
import MessageInput from "../../components/MessageInput";

export const ChatRoom = () => {
  return (
    <div className="chat-room">
      <Navbar />
      <div className="container chat-container shadow">
        <HashtagContainer />
        <MessagesContainer />
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatRoom;
