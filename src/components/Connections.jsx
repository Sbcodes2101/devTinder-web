import React from 'react'
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addConnections } from '../utils/connectionSlice';
import { useSelector } from 'react-redux';
const Connections = () => {
    const connections = useSelector((store)=>store.connections)
    const dispatch = useDispatch();
    const fetchConnections = async ()=>{
        try{
            const res = await axios.get(BASE_URL + 'user/connections', { withCredentials: true });
            console.log(res.data);
            dispatch(addConnections(res.data.data))
        }catch(err){
            console.error(err.response.data);
        }
    }

    useEffect(()=>{
        fetchConnections();
    },[])

     if(!connections) return null;

     if(connections.length===0) return <h1>No connections Found</h1>

  return (
    <div className=' text-center my-10'>
        <h1>Your Connections</h1>
        {connections.map((connections,id)=>{
            const{firstName, lastName, photoUrl, age, gender, about} = connections
         return ( <div key={id} className='flex m-4 p-4 rounded-lg bg-base-300 w-1/3 mx-auto'>
            <div> 
                <img className='w-20 h-20 rounded-full object-cover' src={photoUrl}/>
            </div> 

            <div className='text-left  m-4'>
               <h2>{firstName + " " + lastName}</h2> 
               <h2>{age + " , " + gender}</h2> 
               <p>{about}</p>
            </div>  
          </div>)
        })}
    </div>
  )
}

export default Connections