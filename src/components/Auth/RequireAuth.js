//@ts-nocheck
import React from "react"
import { Navigate , useLocation , Outlet } from "react-router-dom"
import useAuth from "../../HOOKS/useAuth"

function RequireAuth() {
    const { auth } = useAuth();
    const location = useLocation();
    console.log(auth);
  return (
    auth?.userName ? <Outlet/> : <Navigate to={'/login'} state={{ from: location }}  replace/>
  )
}
export default RequireAuth