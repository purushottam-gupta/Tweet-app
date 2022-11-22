import React from 'react';
import { useState, useEffect } from 'react';
import Axios from 'axios';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AllReplies from './AllReplies';
const TweetCard = (props) => {


  const token = localStorage.getItem('theToken');
  let navigate = useNavigate();
  const thetweet = props.thetweet;
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-GB', { dateStyle: 'short', timeStyle: 'long' }).format(date)
  }
  const [replies,setReplies]=useState(false);


  const [tweet] = useState({
    tweetId: thetweet.tweetId,
    text: thetweet.text,
    user: thetweet.user,
    lastModified: thetweet.lastModified,
    likes:thetweet.likes
  });

  const [user, setUser] = useState({   //call api through userId
    firstName: "puru",
    lastName: "gupta",
    userName: "",
    email: "purgupta@gmail.com"
  });

  const [likeCount, setLikeCount] = useState(tweet.likes);

  useEffect(() => {
    getUser();
  }, [])

  function getUser() {
    Axios.get(`http://localhost:7001/api/v1.0/tweetApp/user/search/${tweet.userName}`,
      { headers: { Authorization: token } }
    ).then(res => {
      let user = res.data;
      setUser(user);
    }).catch(err => {
      console.log(err);
    })
  }

  function Avatar() {
    return (
      <img
        src='https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg'
        alt='avatar'
        className='avatar'
      />
    );
  }

  function message() {
    return (
      <div className="message">{tweet.text}</div>
    );
  }

  function nameWithHandle() {
    return (
      <span className="name-with-handle">
        <span className="name">{tweet.user.firstName} {tweet.user.lastName}</span>
        <span className="handle">@{tweet.user.userName}</span>
      </span>
    );
  }

  const time = () => <span className="time">{formatDate(tweet.lastModified)}</span>;


  // const RetweetButton = () => <i className="fa fa-retweet retweet-button" />;
  const likeButton = () => {
    Axios.put(`http://localhost:7001/api/v1.0/tweetApp/like/${tweet.tweetId}`,
    {"":""}
    ,{ headers: { Authorization: token } }
    ).then(res => {
      setLikeCount(likeCount+1);
      // console.log(res);
      // console.log(res.data);
    }).catch(e => { console.log(e) })
  }

  const deleteButton = () => {
    Axios.delete(`http://localhost:7001/api/v1.0/tweetApp/${tweet.user.userName}/delete/${tweet.tweetId}`,
      { headers: { Authorization: token } }
    ).then(res => {
      navigate('../allTweets',{ replace: true })
    }).catch(e => { console.log(e) })
  }
  // const ShareButton = () => <i className="fas fa-external-link-alt" />;

const handleClickReplies=()=>{
  setReplies(!replies);
}

  return (
    <>
    
    <div className="tweet d-flex flex-column">
      {/* {avatar()} */}
      <div>
      <Avatar />
      </div>
      <div className="content">
        
        {nameWithHandle()} {time()}
        {message()}
        <div className="button">
        <a onClickCapture={handleClickReplies}> <i className="far fa-comment" /></a>
          {/* <RetweetButton /> */}
          <a onClickCapture={likeButton}><i className="fa fa-heart like-button" /></a>{likeCount}
          {/* <ShareButton /> */}
          <a onClickCapture={deleteButton}><i className="fa fa-trash" /></a>
        </div>
      </div>
    
    <div className='mt-3'>
      {replies ? <AllReplies tweetId={tweet.tweetId} /> : ""}
    </div>
    </div>
    </>
  );
}

export default TweetCard;
