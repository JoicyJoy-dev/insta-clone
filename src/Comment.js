import React,{useState,useEffect} from "react";
import db from "./firebase";
import firebase from "firebase";

function Comment({commentId,username,text})
{
    return(
        <div className="post__comments">
            <p><strong>{username}</strong>{text}</p>
        </div>
    );

}


export default Comment;