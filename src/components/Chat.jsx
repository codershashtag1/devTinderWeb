import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import createSocketConnection from '../utils/socket';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { format, parseISO } from 'date-fns'

const Chat = () => {
  const {targetUserId} = useParams()
  const user = useSelector(store => store.user)
  const userId = user?._id
  const name = user?.firstName + " " + user?.lastName

  const [newMessage, setNewMessage] = useState("")
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);


  useEffect(() => {
    fetchUserMessages()
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const fetchUserMessages = async () => {   
    try { 
      const response = await axios.get(`${BASE_URL}/chatReceived/${targetUserId}`, { withCredentials: true });
      console.log("Messages fetched:", response.data);
      setMessages(response.data.messages.map((msg) => {
        let time = format(parseISO(msg.createdAt), 'HH:mm')
        return { name: `${msg.senderId.firstName} ${msg.senderId.lastName}`, text: msg.text, time: time };
      }))

    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  }


  useEffect(() => {
    if(!user) { return; }
    let socket = createSocketConnection();

    socket.emit('join', { userId, targetUserId} )

    socket.on('messageReceived', ({name, text, createdAt}) => {
      console.log(`Message received from ${name}, ${text}`)
      let time = format(parseISO(createdAt), 'HH:mm')
      setMessages((messages) => [...messages, { name, text, time }]);
    })

    return () => {
      socket.disconnect()
    };
  }, [userId, targetUserId]);

  const sendMessage = () => { 
    try {
      const socket = createSocketConnection();
      socket.emit('sendMessage', { name, userId, targetUserId, text: newMessage });
      socket.on('errorMessage', ({success, message}) => {  
        if(!success) {
          console.log(`Error: ${message}`)
        }
      })

      // setMessages((prevMessages) => [...prevMessages, { text: newMessage }]);
      setNewMessage("");

    } catch (error) { 
      console.error("Error sending message:", error);
    }
  }

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[70vh] flex flex-col">
      <h1 className="p-5 border-b text-3xl border-gray-600">Chat</h1>
      <div className="flex-1 overflow-scroll p-5" ref={chatContainerRef}>
        {messages.map((msg, index) => {
          return (
              <div className={`chat ${(name === msg.name ? "chat-end" : "chat-start")}`} key={index}>
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
                <div className="chat-header">
                  {msg.name}
                  <time className="text-xs opacity-50">{msg.time}</time>
                </div>
                <div className="chat-bubble">{msg.text}</div>
                <div className="chat-footer opacity-50">Delivered</div>
              </div>
          );
        })}
      </div>
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-500 text-white rounded p-2"
        ></input>
        <button className="btn btn-secondary" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat
