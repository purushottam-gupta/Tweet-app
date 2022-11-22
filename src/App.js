
import './App.css';
// import Register from './Components/Register';
// import Login from './Components/Login';
import Home from './Components/Home';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import RegistrationForm from './Components/RegistrationForm';
import LoginForm from './Components/LoginForm';
import AllTweets from './Components/AllTweets';
import TweetForm from './Components/TweetForm';
import ForgotPassword from './Components/ForgotPassword';
import Navbar from './Components/Navbar'; 
import { useState} from 'react';

function App() {
 
  return (
    <div className="App">
      <Navbar/>
      {/* <AllTweets /> */}
      <Router>
      {/* <Home /> */}
          <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/login' element={<LoginForm />}/>
            <Route path='/register' element={<RegistrationForm />}/>
            <Route path='/alltweets' element={<AllTweets />} />
            {/* <Route path='/addTweet' element={<TweetForm />} /> */}
            <Route path='/forgotPassword' element={<ForgotPassword />} />
          </Routes>
      </Router>
    </div>
  );
}

export default App;
