import React from 'react'
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import { useEffect } from 'react';
import UserCard from './UserCard';
const Feed = () => {
  const feed = useSelector((store)=>store.feed)
    const dispatch = useDispatch();
    const getFeed = async ()=>{
      if(feed) return;
      try{// ✅ Fix in Feed.jsx
      const res = await axios.get(BASE_URL + 'feed', { withCredentials: true });
      dispatch(addFeed(res.data))}
      catch(err){
        console.error(err.response.data);
      }
    }

  useEffect(()=>{
    getFeed();
  },[])

  return (feed && ( 
    <div className='flex justify-center my-10'>
      <UserCard user={feed[0]} />
    </div>
  ))
};

export default Feed