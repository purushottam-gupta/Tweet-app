import React, { useState, setState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Home from './Home';
import '../form.css';

function LoginForm() {

    let navigate = useNavigate();
    const [error, setError] = useState("");
    const [usernameError, setUserNameError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [user, setUser] = useState({
        username: "",
        password: ""
    })
    const [link, setLink] = useState("");
    const [isLoggedin, setIsLoggedin] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "userName") {
            setUser({ ...user, username: value });
        }
        if (name === "password") {
            setUser({ ...user, password: value });
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateFields()) {
            axios.post(`http://localhost:7001/login`, user)
                .then(res => {
                    console.log(res);
                    console.log(res.data);
                    if (res.status === 200) {
                        let token = res.data;
                        localStorage.setItem('theToken', token);
                        // setIsLoggedin(true);
                        setUser({
                            username: "",
                            password: ""
                        })
                        navigate("../", { replace: true });
                    } else {
                        setPasswordError("Something went wrong");
                    }
                }).catch(e => { 
                    setError("Invalid Credential");
                    console.log(e) 
                })
        }
    }

    const validateFields = () => {
        let usernameError = "";
        let passwordError = "";

        if (!user.username)
            usernameError = "Please enter name";
        if (!user.password)
            passwordError = "Please enter your password";
        if (usernameError || passwordError) {
            setPasswordError(passwordError);
            setUserNameError(usernameError);
            // setState(usernameError, emailError, passwordError);
            return false;
        }
        return true;
    }

    // const logout = () => {
    //     localStorage.removeItem('theToken');
    //     setIsLoggedin(false);
    // };

    function handleClick() {
        navigate("../forgotPassword", { replace: true });
    }

    return (
        <div className="colour">
                <div className="container">
                    <h1 className = "mt-5 pt-3">Login</h1>
            <hr/>
                    <form onSubmit={(e) => handleSubmit(e)} className="">
                        <div>
                            <input type="text"
                                className="form-control w-50 mx-auto my-2"
                                name="userName"
                                placeholder="Username"
                                value={user.username}
                                onChange={(e) => handleChange(e)}
                            />
                            <div style={{ color: 'red', fontSize: 11 }}>
                                {usernameError}
                            </div>
                        </div>
                        <div>
                            <input type="password"
                                className="form-control w-50 mx-auto"
                                name="password"
                                placeholder="Your password"
                                value={user.password}
                                onChange={(e) => handleChange(e)}
                            />
                            <div style={{ color: 'red', fontSize: 11 }}>
                                {passwordError}
                            </div>
                        </div>
                        <button className="btn btn-primary my-2" type="submit">Login</button>
                        <div style={{ color: 'red', fontSize: 11 }}>
                                {error}
                        </div>
                    </form>
                    Forgot password? <a className='text-decoration-none' onClick={handleClick}>Forgot Password</a> <br />
                    New here? <Link className="text-decoration-none" to="/register">Register</Link>
                </div>
                </div>
    );
}

export default LoginForm
