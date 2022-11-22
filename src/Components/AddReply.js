import React, { useState } from "react";
// import { Button, InputLabel, Input, TextField } from "@material-ui/core";
// import { Add, Remove } from "@material-ui/icons";
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

import jwt_decode from "jwt-decode";
import LoginForm from "./LoginForm";


function AddReply(props) {
    let navigate = useNavigate();
    const token = localStorage.getItem('theToken');
    var decoded = jwt_decode(token);
    var tokenUsername = decoded.sub;
    const tweetId = props.tweetId;
    // const [success, setSuccess] = useState(false);
    const [reply, setReply] = useState({
        tweetId: "",
        replyContent: "",
        userName:tokenUsername
    })


    function addReplies() {
        Axios.post(
            `http://localhost:7001/api/v1.0/tweetApp/${tokenUsername}/reply/${tweetId}`,
            reply,
            { headers: { Authorization: token } }
        ).then(
            res => {
                const replyData = res.data;
                console.log(res.data);
                setReply(replyData);
            }
        ).catch(
            error => {
                console.log(error);
            }
        )
    }

    return (
        <>
        < div className = "container d-flex" >
        <hr/>
            
                <textarea type="text"
                    className="form-control mx-auto"
                    placeholder="Enter tweet message"
                    value={reply.replyContent}
                    onChange={(e) => setReply({ ...reply, replyContent: e.target.value })}
                    required
                />
            

    <button type="submit" className="btn btn-sm btn-primary mx-2 my-3" onClick={addReplies}>Submit</button>
         {/* <button type="submit" className="btn btn-primary my-3">Add tags</button>  */}
         </div >
        </>
    );
}


export default AddReply;