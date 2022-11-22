import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
// import Alert from '@mui/material/Alert';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

function ForgotPassword() {
    let navigate = useNavigate();
    const [error, setError] = useState(true);
    const [cred, setCred] = useState("");
    const [loginData, setLoginData] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        contactNumber: ""
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        if (loginData.password === loginData.confirmPassword) {
            Axios.post(
                `http://localhost:7001/api/v1.0/tweetApp/login/forgotPassword/${loginData.username}`,
                loginData
            ).then(
                res => {
                    console.log(res);
                    console.log(res.data);
                    setCred(res.data);
                    if (res.data === "updated successfully") {
                        setLoginData({
                            username: "",
                            password: "",
                            contactNumber: ""
                        })
                        // navigate("../login", { replace: true });
                    } else{
                        setCred(false);
                    }
                }
            ).catch(
                error => {
                    setCred(false);
                    console.log(false);
                }
            )
        } else {
            setError(false);
        }
    }

    return (
        <div className='container'>
            <h1  className="mt-5 pt-3">Change Password</h1>
            <form onSubmit={handleSubmit}>
                <div className="row mb-2"></div>
                <div className="row mb-2">
                    <div className="col-sm-4"></div>
                    <label htmlFor="username" className="col-sm-2 col-form-label">Username</label>
                    <div className="col-sm-2">
                        <input type="username" className="form-control" id="username" value={loginData.username} onChange={(e) => setLoginData({ ...loginData, username: e.target.value })} required />
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col-sm-4"></div>
                    <label htmlFor="contactNumber" className="col-sm-2 col-form-label">Contact Number</label>
                    <div className="col-sm-2">
                        <input type="text" className="form-control" id="contactNumber" value={loginData.contactNumber} onChange={(e) => setLoginData({ ...loginData, contactNumber: e.target.value })} required />
                    </div>
                </div>
                <div className="row mb-2">
                    <   div className="col-sm-4"></div>
                    <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-2">
                        <input type="password" className="form-control" id="password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} required />
                    </div>
                </div>
                <div className="row mb-4">
                    <   div className="col-sm-4"></div>
                    <label htmlFor="password" className="col-sm-2 col-form-label">Confirm Password</label>
                    <div className="col-sm-2">
                        <input type="password" className="form-control" id="confirmPassword" value={loginData.confirmPassword} onChange={(e) => setLoginData({ ...loginData, confirmPassword: e.target.value })} required />
                    </div>
                </div>
                <div className="mb-4 text-success">
                    <p>{cred}</p>
                </div>
                <button type="submit" className="btn btn-primary mx-2">Confirm</button>
                <Link to="/login" className="text-decoration-none mx-2">Back to Login</Link>
            </form>

        </div>
    );
}

export default ForgotPassword;