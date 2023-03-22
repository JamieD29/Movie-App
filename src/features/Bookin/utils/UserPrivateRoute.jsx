import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const PrivateRoute = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({token : localStorage.getItem('userToken')}) ;

  if(auth.token){
    return <Outlet/>;
 }else{
   return <Navigate to='/login'/>
 }
 
}

export default PrivateRoute