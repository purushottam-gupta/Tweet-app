import React, { useState, setState, useEffect } from 'react';
import { Link } from "react-router-dom";

const Navbar = (props) => {
  const token = localStorage.getItem('theToken');
  // const [isPresent, setIsPresent] = useState(false);
  let isPresent=true;
  if (token == null) {
    isPresent=false;
  }

  // useEffect(()=>{
  // isToken();
  // } ,[])
  
  const logout = () => {
    localStorage.removeItem('theToken');
  }
  return (
    <>
      {!isPresent ? (
        <div>
          <nav class="navbar fixed-top navbar-expand-lg navbar-light" style={{ backgroundColor: "#e3f2fd" }} >
            <a class="navbar-brand font-weight-bold" href="#">Tweet App</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="/">Home<span class="sr-only">(current)</span></a>
                </li>
                {/* <li class="nav-item">
        <a class="nav-link" href="#">Link</a>
      </li> */}
              </ul>
              <form class="form-inline my-2 my-lg-0">
                <a class="btn btn-primary nav-link text-light" href="/login">Login</a>
                <a class="btn btn-primary mx-2 nav-link text-light" href="/register">Register</a>
                {/* <a class="btn btn-danger nav-link text-light" onClickCapture={logout} href="/login">Logout</a> */}
              </form>
            </div>
          </nav>
        </div>
      ) : (
      <>
          <nav class="navbar fixed-top navbar-expand-lg navbar-light" style={{ backgroundColor: "#e3f2fd" }} >
            <a class="navbar-brand font-weight-bold" href="#">Tweet App</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" href="/">Home<span class="sr-only">(current)</span></a>
                </li>
              </ul>
              <form class="form-inline my-2 my-lg-0">
                {/* <a class="btn btn-primary nav-link text-light" href="/login">Login</a>
            <a class="btn btn-primary mx-2 nav-link text-light" href="/register">Register</a> */}
                <a class="btn btn-danger nav-link text-light" onClickCapture={logout} href="/login">Logout</a>
              </form>
              </div>
          </nav>
      </>
     )}
    </>
  );
}

          export default Navbar;
