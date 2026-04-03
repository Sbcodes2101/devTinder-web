import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
const Request = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  

  const reviewRequest = async (status,_id) => {
    try{
      const res = axios.post(BASE_URL + 'request/review/' + status + '/' + _id,{},{
        withCredentials:true
      })
      dispatch(removeRequest(_id));
    }
    catch(err){
      console.error(err)
    }
  }

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  },[]);

  if (!requests) return null;

  if (requests.length === 0) return <h1>No Request</h1>;

  return (
    <div  className=" text-center my-10">
      <h1>Your Requests</h1>
      {requests.map((request) => {
        const {_id, firstName, lastName, photoUrl, age, gender, about } =
          request.fromUserId;
        return (
          <div key={_id} className="flex justify-between items-center align-middle m-4 p-4 rounded-lg bg-base-300 w-1/2 mx-auto">
            <div>
              <img
                className="w-20 h-20 rounded-full object-cover"
                src={photoUrl}
              />
            </div>

            <div className="text-left  m-4">
              <h2>{firstName + " " + lastName}</h2>
              <h2>{age + " , " + gender}</h2>
              <p>{about}</p>
            </div>
            <button className="btn btn-active btn-primary px-12 py-4" onClick={()=>reviewRequest("rejected", request._id)}>Reject</button>
        <button className="btn btn-active btn-secondary px-12 py-4" onClick={()=>reviewRequest("accepted", request._id)}>Accept</button>
          </div>
        );
      })}

    </div>
  );
};

export default Request;
