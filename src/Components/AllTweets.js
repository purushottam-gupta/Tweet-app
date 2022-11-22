import React from 'react';
import { useState,useEffect } from 'react';
import Axios from 'axios';
import TweetCard from './TweetCard';
import '../form.css';

function AllTweets() {
    const [tweets, setTweets] = useState([]);
    const token = localStorage.getItem('theToken');

    useEffect(()=>{
        getAllTweets();
    }, [])

    function getAllTweets(){
        Axios.get("http://localhost:7001/api/v1.0/tweetApp/all",
        { headers: { Authorization: token } }
        ).then(res => {
            const dt = res.data;
            setTweets(dt);
        }).catch(err => {
            console.log(err);
        })
    }
    // console.log(tweets);

    return(
        <div className="container">
            <h1 className='mt-5 pt-3'>Tweets</h1>
            <hr/>
            {tweets.map((thetweet, index) => (
                <div key={index} >
                    <div className="d-flex justify-content-center m-2 colour2"><TweetCard thetweet= {thetweet}/></div>
                </div>
            ))}
        </div>
    );
}

export default AllTweets;

