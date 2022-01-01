
  import firebase from "firebase";

  const firebaseApp=firebase.initializeApp({
    apiKey: "AIzaSyAQeEPGdkvJtt6NiY9ToRygKKCWvVsg2iU",
    authDomain: "instagram-clone-1-2.firebaseapp.com",
    projectId: "instagram-clone-1-2",
    storageBucket: "instagram-clone-1-2.appspot.com",
    messagingSenderId: "269540835955",
    appId: "1:269540835955:web:c2d11d88ce2518983ae006",
    measurementId: "G-RRK51MK90L"
  });

  const db=firebaseApp.firestore();
  const auth=firebase.auth();
  const storage=firebase.storage();
  export {db,auth,storage};
