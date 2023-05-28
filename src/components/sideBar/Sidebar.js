//@ts-nocheck
import React, { useEffect, useState } from "react";
import "./SideBar.css";
import MessageIcon from "@mui/icons-material/Message";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { IconButton, Avatar } from "@mui/material";
import Channel from "../channels/channels";
import { ChatState } from "../../context/ChatProvider";
import ChatProvider from "../../context/ChatProvider";
import Cookies from "universal-cookie";
import axios from "../../axios";
import { useToast } from "@chakra-ui/toast";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setChats as chats } from "../../features/chatsSlice";

function Sidebar({ fetchAgain }) {
  const allChats = useSelector((state) => state.chatsData.chats);
  const dispatch = useDispatch();

  const cookies = new Cookies();
  const token = cookies.get("token");
  const toast = useToast();

  const [loggedUser, setLoggedUser] = useState({});

  const fetchChats = async () => {
    const config = {
      headers: {
        Authorization: token,
      },
    };
    console.log(allChats);
    await axios
      .get("/chats", config)
      .then((res) => {
        console.log(res.data);
        dispatch(chats(res.data.chats));
        console.log(allChats);
      })
      .catch(
        toast({
          title: "Error Occured!",
          description: "Failed to Load the chats",
          status: "error",
          duration: 5000,
          isClosable: true,
          position: "bottom-left",
        })
      );
  };

  useEffect(() => {
    setLoggedUser(cookies.get("user"));
    fetchChats();
    console.log(allChats);
  }, [fetchAgain]);

  return (
    <div className="sidebar">
      <div className="header">
        <Avatar />
        <div className="icons">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton>
            <MessageIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="search">
        <SearchOutlined />
        <input type="text" placeholder="Search or start new chat"></input>
      </div>
      <div className="channels">
        {allChats?.length ? (
          allChats.map((chat) => <Channel chat={chat} key={chat._id} />)
        ) : (
          <p> No Chats Available </p>
        )}
      </div>
    </div>
  );
}
export default Sidebar;
