// @ts-nocheck
import React, { useEffect, useState } from "react"
import './chat.css'
import { Avatar, IconButton } from "@mui/material"
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SearchOutlined from '@mui/icons-material/SearchOutlined';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SendIcon from '@mui/icons-material/Send';
import {useSelector } from 'react-redux';
import socket from '../../socket';


const styles= {
    fontSize:'30px'
}

function Chat() {
 
  const currentChat = useSelector((state) => state.selectedChatData.currentChat);
  const previousChat = useSelector((state) => state.selectedChatData.previousChat);
  const loggedUser = useSelector((state) => state.userData.user);
  const othersInChat = currentChat?.users?.filter(user => user._id !== loggedUser._id);

  const [ messages , setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showChat, setShowChat] = useState(false);


  
  const [ userMessages, setUserMessages] = useState({});
  const [loading, setLoading] = useState(false);



  useEffect(() => {
    console.log(socket);
    if(Object.keys(currentChat).length) setShowChat(true)
    socket.emit('setup' , {newRoom: currentChat._id, previousRoom: previousChat._id});
    socket.on('connected', (data)=> console.log(data) )
    const data  = {chat: currentChat._id };
    if (messages.length) data.last = messages[messages.length -1].createdAt

    socket.on('messages',  (data) => {
        const selectedChat_Messaages = data.filter(message => message.chat === currentChat._id) 
        setMessages(messages.concat(selectedChat_Messaages))}
        )  
    // let date = new Date(messages[0]?.createdAt);
    // console.log(date.toLocaleDateString('US', { hour: '2-digit', minute: '2-digit' }));
},[currentChat, messages]);


const sendMessage = (e)=>{
    socket.emit("message-room", currentChat._id, newMessage, loggedUser._id);
    setNewMessage('');

    socket.on('room-messages', (data) => {
        const selectedChat_Messaages = data.filter(message => message.chat === currentChat._id);
        setMessages(messages.concat(selectedChat_Messaages))});
    socket.on('notifications', (data) => console.log(data));
    };
  

const disableSendMessage = () => !newMessage.trim().length? true : false

 return (
   showChat && <div className="chat"> 
        <div className="chat-header">
            <Avatar/>
            <div className="contact-info">
            { currentChat.isGroupChat ?  <h5>{currentChat.chatName}</h5>  : 
          <><h5>{`${ othersInChat[0].firstName} ${ othersInChat[0].lastName}`}</h5>
           <p className="text-muted ">@{othersInChat[0].userName}</p></>}
            <p className="text-muted">Last Seen</p>
            </div>
            <div className='icons'>
              <IconButton>
                    <AttachFileIcon/>
              </IconButton>
              <IconButton>
                    <SearchOutlined/>
              </IconButton>
              <IconButton>
                    <MoreVertIcon/>
              </IconButton>
        </div>
        </div>
        <div className="chat-body">
            {messages.map(message =>
                <div key={message._id}>
                    <p className= { message.sender?._id === loggedUser._id ? "chat-message send-message" : "chat-message"}>
                        <span className="name text-muted p-1">@{message.sender?.userName}</span>
                        {message.content}
                        <span className="time text-muted">{message.createdAt}</span>
                    </p>
                </div>
            )}
        </div>

        <div className="chat-footer">
            <IconButton>
                <InsertEmoticonIcon/>
            </IconButton>
            <input type='text' value={newMessage} placeholder='Send Message' 
            onChange={(e)=> setNewMessage(e.target.value)} ></input>
            <IconButton onClick={sendMessage} disabled={disableSendMessage()} > 
               <SendIcon style={styles} sx={{ color: disableSendMessage()? "" : "lightgreen"}}/> 
            </IconButton> 
        </div>
    </div>
  )
}
export default Chat;