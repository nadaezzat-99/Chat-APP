// @ts-nocheck
import { useState } from 'react'
import Cookies from 'universal-cookie';
import useAuthContext from './useAuth';
import axios from '../axios';
import { useDispatch } from 'react-redux';
import { setUser as user } from '../features/userSlice';




export const useSignin = () => {
  const [error, setError] = useState({})
  const [isLoading, setIsLoading] = useState(null)
  // const { dispatch, state } = useAuthContext()
  const dispatch = useDispatch();


  const signin = async (userData) => {
    setIsLoading(true)
    setError({})
    console.log(userData);
    axios.post('/users/signin', {
      ...userData
    }).then(res=>{
        const cookies = new Cookies();
        cookies.set('user', res.data.user);
        cookies.set('token', res.data?.token);
        console.log(res.data);

      //  dispatch({type: 'LOGIN', payload: res.data})
        dispatch(user({user: res.data.user, token: res.data.token}));

      setIsLoading(false)
    }).catch(err => {
        if(err.response.status === 422){
            alert(err.response.data.message);

        }
        if(err.response.status === 400){
            const key =  err.response.data.message.split(' ')[0];
            error[key] = err.response.data.message;
            setIsLoading(false);
        }
        setError(error)
    })
  }

  return { signin, isLoading, error }
}