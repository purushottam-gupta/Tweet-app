import React from 'react';
import { useState } from 'react';
import Axios from 'axios';

function EditUserCard(props) {
    const token = localStorage.getItem('theToken');
    const [success, setSuccess] = useState(false);
    const userName = props.userName;
    console.log(userName);
    const [signupData, setSignupData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        contactNumber: "",
    })

    const handleSubmit = (e) => {
        e.preventDefault();

        Axios.put(
            `http://localhost:7001/api/v1.0/tweetApp/update/${userName}`,
            signupData,
            { headers: { Authorization: token } }
        ).then(
            res => {
                console.log(res);
                setSuccess(!success);
                setSignupData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    password: "",
                    contactNumber: ""
                });
            }
        ).catch(
            error => {
                console.log(error);
            }
        )

        // console.log(signupData);
    }

    return (
        <div className='container'>
            <hr/>
            <h4 className="">Edit Profile</h4>
            <form onSubmit={handleSubmit}>
                {/* <div style={{ display: `${!success ? "none" : ""}` }} ><Alert severity="success">This is a success alert — check it out!</Alert></div> */}
                <div className="row">
                    <div className="col-sm-4">
                    </div>
                    <label htmlFor="firstName" className="col-sm-2 col-form-label">First Name</label>
                    <div className="col-sm-2">
                        <input type="text" className="form-control" id="firstName" value={signupData.firstName} onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })} />
                    </div>
                </div>
                <div className="row my-2">
                    <div className="col-sm-4">
                    </div>
                    <label htmlFor="lastName" className="col-sm-2 col-form-label">Last Name</label>
                    <div className="col-sm-2">
                        <input type="text" className="form-control" id="lastName" value={signupData.lastName} onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })} />
                    </div>

                </div>
                <div className="row ">
                    <div className="col-sm-4">
                    </div>
                    <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                    <div className="col-sm-2">
                        <input type="password" className="form-control" id="password" value={signupData.password} onChange={(e) => setSignupData({ ...signupData, password: e.target.value })} />
                    </div>

                </div>
                <div className="row my-2">
                    <div className="col-sm-4"></div>
                    <label htmlFor="contactNumber" className="col-sm-2 col-form-label">Contact Number</label>
                    <div className="col-sm-2">
                        <input type="text" className="form-control" id="contactNumber" value={signupData.contactNumber} onChange={(e) => setSignupData({ ...signupData, contactNumber: e.target.value })} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4"></div>
                    <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-2">
                        <input type="email" className="form-control" id="email" value={signupData.email} onChange={(e) => setSignupData({ ...signupData, email: e.target.value })} />
                    </div>
                </div>

                <button type="submit" className="btn btn-outline-primary mt-3">Confirm Update</button>
            </form>
        </div>
    );
}


export default EditUserCard;