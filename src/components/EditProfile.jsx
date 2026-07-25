import React from "react";
import { useState } from "react";
import UserCard from "./UserCard";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [gender, setGender] = useState(user.gender || "");
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotourl] = useState(user.photoUrl);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(false);
  const dispatch = useDispatch();


  const saveProfile = async () => {
    try {
      if (!user) return null;
      const res = await axios.patch(
        BASE_URL + "profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          photoUrl,
        },
        {
          withCredentials: true,
        },
      );
      
      dispatch(addUser(res?.data?.data));
      setToast(true);

      setTimeout(() => {
        setToast(false);
      }, 3000);

    } catch (err) {
      console.log(err);
    }
  };

 

  return (
    <>
    <div className="flex justify-center">
      <div className="flex justify-center my-2 ">
        <div className="card card-dash bg-base-300 w-96">
          <div className="card-body flex justify-center gap-0">
            <h2 className="card-title">Edit Profile</h2>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>

                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input"
                  placeholder="Type here"
                />
              </fieldset>
            </div>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">LastName</legend>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input"
                  placeholder="Type here"
                />
              </fieldset>
            </div>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">age</legend>
                <input
                  type="text"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="input"
                  placeholder="Type here"
                />
              </fieldset>
            </div>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">gender</legend>
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="input"
                  placeholder="Type here"
                />
              </fieldset>
            </div>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">About</legend>
                <input
                  type="text"
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  className="input"
                  placeholder="Type here"
                />
              </fieldset>
            </div>
            <div>
              <fieldset className="fieldset">
                <legend className="fieldset-legend">PhotoUrl</legend>
                <input
                  type="text"
                  value={photoUrl}
                  onChange={(e) => setPhotourl(e.target.value)}
                  className="input"
                  placeholder="Type here"
                />
              </fieldset>
            </div>
            <p className="text-red-500">{error}</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary" onClick={saveProfile}>Edit Profile</button>
            </div>
          </div>
        </div>
      </div>

      <UserCard 
    user={{ firstName, lastName, age, gender, about, photoUrl }} 
    isPreview={true}
    />
    </div>
    {toast && <div className="toast toast-top toast-center">
    <div className="alert alert-info">
    <span>Alert.</span>
    </div>
    <div className="alert alert-success">
    <span>Profile updated successfully.</span>
    </div>
    </div>}
    </>
  );
};

export default EditProfile;
