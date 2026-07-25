import React, { useEffect } from 'react'
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice';
import UserCard from './UserCard';

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + 'feed', { withCredentials: true });
      dispatch(addFeed(res.data));
    } 
    catch (err) {
      console.error(err.response.data);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed || feed.length === 0) return (
    <div className='flex justify-center my-10'>
      <h1 className='text-2xl font-bold'>No more users in feed! 🎉</h1>
    </div>
  );

  return (
    <div className='flex justify-center my-0'>
      <UserCard user={feed[0]} />
    </div>
  );
};

export default Feed;