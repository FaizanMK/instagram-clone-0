
  import firebase from 'firebase'; 

  const firebaseApp= firebase.initializeApp( {

    apiKey: "AIzaSyCmZvGQojXvqJnkkTQeHEbCjSaZdVGt0h0",
    authDomain: "instagram-react-fd015.firebaseapp.com",
    projectId: "instagram-react-fd015",
    storageBucket: "instagram-react-fd015.appspot.com",
    messagingSenderId: "1025466879952",
    appId: "1:1025466879952:web:0b95d86a04d3926b5bf3d5",
    measurementId: "G-GMC4Y7HVLV"

  });
  const db= firebaseApp.firestore();
  const auth=firebase.auth();
  const storage=firebase.storage();

  export{db, auth, storage};
