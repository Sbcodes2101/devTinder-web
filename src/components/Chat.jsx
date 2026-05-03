import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([{ text: "Hello!" }]);
  console.log(targetUserId);
  return (
    <div className="w-1/2 mx-auto border border-gray-600 m-5 h-[70vh] rounded-lg flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
        {/* Chat messages will go here */}
        {messages.map((msg, index) => (
          <>
            <div key={index} className="chat chat-start">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                  />
                </div>
              </div>
              <div className="chat-header">
                Obi-Wan Kenobi
                <time className="text-xs opacity-50">12:45</time>
              </div>
              <div className="chat-bubble">You were the Chosen One!</div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
            <div className="chat chat-end">
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS chat bubble component"
                    src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                  />
                </div>
              </div>
              <div className="chat-header">
                Anakin
                <time className="text-xs opacity-50">12:46</time>
              </div>
              <div className="chat-bubble">I hate you!</div>
              <div className="chat-footer opacity-50">Seen at 12:46</div>
            </div>
          </>
        ))}
      </div>
      <div className="p-5 border-t border-gray-600 flex gap-2 items-center">
        <input className="flex-1 border border-gray-600 text-white rounded px-4"></input>
        <button className="btn btn-sm btn-primary">Send</button>
      </div>
    </div>
  );
};

export default Chat;
