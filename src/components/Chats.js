import { useEffect, useState } from "react";
import React  from 'react';
import {addDoc,collection,serverTimestamp,query,where, onSnapshot, orderBy} from "firebase/firestore";
import { db,auth } from "../firebase-config";
import { Avatar,IconButton } from '@mui/material';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { AttachFile, SearchOutlined} from '@mui/icons-material';
import MicIcon from '@mui/icons-material/Mic';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TextField from '@mui/material/TextField';
import "../styles/Chats.css";

function Chats(props) {
    const {room}=props;
    const[newMessage,setNewMessage] = useState("");
    const [messages,setMessages] = useState([]);
    const messagesRef=collection(db,"messages");

    useEffect(() => {
      // Scroll to the bottom of the message container
      const messageContainer = document.getElementById("message-container");
      if (messageContainer) {
        messageContainer.scrollTop = messageContainer.scrollHeight;
      }
    }, [messages]); // Trigger the effect whenever the messages state changes
  
    useEffect(() =>{
        const queryMessages = query(messagesRef,where("room","==",room),orderBy("createdAt"))
        const unsubscribe=onSnapshot(queryMessages,(snapshot)=>{
            let messages = [];
            snapshot.forEach((doc)=>{
                messages.push({...doc.data(),id:doc.id});
            });
            setMessages(messages);
        });

        return ()=>unsubscribe();
    },[]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(newMessage==="") return;
        console.log(newMessage);
        await addDoc(messagesRef,{
            text: newMessage,
            createdAt:serverTimestamp(),
            user: auth.currentUser.displayName,
            room: room,
        })

        setNewMessage("");
    };
  return (
    <div className="chatroom">
      <div className="chat-layout">
        <div className="header">
          <h6>{room}</h6>
          </div>
          <div className="chatbody" id="message-container">
        <div>{messages.map((message)=>(
        <div key={message.id}>
            <h6>{message.user}:</h6>
        <h3>{message.text}</h3>
        </div>
        ))}</div>
        </div>
        <div className="chatfooter">
            <form onSubmit={handleSubmit}>
                <TextField InputProps={{
    style: { color: 'white' },  // Set the text color to white
  }} label="Type your msg" fullWidth color="warning" value={newMessage}  onChange={(e)=>setNewMessage(e.target.value)}  type='text' focused />
                <button type='submit'>Send</button>
            </form>
    </div>
    </div>
    </div>
  )
}

export default Chats
