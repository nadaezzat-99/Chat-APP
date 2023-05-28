// @ts-nocheck
import React, {useRef, useState, useEffect } from "react";
import { Button , Form} from 'react-bootstrap';
import './user_forms.css';
import { Link, useNavigate } from "react-router-dom";
import { useSignin } from "../../HOOKS/useSignin";



function Signin() {
  const navigate = useNavigate();
  const userNameRef = useRef();
  const passwordRef = useRef();
  const [ userName, setUserName] = useState('');
  const [ password, setPassword] = useState('');
  const {signin, error, isLoading} = useSignin()

 const login = async(e) => {
    e.preventDefault();
    await signin ({userName, password})
    console.log('error',error);
    setUserName('');
    setPassword('');
    navigate('/home')
    }
        
 return (
<div className="signing">
      <div className="m-3" >
          <h1>Hello, Friend!</h1>
          <p>Enter your personal details and start journey with us</p>
          <button onClick={()=> navigate("/register")} > Register</button>
			</div>
     <div>
       <Form onSubmit={login}>
       <h2 className="pt-5">Sign in</h2>
       <span>or use your email for registration</span>
         <Form.Group>
           <Form.Label htmlFor="username" className="pt-2"> User Name: </Form.Label>
           <Form.Control type="text" id="username" ref={userNameRef} value={userName}
             onChange={(e) => setUserName(e.target.value)} required></Form.Control>

           <Form.Label htmlFor="password" className="pt-2">Password: </Form.Label>
           <Form.Control type="password" id="password" ref={passwordRef} value={password}
             onChange={(e) => setPassword(e.target.value)} required></Form.Control>
         </Form.Group>
         <div className="text-center p-3">
           <button type="submit">Login</button>
         </div>
        </Form>
     </div>
     </div>
  )
}

export default Signin;