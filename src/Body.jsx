import React, { useEffect } from 'react'
import NavBar from './navBar'
import { Outlet, useNavigate } from 'react-router-dom'
import Footer from './Footer'
import { BASE_URL } from './utils/constants'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { addUser } from './utils/userSlice'
import { useSelector } from 'react-redux'

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store)=>store.user);
  const fetchUser = async () => {
    if(userData) return;
    try {
    const res = await axios.get(BASE_URL+'profile/view',{
    withCredentials:true,
    })
    dispatch(addUser(res.data));
    }
    catch(err){
      if(err.status === 401)
      {navigate('/Login')}
    console.log("ERROR :",err);
    }
  }

  useEffect(()=>{
    fetchUser();
  },[])

  return (
    <div>
        <NavBar />
        <Outlet />  
        <Footer />
    </div>
  )
}

export default Body