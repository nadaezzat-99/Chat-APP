//@ts-nocheck
import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
// import  selectedUserReducer from './features/selectedUserSlice';
import { createBrowserRouter , RouterProvider } from 'react-router-dom';
// import { AuthProvider } from './context/Auth';
import Layout from './Layout';
import Login from './components/user/login';
import Register from './components/user/register';
import Home from './pages/Home';
// import RequireAuth from './components/Auth/RequireAuth';
import chatsReducer from './features/chatsSlice';


const store = configureStore({
  reducer: {
    chatsData: chatsReducer,
  },
})


const router = createBrowserRouter([
  {path:'/', element: <Layout/>, children:[
    {path:'/login', element: <Login/>},
    {path:'/register', element: <Register/>},
    // {element: <RequireAuth/>, children:[
    //       {path:'home', element:<Home/>},
    // ]},
      {path:'home', element:<Home/>},
// ]},
  ]},
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <RouterProvider router={router}/>  
  </Provider>
);
reportWebVitals();
