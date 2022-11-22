import Axios from "axios";
import React, { Component } from "react";
import jwt_decode from "jwt-decode";
import { useState, useEffect } from 'react';
import EditUserCard from "./EditUserCard";
import '../form.css';

const UserCard =()=> {
    const pathname = window.location.pathname;
    const token = localStorage.getItem('theToken');

    // const [click, setClick] = useState(false);
    const [edit, setEdit] = useState(false);
    const [user, setUser] = useState({   //call api through q(email<=>username) //emailpathuser
        userName: "",
        firstName: "",
        lastName: "",
        email: "",
        contactNumber: ""
    });

    useEffect(() => {
        getUser();
    }, [])


 const getUser = () => {
    if(token!=null){
        var decoded = jwt_decode(token);
        var tokenUsername = decoded.sub;
        console.log(tokenUsername)
        // const endpoint = `http://localhost:7001/api/v1.0/tweetApp/user/search/${tokenUsername}`;
    Axios.get(`http://localhost:7001/api/v1.0/tweetApp/user/search/${tokenUsername}`, { headers: { Authorization: token } })
        .then(res => {
            const dt = res.data;
            setUser(dt);
        }).catch(err => {
            console.log(err);
        })
    }
    else{
        console.log(token)
    }
 }

  const handleEditProfile = () => {
    setEdit(!edit);
  }

return (
    <div className="container">
        <div className="card mx-auto" style={{width: "18rem"}}>
            <img  src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg' className="card-img-top m-auto w-75 h-75" alt="..." />
            <div className="card-body m-0 p-0">
                <h5 className="card-title ">{user.firstName} {user.lastName}</h5>
                <p className="card-text m-0 p-0"><span className="badge rounded-pill text-bg-secondary">{user.email}</span></p>
                <p className="card-text m-0 p-0">Contact: <span className="badge rounded-pill text-bg-secondary">{user.contactNumber}</span></p>
            </div>
            <div>
            <button type="button" className="btn btn-sm btn-outline-secondary mx-2 my-3" onClick={handleEditProfile}>Update Profile</button>
            </div>

        </div>
        <br/>
        {!edit ? "" : <EditUserCard userName={user.userName} />}

    </div>
);
}

export default UserCard;
