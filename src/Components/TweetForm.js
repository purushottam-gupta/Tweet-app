import React, { useState } from "react";
// import { Button, InputLabel, Input, TextField } from "@material-ui/core";
// import { Add, Remove } from "@material-ui/icons";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

import jwt_decode from "jwt-decode";
import LoginForm from "./LoginForm";


function TweetForm() {
    let navigate = useNavigate();
    const token = localStorage.getItem('theToken');
    var decoded = jwt_decode(token);
    var tokenUsername = decoded.sub;
    // const [success, setSuccess] = useState(false);
    const [tweet, setTweet] = useState({
        tweetId: "",
        content: "",
        likes: 0
    })


    function addTweet() {
        Axios.post(
            `http://localhost:7001/api/v1.0/tweetApp/add/${tokenUsername}`,
            tweet,
            { headers: { Authorization: token } }
        ).then(
            res => {
                const tweetData = res.data;
                console.log(res.data);
                setTweet(tweetData);
                navigate("../allTweets", { replace: true });
            }
        ).catch(
            error => {
                console.log(error);
            }
        )
    }

        // function addTags() {
        //     tags.map((stag) => {
        //         // console.log(tweet.tweet_id);
        //         Axios.post(
        //             `http://localhost:7001/v1.0/tweetApp/add/tag/${tweet.tweet_id}`,
        //             stag,
        //             { headers: { Authorization: token } }
        //         ).then(
        //             res => {
        //                 // console.log(res.data);
        //                 setTweet({
        //                     tweet_id: "",
        //                     content: "",
        //                     is_reply: 1
        //                 });
        //                 setSuccess(!success);
        //             }
        //         ).catch(
        //             error => {
        //                 console.log(error);
        //             }
        //         );
        //         return true;
        //     })
        // }

    return (
        <>
        < div className = "container" >
        <hr/>
            < h4 className = "" > Add Tweet</h4 >
            
            <div style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                <textarea type="text"
                    className="form-control w-25 mx-auto"
                    placeholder="Enter tweet message"
                    value={tweet.text}
                    onChange={(e) => setTweet({ ...tweet, text: e.target.value })}
                    required
                />
            </div>
            <div style={{ paddingTop: "2px" }}>
                <input type="text"
                    className="form-control w-25 mx-auto"
                    placeholder="Enter related tags"
                    value=""
                />
            </div>
    
</div >
    <button type="submit" className="btn btn-primary my-3" onClick={addTweet}>Submit</button>
         {/* <button type="submit" className="btn btn-primary my-3">Add tags</button>  */}
        </>
    );
}


export default TweetForm;