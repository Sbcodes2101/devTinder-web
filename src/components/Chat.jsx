import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((state) => state.user);
  const userId = user?._id;
  const firstName = user?.firstName;

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, text: newMessage }) => {
      console.log(firstName + ": " + newMessage);
      setMessages((prev) => [...prev, { firstName, text: newMessage }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] rounded-lg flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
       <div className="flex-1 overflow-y-scroll p-5">
        {messages.map((msg, index) => {
          const isMe = msg.firstName === firstName;
          return (
            <div key={index} className={`chat ${isMe ? "chat-end" : "chat-start"}`}>
              <div className="chat-header mb-1">
                {msg.firstName}
                <time className="text-xs opacity-50 ml-1">12:45</time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50 mt-1">
                {isMe ? "Delivered" : ""}
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-5 border-t border-gray-600 flex gap-2 items-center">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-600 text-white rounded px-4"
        ></input>
        <button onClick={sendMessage} className="btn btn-sm btn-primary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
