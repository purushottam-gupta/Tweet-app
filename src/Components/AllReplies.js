import React from 'react';
import { useState,useEffect } from 'react';
import Axios from 'axios';
import TweetCard from './TweetCard';
import '../form.css';
import ReplyCard from './ReplyCard';
import AddReply from './AddReply';

function AllReplies(props) {
    const [replies, setReplies] = useState([]);
    const token = localStorage.getItem('theToken');
    const tweetId=props.tweetId;

    useEffect(()=>{
        getAllReplies();
    }, [])

    function getAllReplies(){
        Axios.get(`http://localhost:7001/api/v1.0/tweetApp/reply/${tweetId}`,
        { headers: { Authorization: token } }
        ).then(res => {
            const dt = res.data;
            setReplies(dt);
        }).catch(err => {
            console.log(err);
        })
    }
    // console.log(tweets);
    
    return(
        <div className="container">
            <AddReply tweetId={tweetId}/>
            {replies.length>0 ? 
            replies.map((thereply, index) => (
                <div key={index} >
                    <div className="d-flex justify-content-center m-2"><ReplyCard thereply= {thereply}/></div>
                </div>
            )) : <h6 className='font-weight-bolder mt-2'>No replies</h6>}
        </div>
    );
}

export default AllReplies;

