// @ts-nocheck
import { useState } from 'react'
import Cookies from 'universal-cookie';
import useAuthContext from './useAuth';
import axios from '../axios';


export const useSignup = () => {
  const [error, setError] = useState({})
  const [isLoading, setIsLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const signup = async (userData) => {
    setIsLoading(true)
    setError({})

    axios.post('/users', {
      userData
    }).then(data=>{
        const cookies = new Cookies();
        cookies.set('user', data);
        cookies.set('token', data?.token);
      localStorage.setItem('user', JSON.stringify(data))

      dispatch({type: 'REGISTER', payload: data})

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

  return { signup, isLoading, error }
}