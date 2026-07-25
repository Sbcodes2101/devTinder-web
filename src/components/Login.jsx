import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
const Login = () => {
  const [emailId,setEmailId] = useState("");
  const [password,setPassword] = useState("");
  const [firstName,setFirstName] = useState("");
  const [lastName,setLastName] = useState("");
  const [error,setError] = useState("")
  const [isLoginForm, setLoginForm] = useState(false)
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
  console.error(err.response.data);
  setError(err?.response?.data || "Something went wrong");
}
  }

  const handleSignup = async () =>{
    try{
      const res =await axios.post(BASE_URL + 'signup',{firstName,lastName,emailId,password},{withCredentials:true})
      console.log(res.data)
      dispatch(addUser(res.data.data));
      return navigate('/profile');
    }
    catch(err){
  console.error(err.response.data); // ✅ add this
  setError(err?.response?.data || "Something went wrong");
  }
  }

  return (
    <div className="flex justify-center my-10">
      <div className="card card-dash bg-base-300 w-96">
        <div className="card-body flex justify-center">
          <h2 className="card-title">{isLoginForm ? "Login" : "Signup" }</h2>
          {!isLoginForm &&(<><div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">FirstName</legend>
              <input type="text" value={firstName}
              onChange={(e)=>setFirstName(e.target.value)}
              className="input" placeholder="Type here" />
            </fieldset>
          </div>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">LastName</legend>
              <input type="text" value={lastName}
              onChange={(e)=>setLastName(e.target.value)}
              className="input" placeholder="Type here" />
            </fieldset>
          </div></>)}
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
              <input type="password" value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="input" placeholder="Type here" />
            </fieldset>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions">
            <button className="btn btn-primary" onClick={isLoginForm? handleLogin:handleSignup}>{isLoginForm? "Login":"Sign Up"}</button>
          </div>
          <p className="text-red-500" onClick={() => setLoginForm((value) => !value)}>{isLoginForm? "New User? Signup Here" : "Existing User?Login Here"}</p>
        </div>
      </div>
    </div>
  );
};
export default Login;
