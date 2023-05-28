// @ts-nocheck
import { createContext , useReducer } from 'react'

export const AuthContext = createContext({});
export const authReducer = (state, action) => {
    switch(action.type){
        case 'LOGIN':
        case 'REGISTER':
            return {user: action.payload.user, token: action.payload.token};
        case 'LOGOUT':
            return {user:null};
        default:
            return state;
    }
}

const AuthContextProvider = ({children}) => {
    const [ state , dispatch ] = useReducer(authReducer, { 
       user:null
     })

     console.log('AuthContext state', state);
    return(
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;
