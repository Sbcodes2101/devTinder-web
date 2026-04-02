import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { removeUser } from '../utils/userSlice'
const NavBar = () => {
  const user = useSelector(store => store.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = async()=>{
    try{
      await axios.post(BASE_URL+'logout',{},{
        withCredentials:true
      });
      dispatch(removeUser())
      return navigate('/Login')
    }
    catch(err){
      console.error(err)
    }
  }

  return (
    <div className="navbar bg-base-300 shadow-sm h-15">
        <div className="flex-1">
          <Link to='/' className="btn btn-ghost text-xl">👨‍💻 DevTinder</Link>
        </div>
        <div className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
          {user && (<div className="dropdown dropdown-end mx-5 flex py-4">
            <p className='p-4 items-center'>Welcome, {user.firstName}</p>
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full item-center">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </div>
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to='/profile' className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to='/connections'>Connections</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>)}
        </div>
      </div>
  )
}

export default NavBar