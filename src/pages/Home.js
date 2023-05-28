import React from 'react';
import '../App.css';
import Sidebar from '../components/sideBar/Sidebar';
import Chat from '../components/chat/chat';

function Home() {
  return (
    <div className='app__wrapper'>
         <Sidebar/>
         <Chat/> 
         </div> 
  )
}
export default Home;