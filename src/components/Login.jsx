import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
const Login = () => {
  const [emailId,setEmailId] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState("")
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try{
      const res = await axios.post(BASE_URL + "Login",
        {
        emailId,password
      },{ withCredentials: true}
    );
    console.log(res);
    dispatch(addUser(res.data));
    return navigate("/");
    }catch(err){
      setError(err?.response?.data || "Something went wrong");
    }
  }

  return (
    <div className="flex justify-center my-10">
      <div className="card card-dash bg-base-300 w-96">
        <div className="card-body flex justify-center">
          <h2 className="card-title">Login</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID</legend>
              
              <input type="text" value={emailId} 
              onChange ={((e)=>setEmailId(e.target.value))}
              className="input" placeholder="Type here" />
            </fieldset>
          </div>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input type="text" value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="input" placeholder="Type here" />
            </fieldset>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
