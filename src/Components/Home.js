import { Link } from "react-router-dom";
import TweetCard from "./TweetCard";
import Tweet from "./TweetCard";
import { useNavigate } from 'react-router-dom';
import UserCard from "./UserCard";
import LoginForm from "./LoginForm";
import { useState, useEffect } from 'react';
import TweetForm from "./TweetForm";

const Home = () => {
    const token = localStorage.getItem('theToken');
    let navigate = useNavigate();
    let c=true;
    const [edit, setEdit] = useState(false);

    // useEffect(() => {
    //     fn();
    // },[]);

    // const fn=()=>{
    //     if(token!=null){
    //         navigate("../", { replace: true });
    //     }else{
    //         navigate("../login", { replace: true });
    //     }
    // }

    const handleEditTweet = () => {
        setEdit(!edit);
      }

    return ( 
        
        <div className="container">
            <h1 className="mt-5 pt-3" >Welcome to the Tweet App</h1>
            <p>Please refresh for logout button, Sorry for inconvinence</p>
            <hr />
            <div>    
                <div className="d-flex justify-content-center mb-1">
                    <UserCard/>
                </div>
                <button className="btn btn-secondary mx-2 my-2" onClick={handleEditTweet}>Add Tweet</button>
                {/* <Link className="btn btn-secondary mx-2 my-2" to="/addTweet" >Add Tweet</Link> */}
                <Link className="btn btn-secondary mx-2 my-2" to="/allTweets">All Tweets</Link>
                {/* <button className="btn btn-secondary mx-2">All Tweets</button> */}
            </div>
            {!edit ? "" : <TweetForm />}
        </div>
    );
}
 
export default Home;