import React from 'react';
import './index.css';
import App from './App';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import  selectedUserReducer from './features/selectedUserSlice';
import  chatsReducer from './features/chatsSlice';
import  userReducer from './features/userSlice';
import  AuthContextProvider  from './context/Auth';


const store = configureStore({
    reducer: {
      selectedChatData: selectedUserReducer,
      chatsData: chatsReducer,
      userData: userReducer,
    },
  })
  

function Layout() {
  return (
    <AuthContextProvider>
        <Provider store={store}>
            <App/>
        </Provider>
   </AuthContextProvider>
  )
}
export default Layout