import React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const ReplyCard = (props) => {


  const token = localStorage.getItem('theToken');
  let navigate = useNavigate();
  const thereply = props.thereply;
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'long' }).format(date)
  }

  const [reply] = useState({
    replyId: thereply.replyId,
    replyContent: thereply.replyContent,
    userName: thereply.userName,
    dateOfReply: thereply.dateOfReply,
  });

  function message() {
    return (
      <div className="message">{reply.replyContent}</div>
    );
  }

  function nameWithHandle() {
    return (
      <span className="name-with-handle">
        {/* <span className="name">{tweet.user.firstName} {tweet.user.lastName}</span> */}
        <span className="handle">@{reply.userName}</span>
      </span>
    );
  }

  const time = () => <span className="time">{formatDate(reply.dateOfReply)}</span>;

 
  return (
    <div className="tweet">
      <div className="content">
        {nameWithHandle()} {time()}
        {message()}
      </div>
    </div>
  );
}

export default ReplyCard;
