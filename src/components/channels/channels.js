// @ts-nocheck
import React  from "react"
import { Avatar } from "@mui/material"
import {useDispatch, useSelector } from 'react-redux';
import { setSelectedChat as setChat } from '../../features/selectedUserSlice';
import './channels.css'

function Channel(props) {
  
  const dispatch = useDispatch();
  const chat = props.chat;
  const loggedUser = useSelector((state) => state.userData.user);
  const othersInChat = chat.users.filter(user => user._id !== loggedUser._id);

  
  const setSelectedUser = () => {
    dispatch(setChat(chat));
  }
  return (
    <div className="channel">
        <Avatar/>
        <div className="chat" onClick={setSelectedUser}>
          { chat.isGroupChat ?  <h5>{chat.chatName}</h5>  : 
          <><h5>{`${ othersInChat[0].firstName} ${ othersInChat[0].lastName}`}</h5>
           <p className="text-muted m-1">@{othersInChat[0].userName}</p></>}
             <p className="text-muted">Last Message</p>
        </div>
    </div>
  )
}
export default Channel