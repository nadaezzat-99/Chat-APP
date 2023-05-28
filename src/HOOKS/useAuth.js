import { useContext } from "react";
import { AuthContext } from "../context/Auth";

const useAuthContext = ()=> {
   const context =  useContext(AuthContext);
   if(!context) throw Error('Provide context');
   return context;
} 

export default useAuthContext;