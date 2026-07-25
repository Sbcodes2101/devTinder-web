import React from 'react'
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { removeUserFromFeed } from '../utils/feedSlice';
import axios from 'axios';
const UserCard = ({user, isPreview = false}) => {
     const { _id, photoUrl, firstName, lastName, age, gender, about } = user;
     
    const dispatch = useDispatch();
    const handleSendRequest = async (status, userId) => {
      try{
        const res = await axios.post(BASE_URL+"request/send/"+status+'/'+userId,{},{
          withCredentials:true
        });

        dispatch(removeUserFromFeed(userId));
        
      }catch(err){
        console.error(err.response.data);
      }
    }

  return (
    <div className="card bg-base-300 w-96 h-125 shadow-sm my-10 mx-10">
  <figure>
    <img
      src={photoUrl}
      alt={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYCIbnh_ChMzIdXJKs4aBN4JW6yYFLzqtRqIguLLdPxJvycnw_bjuscm7_hpxxfGKIUYnwm3Dk-8q44gLPHRRCsNKJaK9LwvivTo5lCj2M7A&s=10"} />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{firstName+" "+lastName}</h2>
    {age && gender && <p>{age+" "+gender}</p>}
    <p>{about}</p>
    {!isPreview && (
          <div className="card-actions justify-center my-4">
            <button className="btn btn-primary" onClick={() => handleSendRequest("ignored", _id)}>Ignore</button>
            <button className="btn btn-secondary" onClick={() => handleSendRequest("interested", _id)}>Interested</button>
          </div>
        )}
    </div>
    </div>
  )
}

export default UserCard