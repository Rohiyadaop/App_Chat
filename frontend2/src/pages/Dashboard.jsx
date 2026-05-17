import React, { useEffect, useState } from 'react';
import {
  BiSend,
  BiSearch,
  BiDotsVerticalRounded,
  BiPhone,
  BiVideo,
} from 'react-icons/bi';

import { motion } from 'framer-motion';
import { io } from 'socket.io-client';
import api from '../api';

const socket = io(
  "https://chatapp-backend-c48g.onrender.com",
  {
    transports: ["websocket", "polling"],
  }
);
export default function Dashboard() {

  const [user, setUser] = useState(null);

  const [message, setMessage] = useState('');

  const [messages, setMessages] = useState([]);

  const [users, setUsers] = useState([]);

  const [onlineUsers, setOnlineUsers] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);



  // FETCH LOGGED USER
  useEffect(() => {

    async function fetchProfile() {

      try {

        const profile = await api.getProfile();

        setUser(profile);

      } catch (err) {

        console.log(err);

      }
    }

    fetchProfile();

  }, []);



  // FETCH ALL USERS
  useEffect(() => {

    async function fetchUsers() {

      try {

        const res = await fetch(
          'https://chatapp-backend-c48g.onrender.com/api/users'
        );

        const data = await res.json();

        const filteredUsers = data.filter(
          (u) => u._id !== user?._id
        );

        setUsers(filteredUsers);

      } catch (err) {

        console.log(err);

      }
    }

    if (user) {
      fetchUsers();
    }

  }, [user]);



  // SOCKET CONNECTION
  useEffect(() => {

    if (user?._id) {

      socket.emit('join', user._id);

    }

    // RECEIVE MESSAGE
    socket.on('receive_message', (data) => {

      setMessages((prev) => [...prev, data]);

    });

    // ONLINE USERS
    socket.on('online_users', (data) => {

      setOnlineUsers(data);

    });

    return () => {

      socket.off('receive_message');

      socket.off('online_users');

    };

  }, [user]);



  // SEND MESSAGE
  const sendMessage = () => {

    if (!message.trim() || !selectedUser) return;

    const messageData = {

      senderId: user._id,

      receiverId: selectedUser._id,

      text: message,

      time: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    socket.emit('send_message', messageData);

    setMessage('');
  };



  // LOADING
  if (!user) {

    return (
      <div className="h-screen flex items-center justify-center bg-black text-white text-3xl">
        Loading...
      </div>
    );
  }



  return (

    <div className="h-screen bg-gradient-to-br from-black via-gray-900 to-black flex overflow-hidden">

      {/* SIDEBAR */}
      <div className="w-[350px] bg-white/10 backdrop-blur-lg border-r border-white/10 flex flex-col">

        {/* PROFILE */}
        <div className="p-5 border-b border-white/10 flex items-center gap-4">

          <div className="w-14 h-14 rounded-full bg-cyan-500 flex items-center justify-center text-2xl font-bold text-black">
            {user.name.charAt(0)}
          </div>

          <div>

            <h2 className="text-white text-xl font-bold">
              {user.name}
            </h2>

            <p className="text-green-400 text-sm">
              Online
            </p>

          </div>
        </div>



        {/* SEARCH */}
        <div className="p-4">

          <div className="bg-white/10 rounded-xl px-4 py-3 flex items-center gap-3">

            <BiSearch className="text-gray-400 text-xl" />

            <input
              type="text"
              placeholder="Search users..."
              className="bg-transparent outline-none text-white w-full"
            />

          </div>
        </div>



        {/* USERS */}
        <div className="flex-1 overflow-y-auto px-3 space-y-2">

          {users.map((chatUser) => (

            <motion.div
              key={chatUser._id}
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedUser(chatUser)}
              className={`rounded-2xl p-4 flex items-center gap-4 cursor-pointer transition-all ${
                selectedUser?._id === chatUser._id
                  ? 'bg-cyan-500/30'
                  : 'bg-white/5 hover:bg-cyan-500/20'
              }`}
            >

              <div className="relative">

                <div className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-black font-bold text-xl">

                  {chatUser.name.charAt(0)}

                </div>

                {onlineUsers.includes(chatUser._id) && (

                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-400 rounded-full border-2 border-black"></div>

                )}

              </div>

              <div className="flex-1">

                <h3 className="text-white font-semibold">
                  {chatUser.name}
                </h3>

                <p className="text-sm text-gray-400">

                  {onlineUsers.includes(chatUser._id)
                    ? 'Online'
                    : 'Offline'}

                </p>

              </div>

            </motion.div>
          ))}

        </div>
      </div>



      {/* CHAT SECTION */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <div className="h-20 border-b border-white/10 bg-white/5 backdrop-blur-lg px-6 flex items-center justify-between">

          <div className="flex items-center gap-4">

            <div className="w-14 h-14 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-black font-bold text-xl">

              {selectedUser
                ? selectedUser.name.charAt(0)
                : '?'}

            </div>

            <div>

              <h2 className="text-white text-xl font-bold">

                {selectedUser
                  ? selectedUser.name
                  : 'Select User'}

              </h2>

              <p className="text-green-400 text-sm">

                {selectedUser &&
                onlineUsers.includes(selectedUser._id)
                  ? 'Online'
                  : 'Offline'}

              </p>

            </div>
          </div>

          <div className="flex items-center gap-4 text-white text-3xl">

            <BiPhone className="cursor-pointer hover:text-cyan-400" />

            <BiVideo className="cursor-pointer hover:text-cyan-400" />

            <BiDotsVerticalRounded className="cursor-pointer hover:text-cyan-400" />

          </div>
        </div>



        {/* MESSAGES */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5">

       {messages
  .filter(
    (msg) =>

      (
        msg.senderId === user._id &&
        msg.receiverId === selectedUser?._id
      )

      ||

      (
        msg.senderId === selectedUser?._id &&
        msg.receiverId === user._id
      )
  )

  .map((msg, index) => (

    <motion.div
      key={index}
      initial={{
        opacity: 0,
        x: msg.senderId === user._id ? 100 : -100,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{ duration: 0.3 }}
      className={`flex ${
        msg.senderId === user._id
          ? 'justify-end'
          : 'justify-start'
      }`}
    >

      <div
        className={`max-w-md px-5 py-3 rounded-3xl shadow-lg ${
          msg.senderId === user._id
            ? 'bg-cyan-500 text-black'
            : 'bg-white/10 border border-white/10 text-white'
        }`}
      >

        {/* Sender Name */}
        <p className="text-xs mb-1 font-bold opacity-70">

          {msg.senderId === user._id
            ? 'You'
            : selectedUser?.name}

        </p>

        {/* Message */}
        <p>{msg.text}</p>

        {/* Time */}
        <span
          className={`text-xs mt-2 block ${
            msg.senderId === user._id
              ? 'text-black/70'
              : 'text-gray-400'
          }`}
        >
          {msg.time ||
            new Date(msg.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
        </span>

      </div>
    </motion.div>
))}

        </div>



        {/* INPUT */}
        <div className="p-5 border-t border-white/10 bg-white/5 backdrop-blur-lg">

          <div className="flex items-center gap-4 bg-white/10 rounded-2xl px-5 py-3">

            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="flex-1 bg-transparent outline-none text-white text-lg"
              onKeyDown={(e) => {

                if (e.key === 'Enter') {

                  sendMessage();

                }
              }}
            />

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={sendMessage}
              className="bg-cyan-500 hover:bg-cyan-400 text-black p-3 rounded-full"
            >

              <BiSend size={24} />

            </motion.button>

          </div>
        </div>

      </div>
    </div>
  );
}