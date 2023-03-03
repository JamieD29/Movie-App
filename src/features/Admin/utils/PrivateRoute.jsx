import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom';

const PrivateRoute = () => {
  const navigate = useNavigate();
  const [auth, setAuth] = useState({token : localStorage.getItem('adminToken')}) ;

  if(auth.token){
    return <Outlet/>;
 }else{
   return <Navigate to='/admin/signin'/>
 }
 
}

export default PrivateRoute