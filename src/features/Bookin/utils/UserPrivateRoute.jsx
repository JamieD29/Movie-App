import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { fetchProfile } from '../../Authen/authThunk';

const PrivateRoute = () => {
  const [auth, setAuth] = useState({token : localStorage.getItem('userToken')}) ;

  if(auth.token !== null){
    return <Outlet/>;
 }else{
   return <Navigate to='/login'/>
 }
 
}

export default PrivateRoute