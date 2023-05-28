import React, {createContext, useContext, useEffect, useState} from "react";
import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie';


const UserContext = createContext({});

 export const UserProvider = ({ children}) => {
        const [user, setUser] = useState({});
        
        useEffect(()=> {
            // @ts-ignore
            const userInfo = JSON.parse(Cookies.get("user"));
            if(!userInfo) {Navigate({to:'/login', replace:true});
            console.log(userInfo);}
            else setUser(userInfo);

        }, [user])

        return(
            <UserContext.Provider value={{user , setUser}}>
               {children}
            </UserContext.Provider>
        )
}

export default UserContext;

export const UserState = () => {
    return useContext(UserContext);
}