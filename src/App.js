import "./App.css";
import Post from "./Post";
import React, { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Button, Input } from "@material-ui/core";
import ImageUpload from "./ImageUpload";
import InstagramEmbed from "react-instagram-embed";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const modalStyle = useState(getModalStyle());

  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user has logged in...
        console.log(authUser);
        setUser(authUser);
      } else {
        //user has logged out...
        setUser(null);
      }
    });

    return () => {
      //perform some clean up action before you refire useeffect
      unsubscribe(); //detatch the listener 'unsubscribe'
    };
  }, [user, username]);

  useEffect(() => {
    //this is where the code runs

   
    db.collection("posts").orderBy('timestamp','desc').onSnapshot((snapshot) => {
      //everytime a new post is added, this code fires...
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          post: doc.data(),
        }))
      );
 

    });
  }, []);

  const signUp = (event) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: username,
        });
     
      })
     .catch((error) => alert(error.message));

      
  };

  const signIn=(event) =>{
    event.preventDefault();
    auth
    .signInWithEmailAndPassword(email,password)
    .catch((error)=>alert(error.message));

    setOpenSignIn(false);
  };

  return (
    <div className="app">
     
      
      <Modal open={open} onClose={() => setOpen(false)}>
        <div
          //  style={modalStyle}
          className={classes.paper}
        >
          <form className="app__signup">
            <center>
              <img
                className="app_headerImage"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtSFk25BM4UrxXvfDGa8_FyLKXmLphypZgfrXbMoCOPe4gPhw7qhWWq9UJzJHAvcgnWvY&usqp=CAU"
              />
            </center>

            <input
              type="text"
              value={username}
              placeholder="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            ></input>

            <input
              type="text"
              value={email}
              placeholder="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>

            <input
              type="password"
              value={password}
              placeholder="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>

            <Button onClick={signUp} type="submit">
              Sign Up
            </Button>
          </form>
        </div>
      </Modal>

      <Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
        <div
          //  style={modalStyle}
          className={classes.paper}
        >
          <form className="app__signup">
            <center>
              <img
                className="app_headerImage"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtSFk25BM4UrxXvfDGa8_FyLKXmLphypZgfrXbMoCOPe4gPhw7qhWWq9UJzJHAvcgnWvY&usqp=CAU"
              />
            </center>

            <input
              type="text"
              value={email}
              placeholder="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>

            <input
              type="password"
              value={password}
              placeholder="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>

            <Button onClick={signIn} type="submit">
              Sign In
            </Button>
          </form>
        </div>
      </Modal>

      <div className="app__header">
        <img
          className="app_headerImage"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtSFk25BM4UrxXvfDGa8_FyLKXmLphypZgfrXbMoCOPe4gPhw7qhWWq9UJzJHAvcgnWvY&usqp=CAU"
        />

{user ? (
        <Button onClick={() => auth.signOut()}>Log Out</Button>
      ) : (
        <div className="app__loginContainer">
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}
      
      </div>

     

      <div className="app__posts">
        <div className="app_postsLeft">
        {posts.map(({ id, post }) => {
        return (
          <Post
            key={id} postId={id} user={user}
            username={post.username}
            caption={post.caption}
            imageUrl={post.imageUrl}
          />
        );
      })}
        </div>


    <div className="app_postsRight">
    <InstagramEmbed
  url='https://www.instagram.com/p/CNe_WvHhinS/'
  clientAccessToken='123|456'
  maxWidth={320}
  hideCaption={false}
  containerTagName='div'
  protocol=''
  injectScript
  onLoading={() => {}}
  onSuccess={() => {}}
  onAfterRender={() => {}}
  onFailure={() => {}}
/>
    </div>

      </div>



      
 

{user?(<ImageUpload username={user.displayName}></ImageUpload>)
      :(<h3>Sorry you need to login to upload</h3>)}


    </div>
  );
}

export default App;
