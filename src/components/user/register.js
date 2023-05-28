// @ts-nocheck
import React, {useRef, useState } from "react";
import { Button , Form} from 'react-bootstrap';
import './user_forms.css';
import { useSignup } from "../../HOOKS/useSignup";
import { Link, Navigate, useNavigate } from "react-router-dom";



function Register() {
  const userNameRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  const eamilRef = useRef();
  const passwordRef = useRef();
  const picRef = useRef();
  const navigate = useNavigate();
  
  const [ userName, setUserName] = useState('');
  const [ firstName, setFirstName] = useState('');
  const [ lastName, setLastName] = useState('');
  const [ email, setEmail] = useState('');
  const [ password, setPassword] = useState('');
  const [ pic, setPic] = useState('');
  const {signup, error, isLoading} = useSignup()

  const signUp = async (e) => {
    e.preventDefault();
    await signup({userName, firstName, lastName, email, password})
    console.log('error',error);
    setUserName('');
    setPassword('');
    }

return (
  <div className="signing">
   <Form onSubmit={signUp}>
        <h2 className="m-3" >Sign Up</h2>
        <Form.Group>
        <Form.Label  htmlFor="firstname"  className="pt-2"> First Name: </Form.Label>
        <Form.Control type="text"  id="firstname" ref={firstNameRef} value={firstName} 
        onChange={(e) => setFirstName(e.target.value)} required min={3} max={30}></Form.Control>
        {error?.firstName && <p className="alert alert-danger">{error.firstName}</p>}
        
        <Form.Label  htmlFor="lastname" className="pt-2"> Last Name: </Form.Label>
        <Form.Control type="text"  id="lastname" ref={lastNameRef} value={lastName} 
        onChange={(e) => setLastName(e.target.value)} required></Form.Control>
        {error?.lastName && <p className="alert alert-danger">{error.lastName}</p>}

        <Form.Label  htmlFor="username" className="pt-2"> User Name: </Form.Label>
        <Form.Control type="text"  id="username" ref={userNameRef} value={userName} 
        onChange={(e) => setUserName(e.target.value)} required></Form.Control>
        {error["userName"] && <p className="alert alert-danger">{error.userName}</p>}

       
        <Form.Label  htmlFor="email" className="pt-2"> Email: </Form.Label>
        <Form.Control type="email"  id="email" ref={eamilRef} value={email} 
        onChange={(e) => setEmail(e.target.value)} required></Form.Control>
        {error?.email && <p className="alert alert-danger">{error.email}</p>}


        <Form.Label htmlFor="password" className="pt-2">Password: </Form.Label>
        <Form.Control  type="password" id="password" ref={passwordRef} value={password}
         onChange={(e) => setPassword(e.target.value)} required></Form.Control>
        {error?.password && <p className="alert alert-danger">{error.password}</p>}

        <Form.Label  htmlFor="pic" className="pt-2"> Profile Picture: </Form.Label>
        <Form.Control type="file"  accept="image/png, image/jpeg" id="pic" ref={picRef} value={pic} 
        onChange={(e) => setPic(e.target.files[0])}></Form.Control>
        {error?.pic && <p className="alert alert-danger">{error.pic}</p>}

        </Form.Group>
        <div className="text-center p-3">
            <button type="submit" >Register</button>
        </div>
    </Form>
    <div className="m-5">
				<h1>Welcome Back!</h1>
				<p>To keep connected with us please login with your personal info</p>
				<button onClick={()=>navigate('/login')}>Sign In</button>
		</div>
	</div>
  )
}
export default Register;