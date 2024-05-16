import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import 'firebase/compat/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBv7hFvh7WT_iuAqI5xovTCcJdCwIy3dsk",
    authDomain: "diplomaturareact-ba2fc.firebaseapp.com",
    projectId: "diplomaturareact-ba2fc",
    storageBucket: "diplomaturareact-ba2fc.appspot.com",
    messagingSenderId: "510251874277",
    appId: "1:510251874277:web:8f99c9b737564e1534210c"
  };
  
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.auth = firebase.auth()
firebase.db = firebase.firestore()

export default firebase