import React, {useState,setState} from 'react';
import { Link } from "react-router-dom";
import  Axios  from 'axios';
import myAxios from './Helper'
import  { useNavigate } from 'react-router-dom';
import '../form.css';
function RegistrationForm() {
    
    // const [firstName, setFirstName] = useState("");
    // const [lastName, setLastName] = useState("");
    // const [userName, setUserName] = useState("");
    // const [email, setEmail] = useState("");
    // const [password,setPassword] = useState("");
    let navigate = useNavigate();
    const [confirmPassword,setConfirmPassword] = useState("");
    const [usernameError, setUserNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [passwordError,setPasswordError] = useState("");
    const [confirmPasswordError,setConfirmPasswordError] = useState("");

    const [user,setUser]=useState({
        firstName:"",
        lastName:"",
        userName:"",
        email:"",
        password:"",
        contactNumber:""
    })

    const handleChange = (e) => {
        const {name , value} = e.target;
        if(name === "firstName"){
            setUser({...user,firstName:value});
        }
        if(name === "lastName"){
            setUser({...user,lastName:value});
        }
        if(name === "userName"){
            setUser({...user,userName:value});
        }
        if(name === "email"){
            setUser({...user,email:value});
        }
        if(name === "contactNumber"){
            setUser({...user,contactNumber:value});
        }
        if(name === "password"){
            setUser({...user,password:value});
        }
        if(name === "confirmPassword"){
            setConfirmPassword(value);
        }

    }

    const handleSubmit  = (event) => {
        event.preventDefault();
        if(validateFields()){
            myAxios.post(`/register`,  user )
                .then(res => {
                console.log(res);
                console.log(res.data);
                navigate("../login", { replace: true });
                }).catch(e=>{console.log(e)})
            // console.log(firstName,lastName,email,password,confirmPassword);
            // setState({"",""});
        }
    }

    const validateFields = () =>{
        let usernameError = "";
        let emailError = "";
        let passwordError = "";
        let confirmPasswordError = "";

        if(!user.userName)
            usernameError = "Please enter name";
        if(!user.email.includes('@'))
            emailError = "Not a valid email";
        if(!user.password)
            passwordError = "Please enter your password";
        if(user.password!==confirmPassword)    
            confirmPasswordError="Passwords do not match";
        if(usernameError || emailError || passwordError || confirmPasswordError){
            setEmailError(emailError);
            setPasswordError(passwordError);
            setUserNameError(usernameError);
            setConfirmPasswordError(confirmPasswordError);
            // setState(usernameError, emailError, passwordError);
            return false;
        }
        return true;
    }

    return(
        <div className="colour">
        <div className="container">
            <h1 className = "mt-5 pt-3">Register</h1>
            <hr/>
            <form onSubmit={(e)=>handleSubmit(e)} className="">
            <div class="row my-2 mx-auto">
                <div class="col">
                    <input type="text"
                    className="form-control w-50 ml-auto"
                     name="firstName"
                     placeholder="Firstname"
                     value={user.firstName}
                     onChange={(e)=>handleChange(e)}
                     required
                     />
                     {/* <div style={{color: 'red', fontSize: 11}} className="text-right">
                        {usernameError}
                     </div> */}
                </div>
                <div className="col">
                    <input type="text"
                    className="form-control w-50"
                     name="lastName"
                     placeholder="Lastname"
                     value={user.lastName}
                     onChange={(e)=>handleChange(e)}
                     required
                     />
                     {/* <div style={{color: 'red', fontSize: 11}} className="text-left">
                        {usernameError}
                     </div> */}
                </div>
            </div>
                <div>
                    <input type="text"
                    className="form-control w-50 mx-auto"
                     name="userName"
                     placeholder="Username"
                     value={user.userName}
                     onChange={(e)=>handleChange(e)}
                     />
                     <div style={{color: 'red', fontSize: 11}}>
                        {usernameError}
                     </div>
                </div>
                <div>
                    <input type="text"
                    className="form-control my-2 w-50 mx-auto"
                     name="email"
                     placeholder="Email"
                     value={user.email}
                     onChange={(e)=>handleChange(e)}
                     required
                     />
                     <div style={{color: 'red', fontSize: 11}}>
                        {emailError}
                     </div>
                </div>
                <div>
                    <input type="text"
                    className="form-control my-2 w-50 mx-auto"
                     name="contactNumber"
                     placeholder="Contact number"
                     value={user.contactNumber}
                     onChange={(e)=>handleChange(e)}
                     required
                     />
                     <div style={{color: 'red', fontSize: 11}}>
                        {emailError}
                     </div>
                </div>
                <div>
                    <input type="password"
                    className="form-control w-50 mx-auto"
                     name="password"
                    placeholder="Your password"
                    value={user.password}
                    onChange={(e)=>handleChange(e)}
                    />
                    <div style={{color: 'red', fontSize: 11}}>
                        {passwordError}
                    </div>
                </div>
                <div>
                    <input type="password"
                    className="form-control my-2 w-50 mx-auto"
                    name="confirmPassword"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e)=>handleChange(e)}
                    required
                    />
                    <div style={{color: 'red', fontSize: 11}}>
                        {confirmPasswordError}
                    </div>
                </div>
                <button className="btn btn-primary" type="submit">Register</button>
            </form>
            Already have account? <Link className="text-decoration-none" to="/login">Login</Link>
            </div>
            </div>
    )       
}

export default RegistrationForm
