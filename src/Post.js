import React, { useState, useEffect } from "react";
import "./Post.css";
import Avatar from "@material-ui/core/Avatar";
import { db } from "./firebase";
import firebase from "firebase";
import Comment from "./Comment";

function Post({ postId,user, username, caption, imageUrl }) {
  const [comments, setComments] = useState([]);
  const [comment,setComment]=useState('');



  useEffect(() => {
    //this is where the code runs


  
    db.collection("posts").doc(postId).collection("comments").orderBy('timestamp','desc').onSnapshot((snapshot) => {
      //everytime a new post is added, this code fires...
      setComments(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          comment: doc.data(),
        }))
      );
 

    });
  }, [postId]);

//   useEffect(() => {
//     if (postId) {  
//        console.log(db
//         .collection("posts")
//         .doc(postId)
//         );
        
//   db
//           .collection("posts")
//           .doc(postId)
//           .collection("comments")
//           .onSnapshot((snapshot)=>{
//             setComments(snapshot.docs.map((doc)=>doc.data()));
//             console.log("test");
//          console.log(comments);
//          console.log(comments.length);
//          snapshot.docs.map((doc)=>console.log(doc.data()));
//           })
// }
//   }, []);


  const postComment=(event)=>{
    event.preventDefault();
    db.collection("posts").doc(postId).collection("comments").add({
      text:comment,
      username:user.displayName,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    });
    setComment('');
  };

  return (
    <div className="post">
      <div className="post__header">
        <Avatar
          className="post__Avatar"
          alt="RafehQazi"
          src="/static/images/avatar/1.jpg"
        ></Avatar>
        <h3>{username}</h3>
      </div>

      <img className="post__image" src={imageUrl} alt=""></img>
      <h4 className="post__text">
        <strong>{username}:</strong> {caption}
      </h4>
      
          {/* <div className="post__comments"> */}
          <div>
          {comments.map(({ id, comment }) => {
        return (
          <Comment
            key={id} commentId={id} 
            username={comment.username}
            text={comment.text}
           
          />
        );
      })}
          
          </div>
      
{user && (
     <form className="post__commentBox"> 
     <input
       className="post__input"
       type="text"
       placeholder="Add a comment..."
       value={comment}
       onChange={(e)=>{setComment(e.target.value)}}
     ></input> 
     <button className="post__button" disabled={!comment} onClick={postComment} type="submit">Post</button>
   </form>
)}
   
    </div>
  );
}

export default Post;
